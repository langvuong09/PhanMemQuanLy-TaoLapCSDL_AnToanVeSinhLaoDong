import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { StatusHistory } from '../reportHistory/report-history.entity';
import { FileEntity } from '../media/media.entity';
import Response from '../../commons/response'; 
import { CreateReportDto } from '../report/dto/create-report.dto';
import { Report, ReportStatus } from '../report/report.entity';
import { UpdateStatusDto } from '../report/dto/update-status.dto';
import { ReportDetail } from '../report/report-detail.entity';


@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
    @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async createReport(dto: CreateReportDto, user: any) {
    if (!user.doetId) {
      throw new BadRequestException('Tài khoản của bạn không thuộc doanh nghiệp nào để khai báo!');
    }

    const parsedDetails = dto.details.map(detail => {
      const med = Number(detail.medicalCost) || 0;
      const sal = Number(detail.salaryCompensation) || 0;
      const prop = Number(detail.propertyDamage) || 0;
      return {
        ...detail,
        medicalCost: med,
        salaryCompensation: sal,
        propertyDamage: prop,
        totalCost: med + sal + prop 
      };
    });

    const report = this.reportRepository.create({
      title: dto.title,
      year: dto.year,
      reportTypeId: dto.reportTypeId,
      doetId: user.doetId,
      status: ReportStatus.DRAFT,
      details: parsedDetails,
    });

    if (dto.fileIds && dto.fileIds.length > 0) {
      const files = await this.fileRepository.findBy({ id: In(dto.fileIds) });
      report.files = files;
    }

    const savedReport = await this.reportRepository.save(report);

    await this.dataSource.getRepository(StatusHistory).save({
      status: ReportStatus.DRAFT,
      note: 'Khởi tạo bản nháp báo cáo định kỳ.',
      reportId: savedReport.id,
      userId: user.id
    });

    return Response.get(savedReport);
  }


  async changeStatus(id: number, dto: UpdateStatusDto, user: any) {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Không tìm thấy báo cáo yêu cầu');

    const current = report.status;
    const target = dto.status;

    const validTransitions: Record<ReportStatus, ReportStatus[]> = {
      [ReportStatus.DRAFT]: [ReportStatus.SUBMITTED],                    
      [ReportStatus.SUBMITTED]: [ReportStatus.APPROVED, ReportStatus.REJECTED], 
      [ReportStatus.APPROVED]: [],                                        
      [ReportStatus.REJECTED]: [ReportStatus.SUBMITTED],                 
    };

    if (!validTransitions[current].includes(target)) {
      throw new BadRequestException(`Sai tiến độ! Không thể chuyển trạng thái từ [${current}] sang [${target}].`);
    }

    report.status = target;
    
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(report);
      await transactionalEntityManager.save(StatusHistory, {
        status: target,
        note: dto.note || `Chuyển trạng thái sang ${target}`,
        reportId: report.id,
        userId: user.id
      });
    });

    return Response.SUCCESSFULLY;
  }

  async getAllForAdmin(query: any) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const { province, district, ward, businessName, taxCode, period, status, year } = query;

    const queryBuilder = this.reportRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.doet', 'd')
      .leftJoinAndSelect('r.reportType', 'rt')
      .where('1=1');

    if (year) queryBuilder.andWhere('r.year = :year', { year: Number(year) });
    if (status) queryBuilder.andWhere('r.status = :status', { status });
    if (taxCode) queryBuilder.andWhere('d.taxCode ILike :taxCode', { taxCode: `%${taxCode.trim()}%` });
    if (businessName) queryBuilder.andWhere('d.name ILike :businessName', { businessName: `%${businessName.trim()}%` });
    if (period) queryBuilder.andWhere('rt.period = :period', { period: period.trim() });

    if (province) queryBuilder.andWhere("d.province->>'value' ILike :province", { province: `%${province}%` });
    if (district) queryBuilder.andWhere("d.district->>'value' ILike :district", { district: `%${district}%` });
    if (ward) queryBuilder.andWhere("d.ward->>'value' ILike :ward", { ward: `%${ward}%` });

    queryBuilder.orderBy('r.id', 'DESC');

    const [items, totalCount] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const formattedItems = items.map(report => ({
      id: report.id,
      title: report.title,
      year: report.year,
      status: report.status,
      period: report.reportType?.period || 'Cả năm',
      startDate: report.reportType?.startDate || null,
      endDate: report.reportType?.endDate || null,
      business: {
        id: report.doet?.id,
        name: report.doet?.name,
        taxCode: report.doet?.taxCode,
        province: report.doet?.province,
        district: report.doet?.district,
        ward: report.doet?.ward
      },
      attachedFiles: report.files || []
    }));

    return Response.getList({ items: formattedItems, count: totalCount, pageSize, pageNumber: page });
  }

  async getAllForBusiness(query: any, user: any) {
    if (!user.doetId) {
      throw new BadRequestException('Tài khoản của bạn không gắn liền với doanh nghiệp nào!');
    }

    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const { year, period, status } = query;

    const queryBuilder = this.reportRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.reportType', 'rt')
      .where('r.doetId = :doetId', { doetId: user.doetId }); 

    if (year) queryBuilder.andWhere('r.year = :year', { year: Number(year) });
    if (status) queryBuilder.andWhere('r.status = :status', { status });
    if (period) queryBuilder.andWhere('rt.period = :period', { period: period.trim() });

    queryBuilder.orderBy('r.id', 'DESC');

    const [items, totalCount] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const formattedItems = items.map(report => ({
      id: report.id,
      title: report.title,
      year: report.year,
      status: report.status,
      period: report.reportType?.period || 'N/A',
      startDate: report.reportType?.startDate || null,
      endDate: report.reportType?.endDate || null,
      attachedFiles: report.files || []
    }));

    return Response.getList({ items: formattedItems, count: totalCount, pageSize, pageNumber: page });
  }


  async getDetailForFE(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: {
        reportType: true,
        files: true,
        doet: {
          businessType: true,
          industry: true,
        },
        details: {
          trauma: true,
          injuryType: true,
        },
        statusHistories: {
          user: true,
        },
      },
    });

    if (!report) throw new NotFoundException('Không tìm thấy bản báo cáo yêu cầu!');

    const tableRows = report.details.map(detail => ({
      detailId: detail.id,
      categoryType: detail.traumaId ? 'TRAUMA' : (detail.injuryTypeId ? 'INJURY' : 'GENERAL'),
      criteriaId: detail.traumaId || detail.injuryTypeId,
      criteriaCode: detail.trauma?.code || detail.injuryType?.code || 'N/A',
      criteriaName: detail.trauma?.name || detail.injuryType?.name || 'Tổng quan',
      
      totalCases: detail.totalCases,
      fatalCases: detail.fatalCases,
      multiVictimCases: detail.multiVictimCases,
      totalVictims: detail.totalVictims,
      femaleVictims: detail.femaleVictims,
      fatalVictims: detail.fatalVictims,
      severeInjuries: detail.severeInjuries,

      nonManagedVictims: detail.nonManagedVictims,
      nonManagedFemaleVictims: detail.nonManagedFemaleVictims,
      nonManagedFatalVictims: detail.nonManagedFatalVictims,
      nonManagedSevereInjuries: detail.nonManagedSevereInjuries,

      medicalCost: Number(detail.medicalCost),
      salaryCompensation: Number(detail.salaryCompensation),
      propertyDamage: Number(detail.propertyDamage),
      totalCost: Number(detail.totalCost)
    }));

    return Response.get({
      overview: {
        id: report.id,
        title: report.title,
        year: report.year,
        status: report.status,
        reportConfig: {
          id: report.reportType?.id,
          name: report.reportType?.name,
          period: report.reportType?.period,
          startDate: report.reportType?.startDate,
          endDate: report.reportType?.endDate
        },
        company: report.doet,
        attachedFiles: report.files || []
      },
      tableRows,
      timeline: report.statusHistories.map(h => ({
        id: h.id,
        status: h.status,
        note: h.note,
        createdAt: h.createdAt,
        handler: h.user?.fullName || h.user?.username || 'Hệ thống'
      }))
    });
  }

  async getSummaryReport(year: number) {
    const rawSummary = await this.dataSource.getRepository(ReportDetail).createQueryBuilder('rd')
      .leftJoin('rd.report', 'r')
      .leftJoin('r.doet', 'd')
      .leftJoin('d.businessType', 'bt')
      .select('bt.name', 'businesstypename')
      .addSelect('COUNT(DISTINCT d.id)', 'totalcompanies')
      .addSelect('SUM(rd.totalCases)', 'sumtotalcases')
      .addSelect('SUM(rd.fatalCases)', 'sumfatalcases')
      .addSelect('SUM(rd.totalVictims)', 'sumtotalvictims')
      .addSelect('SUM(rd.femaleVictims)', 'sumfemalevictims')
      .addSelect('SUM(rd.fatalVictims)', 'sumfatalvictims')
      .addSelect('SUM(rd.severeInjuries)', 'sumsevereinjuries')
      .addSelect('SUM(rd.medicalCost)', 'summedicalcost')
      .addSelect('SUM(rd.salaryCompensation)', 'sumsalarycompensation')
      .addSelect('SUM(rd.propertyDamage)', 'sumpropertydamage')
      .addSelect('SUM(rd.totalCost)', 'sumtotalcost')
      .where('r.year = :year', { year })
      .andWhere('r.status = :status', { status: ReportStatus.APPROVED }) 
      .groupBy('bt.name')
      .getRawMany();

    const formattedSummary = rawSummary.map(row => ({
      businessTypeName: row.businesstypename || 'Chưa phân loại hình thức',
      totalCompanies: Number(row.totalcompanies) || 0,
      casesReport: {
        totalCases: Number(row.sumtotalcases) || 0,
        fatalCases: Number(row.sumfatalcases) || 0
      },
      victimsReport: {
        totalVictims: Number(row.sumtotalvictims) || 0,
        femaleVictims: Number(row.sumfemalevictims) || 0,
        fatalVictims: Number(row.sumfatalvictims) || 0,
        severeInjuries: Number(row.sumsevereinjuries) || 0
      },
      financialReport: {
        medicalCost: Number(row.summedicalcost) || 0,
        salaryCompensation: Number(row.sumsalarycompensation) || 0,
        propertyDamage: Number(row.sumpropertydamage) || 0,
        totalCost: Number(row.sumtotalcost) || 0
      }
    }));

    return Response.get(formattedSummary);
  }
}
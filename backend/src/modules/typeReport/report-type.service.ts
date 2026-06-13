import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportType } from './report-type.entity';
import { CreateReportTypeDto } from './dto/create-report-type.dto';
import { UpdateReportTypeDto } from './dto/update-report-type.dto';
import Response from '../../commons/response'; // Điều chỉnh đường dẫn theo dự án của bạn

@Injectable()
export class ReportTypeService {
  constructor(
    @InjectRepository(ReportType)
    private readonly reportTypeRepository: Repository<ReportType>,
  ) {}

  async create(dto: CreateReportTypeDto) {
    if (new Date(dto.startDate) > new Date(dto.endDate)) {
      throw new BadRequestException('Thời gian bắt đầu không thể lớn hơn thời gian kết thúc!');
    }

    const newConfig = this.reportTypeRepository.create(dto);
    return await this.reportTypeRepository.save(newConfig);
  }

  async update(id: number, dto: UpdateReportTypeDto) {
    const config = await this.reportTypeRepository.findOneBy({ id });
    if (!config) {
      throw new NotFoundException('Không tìm thấy cấu hình báo cáo này!');
    }

    if (dto.startDate && dto.endDate) {
      if (new Date(dto.startDate) > new Date(dto.endDate)) {
        throw new BadRequestException('Thời gian bắt đầu không thể lớn hơn thời gian kết thúc!');
      }
    }

    Object.assign(config, dto);
    return await this.reportTypeRepository.save(config);
  }

  async getDetail(id: number) {
    const config = await this.reportTypeRepository.findOneBy({ id });
    if (!config) throw new NotFoundException('Không tìm thấy cấu hình báo cáo');
    return Response.get(config);
  }

  async toggleActive(id: number, isActive: boolean) {
    const config = await this.reportTypeRepository.findOneBy({ id });
    if (!config) throw new NotFoundException('Không tìm thấy cấu hình báo cáo');

    config.isActive = isActive;
    await this.reportTypeRepository.save(config);
    return Response.SUCCESSFULLY;
  }


  async getAllForAdmin(query: any) {
    return this.getReportTypesBase(query, false);
  }

  async getAllForBusiness(query: any) {
    return this.getReportTypesBase(query, true);
  }

  private async getReportTypesBase(query: any, onlyActive: boolean) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const { year, name, period, startDate, endDate, isActive } = query;

    const queryBuilder = this.reportTypeRepository.createQueryBuilder('rt');

    if (onlyActive) {
      queryBuilder.andWhere('rt.isActive = :onlyActiveStatus', { onlyActiveStatus: true });
    } else if (isActive !== undefined && isActive !== '') {
      const activeBool = isActive === 'true' || isActive === true;
      queryBuilder.andWhere('rt.isActive = :activeBool', { activeBool });
    }

    if (year) {
      queryBuilder.andWhere('rt.year = :year', { year: Number(year) });
    }

    if (name) {
      queryBuilder.andWhere('rt.name ILike :name', { name: `%${name.trim()}%` });
    }

    if (period) {
      queryBuilder.andWhere('rt.period = :period', { period: period.trim() });
    }

    if (startDate) {
      queryBuilder.andWhere('rt.startDate >= :startDate', { startDate });
    }

    if (endDate) {
      queryBuilder.andWhere('rt.endDate <= :endDate', { endDate });
    }

    queryBuilder.orderBy('rt.year', 'DESC')
                .addOrderBy('rt.startDate', 'ASC');

    const [items, totalCount] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return Response.getList({
      items,
      count: totalCount,
      pageSize,
      pageNumber: page,
    });
  }
}
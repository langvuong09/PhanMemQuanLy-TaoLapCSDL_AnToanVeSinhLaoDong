import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, In } from 'typeorm';
import { Doet } from './doet.entity';
import { User } from '../user/user.entity';
import { MediaService } from '../media/media.service';
import Response from '../../commons/response';
import { CreateDoetDto } from './dto/create-doet.dto';
import { UpdateDoetDto } from './dto/update-doet.dto';

@Injectable()
export class DoetService {
  constructor(
    @InjectRepository(Doet)
    private readonly doetRepository: Repository<Doet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mediaService: MediaService,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateDoetDto) {
    const trimmedTaxCode = dto.taxCode.trim();

    const isTaxCodeExist = await this.doetRepository.findOneBy({ taxCode: trimmedTaxCode });
    if (isTaxCodeExist) {
      throw new BadRequestException('Mã số thuế này đã tồn tại trên hệ thống!');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newDoet = queryRunner.manager.create(Doet, {
        ...dto,
        taxCode: trimmedTaxCode,
      });
      const savedDoet = await queryRunner.manager.save(Doet, newDoet);

      const defaultPassword = 'Doet@123456';
      const newUser = queryRunner.manager.create(User, {
        username: trimmedTaxCode,
        password: defaultPassword,
        fullName: dto.name,
        status: true,
        roleId: 2,
        doetId: savedDoet.id,
        province: dto.province,
        district: dto.district,
        ward: dto.ward,
        address: dto.address,
      });
      
      await queryRunner.manager.save(User, newUser);
      await queryRunner.commitTransaction();

      return Response.get(savedDoet);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 🎯 LẤY DANH SÁCH: Gốc từ User - Trả về TRỌN VẸN thông tin Doet kèm theo
  async getAll(query: { 
    page?: number; 
    pageSize?: number; 
    name?: string; 
    taxCode?: string; 
    businessTypeId?: number; 
    industryId?: number; 
    ward?: string; 
    status?: string | boolean; 
  }) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    
    const { name, taxCode, businessTypeId, industryId, ward, status } = query;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.doet', 'doet')
      .leftJoinAndSelect('doet.businessType', 'businessType')
      .leftJoinAndSelect('doet.industry', 'industry')
      .where('user.deletedAt IS NULL')
      .andWhere('doet.deletedAt IS NULL');

    if (name) {
      queryBuilder.andWhere('doet.name ILike :name', { name: `%${name.trim()}%` });
    }

    if (taxCode) {
      queryBuilder.andWhere('doet.taxCode ILike :taxCode', { taxCode: `%${taxCode.trim()}%` });
    }

    if (businessTypeId) {
      queryBuilder.andWhere('doet.businessTypeId = :businessTypeId', { businessTypeId: Number(businessTypeId) });
    }

    if (industryId) {
      queryBuilder.andWhere('doet.industryId = :industryId', { industryId: Number(industryId) });
    }

   if (ward) {
      queryBuilder.andWhere(
        "(doet.ward->>'key' = :wardKey OR doet.ward->>'value' ILike :wardValue)",
        { 
          wardKey: ward.trim(), 
          wardValue: `%${ward.trim()}%` 
        }
      );
    } 

    if (status !== undefined && status !== '') {
      const isStatusTrue = status === 'true' || status === true;
      queryBuilder.andWhere('doet.status = :status', { status: isStatusTrue });
    }

    const [items, count] = await queryBuilder
      .orderBy('doet.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return Response.getList({
      items,
      count,
      pageSize,
      pageNumber: page
    });
  }

  async getDetail(id: number) {
    const userWithDoet = await this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.doet', 'doet')
      .leftJoinAndSelect('doet.businessType', 'businessType')
      .leftJoinAndSelect('doet.industry', 'industry')
      .leftJoinAndSelect('doet.files', 'files') 
      .where('doet.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .andWhere('doet.deletedAt IS NULL')
      .getOne();

    if (!userWithDoet) {
      throw new NotFoundException('Không tìm thấy thông tin doanh nghiệp & tài khoản liên quan hoặc đã bị xóa');
    }
    return Response.get(userWithDoet);
  }

  async update(id: number, dto: UpdateDoetDto) {
    const doet = await this.doetRepository.findOneBy({ id });
    if (!doet || doet.deletedAt) {
      throw new NotFoundException('Không tìm thấy thông tin doanh nghiệp này');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      Object.assign(doet, dto);
      const updatedDoet = await queryRunner.manager.save(Doet, doet);

      const associatedUser = await queryRunner.manager.findOneBy(User, { doetId: id });
      if (associatedUser) {
        if (dto.name) associatedUser.fullName = dto.name;

        if (dto.province) associatedUser.province = dto.province;
        if (dto.district) associatedUser.district = dto.district;
        if (dto.ward) associatedUser.ward = dto.ward;
        if (dto.address) associatedUser.address = dto.address;

        await queryRunner.manager.save(User, associatedUser);
      }

      await queryRunner.commitTransaction();
      return Response.get(updatedDoet);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async toggleStatus(id: number, status: boolean) {
    const doet = await this.doetRepository.findOneBy({ id });
    if (!doet || doet.deletedAt) {
      throw new NotFoundException('Không tìm thấy thông tin doanh nghiệp này');
    }

    doet.status = status;
    await this.doetRepository.save(doet);
    return Response.SUCCESSFULLY;
  }

  async bulkRemove(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('Danh sách ID cần xóa không được để trống');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(Doet, ids);
      await queryRunner.manager.softDelete(User, { doetId: In(ids) });

      await queryRunner.commitTransaction();
      return Response.SUCCESSFULLY;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async removeFile(fileId: string) {
    return await this.mediaService.deleteFile(fileId);
  }
}
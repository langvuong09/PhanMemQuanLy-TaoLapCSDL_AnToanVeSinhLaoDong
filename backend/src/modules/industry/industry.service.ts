import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Industry } from './industry.entity';
import Response from '../../commons/response';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { CreateIndustryDto } from './dto/create-industry.dto';

@Injectable()
export class IndustryService {
  constructor(
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,
  ) {}

  async create(dto: CreateIndustryDto) {
    const isCodeExist = await this.industryRepository.findOneBy({ code: dto.code.trim() });
    if (isCodeExist) {
      throw new BadRequestException('Mã ngành nghề này đã tồn tại!');
    }

    if (dto.parentId) {
      const parentExist = await this.industryRepository.findOneBy({ id: dto.parentId });
      if (!parentExist) throw new NotFoundException('Không tìm thấy ngành cha đã chọn');
    }

    const newIndustry = this.industryRepository.create({
      ...dto,
      code: dto.code.trim()
    });
    return await this.industryRepository.save(newIndustry);
  }

  async getAllForAdmin(query: { page?: number; pageSize?: number; search?: string; parentId?: number }) {
    return this.getIndustriesBase(query, false);
  }

  async getAllForBusiness(query: { page?: number; pageSize?: number; search?: string; parentId?: number }) {
    return this.getIndustriesBase(query, true);
  }

  private async getIndustriesBase(query: any, onlyActive: boolean) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const { search, parentId } = query;

    const queryBuilder = this.industryRepository.createQueryBuilder('industry')
      .leftJoinAndSelect('industry.parent', 'parent')
      .where('industry.deletedAt IS NULL');

    if (onlyActive) {
      queryBuilder.andWhere('industry.isActive = :isActive', { isActive: true });
    }

    if (parentId) {
      queryBuilder.andWhere('industry.parentId = :parentId', { parentId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(industry.name ILike :search OR industry.code ILike :search)', 
        { search: `%${search}%` }
      );
    }

    const [items, count] = await queryBuilder
      .orderBy('industry.code', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return Response.getList({ items, count, pageSize, pageNumber: page });
  }

  async getDetail(id: number) {
    const industry = await this.industryRepository.createQueryBuilder('industry')
      .leftJoinAndSelect('industry.parent', 'parent')
      .where('industry.id = :id', { id })
      .andWhere('industry.deletedAt IS NULL')
      .getOne();

    if (!industry) throw new NotFoundException('Không tìm thấy ngành nghề này hoặc đã bị xóa');
    return Response.get(industry);
  }

  async update(id: number, dto: UpdateIndustryDto) {
    const industry = await this.industryRepository.findOneBy({ id });
    if (!industry || industry.deletedAt) throw new NotFoundException('Không tìm thấy ngành nghề này');

    if (dto.parentId && dto.parentId === id) {
      throw new BadRequestException('Không thể chọn chính danh mục này làm ngành nghề cha!');
    }

    if (dto.code && dto.code.trim() !== industry.code) {
      const isCodeExist = await this.industryRepository.findOne({
        where: { code: dto.code.trim(), id: Not(id) }
      });
      if (isCodeExist) throw new BadRequestException('Mã ngành nghề mới đã được sử dụng!');
      dto.code = dto.code.trim();
    }

    Object.assign(industry, dto);
    return await this.industryRepository.save(industry);
  }

  async toggleActive(id: number, isActive: boolean) {
    const industry = await this.industryRepository.findOneBy({ id });
    if (!industry || industry.deletedAt) throw new NotFoundException('Không tìm thấy ngành nghề này');

    industry.isActive = isActive;
    await this.industryRepository.save(industry);
    return Response.SUCCESSFULLY;
  }

  async bulkRemove(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('Danh sách ID cần xóa không được để trống');
    }
    const hasChildren = await this.industryRepository.findOne({
      where: { parentId: In(ids) }
    });
    
    if (hasChildren) {
      throw new BadRequestException(
        'Không thể xóa hàng loạt vì trong danh sách lựa chọn có chứa ngành nghề đang là danh mục CHA của ngành nghề khác!'
      );
    }

    await this.industryRepository.softDelete(ids);
    return Response.SUCCESSFULLY;
  }
}
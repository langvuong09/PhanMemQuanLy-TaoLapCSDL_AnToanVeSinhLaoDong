import { 
  Body, Controller, Get, Param, Post, Put, Query, Patch, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor, 
  Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IndustryService } from './industry.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { AuthGuard } from "../../commons/guards/authGuard";

@ApiTags('Industries (Ngành nghề kinh doanh)')
@Controller('industries')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới ngành nghề kinh doanh' })
  async create(@Body() dto: CreateIndustryDto) {
    return await this.industryService.create(dto);
  }

  @Get('admin')
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách ngành nghề (Dành cho Admin - Có cả phần tử ẩn)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Tìm theo tên hoặc mã ngành' })
  @ApiQuery({ name: 'parentId', required: false, description: 'Lọc các ngành con thuộc ID cha này' })
  async getAllForAdmin(@Query() query: any) {
    return await this.industryService.getAllForAdmin(query);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách ngành nghề đang hoạt động (Dành cho Doanh nghiệp)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'parentId', required: false })
  async getAllForBusiness(@Query() query: any) {
    return await this.industryService.getAllForBusiness(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết ngành nghề' })
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    return await this.industryService.getDetail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin ngành nghề' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIndustryDto,
  ) {
    return await this.industryService.update(id, dto);
  }

  @Patch(':id/active')
  @ApiOperation({ summary: 'Bật/Tắt trạng thái hoạt động' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isActive: { type: 'boolean', example: true }
      },
      required: ['isActive']
    }
  })
  async toggleActive(
    @Param('id', ParseIntPipe) id: number,
    @Body('isActive') isActive: boolean,
  ) {
    return await this.industryService.toggleActive(id, isActive);
  }

   @Post('bulk-delete')
  @ApiOperation({ summary: 'Xóa mềm hàng loạt ngành nghề kinh doanh' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'integer' }, example: [1, 2, 3], description: 'Mảng các ID ngành nghề kinh doanh cần xóa' }
      },
      required: ['ids']
    }
  })
  async bulkDelete(@Body('ids') ids: number[]) {
    return await this.industryService.bulkRemove(ids);
  }
}
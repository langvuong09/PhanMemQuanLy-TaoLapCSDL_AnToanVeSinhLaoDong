import { 
  Body, Controller, Get, Param, Post, Put, Query, Patch, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor, 
  Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BusinessTypeService } from './business-type.service';
import { CreateBusinessTypeDto } from './dto/create-business-type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business-type.dto';
import { AuthGuard } from "../../commons/guards/authGuard";

@ApiTags('Business Types (Loại hình doanh nghiệp)')
@Controller('business-types')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class BusinessTypeController {
  constructor(private readonly businessTypeService: BusinessTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới loại hình doanh nghiệp' })
  async create(@Body() dto: CreateBusinessTypeDto) {
    return await this.businessTypeService.create(dto);
  }

  // 🎯 1. API CHO ADMIN: Lấy toàn bộ bao gồm cả phần tử bị ẩn (isActive = false)
  @Get('admin')
  @ApiOperation({ summary: 'Lấy danh sách loại hình doanh nghiệp (Dành cho Admin - Lấy hết)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm theo tên hoặc mã code' })
  async getAllForAdmin(@Query() query: any) {
    return await this.businessTypeService.getAllForAdmin(query);
  }

  // 🎯 2. API CHO DOANH NGHIỆP: Chỉ lấy các loại đang hoạt động (isActive = true)
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách loại hình doanh nghiệp đang hoạt động (Dành cho Doanh nghiệp)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm theo tên hoặc mã code' })
  async getAllForBusiness(@Query() query: any) {
    return await this.businessTypeService.getAllForBusiness(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết loại hình doanh nghiệp' })
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    return await this.businessTypeService.getDetail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin loại hình doanh nghiệp' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBusinessTypeDto,
  ) {
    return await this.businessTypeService.update(id, dto);
  }

  @Patch(':id/active')
  @ApiOperation({ summary: 'Bật/Tắt trạng thái hoạt động' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isActive: { type: 'boolean', example: true, description: 'Trạng thái hoạt động' }
      },
      required: ['isActive']
    }
  })
  async toggleActive(
    @Param('id', ParseIntPipe) id: number,
    @Body('isActive') isActive: boolean,
  ) {
    return await this.businessTypeService.toggleActive(id, isActive);
  }

   @Post('bulk-delete')
  @ApiOperation({ summary: 'Xóa mềm hàng loạt loại hình kinh doanh' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'integer' }, example: [1, 2, 3], description: 'Mảng các ID loại hình kinh doanh cần xóa' }
      },
      required: ['ids']
    }
  })
  async bulkDelete(@Body('ids') ids: number[]) {
    return await this.businessTypeService.bulkRemove(ids);
  }
}
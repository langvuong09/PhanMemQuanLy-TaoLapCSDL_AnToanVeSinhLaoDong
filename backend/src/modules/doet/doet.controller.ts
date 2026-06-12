import { 
  Body, Controller, Get, Param, Post, Put, Query, Patch, Delete, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor 
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DoetService } from './doet.service';
import { CreateDoetDto } from './dto/create-doet.dto';
import { UpdateDoetDto } from './dto/update-doet.dto';
import { AuthGuard } from "../../commons/guards/authGuard";

@ApiTags('Doets (Quản lý doanh nghiệp)')
@Controller('doets')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class DoetController {
  constructor(private readonly doetService: DoetService) {}

  @Post()
  @ApiOperation({ summary: 'Đăng ký doanh nghiệp mới (Tự động cấp tài khoản User)' })
  async create(@Body() dto: CreateDoetDto) {
    return await this.doetService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách doanh nghiệp (Bộ lọc nâng cao theo từng cột trên UI)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'name', required: false, description: 'Tìm kiếm theo tên doanh nghiệp' })
  @ApiQuery({ name: 'taxCode', required: false, description: 'Tìm kiếm theo mã số thuế' })
  @ApiQuery({ name: 'businessTypeId', required: false, description: 'Lọc theo ID loại hình kinh doanh' })
  @ApiQuery({ name: 'industryId', required: false, description: 'Lọc theo ID ngành nghề kinh doanh' })
  @ApiQuery({ name: 'ward', required: false, description: 'Tìm theo Phường/Xã' })
  @ApiQuery({ name: 'status', required: false, enum: ['true', 'false'], description: 'Lọc theo trạng thái hoạt động' })
  async getAll(@Query() query: {
    page?: number;
    pageSize?: number;
    name?: string;
    taxCode?: string;
    businessTypeId?: number;
    industryId?: number;
    ward?: string;
    status?: string;
  }) {
    return await this.doetService.getAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết hồ sơ doanh nghiệp' })
  async getDetail(@Param('id', ParseIntPipe) id: number) {
    return await this.doetService.getDetail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật hồ sơ doanh nghiệp (Không cho sửa MST, tự động đồng bộ địa chỉ User)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDoetDto,
  ) {
    return await this.doetService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Bật/Tắt trạng thái hoạt động của Doanh nghiệp' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true, description: 'Trạng thái hoạt động' }
      },
      required: ['status']
    }
  })
  async toggleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: boolean,
  ) {
    return await this.doetService.toggleStatus(id, status);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Xóa mềm hàng loạt doanh nghiệp cùng tài khoản người dùng liên quan' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'integer' }, example: [1, 2, 3], description: 'Mảng các ID doanh nghiệp cần xóa' }
      },
      required: ['ids']
    }
  })
  async bulkDelete(@Body('ids') ids: number[]) {
    return await this.doetService.bulkRemove(ids);
  }

  @Delete('files/:fileId')
  @ApiOperation({ summary: 'Xóa file đính kèm khỏi doanh nghiệp (Xóa triệt để trên Cloudinary)' })
  async removeFile(@Param('fileId') fileId: string) {
    return await this.doetService.removeFile(fileId);
  }
}
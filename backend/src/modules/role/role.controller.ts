import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAll() {
    return await this.roleService.getAllRoles();
  }
}
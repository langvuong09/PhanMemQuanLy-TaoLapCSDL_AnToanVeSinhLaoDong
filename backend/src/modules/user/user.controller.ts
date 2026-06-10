import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AuthGuard } from "../../commons/guards/authGuard";
import ResponseInterceptor from "src/interceptors/response.interceptor";
import { GetAllDto } from "src/commons";
import { GetUser } from "src/commons/guards/user.decorator";
import { CurrentUser } from "../auth/auth.model";
import { ChangePasswordDto } from "./dto/change-password";
import { ApiBody, ApiOperation, ApiTags,ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("Users")
@Controller("users")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get("checkUsername")
  @UseInterceptors(ResponseInterceptor, ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get items" })
  async checkUsername(
    @Query("username") username: string
  ): Promise<{ username: string; existed: boolean }> {
    return await this.userService.checkUsername(username);
  }

  @Get()
  @ApiOperation({ summary: "Get items" })
  async getAll(@Query() query: GetAllDto): Promise<any> {
    return await this.userService.getAll(query);
  }

  @Post("import")
  @UseInterceptors(ResponseInterceptor, ClassSerializerInterceptor)
  @ApiOperation({ summary: "Get items" })
  async import(
    @Req() req: any,
    @Body("users") users: any
  ): Promise<{ success: number; err: number; username: [] }> {
    return await this.userService.import(req.user, users);
  }

  @Post("recovery")
  @ApiOperation({ summary: "recovery account" })
  async recovery(
    @Body("user_id") user_id: string
  ): Promise<{ success: boolean }> {
    return await this.userService.recovery(user_id);
  }

  @Post("reset-password")
  @ApiBody({ type: ChangePasswordDto })
  @ApiOperation({ summary: "reset password account" })
  async resetPassword(
    @GetUser() currentUser: CurrentUser,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<{ success: boolean }> {
    return await this.userService.resetPassword(currentUser.id , changePasswordDto);
  }
}
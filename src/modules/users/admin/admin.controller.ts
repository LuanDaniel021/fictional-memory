
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@supabase/supabase-js';
import { SupabaseAuthGuard } from '../../../supabase/supabase.auth.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminCreateUserDto } from './dto/create-admin-user.dto';
import { AdminUpdateUserDto } from './dto/update-admin-user.dto';
import { AdminService } from './admin.service';

@Controller('users/admin')
@ApiBearerAuth('access-token')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles('admin')
  create(@Body() payload: AdminCreateUserDto) {
    return this.adminService.create(payload);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Req() request: Request & { user: User },
    @Param('id') id: string,
    @Body() payload: AdminUpdateUserDto,
  ) {
    return this.adminService.update(id, payload, request.user);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Req() request: Request & { user: User }, @Param('id') id: string) {
    return this.adminService.remove(id, request.user);
  }
}

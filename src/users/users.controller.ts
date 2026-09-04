import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseAuthGuard } from '../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(SupabaseAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post()
  login(@Param('id') id: string) {
    return this.usersService.login('','');
  }

  @Patch()
  @ApiBearerAuth('access-token')
  update(
    @Req() request: Request & { user: { id: string } },
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(request.user.id, updateUserDto);
  }

  @Delete()
  @ApiBearerAuth('access-token')
  remove(@Req() request: Request & { user: { id: string } }) {
    return this.usersService.remove(request.user.id);
  }
}

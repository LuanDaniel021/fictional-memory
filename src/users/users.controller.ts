import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseAuthGuard } from '../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("verifyEmailCode")
  verifyEmailCode(@Body() body: { email:string, code:string }) {
    return this.usersService.login(body.email, body.code);
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.verifyEmailCode(loginUserDto.email, loginUserDto.password);
  }

  @Patch("Update")
  @UseGuards(SupabaseAuthGuard)
  update(
    @Req() request: Request & { user: { id: string } },
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(request.user.id, updateUserDto);
  }

  @Delete("delete")
  @UseGuards(SupabaseAuthGuard)
  remove(@Req() request: Request & { user: { id: string } }) {
    return this.usersService.remove(request.user.id);
  }
}

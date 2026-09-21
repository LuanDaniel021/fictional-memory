import { Controller, Post, Body, Patch, Delete, UseGuards, Req, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@supabase/supabase-js';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("singup")
  singup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.singup(createUserDto);
  }

  @Post("singin")
  singin(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.singin(loginUserDto);
  }

  @Get('info')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('user')
  info(@Req() request: Request & { user: User }) {
    return this.usersService.info(request.user);
  }

  @Patch("update")
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('user')
  update(
    @Req() request: Request & { user: User },
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(request.user, updateUserDto);
  }

  @Delete("remove")
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('user')
  remove(@Req() request: Request & { user: User }) {
    return this.usersService.remove(request.user);
  }
}

import { Controller, Post, Body, Patch, Delete, UseGuards, Req, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseAuthGuard } from '../supabase/supabase.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@supabase/supabase-js';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("sing-up")
  sing_up(@Body() createUserDto: CreateUserDto) {
    return this.usersService.sing_up(createUserDto);
  }

  @Post("sing-in")
  sing_in(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.sing_in(loginUserDto);
  }

  @Get("email-confirm")
  @UseGuards(SupabaseAuthGuard)
  email_confirm( @Req() request: Request & { user: User } ) {
    return this.usersService.email_confirm( request.user );
  }

  @Post("solicit-new-role/:role")
  @UseGuards(SupabaseAuthGuard)
  solicit_new_role( @Req() request: Request & { user: User }, @Param("role") role : string ) {
    return this.usersService.solicit_new_role( request.user, role);
  }

  @Post("confirm-new-role/:id")
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Admin')
  confirm_new_role( @Req() request: Request & { user: User }, @Param("id") id : string ) {
    return "confirmado"
  }

  @Post("reject-new-role/:id")
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('Admin')
  reject_new_role( @Req() request: Request & { user: User }, @Param("id") id : string ) {
    return "this.usersService.confirm_new_role( id )";
  }

  @Patch("update")
  @UseGuards(SupabaseAuthGuard)
  update(
    @Req() request: Request & { user: User },
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(request.user, updateUserDto);
  }

  @Delete("remove")
  @UseGuards(SupabaseAuthGuard)
  remove(@Req() request: Request & { user: User }) {
    return this.usersService.remove(request.user);
  }
}

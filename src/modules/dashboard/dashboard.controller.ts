import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { SupabaseAuthGuard } from '../../supabase/supabase.auth.guard';
// import { CreateDashboardDto } from './dto/create-dashboard.dto';
// import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@Roles('user')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }
}

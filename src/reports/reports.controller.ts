import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { ReportsService } from './reports.service';

import { ApproveReportDto } from './dtos/approve-report-dto';
import { CreateReportDto } from './dtos/create-report-dto';
import { ReportDto } from './dtos/report-dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';

import { Serialize } from '../interceptors/serialize.interceptor';




@Controller('reports')
export class ReportsController {

    constructor(private reportsService:ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(

        @Body()
        body: CreateReportDto,

        @CurrentUser()
        user:User

        ) {
            return this.reportsService.create(body,user);
    }

    
    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(

      @Param('id')
      id:string,

      @Body()
      body:ApproveReportDto
    ){
      return this.reportsService.changeApproval(id,body.approved)
    }

    @Get('')
    getEstimate(
      @Query()
      query:GetEstimateDto
    ) {
      return this.reportsService.createEstimate(query)
    }
}

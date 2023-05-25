import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Moment } from '../moment/entities/moment.entity';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Moment, Account])],
  providers: [ReportResolver, ReportService],
})
export class ReportModule {}

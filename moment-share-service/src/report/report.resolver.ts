import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReportService } from './report.service';
import { CreateReportInput } from './dto/create-report.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Report')
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(GraphqlJwtGuard)
  @Mutation('reportMoment')
  async createReport(@Args('input') input: CreateReportInput) {
    return await this.reportService.createReport(
      Number(input.momentId),
      input.reporterUsername,
      input.reason,
    );
  }

  @UseGuards(GraphqlJwtGuard)
  @ResolveField('moment')
  async findMoment(@Parent() { id }: { id: string }) {
    return await this.reportService.findMoment(Number(id));
  }

  @UseGuards(GraphqlJwtGuard)
  @ResolveField('reporter')
  async findReporter(@Parent() { id }: { id: string }) {
    return await this.reportService.findReporterAccount(Number(id));
  }
}

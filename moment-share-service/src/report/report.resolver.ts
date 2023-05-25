import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReportService } from './report.service';
import { CreateReportInput } from './dto/create-report.input';

@Resolver('Report')
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Mutation('reportMoment')
  async createReport(@Args('input') input: CreateReportInput) {
    return await this.reportService.createReport(
      Number(input.momentId),
      input.reporterUsername,
      input.reason,
    );
  }

  @ResolveField('moment')
  async findMoment(@Parent() { id }: { id: string }) {
    return await this.reportService.findMoment(Number(id));
  }

  @ResolveField('reporter')
  async findReporter(@Parent() { id }: { id: string }) {
    return await this.reportService.findReporterAccount(Number(id));
  }
}

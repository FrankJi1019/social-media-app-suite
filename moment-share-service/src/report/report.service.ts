import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from '../moment/entities/moment.entity';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class ReportService extends BaseService<Report> {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(reportRepository);
  }

  async createReport(momentId: number, accountName: string, reason: string) {
    const momentPromise = this.momentRepository.findOne({
      where: { id: momentId },
    });
    const accountPromise = this.accountRepository.findOne({
      where: { username: accountName },
    });
    const [moment, account] = await Promise.all([
      momentPromise,
      accountPromise,
    ]);
    if (!moment) {
      throw new NotFoundException('Moment not found');
    }
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return await super.create({
      reason,
      moment,
      reporter: account,
    });
  }

  async findMoment(id: number) {
    return (
      await this.findOne({
        where: { id },
        relations: { moment: true },
      })
    ).moment;
  }

  async findReporterAccount(id: number) {
    return (
      await this.findOne({
        where: { id },
        relations: { reporter: true },
      })
    ).reporter;
  }
}

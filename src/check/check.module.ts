import { Module } from '@nestjs/common';
import { CheckGateway } from './check.gateway';

@Module({
  providers: [CheckGateway],
})
export class CheckModule {}

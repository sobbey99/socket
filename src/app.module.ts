import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckModule } from './check/check.module';

@Module({
  imports: [CheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

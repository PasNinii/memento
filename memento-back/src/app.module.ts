import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { ExpenditureModule } from './api/expenditure/expenditure.module';
import { ExpenditureCategoryModule } from './api/expenditure-category/expenditure-category.module';
import TypeOrmConfigService from './shared/database/database.config';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    AuthModule,
    ExpenditureModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    ExpenditureCategoryModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class AppModule {}

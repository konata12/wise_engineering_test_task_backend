import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OutdoorActivityModule } from './outdoor_activity/outdoor_activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './typeorm/entities/Activity';

@Module({
  imports: [
    OutdoorActivityModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1f34e5e7-b1f3-40fb-9290-0c33daa62ddd',
      database: 'wise_engineering_test_task',
      entities: [Activity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

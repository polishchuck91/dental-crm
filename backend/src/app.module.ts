import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
 imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'mydb',
      autoLoadEntities: true, // Автоматичне завантаження сутностей
      synchronize: false, // Використовуйте `true` лише в розробці
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

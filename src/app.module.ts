import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BreedModule } from './breed/breed.module';
import { RehomepetModule } from './rehomepet/rehomepet.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BreedModule,
    RehomepetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

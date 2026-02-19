import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './interface/videos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}

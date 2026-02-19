import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import type { CreateVideoDto } from './dto/createVideo.dto';
import { VideoEntity } from './interface/videos.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async getVideos(): Promise<VideoEntity[]> {
    return this.videosService.getVideos();
  }

  @Post()
  async postVideo(@Body() createVideo: CreateVideoDto): Promise<VideoEntity> {
    return this.videosService.postVideo(createVideo);
  }
}

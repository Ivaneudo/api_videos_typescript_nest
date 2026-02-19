import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete(':id')
  async deleteVideo(@Param('id') id: string): Promise<void> {
    await this.videosService.deleteVideo(id);
  }
}

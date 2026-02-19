import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateVideoDto } from './dto/createVideo.dto';
import { VideoEntity } from './interface/videos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async getVideos(): Promise<VideoEntity[]> {
    return this.videoRepository.find();
  }

  async postVideo(createVideo: CreateVideoDto): Promise<VideoEntity> {
    const videoNovo = await this.videoRepository.save({
      id: uuidv4(),
      ...createVideo,
      createdAt: new Date(),
    });

    return videoNovo;
  }
}

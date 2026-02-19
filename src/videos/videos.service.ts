import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateVideoDto } from './dto/createVideo.dto';
import { VideoEntity } from './interface/videos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

  async deleteVideo(id: string): Promise<void> {
    try {
      await this.videoRepository.delete(id);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const code: string = String(error.code);

      if (code === '22P02') {
        throw new NotAcceptableException('Tipo de id não identificado');
      }

      throw new NotAcceptableException('Erro não identificado');
    }
  }

  async getTitleVideos(search: string): Promise<VideoEntity[]> {
    const result = await this.videoRepository.find({
      where: [{ title: ILike(`%${search}%`) }],
    });

    if (result.length === 0) {
      throw new NotFoundException(
        `Nenhum video com o titulo: '${search}' foi encontrado.`,
      );
    }

    return result;
  }
}

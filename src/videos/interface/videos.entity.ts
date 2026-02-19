import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'videos' })
export class VideoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'duration', nullable: false })
  duration: number;

  @Column({
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;
}

import { Module } from '@nestjs/common';
import { MoviesController } from './rxjs/movies/movies.controller';
import { MoviesService } from './rxjs/movies/movies.service';
import { SeriesService } from './rxjs/series/series.service';
import { SeriesController } from './rxjs/series/series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './shared/repositories';

const repositories = [MovieRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  controllers: [MoviesController, SeriesController],
  providers: [MoviesService, SeriesService],
})
export class LearnModule {}

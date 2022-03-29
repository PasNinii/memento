import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Movie, Movies } from '../../shared/entities';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movies: MoviesService) {}

  @Get()
  async find(): Promise<Movies> {
    return this.movies.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movies.findOne(id);
  }

  @Post()
  async create(): Promise<Movies> {
    return this.movies.find();
  }

  @Put()
  async update(): Promise<Movies> {
    return this.movies.find();
  }

  @Delete()
  async delete(): Promise<Movies> {
    return this.movies.find();
  }
}

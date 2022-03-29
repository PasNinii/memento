import { Injectable } from '@nestjs/common';
import { Movies } from '../../shared/entities';
import { MovieRepository } from '../../shared/repositories';

@Injectable()
export class MoviesService {
  constructor(private readonly movies: MovieRepository) {}

  async find(): Promise<Movies> {
    return this.movies.find();
  }

  async findOne(id: string) {
    return this.movies.findOne(id);
  }

  async create(): Promise<void> {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async delete(): Promise<void> {
    return;
  }
}

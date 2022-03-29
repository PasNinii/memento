import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './entities';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}

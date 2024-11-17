import { addMovie } from '../controllers/movies/addMovie';
import { deleteMovie } from '../controllers/movies/deleteMovie';
import { getMovie } from '../controllers/movies/getMovie';
import { getMovies } from '../controllers/movies/getMovies';
import { updateMovie } from '../controllers/movies/updateMovie';

export const routes = {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie
};
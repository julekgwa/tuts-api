import { IMovie, Movie } from '../../models/Movie';

export const getMovies = async () => {

  return Movie.find({}).exec();

};

export const addMovie = async (movie: IMovie) => {

  const newMovie = new Movie(movie);

  return newMovie.save();

};

export const getMovie = async (id: string) => {

  return Movie.findById(id).exec();

};

export const updateMovie = async (id: string, movie: IMovie) => {

  return Movie.findByIdAndUpdate(id, movie, { new: true });

};

export const deleteMovie = async (id: string) => {

  return Movie.findByIdAndDelete(id);

};
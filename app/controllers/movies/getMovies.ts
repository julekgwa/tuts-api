import { Request, Response } from 'express';

import * as movieClient from '../../clients/mongodb/movies';
import { errorResponse, successResponse } from '../../helpers/request';

export const getMovies = async (req: Request, res: Response) => {

  try {

    const movies = await movieClient.getMovies();

    successResponse(res, movies, 'Movies retrieved successfully');

  } catch (error) {

    errorResponse(res, error);

  }

};
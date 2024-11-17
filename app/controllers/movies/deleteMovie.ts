import { Request, Response } from 'express';
import * as movieClient from '../../clients/mongodb/movies';
import { errorResponse, successResponse } from '../../helpers/request';

export const deleteMovie = async (req: Request, res: Response) => {

  try {

    const response = await movieClient.deleteMovie(req.params.id);

    successResponse(res, response, 'Movie deleted successfully');

  } catch (error) {

    errorResponse(res, error);

  }

};

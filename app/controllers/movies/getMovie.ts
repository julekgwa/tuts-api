import { Request, Response } from 'express';

import * as movieClient from '../../clients/mongodb/movies';
import { errorResponse, successResponse } from '../../helpers/request';

export const getMovie = async (req: Request, res: Response) => {

  try {

    const response = await movieClient.getMovie(req.params.id);

    successResponse(res, response, 'Movie retrieved successfully');

  } catch (error) {

    errorResponse(res, error);

  }

};
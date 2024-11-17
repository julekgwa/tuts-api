import { Request, Response } from 'express';

import * as movieClient from '../../clients/mongodb/movies';
import { errorResponse, successResponse } from '../../helpers/request';

export const addMovie = async (req: Request, res: Response) => {

  try {

    const response = await movieClient.addMovie(req.body);

    successResponse(res, response, 'Movie added successfully');

  } catch (error) {

    errorResponse(res, error);

  }

};
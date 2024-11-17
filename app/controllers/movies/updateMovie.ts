import { Request, Response } from 'express';

import * as movieClient from '../../clients/mongodb/movies';
import { errorResponse, successResponse } from '../../helpers/request';

export const updateMovie = async (req: Request, res: Response) => {

  try {

    const response = await movieClient.updateMovie(req.params.id, req.body);

    successResponse(res, response, 'Movie updated successfully');

  } catch (error) {

    errorResponse(res, error);

  }

};
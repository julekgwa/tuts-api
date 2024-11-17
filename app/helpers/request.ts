import { Response } from 'express';

export const ERROR_MSG =
  'Looks like the server is taking too long to respond, please try again later';

export const successResponse = (res: Response, data: unknown, message: string) => {

  res.status(200).json({
    success: true,
    data,
    message,
  });

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorResponse = (res: Response, error: any) => {

  const message = error?.message || ERROR_MSG;

  res.status(400).json({
    success: false,
    error: message,
  });

};
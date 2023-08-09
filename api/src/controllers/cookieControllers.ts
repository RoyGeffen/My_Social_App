import { Request, Response, NextFunction } from 'express';

export const getIsCookie = (req:Request, res: Response) => {

    const accessTokenCookie = req.cookies.accessToken;
    const accessTokenExists = !!accessTokenCookie;
  
    res.json({ accessTokenExists });
}
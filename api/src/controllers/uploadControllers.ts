import { Request, Response, NextFunction } from 'express';



export const uploadPostImg = (req: Request, res: Response) => {
        const file: Express.Multer.File | undefined = req.file;
        res.status(200).json(file?.filename);
};
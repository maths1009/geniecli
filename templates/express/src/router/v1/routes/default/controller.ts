import { Request, Response } from 'express'


export const defaultController = {
  default: async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' })
  },
}

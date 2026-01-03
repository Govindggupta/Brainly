import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import jsonwebtoken from "jsonwebtoken";


// extend the request object with user property
// interface RequestWithUser extends Request {
//   user: string;
// }

export const authMiddleware = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = await jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({ _id: decodedToken.id });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};  
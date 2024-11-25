import jwt from "jsonwebtoken";
import { Request as IReq, Response as IRes, NextFunction as INext } from "express";
import HttpStatusCodes from "@src/common/HttpStatusCodes";


export interface Payload {
    id: number;
}
export interface CustomRequest extends IReq {
    payload: Payload;
}

export const authenticateToken = (req: IReq, res:IRes, next: INext) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET || "prusci", (err, user) => {
        if (err) return res.sendStatus(403).json(err);
        if (user) {
            (req as CustomRequest).payload = user as Payload;
            next();
        } else {
            res.sendStatus(500); 
        }
    });

}


export  async function verifyToken(req: IReq, res: IRes) {
    const { token } = req.body as unknown as { token: string };

    try {
        const verified = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET || "prusci", (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });

        if (verified) {
            return res.status(HttpStatusCodes.OK).send({ message: "Token verified" });;
        }
    } catch (error) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).send({ error: "Unauthorized" });
    }
};

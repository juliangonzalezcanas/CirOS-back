import jwt from 'jsonwebtoken';
import { resolve } from 'path';

export function generateToken(data: any): Promise<string>{
    return new Promise((resolve, reject) => {
        return jwt.sign({data}, "prusci", { expiresIn: "1h" }, (err, token: string | undefined) => {
            if (err) reject (err);
            if (!token) 
                reject("Token not generated");
            else
                resolve(token);
        });
    });
}
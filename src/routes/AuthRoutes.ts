import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import AuthService from '@src/services/AuthService';

async function login(IReq : IReq<{email: string, password:string}>, IRes : IRes) {
    const { email, password } = IReq.body;
    try {
        const token = await AuthService.login(email, password);
        return IRes.status(HttpStatusCodes.OK).send( token );
    }
    catch (error) {
        return IRes.status(HttpStatusCodes.UNAUTHORIZED).end();
    }
}
export default {
    login
} as const;
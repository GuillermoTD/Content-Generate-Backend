
import {Request,Response} from 'express'



export const login = (req:Request, res:Response) => {
    res.send('Login endpoint');
}

export const signup = (req:Request, res:Response) => {
    res.send('signup endpoint');
}

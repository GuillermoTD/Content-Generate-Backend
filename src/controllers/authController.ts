
import {Request,Response} from 'express'
import { Mongoose } from 'mongoose'


export const login = (req:Request, res:Response) => {
    const {username,password} = req.body

    if(username==' '|| password==' ')
        res.json({message:"Todos los campos son requeridos"})

    





    res.send('Login endpoint');
}

export const signup = (req:Request, res:Response) => {
    res.send('signup endpoint');
}

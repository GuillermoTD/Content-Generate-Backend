import * as jwt  from 'jsonwebtoken';


const tokenGenerator = (payload:string)=>{
    const token = jwt.sign({ id: payload }, process.env.JWT_SECRET!);
    return token;
}


export default tokenGenerator
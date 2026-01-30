import jwt from 'jsonwebtoken'

const authenticatedToken = async(req, res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            res.status(401).json({message:"No token provided", success:false})
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:"Invalid token"})
        }
        req.id=decode.userId
        next()

    } catch (error) {
        return res.status(401).json({message:"Invalid token"})
    }
}

export default authenticatedToken
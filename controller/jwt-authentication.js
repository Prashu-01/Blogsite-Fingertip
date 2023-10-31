import Jwt  from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return response.status(401).json({ msg: 'token is missing ' })
    }
    Jwt.verify(token, process.env.Access_key, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'invalid token' })
        }
        request.user=user
        next()
    })
}
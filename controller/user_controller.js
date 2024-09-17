// import { response } from "express";
import User from "../model/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from "../model/token.js"

dotenv.config()

export const signupUser = async (request, response) => {
    try {
        // second parameter '10'because we are producing salt of 10 characters
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { name: request.body.name, username: request.body.username, password: hashedPassword }
        // encrypting the password in request body^
        const newUser = new User(user)
        await newUser.save()
        return response.status(200).json({ msg: "signup successfully" })
    } catch (error) {
        return response.status(500).json({ msg: "signup failed" })
    }
}

export const loginUser = async (request, response) => {
    // findOne used to find document from collection
    let user = await User.findOne({ username: request.body.username })
    if (!user) {
        return response.status(400).json({ msg: 'Username not found' })
    }
    try {
        // jwt authentication
        let match = await bcrypt.compare(request.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.Access_key)
            const refreshToken = jwt.sign(user.toJSON(), process.env.Refresh_key)

            const newToken = new Token({ token: refreshToken })
            await newToken.save()
            // login API response
            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
        } else {
            return response.status(400).json({ msg: "Password does not match" })
        }
    } catch {
        return response.status(400).json({ msg: 'error in login' })
    }
}

export const logoutUser = async (request, response) => { //experimental still have to make it stable
    try {
        const tok = request.params.id
        if(!tok) response.status(401).json({msg:"missing token"})
        await Token.deleteOne({ token: tok });
        return response.status(204).json({ msg: 'logout successfull' })
    }catch(error){
        return response.status(500).json({msg: error})
    }
}


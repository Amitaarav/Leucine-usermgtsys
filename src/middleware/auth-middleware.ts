import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config";

const authenticate = async (req, res, next) => {
    try{
        let token;
        if (req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .json({
                status:'error',
                message: "You are not logged in. Please log in to get access this resource",
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userService.getUserById(decoded.id);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status:'error',
                message: "The user belonging to this token no longer exists",
            })
        }

        if(user.passwordChangedAt && decoded.iat < parseInt(user.passwordChangedAt.getTime() / 1000, 10)){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status:'error',
                message: "User recently changed password! Please log in again",
            })
        }

        req.user = user;
        next();
    }catch(error){
        logger.error("Authentication error: ", error);

        if(error.name === "JsonWebTokenError"){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status:'error',
                message: "Invalid token. Please log in to get access this resource",
            })
        }

        if(error.name === "TokenExpiredError"){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status:'error',
                message: "Your token has expired! Please log in again",
            })
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status:'error',
            message: "Authentication Error. Please try again.",
        })
    }
}
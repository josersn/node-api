import jwt from "jsonwebtoken";
import { promisify } from "util";

import config from "../../config/auth";

export default async (req, res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json({error: "Token does not provider"});
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, config.secret);

        req.userId = decoded.id;

        return next();
    } catch (error) {
        res.status(401).json({error: "Token invalid!"});
    }
    
    return next();

};
import jwt from "jsonwebtoken"

import User from "../models/User";

import config from "../../config/auth";


class SessionController {
     async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user){
            res.status(401).json({error: "User does not found"})
        }

        if( !(await user.checkPassword(password)) ){
            res.status(401).json({error: "Password does not match"})
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token : jwt.sign({ id },  config.secret ,{
                expiresIn: config.time
            })
        });


     }
}
export default  new SessionController();
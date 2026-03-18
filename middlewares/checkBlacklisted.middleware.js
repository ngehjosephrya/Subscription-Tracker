import BlacklistToken from "../models/blacklistToken.model.js";

export const checkBlacklist = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(token) {
            const blacklisted = await BlacklistToken.findOne({token});
            if (blacklisted) {
                const error =  new Error('Token has been invalidated');
                error.statusCOde = 401;
                throw error;
            }
        }

        next();
    } catch (error) {
        next(error)
    }
}
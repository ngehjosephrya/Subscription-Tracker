import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message:'AUTHORIZATION REQUIRED'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({
                message: 'Invalid or Expired Token'
            })
        }
        req.user = user;
        next()
    });
};

export default authenticateToken
import {rateLimit,ipKeyGenerator} from 'express-rate-limit';

export const requestLimiter = (sekunds,limit)=>{
    const limiter = rateLimit({
        windowMs : sekunds*1000,
        limit,
        keyGenerator: (req,_)=>{
            return ipKeyGenerator(req.ip) || (req.body.username  ?? req.body.phoneNumber) ;
        },
        message:{
            status:429,
            message:'To many request'
        },
        legacyHeaders: true,
        standardHeaders: 'draft-6' || 'draft-7' || 'draft-8'
    });
    return limiter
}
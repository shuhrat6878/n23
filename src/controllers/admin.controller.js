import Admin from "../models/admin.model.js"
import { BaseController} from "./base.controller.js"
import crypto from "../utils/Crypto.js";
import config from "../config/index.js";
import token from "../utils/Token.js";
import { AppError } from "../error/AppError.js";

class AdminController extends BaseController{
    constructor(){
        super(Admin);
    }

    async createAdmin (req,res){
        try {
            const {username, email, password} =req.body;
            const exituUername = await Admin.findOne({username});
            if(exituUername){
                throw new AppError('foydalanuvchi nomi allaqachon mavjud',409);
            }
            const exitEmail = await Admin.findOne({email})
            if(exitEmail){
                throw new AppError('foyfdalanuvchi emaili allaqachon mavjud',409)
            }
            const hashedPassword = await crypto.encrypt(password);
            const admin = await Admin.create({
                username,
                email,
                hashedPassword
            })
            return res.status(201).json({
                statusCode:201,
                message:"success",
                data: admin
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message:error || "internall server error"
            });
        }
    }

    
    async signIn(req,res){
        try {
            const {username, password} = req.body;
            const admin = await Admin.findOne({username});
            const isMatchPassword = await crypto.decrypt(password, admin?.hashedPassword ?? '');
            if(!isMatchPassword){
                throw new AppError('username or pasword xatoo',400);
            }

            const payload = {
                id:admin._id, role: admin.role, isActive: admin.isActive
            }
             const accesToken = token.generateAccesToken(payload);
             const refreshToken = token.generateRefreshToken(payload);
             token.writeToCookie(res,'refreshTokenAdmin',refreshToken,30)
            return res.status(200).json({
                statusCode:200,
                message:"success",
                data :{
                    token:accesToken,
                    admin
                }
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message:error.message || "internall server error"
            });
        }
    }

    async generateNewToken(req, res) {
        try {
            const refreshToken = req.cookies?.refreshTokenAdmin;
            if (!refreshToken) {
                throw new AppError('Refresh token not found',401)
            }
            const verifiedToken=token.verifyToken(refreshToken,config.TOKEN.REFRESH_KEY);
            
            if (!verifiedToken) {
                throw new AppError('Refresh token expire',401)
            }
            const admin = await Admin.findById(verifiedToken?.id);
            if (!admin) {
                throw new AppError('Forbidden user',403)
            }
            const paylod = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }
            const accessToken = token.generateAccesToken(paylod);
            
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {
                    token: accessToken
                }
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }


    async signOut(req, res) {
        try {
            const refreshToken = req.cookies?.refreshTokenAdmin;
            if (!refreshToken) {
                throw new AppError('Refresh token not found',401);
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire',401);
            }
            const admin = await Admin.findById(verifiedToken?.id);
            if (!admin) {
                throw new AppError('Forbidden user',403)
            }
            res.clearCookie('refreshTokenAdmin');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }
}






export default new AdminController();

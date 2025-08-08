import Client from "../models/client.model.js";
import { BaseController } from "./base.controller.js";
import crypto from '../utils/Crypto.js';
import { AppError } from '../error/AppError.js';
import { successRes } from '../utils/success-res.js';
import token from '../utils/Token.js';
import config from '../config/index.js';
import { generateOTP } from '../utils/generate-otp.js';
import { sendOTPToMail } from '../utils/send-mail.js';
import Redis from '../utils/Redis.js';



class ClientController extends BaseController {
    constructor() {
        super(Client)
    }
    async createClient(req, res, next) {
        try {
            const { phoneNumber, email, password } = req.body;
            const existsPhone = await Client.findOne({ phoneNumber });
            if (existsPhone) {
                throw new AppError('PhoneNumber allaqachon mavjud', 409);
            }
            const existsEmail = await Client.findOne({ email });
            if (existsEmail) {
                throw new AppError('Email allaqachon mavjud', 409);
            }
            const hashedPassword = await crypto.encrypt(password);
            delete req.body.password;
            const wallet  = req.body.wallet ?? 0;
            const client = await Client.create({
                ...req.body,
                hashedPassword,
                isActive: wallet>0,
                wallet: wallet,
                image: req?.file?.filename ?? ''
            });
            return successRes(res, client, 201);
        } catch (error) {
            next(error);
        }
    }

    async signIn(req, res, next) {
        try {
            const { phoneNumber, password } = req.body;
            const client = await Client.findOne({ phoneNumber });
            const isMatchPassword = await crypto.decrypt(password, client?.hashedPassword ?? '');
            if (!isMatchPassword) {
                throw new AppError('Phone number yoki password xato', 400);
            }
            const payload = {
                id: client._id, role: client.role, isActive: client.isActive
            };
            const accessToken = token.generateAccessToken(payload);
            const refreshToken = token.generateRefreshToken(payload);
            token.writeToCookie(res, 'refreshTokenClient', refreshToken, 30);
            return successRes(res, {
                token: accessToken,
                client
            });
        } catch (error) {
            next(error);
        }
    }

    async generateNewToken(req, res, next) {
        try {
            const refreshToken = req.cookies?.refreshTokenClient;
            if (!refreshToken) {
                throw new AppError('Authorization error', 401);
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401);
            }
            const client = await Client.findById(verifiedToken?.id);
            if (!client) {
                throw new AppError('Forbidden user || ruxsat etilmagan foydalanuvchi', 403);
            }
            const paylod = {
                id: client._id, role: client.role, isActive: client.isActive
            }
            const accessToken = token.generateAccessToken(paylod);
            return successRes(res, {
                token: accessToken
            });
        } catch (error) {
            next(error);
        }
    }

    async signOut(req, res, next) {
        try {
            const refreshToken = req.cookies?.refreshTokenClient;
            if (!refreshToken) {
                throw new AppError('Refresh token not found', 401);
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401);
            }
            const client = await Client.findById(verifiedToken?.id);
            if (!client) {
                throw new AppError('Forbidden user || ruxsati yoq foydalanuvchi', 403);
            }
            res.clearCookie('refreshTokenClient');
            return successRes(res, {});
        } catch (error) {
            next(error);
        }
    }
    async updateClient(req, res, next) {
        try {
            const id = req.params.id;
            const client = await BaseController.checkById(Client, id);
            const { userName, password, email } = req.body;
            if (userName) {
                const exsist = await Client.findOne({ userName });
                if (exsist) {
                    throw new AppError("userName arlery exsist", 409)
                }
            }

            if (email) {
                const exsist = await Client.findOne({ email });
                if (exsist) {
                    throw new AppError("email arlery exsist", 409)
                }
            }

            let hashedPassword = client.hashedPassword;
            if (password) {
                if (req?.user.role != client.role) {
                    throw new AppError("not access chenge for admin or client", 403)
                }
                hashedPassword = await crypto.encrypt(password);
                delete req.body.password
            };
            const updateClient = await Client.findByIdAndUpdate(id, { ...req.body, hashedPassword }, { new: true });
            return successRes(res, updateClient)
        } catch (error) {
            next(error)
        }
    }

    async updatePasswordClient(req, res, next) {
        try {
            const id = req.params.id;
            const { oldPassword, newPassword } = req.body;
            const client = await BaseController.checkById(Client, id);
            const isMatedPassword = await crypto.decrypt(oldPassword, client.hashedPassword)
            if (!isMatedPassword) {
                throw new AppError("incorect old password", 400)
            }
            const hashedPassword = await crypto.encrypt(newPassword);
            const updatePassword = await Client.findByIdAndUpdate(id, { hashedPassword }, { new: true });
            return successRes(res, updatePassword)
        } catch (error) {
            next(error)
        }
    }

    async forgetPassword(req, res, next) {
        try {
            const { email } = req.body;
            const client = await Client.findOne({ email })
            if (!client) {
                throw new AppError("email not found")
            }
            const otp = generateOTP();
            sendOTPToMail(email, otp);
            Redis.setData(email, otp);
            return successRes(
                res, {
                email, otp,
                expireOtp: '5minut'
            }
            )
        } catch (error) {
            next(error)
        }
    }

    async confirmOTP(req, res, next) {
        try {
            const { email, otp } = req.body;
            const checkOTP = await Redis.getData(email)
            if (otp != checkOTP) {
                throw new AppError("otp notogri", 400)
            }
            await Redis.deleteData(email);
            return successRes(res, {
                confirmPasswordOtp: config.CONFIRM_PASSWORD_URL,
                reqMethod: "PATCH",
                email
            })
        } catch (error) {
            next(error)
        }
    }

    async confirmPassword(req, res, next) {
        try {
            const { email, newPassword } = req.body;
            const client = await Client.findOne({ email });
            if (!client) {
                throw new AppError("bunday foydalanuchi topilmadi", 404)
            }

            const hashedPassword = await crypto.encrypt(newPassword);
            const updatePassword = await Client.findByIdAndUpdate(client._id, { hashedPassword }, { new: true });
            return successRes(res, updatePassword);
        } catch (error) {
            next(error)
        }
    }

}

export default new ClientController();
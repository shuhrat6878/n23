import crypto from "../utils/Crypto.js";
import Admin from "../models/admin.model.js";
import { connectDB } from "../db/index.js";
import { disconnect } from "mongoose";
import config from "../config/index.js"


(async function () {

    try {
        
        await connectDB()
            const hashedPassword = await crypto.encrypt(config.ADMIN.SUPERADMIN_PASSWORD)
            await Admin.create({
                username: config.ADMIN.SUPERADMIN_USERNAME,
                email: config.ADMIN.SUPERADMIN_EMAIL,
                hashedPassword,
                role:"SUPPERADMIN"
            });
            console.log("super admin create success");
            await disconnect()

    } catch (error) {
        console.log("eror on super admin create",error);

    }

}())

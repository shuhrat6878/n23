import crypto from "../utils/Crypto.js";
import Admin from "../models/admin.model.js";
import { connectDB } from "../db/index.js";
import { disconnect } from "mongoose";
import config from "../config/index.js"
import { Roles } from "../const/index.js";


(async function () {

    try {
        
        await connectDB()
            const hashedPassword = await crypto.encrypt(config.SUPERADMIN.PASSWORD)
            await Admin.create({
                username: config.SUPERADMIN.USERNAME,
                email: config.SUPERADMIN.EMAIL,
                hashedPassword,
                role:Roles.SUPPERADMIN
            });
            console.log("super admin create success");
            await disconnect()

    } catch (error) {
        console.log("eror on super admin create",error);

    }

}())

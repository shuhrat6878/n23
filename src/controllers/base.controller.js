import { isValidObjectId } from "mongoose";
import { AppError } from "../error/AppError.js";

export class BaseController {
    constructor(model){
        this.model = model;
    };
     create = async (req,res)=>{
        try {
            const data = await this.model.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: "success",
                data
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error"
            });
        }

    }

     findAll  =async (_,res)=>{
        try {
            const data = await this.model.find();
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error"
            });
        }
    }

     findById= async (req,res)=>{
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                throw new AppError('Invalid objektId', 400);
            }
            const data = await this.model.findById(id);
            if(!data){
               throw new AppError('not faund', 404)
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data
            });
            
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error"
            });
        }
    }

     update= async (req,res)=>{
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                throw new AppError ('invalit objectId',400)
            }
            const data = await this.model.findByIdAndUpdate(id,req.body,{new:true});
            if (!data){
                throw new AppError('not faund ', 404)
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data
            });
            
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error"
            });
        }
    }

     delete = async (req,res)=>{
        try {
            const id = req.params?.id;
            if(!isValidObjectId(id)){
                throw new AppError('invalid objektId',400)
            }
            const data = await this.model.findByIdAndDelete(id);
            if (!data){
                throw new AppError('not faund ',404)
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || "internal server error"
            });
        }
    }

    
}
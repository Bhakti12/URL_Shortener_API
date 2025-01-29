import mongoose from "mongoose";
// import * as dotenv from "dotenv";

export function DatabaseConnection(){
    // dotenv.config();

    const DBstring:string = 'mongodb://localhost:27017/short-url';

    mongoose.connect(DBstring).then(()=>{
        console.log('connected sucessfully!!')
    }).catch(err=>{
        console.log(err)
    });
}
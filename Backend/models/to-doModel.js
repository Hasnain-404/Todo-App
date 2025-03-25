import { Schema, model } from "mongoose";
import { USER } from "./userModel.js";

const toDoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true
    },
    heading:{
        type: String,
        required: true
    }
},{timestamps: true});

const ToDo = model("ToDo", toDoSchema)

export default ToDo
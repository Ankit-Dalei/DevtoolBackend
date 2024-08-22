import { usertableSchema } from "../Models/usertable.mjs";
import mongoose from "mongoose";

export const User=mongoose.model("user",usertableSchema);
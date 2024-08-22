import mongoose from "mongoose";
import { toolSchema } from "../Models/tooltable.mjs";

export const Tool = mongoose.model('Tool', toolSchema);
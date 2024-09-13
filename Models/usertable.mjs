import mongoose from "mongoose";

export const usertableSchema= new mongoose.Schema({
    profilePhoto:{
        type: String,
        contentType: String,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    Username:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        enum: ['Admin', 'User', 'Developer'],
    },
    },
    {timestamps:true}
)




// Static method to find a user by username
usertableSchema.statics.findByUsername =async function (Username) {
    const finduser=this.findOne({ Username });
    return finduser;
};


// Static method to find a user by email
usertableSchema.statics.findByEmail = async function (email) {
    const emailfind= await this.findOne({ email });
    return emailfind;
};

// Static method to compare passwords
usertableSchema.statics.comparePassword = async function (candidatePassword,AuthUser) {
    try {
        if (AuthUser.password==candidatePassword) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw error;
    }
};

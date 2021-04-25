import { argsToArgsConfig } from "graphql/type/definition";
import user from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {protectedResolver} from "../users.utils";


const resolverFn = async (_, args, {logedInUser}) => {
            
            
    let uglyPassword = null;
    if(args.password){
        uglyPassword = await bcrypt.hash(args.password, 10);
    }
    const updateUser = await user.updateOne(
        {_id: logedInUser._id},
        {
            $set: {firstname: args.firstname,
                lastname: args.lastname,
                username : args.username,
                email:args.email,
                ...(uglyPassword && {password: uglyPassword})
        }},
        {
            new:true,
            omitUndefined:true
        }
        );
        if(updateUser.nModified){
            return {
                ok: true
            }
        }else{
            return {
                ok: false,
                error: "Could not update profile"
            }
        }
    };

export default{
    Mutation: {
        editProfile: protectedResolver(resolverFn)
    },
};
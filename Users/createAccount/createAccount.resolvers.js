
import user from "../../models/user"
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


export default {
    Mutation: {
        createAccount: async (_,{firstname, lastname, username, email,rollno,
            mobileno,
            gender,
            dob,
            batch,
            year,
            idType, password}) => {
            
        try{
            const existingUser = await user.findOne(
                {
                    $or: [
                        {username},
                        {email}
                    ],
                }).limit(1);
                    if(existingUser){
                        throw new Error("This username/email is already taken.")
                    }
        
                        const uglyPassword = await bcrypt.hash(password, 10);
                        const userObj = new user({
                            firstname,
                            lastname,
                            username,
                            email,
                            rollno,
                            mobileno,
                            gender,
                            dob,
                            batch,
                            year,
                            idType,
                            password: uglyPassword
                        })
                        try{
                            const result = await userObj.save()
                            console.log(result);
                            return { ok: true }
                        }catch(err){
                        console.error(err)
                    }
        }catch(e){
            return {
                ok: false,
                error: "Cant create account.",
            }
        }
                
        },
    },

            
};

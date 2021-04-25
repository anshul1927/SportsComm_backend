
import user from "../../models/user"
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


export default {
    Mutation: {
        createAccount: async (_,{firstname, lastname, username, email, password}) => {
            
        try{
            const existingUser = await user.findOne(
                {
                    $or: [
                        {username},
                        {email}
                    ],
                }).limit(1);
                    console.log(existingUser);
                    if(existingUser){
                        throw new Error("This username/email is already taken.")
                    }
                        console.log(existingUser);
        
                        const uglyPassword = await bcrypt.hash(password, 10);
                        const userObj = new user({
                            firstname,
                            lastname,
                            username,
                            email,
                            password: uglyPassword
                        })
                        try{
                            const result = await userObj.save()
                            return { ...result._doc }
                        }catch(err){
                        console.error(err)
                    }
        }catch(e){
            return e;
        }           
                
        },
    },

            
};

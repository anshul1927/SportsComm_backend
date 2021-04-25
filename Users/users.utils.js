import jwt from "jsonwebtoken";
import user from "../models/user";


export const getUser = async(token) => {
    try{

        if(!token){
            return null;
        }
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
    const logedInUser = await user.findOne({_id:id});
    if(logedInUser){
        return logedInUser;
    }else{
        return null;
    }
    }catch{
        return null;
    }
}


export  function protectedResolver (ourResolver) {
    return function (root, args, context, info) {
      if (!context.loggedInUser) {
        const query = info.operation.operation === "query";
        if (query) {
          return null;
        } else {
          return {
            ok: false,
            error: "Please log in to perform this action.",
          };
        }
      }
      return ourResolver(root, args, context, info);
    };
  }
  
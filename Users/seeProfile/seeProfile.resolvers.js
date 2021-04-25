import user from "../../models/user";

export default {
    Query: {
        seeProfile: (_,{username}) =>
        user.findOne({
            username
        }),
    },    
}
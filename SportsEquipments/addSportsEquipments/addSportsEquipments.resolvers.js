import e from "express";
import SportsEquipments from "../../models/equipments";

export default {
    Mutation: {
        addSportsEquipment: async(_,{
            itemid,
            itemName,
            sports,
            categoryOfEquipment,
            quantity
        }) => {
            try{
                const existingEquipment = await SportsEquipments.findOne(
                        
                        {itemid},    
                    ).limit(1);


                    if(existingEquipment){
                           const updateEquipment = await SportsEquipments.updateOne(
                                {itemid},
                                {
                                    $set: {
                                        quantity: existingEquipment.quantity + quantity,
                                        available: existingEquipment.available + quantity,
                                    }
                                },
                                {
                                    new: true,
                                    omitUndefined: true
                                }
                           );
                           if(updateEquipment.nModified){
                               return {
                                   ok: true
                                }
                            }else{
                                   return {
                                       ok: false,
                                       error: "Could not add Sport Equipment"
                                   }
                               };
                    }
                    else{
                        const equipmenObj = new SportsEquipments({
                            itemid,
                            itemName,
                            sports,
                            categoryOfEquipment,
                            quantity,
                            available : quantity       
                        })
                        try{
                            const result = await equipmenObj.save();
                            console.log(result);
                            return {ok: true}
                        }catch(err){
                            console.log(err);
                        }
                    }
            }catch(e){
                return {
                    ok: false,
                    error: "Can't add Sports Equipments"
                }

            }
        }
    }
}
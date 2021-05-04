import mongoose from "mongoose"
const { Schema } = mongoose


const EquipmentsSchema = new Schema({
    
    itemid: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    sports: {
        type: String,
        required: true,
    },
    categoryOfEquipment: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    available: {
        type: Number,
        required: true,
        default: 0
    }
},
{ timestamps: true });


//UserSchema.path('username').index({unique: true})
const SportsEquipments = mongoose.model('SportsEquipments', EquipmentsSchema);

export default SportsEquipments;
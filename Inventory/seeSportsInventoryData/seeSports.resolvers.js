import Sports, { SportsEquipments } from "../../models/equipments";

export default {
  Query: {
    seeInventory: async () => {
      try {
        const output = await Sports.find({}).sort("category").populate().exec();

        const sportseuipmentsObj = new SportsEquipments();

        return output;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

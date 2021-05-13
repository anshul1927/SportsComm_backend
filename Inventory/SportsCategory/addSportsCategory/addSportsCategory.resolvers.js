import e from "express";
import Sports from "../../../models/equipments";

export default {
  Mutation: {
    addSportsCategory: async (_, { category }) => {
      try {
        console.log(Sports);
        const exisitingCategory = await Sports.findOne({ category });
        console.log(exisitingCategory);
        if (exisitingCategory) {
          return {
            ok: false,
            error: "Category already present please create another one",
          };
        } else {
          const catObj = new Sports({ category });

          try {
            const result = await catObj.save();
            console.log(result);
            return { ok: true };
          } catch (err) {
            console.log(error);
          }
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "Can't add Sports Category",
        };
      }
    },
  },
};

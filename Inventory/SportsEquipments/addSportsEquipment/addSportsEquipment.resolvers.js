import e from "express";
import Sports from "../../../models/equipments";
import SportsEquipments from "../../../models/equipments";
export default {
  Mutation: {
    addSportsItems: async (_, { name, quantity, category }) => {
      try {
        let categoryWithExisitngItem = await Sports.findOne(
          {
            items: {
              $elemMatch: {
                name: { $regex: `^${name}$`, $options: "i" },
              },
            },
          },
          { "items.$": 1 }
        ).lean();

        console.log(categoryWithExisitngItem);
        if (categoryWithExisitngItem) {
          const existingSportsItem = categoryWithExisitngItem.items[0];
          existingSportsItem.categoryId = categoryWithExisitngItem._id;
          existingSportsItem.quantity += Number(quantity);
          existingSportsItem.available += Number(quantity);

          const updatedCategory = await updateItemHelper(
            categoryWithExisitngItem._id,
            existingSportsItem
          );

          return {
            ok: true,
          };
        } else {
          console.log("category", category);
          let available = quantity;
          try {
            const saveFoodItem = await Sports.findOneAndUpdate(
              { category: category },
              { $addToSet: { items: { name, quantity, available } } },
              { new: true }
            );
            console.log(saveFoodItem);
            return { ok: true };
          } catch (err) {
            console.log(err);
          }
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "Can't add Sports Items",
        };
      }
    },
  },
};
function updateItemHelper(originalCategoryId, updateItem) {
  if (!updateItem.categoryId || updateItem.categoryId == originalCategoryId) {
    return Sports.findOneAndUpdate(
      { _id: originalCategoryId, "items._id": updateItem._id },
      { $set: { "items.$": updateItem } },
      { new: true }
    );
  }
}

const mongoose = require("mongoose");
// const slug = require('mongoose-slug-generator')
// const slug = require('mongoose-slug-updater');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    //   author: ObjectId,
    name: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String },
    price: { type: Number, required: true },
    quantity: {
      sizeS: { type: Number, required: true },
      sizeM: { type: Number, required: true },
      sizeL: { type: Number, required: true },
      sizeXL: { type: Number, required: true },
    },
    countInStock: { type: Number },
    rating: { type: Number },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number },
    age: { type: String, required: true },
    size: { type: String, required: true },
    // slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  }
);

// Add plugins
// mongoose.plugin(slug);
// UserSchema.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });
//{ overrideMethods: 'all' } là không hiển thị tất cả các database có deleted: true

//unique: true: chỉ tồn tại duy nhất 1 cái, tránh trùng slug khi đặt trùng name

const Prosuct = mongoose.model("ProductSchema", productSchema);
module.exports = Prosuct;

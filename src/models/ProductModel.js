const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator')
// const slug = require('mongoose-slug-updater');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        //   author: ObjectId,
        name: { type: String, required: true },
        image: { type: String, required: true},
        type: { type: String, required: true},
        price: { type: Number, required: true},
        countInStock: { type: Number, required: true},
        rating: { type: Number, required: true},
        description: { type: String},
        // slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
// mongoose.plugin(slug);
// UserSchema.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });
//{ overrideMethods: 'all' } là không hiển thị tất cả các database có deleted: true

//unique: true: chỉ tồn tại duy nhất 1 cái, tránh trùng slug khi đặt trùng name

const Prosuct = mongoose.model('ProductSchema', productSchema);
module.exports = Prosuct


// Require Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    name:String,
    head:String,
    tel:String,
    address:String,
    desc: String,
    // one department has many majors
    majors:[{type: Schema.Types.ObjectId, ref: 'Major'}]
});

// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('College', CollegeSchema );
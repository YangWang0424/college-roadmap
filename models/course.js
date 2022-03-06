// Require Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name:String,
    desc:String,
    major : { type: Schema.Types.ObjectId, ref: 'Major' },
    users:[{type: Schema.Types.ObjectId, ref: 'User'}],
    credit: Number
});

// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('Course', CourseSchema);
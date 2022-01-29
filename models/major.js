// Require Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
    name:String,
    head:String,
    tel:String,
    address:String,
    desc: String,
    // one course belongs to one department
    college : { type: Schema.Types.ObjectId, ref: 'College' },
    // one major has many courses
    courses:[{type: Schema.Types.ObjectId, ref: 'Course'}],
    users:[{type: Schema.Types.ObjectId, ref: 'User'}]

});

// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('Major', MajorSchema);
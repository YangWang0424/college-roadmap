// Require Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const UserSchema = new Schema(
        {
            name:  {type:  String, required:  true, trim:  true},
            email: {type:  String, required:  true, trim:  true, lowercase:  true},
            password: {type:  String, required:  true, minlength:  7, trim:  true,},
            major : { type: Schema.Types.ObjectId, ref: 'Major' },
            courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]

        },

        {
            // add updatedAt createAt fields
            timestamps: true
        }
    )
// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('User', UserSchema);
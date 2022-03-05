// Require Mongoose
const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const UserSchema = new Schema(
        {
            username:  {type:  String, trim:  true, index: { unique: true } },
            email: {type:  String,  trim:  true, lowercase:  true},
            major : { type: Schema.Types.ObjectId, ref: 'Major' },
            courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
        },
        {
            // add updatedAt createAt fields
            timestamps: true
        }
    )

UserSchema.plugin(passportLocalMongoose);

// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('User', UserSchema);
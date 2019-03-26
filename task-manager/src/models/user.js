const mongoose = require('mongoose')
const validator = require('validator')
const  bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})

// Sử dụng Schema.method.nameMethod : chỉ có instance model mới truy cập vào được
userSchema.methods.generateAuthToken = async function(){
    const user = this // Từ This ở đây chính là instance model mà nó truy cập tới
    const Token = jwt.sign({ _id : user._id.toString() },'thisisnewcourse')
    return Token
}

// Sử dụng Schema.statics.nameMethod : chỉ có model mới truy cập vào được
userSchema.statics.findByCredentials = async function( email , password){
        const user = await User.findOne({ email })
        if( !user ){
            throw new Error('Unable to email')
        }

        const isMatch = await bcrypt.compare( password , user.password)

        if(!isMatch){
            throw new Error('Unable to password')
        }
        return user
}

// Dùng Middleware pre để trước khi lưu user hoặc update user vào mongodb, ta cần hash password của user đó
userSchema.pre('save', async function(next){ // Ở đây sử dụng function chuẩn chứ ko phải arrow function vì ta cần liên kết với từ khóa This
    const user = this; // Từ khóa This sẽ tham chiếu đến đối tượng user chuẩn bị được lưu hoặc update
    if(user.isModified('password')){
        user.password = await bcrypt.hash( user.password ,  8)
    }
    next()
    // Nếu trong hàm pre này có từ khóa This, thì từ This này sẽ tham chiếu đến instance model
})
const User = mongoose.model('User', userSchema)

module.exports = User
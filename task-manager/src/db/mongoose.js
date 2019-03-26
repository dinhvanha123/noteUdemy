const mongoose = require('mongoose')

mongoose.connect('mongodb://dinhvanha:dinhvanha123@ds331135.mlab.com:31135/passportoath', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify : false
    // Sử dụng thuộc tính useFindAndModify : false để ẩn đi cảnh báo bởi Mongoose, default :  true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a postive number')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '   Andrew  ',
//     email: 'MYEMAIL@MEAD.IO   ',
//     password: 'phone098!'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: '  Eat lunch'
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })
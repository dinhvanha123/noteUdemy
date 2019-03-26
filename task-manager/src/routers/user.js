const express = require('express');
const Router = new express.Router();

const User = require('../models/user')

Router.post('/users', async (req, res) => {
    const user = new User(req.body)
    // Bên dưới sử dụng hàm async await 
    try {
        await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }


    // Cách dưới sử dụng Promise
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)


    // res.send(error)
    // Với dòng lệnh res.status(400).send(error), ta sẽ gửi về cho user HTTP status code là 400 nếu lỗi xuất hiện hoặc dữ liệu không hợp lệ để tạo mới
    //  Nếu chỉ res.send(error) thì dữ liệu không hợp lệ sẽ không được tạo mới, nhưng server vẫn gửi cho user HTTP status code là 200, nghĩa là Ok trong khi lỗi xuất hiện.
    // })
})

Router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const Token = await user.generateAuthToken()
        res.send({user,Token})
    } catch (error) {
        res.status(400).send({ "error" : "Cant Login" })
    }
})

Router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

Router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdate = ['name', 'age', 'password', 'email'];
    const isValidOperation = updates.every((update) => {
        return allowUpdate.includes(update)
    })
    const _id = req.params.id;
    const Option = {
        new: true, // new: bool - true to return the modified document rather than the original. defaults to false
        runValidators: true, // runValidators: if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
    }
    try {
        if (isValidOperation) {
            //   const user = await User.findByIdAndUpdate({ _id } , req.body, Option );
            // Trong trước đây, ta dùng findByIdAndUpdate method được vì lúc đó chưa cần dùng tới Middleware của Mongoose
            // Giờ đây, để ta tận dụng các tính năng nâng cao của Middleware trong mongoose, ta không cần dùng  findByIdAndUpdate method nữa, và ta sẽ viết lại code theo cách khác để Update User
            const user = await User.findById(req.params.id)
            updates.forEach((update) => {
                return user[update] = req.body[update]
            })
            await user.save()
            if (!user) {
                res.status(404).send('Not Found')
            }

            res.send(user)
        } else {
            res.status(404).send("Not match property")
        }

    } catch (error) {
        res.status(500).send(error);
    }
})

Router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send('Not found someone');
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = Router;
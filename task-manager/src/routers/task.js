const express = require('express')
const Router = new express.Router()

const Task = require('../models/task')


Router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body)
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error)
    }
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)

       // res.send(error)
       // Với dòng lệnh res.status(400).send(error), ta sẽ gửi về cho user HTTP status code là 400 nếu lỗi xuất hiện hoặc dữ liệu không hợp lệ để tạo mới
       //  Nếu chỉ res.send(error) thì dữ liệu không hợp lệ sẽ không được tạo mới, nhưng server vẫn gửi cho user HTTP status code là 200, nghĩa là Ok, trong khi lỗi xuất hiện.
    // })
})
Router.get('/tasks', async (req,res)=>{
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (error) {
        res.status(500).send(error) 
    }
})
Router.patch('/tasks/:id', async (req, res)=>{
// const _id  = req.params.id
const Updates = Object.keys(req.body);
const allowUpdate = ['description' , 'completed'];
const isValidUpdate = Updates.every((update)=>{
    return allowUpdate.includes(update)
})
if(!isValidUpdate){
    return res.status(400).send('Not match property')
}
try {

    // const Tasks = await Task.findByIdAndUpdate({_id}, req.body, {
    //     new : true,
    //     runValidators : true
    // })

    const Tasks = await Task.findById(req.params.id)
    Updates.forEach((update)=>Tasks[update] = req.body[update])
    await Tasks.save()
    if(!Tasks){
        return  res.status(404).send('Not Found')
    }
    res.send(Tasks)
} catch (error) {
    res.status(400).send(error)
}

})
Router.delete('/tasks/:id', async (req, res)=>{
try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if( !task ){
       return res.status(404).send('Not found task')
    }
    res.send(task)
} catch (error) {
    res.status(400).send(error)
}
})

module.exports = Router
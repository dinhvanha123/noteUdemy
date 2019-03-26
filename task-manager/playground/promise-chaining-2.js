const Task = require('../src/models/task')
require('../src/db/mongoose')

Task.findByIdAndDelete('5c930ecf0f8b8e2968378f2e').then((task)=>{
    console.log(task);
    return Task.countDocuments({ completed : false })
}).then((count)=>{
    console.log(count);
    
}).catch((error)=>{
    console.log(error);
})

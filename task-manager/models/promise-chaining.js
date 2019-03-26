const User = require('../src/models/user');
require('../src/db/mongoose')
User.findByIdAndUpdate('5c930941a4337b2e14f0ef0b',{ age : 1 }).then((user)=>{
    console.log(user);
    return User.countDocuments({ age : 1})
}).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})
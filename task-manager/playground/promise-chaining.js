const User = require('../src/models/user');
require('../src/db/mongoose')
// User.findByIdAndUpdate('5c930941a4337b2e14f0ef0b',{ age : 1 }).then((user)=>{
//     console.log(user);
//     return User.countDocuments({ age : 1})
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })
const UpdateAgeAndCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    return user ;
}
UpdateAgeAndCount('5c930941a4337b2e14f0ef0b',2).then((user)=>{
    console.log(user);
}).catch((error)=>{
    console.log(error);
})

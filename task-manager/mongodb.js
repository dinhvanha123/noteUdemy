const Mongodb = require('mongodb');
const MongoClient = Mongodb.MongoClient
const ObjectID = Mongodb.ObjectID
// Đối tượng _id của document trong Mongodb có size là 12, 4 size đầu là số giây từ 1/1/1970, ta có thể dùng method getTimestramp() để lấy về thời gian lúc mà tạo document này
const connectionURL = 'mongodb://dinhvanha:dinhvanha123@ds331135.mlab.com:31135/passportoath';
//const databaseName = 'task-manager' ;
const databaseName = 'passportoath';
const id = new ObjectID();
// console.log(id);
// console.log(id.valueOf());

// console.log(id.id);
// id property để hiện ra dữ liệu thô ban đầu (raw original) của object id

// console.log(id.id.length); // 12 byte
// console.log(id.toHexString().length); // 24 byte
// Lý do người ta không dùng chuỗi thay thế cho ObjectID là vì kích thước của chuỗi gấp đôi so với ObjectID
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('error', error);

    }
    const db = client.db(databaseName);

    db.collection('tasks').updateOne({ 
        _id : new ObjectID("5c906bc06022ad14548a6bcb")
    },{
        $set : {
            description : "Thang Loi"
        }
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
    // Sử dụng cấu trúc Promise

    // db.collection('tasks').findOne({ _id : new ObjectID ("5c90962e3ec0231ee4b1d67d") }, (error, task)=>{
    //     console.log(task);
        
    // })
    // db.collection('tasks').find({ state : false }).toArray((error,task)=>{
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(task); //printing array task
        
    // })
    // db.collection('tasks').insertMany([{
    //     description : 'Thanh Cong',
    //     state : false,
    // },{
    //     description : 'Co Gang Hon Nua',
    //     state : true
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unble to insert user');
    //     }
    //     console.log('result.ops', result.ops);
        //  console.log('result.connection',result.connection);
        //   The insert command returns an object with the following fields:
        //    result : Contains the result document from MongoDB
        //    ops :  Contains the documents inserted with added _id fields
        //    connection : Contains the connection used to perform the insert
    // });

})
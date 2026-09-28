const mongoose = require('mongoose')
const env = require('dotenv')
// dotenv.config() 


function connectionDB() {

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log('Database is connected')})
    .catch((error)=>{console.log('error in database', error.message)
        process.exit(1)
    })
}

module.exports = connectionDB 
const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db=>{
        console.log('Database connected')
        return db;
    }).catch(err=>{
        console.log('Database connection error');
    })

module.exports = conn;

//dharmi
//pass:admin123
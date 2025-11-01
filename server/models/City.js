const mongoose = require('mongoose')

const Schema = mongoose.Schema

const citySchema = new Schema(
    {
        citycode: {
            type: String,
            required: true,
            unique: true,
        },
        cityname: {
            type: String,
            required: true,
        },
        temperature:{
            type: Number,
            required: true,
        },
        status:{
            type: String,
            required: true,
        },
    }
)

module.exports = mongoose.model('City', citySchema)
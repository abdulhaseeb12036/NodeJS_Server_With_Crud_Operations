const mongoose=require('mongoose')


const Schema=new mongoose.Schema(
    {
        name: String,
        project: String,
        unit: String,
        unit_type: String,
        level: String,
        location: String,
        exposure: String,
        size: Number,
        bed_room: Number,
        bath_room: Number,
        parking: Boolean,
        locker: Boolean,
        balcony: Boolean,
    }
)


const Model=mongoose.model("Internship_data",Schema)

module.exports=Model


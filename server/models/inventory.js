const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema(
    {
        scissors:{
            type: Number,
            default: 0,
        },
        comb:{
            type: Number,
            default: 0,
        },
        cloth:{
            type: Number,
            default: 0,
        },
        shavingcream:{
            type: Number,
            default: 0,
        },
        powder:{
            type: Number,
            default: 0,
        },
        blade:{
            type: Number,
            default: 0,
        },
    }
)
const Inventory = mongoose.model('Inventory',inventorySchema);
module.exports = Inventory;
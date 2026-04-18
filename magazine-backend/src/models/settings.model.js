import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    siteTitle : {
        type: String,
    },
    siteDescription : {
        type: String,
    },
    siteEmail : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true});

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
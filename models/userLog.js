import mongoose from 'mongoose';

const { Schema } = mongoose;

const logSchema = new Schema({
    _id: Schema.Types.ObjectId,
    log: {
        type: [Schema.Types.ObjectId],
        ref: 'Exercise'
    }
});

const Log = mongoose.model('Log', logSchema);

export default Log;
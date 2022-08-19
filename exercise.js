import mongoose from 'mongoose';
import User from './models/user.js';
import Exercise from './models/userExercise.js';


export const createUser = async (name) => {
    const newUser = new User({
        username: name
    });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch(err) {
        console.log(err);
    }
}

export const getAllUsers = async () => {
    try {
        const allUsers = await User.find({});
        /**
         *  This returns the object literals with logs NOT POPULATED
        **/
        return allUsers;
    } catch(err) {
        console.log(err);
    }
}

const updateUser = async (user, update) => {
    let options = {
        new: true,
        upsert: true
    }

    try {
        const userUpdate = await User.findByIdAndUpdate(user, {
            $set: {
                description: update.desc,
                duration: update.dur,
                date: update.date,
            },
            $push: {
                logs: mongoose.mongo.ObjectId(update.log)
            }
        }, options).select('-logs -__v');
        return userUpdate;
    } catch(err) {
        console.log(err);
    }
}

export const createExercise = async (id, desc, dur, date) => {

    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        user: id,
        desc: desc,
        dur: dur,
        date: date
    });

    try {
        const savedExercise = await newExercise.save();
        const userExercise = await updateUser(savedExercise.user._id, {
                desc: savedExercise.desc,
                dur: savedExercise.dur,
                date: savedExercise.date,
                log: savedExercise._id
            });
        return userExercise;
    } catch(err) {
        console.log(err);
    }
}

export const getUserLogs = async (usernameID) => {
    try {
        const countDocs = await Exercise.countDocuments({user: usernameID});
        const userLogs = await User.findById(usernameID)
        .select('_id username logs')
        .populate('logs', '-_id -user -__v');
        // need to put count in the object and change logs keys names
        return userLogs;
    } catch(err) {
        console.log(err)
    }
}
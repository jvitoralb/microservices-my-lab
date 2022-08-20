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
        const allUsers = await User.find({})
        .select('_id username');
        return allUsers;
    } catch(err) {
        console.log(err);
    }
}

const updateUser = async (user, updateSet, updatePush) => {
    let options = {
        new: true,
        upsert: true
    }

    try {
        const userUpdate = await User.findByIdAndUpdate(user, {
            $set: {
                ...updateSet
            },
            $push: {
                log: mongoose.mongo.ObjectId(updatePush.log)
            }
        }, options).select('-log -__v');
        return userUpdate;
    } catch(err) {
        console.log(err);
    }
}

export const createExercise = async (id, desc, dur, reqDate) => {
    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        user: id,
        description: desc,
        duration: dur,
        date: reqDate
    });
// Probably not gonna save exercise in User model so I can remove thi reqDate thing
    try {
        const savedExercise = await newExercise.save();
        const { _id, username, description, duration, date } = await updateUser(savedExercise.user._id, {
                description: desc,
                duration: dur,
                date: reqDate,
            }, {log: savedExercise._id});
        const [year, month, day] = date.split('-');

        return {
            _id,
            username,
            description,
            duration,
            date: new Date(year, month - 1, day ).toDateString()
        };
    } catch(err) {
        console.log(err);
    }
}

export const getUserLogs = async (userID, limit, from, to) => {
    // then go back to req and make something in case there's only from or to
    const matchConfig = {
        date: {
            $gt: from,
            $lt: to
        }
    }
    try {
        const countDocs = await Exercise.countDocuments({user: userID});
        const { id, username, log } = await User.findById(userID)
        .populate({
            path:'log',
            select: '-_id -user -__v',
            match: from && to ? matchConfig : null,
            perDocumentLimit: limit || null
        });
        /**
         *  Need to fix the log dates 
        **/
        return {
            username,
            count: countDocs,
            id,
            log
        };
    } catch(err) {
        console.log(err)
    }
}
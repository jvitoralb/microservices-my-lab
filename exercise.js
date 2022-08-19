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

export const createExercise = async (id, desc, dur, date) => {
    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        user: id,
        description: desc,
        duration: dur,
        date: date
    });

    try {
        const savedExercise = await newExercise.save();
        const userExercise = await updateUser(savedExercise.user._id, {
                description: desc,
                duration: dur,
                date: date,
            }, {log: savedExercise._id});
        return userExercise;
    } catch(err) {
        console.log(err);
    }
}

export const getUserLogs = async (userID, limit, from, to) => {
    console.log(userID, from, to)
    try {
        const countDocs = await Exercise.countDocuments({user: userID});
        const { id, username, log } = await User.findById(userID)
        .populate({
            path:'log',
            select: '-_id -user -__v',
            // match: (log) => {
            //     if (!from || !to) return null;
            //     if (new Date(log.date).getTime() > new Date(from).getTime() &&
            //         new Date(log.date).getTime() < new Date(to).getTime()) {
            //             return { date: log.date }
            //     }
            //     return null;
            // },
            perDocumentLimit: limit || null
        });

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
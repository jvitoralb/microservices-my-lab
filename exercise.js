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
        return allUsers;
    } catch(err) {
        console.log(err);
    }
}

export const createExercise = async (id, desc, dur, date) => {

    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        username: id,
        description: desc,
        duration: dur,
        date: date
    });
/**
 *  Still need to test if you really need to set an id, or  can just populate it
**/
    try {
        const savedExercise = await newExercise.save();
        await savedExercise.populate('username');
        return savedExercise;
    } catch(err) {
        console.log(err);
    }
}

export const getUserLogs = async (usernameID) => {
    const dataFound = await Exercise.find({username: usernameID});
    let logs = dataFound.map(log => ({
            description: log.description,
            duration: log.duration,
            date: log.date
        })
    );
    let user = await dataFound[0].populate('username');
    return {
        _id: user.username._id,
        username: user.username.username,
        count: dataFound.length,
        log: logs,
    }
}
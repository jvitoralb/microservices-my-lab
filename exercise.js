import mongoose from 'mongoose';
import User from './models/user.js';
import Exercise from './models/userExercise.js';


export const convertDate = (date) => {
    const [year, month, day] = date.split('-');
    let dateString = new Date(year, month - 1, day );
    return dateString.toDateString();
}

export const createUser = async (name, res) => {
    const newUser = new User({
        username: name
    });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch(err) {
        console.log(err);
        res.status(404).send(err.message)
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

export const userExists = async (userID, res, next) => {
    try {
        const result = await User.exists({ _id: userID});
        if (result === null) throw new Error('UserID does not exists');
        next();
    } catch (err) {
        console.log(err);
        res.status(404).send(err.message);
    }
}

const updateUser = async (user, update) => {
    let options = {
        new: true
    }

    try {
        const userUpdate = await User.findByIdAndUpdate(user, {
            $set: {
                ...update.set
            },
            $push: {
                log: mongoose.mongo.ObjectId(update.push.log)
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
        const { _id, username, description, duration } = await updateUser(savedExercise.user._id, {
            set: {
                description: desc,
                duration: dur
            },
            push: { log: savedExercise._id }
        });

        return {
            _id,
            username,
            description,
            duration,
            date: convertDate(date)
        };
    } catch(err) {
        console.log(err);
    }
}

export const getUserLogs = async (userID, limit, from, to) => {
    // from and to just works if both exist
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
        return {
            username,
            count: countDocs,
            id,
            log: log.map(obj => ({
                description: obj.description,
                duration: obj.duration,
                date: convertDate(obj.date)
            }))
        };
    } catch(err) {
        console.log(err)
    }
}

const tracker = {
    createUser,
    getAllUsers,
    userExists,
    updateUser,
    createExercise,
    getUserLogs
}

export default tracker;
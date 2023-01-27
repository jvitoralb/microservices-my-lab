import mongoose from 'mongoose';
import CustomError from '../../errors/custom.js';
import { User, Exercise } from './trackerModel.js';
import convertDate from '../../exerciseUtils.js';


const createNewUser = async (newUsername) => {
    const newUser = new User({
        username: newUsername.trim()
    });

    const { username, _id } = await newUser.save();

    return {
        username,
        _id
    };
};

const allUsers = async () => {
    const allUsersData = await User.find({})
    .select('_id username');

    if (!allUsersData.length) {
        throw new CustomError('No user found!', 200)
    }

    return allUsersData;
};

const validUser = async (userID) => {
    const result = await User.exists({ _id: userID });

    if (!result) {
        throw new CustomError(`No user with ID: ${id}`, 400);
    }

    return result;
};

const updateUser = async (user, update) => {
    let options = {
        new: true
    }

    const userUpdate = await User.findByIdAndUpdate(user, {
        $set: {
            ...update.set
        },
        $push: {
            log: mongoose.mongo.ObjectId(update.push.log)
        }
    }, options).select('-log -__v');

    return userUpdate;
}

const addExercise = async (exerciseInfo) => {
    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        user: exerciseInfo.userID,
        description: exerciseInfo.description,
        duration: exerciseInfo.duration,
        date: exerciseInfo.date
    });

    const savedExercise = await newExercise.save();

    const { _id, username, description, duration } = await updateUser(savedExercise.user._id, {
            set: {
                description: exerciseInfo.description,
                duration: exerciseInfo.duration
            },
            push: { log: savedExercise._id }
        }
    );

    return {
        _id,
        username,
        description,
        duration,
        date: convertDate(body.date)
    };
};

const userLogs = async (userID, filters) => {
    const matchConfig = {
        date: {
            $gte: filters.from,
            $lte: filters.to
        }
    }

    const countDocs = await Exercise.countDocuments({ user: userID });
    const { id, username, log } = await User.findById(userID)
    .populate({
        path:'log',
        select: '-_id -user -__v',
        match: filters.from && filters.to ? matchConfig : null,
        perDocumentLimit: filters.limit || null
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
};

const services = {
    createNewUser,
    allUsers,
    validUser,
    addExercise,
    userLogs
}

export default services;
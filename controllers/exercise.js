import mongoose from 'mongoose';
import User from '../models/User.js';
import Exercise from '../models/userExercise.js';
import { convertDate } from '../utils/exerciseUtils.js';


export const createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({
        username: username
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            username: savedUser.username,
            _id: savedUser._id
        });
    } catch(err) {
        console.log(err);
        res.status(404).send(err.message);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        .select('_id username');
        res.status(200).send(allUsers);
    } catch(err) {
        console.log(err);
    }
}

export const userExists = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await User.exists({ _id: id});
        if (result === null) throw new Error('UserID does not exists');
        return next();
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

export const createExercise = async (req, res) => {
    const { params, body } = req;
    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        user: params.id,
        description: body.description,
        duration: body.duration,
        date: body.date
    });

    try {
        const savedExercise = await newExercise.save();
        const { _id, username, description, duration } = await updateUser(savedExercise.user._id, {
                set: {
                    description: body.description,
                    duration: body.duration
                },
                push: { log: savedExercise._id }
            }
        );

        res.status(201).json({
            _id,
            username,
            description,
            duration,
            date: convertDate(body.date)
        });
    } catch(err) {
        console.log(err);
    }
}

export const getUserLogs = async (req, res) => {
    // from and to just works if both exist
    const { params, query } = req;
    const matchConfig = {
        date: {
            $gte: query.from,
            $lte: query.to
        }
    }
    try {
        const countDocs = await Exercise.countDocuments({user: params.id});
        const { id, username, log } = await User.findById(params.id)
        .populate({
            path:'log',
            select: '-_id -user -__v',
            match: query.from && query.to ? matchConfig : null,
            perDocumentLimit: query.limit || null
        });

        res.status(200).json({
            username,
            count: countDocs,
            id,
            log: log.map(obj => ({
                description: obj.description,
                duration: obj.duration,
                date: convertDate(obj.date)
            }))
        });
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
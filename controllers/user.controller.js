import User from '../models/user.model.js';

export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        })
    } catch (error) {
        next(error);
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user,
        })
    } catch (error) {
        next(error);
    }
}

export const putUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,  
        {
            returnDocument: 'after',
            runValidators: true 
        }
    )

    res.status(200).json({
        success: true,
        message: 'User Info Updated',
        data: updateUser
    })
    } catch (error) {
        next(error)   
    }
}

export const delUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id)

        res.status(201).json({
            success: true,
            message: 'Your Account was removed',
            data: deletedUser
        })
    } catch (error) {
        next(error)
    }
}
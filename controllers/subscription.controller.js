import Subscription from '../models/subscription.model.js';
import {workflowClient} from '../config/upstash.js';
import {SERVER_URL} from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0
        })

        res.status(201).json({success: true, data: {
            subscription, workflowRunId
        }, });
    } catch (error) {
        next(error); 
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id != req.params.id){
            const error = new Error('You are not the Owner of this Account');
            error.statusCode = 403;
            throw error;
        }
    const subscriptions = await Subscription.find({user: req.params.id});

    res.status(200).json({success: true, data: subscriptions});
    } catch (error) {
        next(error);
    }
} 

export const getAllSubscriptions = async(req, res, next) => {
    try {
        const subscriptions = await Subscription.find()
        res.status(200).json({success: true, data:subscriptions})
    } catch (error) {
        next(error)
    }
}

export const getSubscriptionById = async(req, res, next) => {
    try {
        const subscriptionId = await Subscription.findById(req.params.id);
        if (!subscriptionId) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }
        res.status(200).json({success: true, data: subscriptionId});
    } catch (error) {
        next(error)
    }
}

export const putSubscriptionById = async (req, res, next) => {
try {
    const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        if (subscription.user.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'You are not the Owner of this Subscription'
            })
        }
        
    const updateSubscription = await Subscription.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: 'after',
            runValidators: true 
        }
    )
    res.status(200).json({
        success: true, 
        data: updateSubscription,
        message: 'Subscription Updated Succesffully',
    })
} catch (error) {
    next(error)
}
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

         if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        if (subscription.user.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'You are not the Owner of this Subscription'
            })
        }
        

        const deletedSubscription = await Subscription.findByIdAndDelete(
            req.params.id,
        )
        res.status(200).json({
            success: true,
            data: deletedSubscription,
            message: 'Subscription Deleted'
        })
    } catch (error) {
        next(error)   
    }
}

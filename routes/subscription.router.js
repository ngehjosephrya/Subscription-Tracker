import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, deleteSubscription, getAllSubscriptions, getSubscriptionById, getUserSubscriptions, putSubscriptionById } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions);

subscriptionRouter.get('/:id', getSubscriptionById);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, putSubscriptionById);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/users/:id', authorize, getUserSubscriptions);

// subscriptionRouter.put('/:id/cancel', (req, res) => res.send('Cancel subscription'));

// subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send('Get upcoming renewals'));

export default subscriptionRouter;
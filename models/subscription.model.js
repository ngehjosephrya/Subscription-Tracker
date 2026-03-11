import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: 0,

    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['entertainment', 'utilities', 'software', 'education', 'health', 'other'],
        required: [true, 'Subscription category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'cancelled'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date cannot be in the future',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator:  function(value) {
                return value >= this.startDate;
            },
            message: 'Renewal date cannot be in the past',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'Subscription must be associated with a user'],
    },
},{ timestamps: true });

subscriptionSchema.pre('save', function(){
    if (!this.renewalDate) {
        const renewalFrequency = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalFrequency[this.frequency]);
    }
 //LOGIC TO CHECK IF SUBSCRIPTION IS EXPIRED to be checked
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
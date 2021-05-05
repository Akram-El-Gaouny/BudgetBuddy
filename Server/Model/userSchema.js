import mongoose from 'mongoose';

const logSchema = mongoose.Schema(
    {
        Provider: String,
        Description: String,
        Amount: Number,
        isSpending: Boolean,
        Category: String
    }
)

const budgetSchema = mongoose.Schema(
    {
        budgetName: String,
        budgetDescription: String,
        budgetedAmount: Number,
        spendingAmount: Number,
        pinned: Boolean,
        logs : [logSchema]
    }
)

const userSchema = mongoose.Schema({
    userId: Number,
    budgets: [budgetSchema]
});




const UserSchema = mongoose.model('data_user', userSchema);



export default UserSchema;
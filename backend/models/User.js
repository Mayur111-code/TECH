const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function() { return !this.googleId; }, select: false },
    googleId: { type: String, unique: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function () {
   
    if (!this.isModified('password') || !this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.matchPassword = async function (enteredPassword) {
    
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
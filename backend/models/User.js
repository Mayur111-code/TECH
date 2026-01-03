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
    // Jar password badalla nasel (e.g. Google login), tar hash karu nako
    if (!this.isModified('password') || !this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 2. Login kartaana password check karne (He missing hota)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // enteredPassword (jo user ne takla) ani this.password (DB madhla hashed) compare karne
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
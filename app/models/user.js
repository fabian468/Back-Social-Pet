const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    country: String,
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    lastConnectionDate: Date,
    image: {
      type: String,
      default: ''
    },

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    friendRequestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    friendRequestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    friendBlackList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

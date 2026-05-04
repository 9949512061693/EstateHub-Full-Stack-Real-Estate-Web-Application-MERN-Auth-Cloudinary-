const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide Username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide Email "],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
    },
    avatar: {
      type: String,
      default:
        "https://up.yimg.com/ib/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&rs=1&c=1&qlt=95&w=105&h=105",
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;

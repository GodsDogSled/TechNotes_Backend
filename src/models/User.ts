import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  roles: [{
    type: String,
    default: "Employee"
  }],
  active: {
    type: Boolean,
    default: "true"
  }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
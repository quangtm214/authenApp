const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

class authService {
  static signup = async (user) => {
    console.log("user", user);
    const existingUser = await User.findOne({
      username: user.username,
    });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return "Username already in use";
    }
    user.password = await bcryptjs.hash(user.password, 10);
    const newUser = new User(user);
    const NewUser = await newUser.save();
    return NewUser;
  };

  static login = async (user) => {
    const existingUser = await User.findOne({
      username: user.username,
    });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      return "Login failed";
    }
    const truePassword = await bcryptjs.compare(
      user.password,
      existingUser.password
    );
    console.log("user.password", user.password);
    console.log("truePassword", truePassword);
    if (truePassword === false) {
      return "Login failed";
    }

    const token = await jwt.sign(
      { id: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    existingUser.password = undefined;
    return { token, existingUser };
  };

  static async protect(token) {
    if (!token) {
      return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findOne({ _id: decoded.id });
    if (!currentUser) {
      return "User not found";
    }
    const ifChangePass = await this.changePasswordAfter(
      decoded.iat,
      currentUser._id
    );
    console.log("ifChangePass", ifChangePass);
    if (ifChangePass) {
      return "User has changed password. Please login again";
    }
    return currentUser;
  }

  static async getUserById(memberID) {
    return await User.findOne({ _id: memberID });
  }
  static async ChangePassword(user) {
    const existingUser = await User.findOne({
      _id: user.id,
    });
    if (!existingUser) {
      return "User not found";
    }

    const truePassword = await bcryptjs.compare(
      user.oldPassword,
      existingUser.password
    );
    console.log("truePassword", truePassword);
    if (!truePassword) {
      return "Old password is incorrect";
    }

    const newPasswordHash = await bcryptjs.hash(user.newPassword, 10);
    const passwordChangeAt = Date.now() - 5000;
    console.log("passwordChangeAt", passwordChangeAt);
    const memberChange = await User.findByIdAndUpdate(
      existingUser._id,
      { password: newPasswordHash, passwordChangeAt: passwordChangeAt },
      { new: true }
    );
    console.log("memberChange", memberChange);
    if (!memberChange) {
      return "Failed to change password";
    }

    const token = jwt.sign(
      { id: memberChange._id, isAdmin: memberChange.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    existingUser.password = undefined;
    return { token, memberChange };
  }
  static async changePasswordAfter(JWTTimestamp, memberId) {
    const user = await User.findById({ _id: memberId });
    if (user) {
      if (user.passwordChangeAt) {
        const changedTimestamp = Math.floor(
          user.passwordChangeAt.getTime() / 1000
        );
        return JWTTimestamp < changedTimestamp;
      }
    }
    return false;
  }
}
module.exports = authService;

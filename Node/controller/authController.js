const { token } = require("morgan");
const authService = require("../service/authService");
const passport = require("passport");

class authController {
  async signup(req, res, next) {
    try {
      const result = await authService.signup(req.body);
      if (result === "Username already in use") {
        return res.status(401).json({
          status: "fail",
          data: {
            message: result,
          },
        });
      }
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const member = req.body;
      console.log("member", member);
      const result = await authService.login(member);
      if (result === "Login failed") {
        res.status(401).json({
          status: "fail ",
          data: {
            message: "Username or password is incorrect",
          },
        });
      }
      res.status(201).json({
        status: "success",
        data: {
          token: result.token,
          member: result.existingUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async protect(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log("token", token);

    if (!token) {
      return res.status(401).json({});
    }
    const result = await authService.protect(token);
    if (result === "User not found") {
      return res
        .status(401)
        .json({ status: "fail", data: { message: "User not found" } });
    }
    if (result === "User has changed password. Please login again") {
      return res.status(401).json({
        status: "fail",
        data: { message: "User has changed password. Please login again" },
      });
    }
    req.user = result;
    next();
  }
  // async restricAdmin(req, res, next) {
  //   if (req.member.isAdmin === false) {
  //     // return res.render("forbidden", {
  //     //   title: "403",
  //     //   message: "You do not have permission to perform this action",
  //     // });
  //   }
  //   next();
  // }
  // async logout(req, res, next) {

  //   res.cookie("jwt", "", {
  //     expires: new Date(0),
  //     httpOnly: true,
  //   });
  //   req.session.destroy((err) => {
  //     if (err) {
  //       console.log(
  //         "Error : Failed to destroy the session during logout.",
  //         err
  //       );
  //     }
  //   });
  //   res.redirect("/");
  // }

  async personal(req, res) {
    const user = await authService.getUserById(req.user._id);
    user.password = undefined;
    res.status(200).json({ status: "success", data: user });
  }
}
module.exports = new authController();

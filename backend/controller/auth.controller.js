import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Recipe from "../model/recipe.model.js";
import Comment from "../model/comment.model.js";

export const signupController = async (req, res) => {
  try {
    const { fullname, email, gender, password, confirmPassword, profilePic } =
      req.body;
    if (!fullname || !email || !gender || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fiels are required!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords are not matched." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password length should be atleast 6." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exist." });
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Generate profilePic
    const username = fullname.trim();
    const boyProfilePic = `https://avatarapi.runflare.run/public/boy?usearname=[${username}]`;
    const girlProfilePic = `https://avatarapi.runflare.run/public/girl?usearname=[${username}]`;
    const generalProfilePic = `https://avatarapi.runflare.run/public?usearname=[${username}]`;

    const profilePicture =
      gender === "male"
        ? boyProfilePic
        : gender === "female"
          ? girlProfilePic
          : generalProfilePic;

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      gender,
      profilePic: profilePicture,
    });
    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);
      return res.status(201).json({
        _id: newUser._id,
        fullname,
        email,
        gender,
        profilePic: profilePicture,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in signupController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPassword) {
      return res.status(400).json({ error: "Invalid username or password!" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in loginController ", error.message);
    res.status(500).json({ error: "Internal server Error." });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log("Error in logoutController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const blogIds = await Recipe.distinct("_id", { author: userId }); //Store the recipes id of the user
    await Promise.all([
      //Delete this user's comment
      Comment.deleteMany({
        $or: [{ blog: { $in: blogIds } }, { user: userId }],
      }),
      //Delete this user's recipes
      Recipe.deleteMany({ author: userId }),
      //Delete this user's account
      User.findByIdAndDelete(userId),
    ]);

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    return res
      .status(200)
      .json({ message: "Your account deleted successfully." });
  } catch (error) {
    console.log("Error in deleteAccountController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};

export const getUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getUserController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};

export const updateAccountController = async (req, res) => {
  try {
    const { fullname, password, confirmPassword } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    let updateData = {};
    //update password
    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password length should be atleast 6." });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords should matched." });
      }
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    if (fullname !== undefined && fullname.trim() !== "")
      updateData.fullname = fullname;

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided to update." });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    return res
      .status(200)
      .json({ updateUser, message: "Your account updated successfully." });
  } catch (error) {
    console.log("Error in updateAccountController ", error.message);
    return res.status(500).json({ error: "Internal server Error." });
  }
};

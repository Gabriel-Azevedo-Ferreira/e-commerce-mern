import User from "../models/userModel";
import asyncHandler from "./asyncHandler";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
    } catch (error) {}
  } else {
    res.status(401);
    throw new Error("No Token, not authorized");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("No Token, no admin authorized");
  }
};

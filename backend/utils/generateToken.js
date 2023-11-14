import jwt from "jsonwebtoken";
export default (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 3600000,
      })
}
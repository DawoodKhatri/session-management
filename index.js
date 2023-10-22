const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/index.html"));
});

app.get("/login", async (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/login.html"));
});

app.post("/login", async (req, res) => {
  var date = new Date();
  date.setTime(date.getTime() + 30 * 1000);
  return res
    .status(200)
    .cookie("username", req.body.username, { expires: date })
    .redirect("/");
});

app.post("/logout", async (req, res) => {
  return res.status(200).clearCookie("username").end();
});

app.get("/auth", async (req, res) => {
  const cookie = req.headers.cookie?.split(";")[0];
  if (cookie?.includes("username")) {
    return res
      .status(200)
      .json({ success: true, username: decodeURI(cookie.split("=")[1]) });
  } else {
    return res.status(200).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log(`Server Started on port 3000`);
});

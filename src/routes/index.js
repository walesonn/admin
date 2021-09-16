const SocketIOClient = require("socket.io-client");
const port = require("../../index").PORT;

module.exports = (app) => {
  app.get("/", (req, res) => {
    const socket = SocketIOClient.io(
      `https://guarded-eyrie-22523.herokuapp.com:${port}`
    );
    socket.emit("auth");
    socket.on("auth", (auth) => {
      return res.render("index", { auth: auth });
    });

    return res.status("404");
  });
};

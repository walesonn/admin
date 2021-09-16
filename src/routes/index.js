const SocketIOClient = require("socket.io-client");

module.exports = (app, port) => {
  app.get("/", (req, res) => {
    console.log(port);
    const socket = SocketIOClient.io(
      `https://guarded-eyrie-22523.herokuapp.com:${port}`,
      { transports: ["websocket", "polling"] }
    );
    socket.emit("auth");
    socket.on("auth", (auth) => {
      return res.render("index", { auth: auth });
    });

    return res.status("404");
  });
};

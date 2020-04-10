//CREATE A SERVER
const app = require("express")();
const http = require("http");
const server = http.createServer(app);

//DB SETUP
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/chatapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connect to db"))
    .catch((err) => console.log("Error connect to db"));
mongoose.Promise = global.Promise;

//SOCKET SETUP
const socketio = require("socket.io");
const io = socketio(server);
io.on("connection", (socket) => {
    require("./socket/index")(io, socket);
});

//LISTEN TO REQ
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("Listening to port " + PORT);
});

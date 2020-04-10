const UserModel = require("../models/UserModel");

module.exports = (io, socket) => {
    console.log("-----");
    console.log("user join");
    socket.on("join", async ({ name, room }, callback) => {
        try {
            console.log("room", room);
            user = await UserModel.create({ name, room });

            socket.emit("user created", { ...user._doc });

            socket.emit("message", {
                user: "admin",
                text: `${user.name}, welcome to the room ${user.room}`,
            });

            socket.broadcast.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has joined`,
            });

            socket.join(user.room);

            const usersInRoom = await UserModel.find({ room: user.room });
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: usersInRoom,
            });
        } catch (err) {
            callback(err);
        }
    });

    socket.on("sendMessage", async ({ message, user }) => {
        console.log("hello");
        io.to(user.room).emit("message", {
            user: user.name,
            text: message,
        });
    });

    socket.on("close", async (user, errorHandler) => {
        try {
            await UserModel.findByIdAndDelete(user._id).exec();
            socket.disconnect();
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has left`,
            });
            const usersInRoom = await UserModel.find({ room: user.room });
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: usersInRoom,
            });
        } catch (err) {
            errorHandler(err);
        }
    });

    socket.on("disconnect", () => {
        console.log("user has left");
    });
};

import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "../stylesheets/Chat.css";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";

let socket;

function Chat(props) {
    const [user, setUser] = useState({ id: "", name: "", room: "" });
    const userRef = useRef({ id: "", name: "", room: "" });
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        const query = queryString.parse(props.location.search);

        socket = io(ENDPOINT);

        socket.emit("join", { name: query.name, room: query.room }, (err) => {
            console.log(err);
        });

        socket.on("user created", (user) => {
            setUser(user);
        });

        socket.on("message", (message) => {
            console.log("receive message");
            setMessages((prevState) => {
                return [...prevState, message];
            });
        });
    }, [props.location.search]);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
        return () => {
            socket.emit("close", { ...userRef.current }, (err) => {
                console.log(err);
            });
        };
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit("sendMessage", { message, user });
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={user.room} />
                <Messages messages={messages} name={user.name} />
                <Input
                    message={message}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default Chat;

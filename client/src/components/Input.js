import React from "react";

import "../stylesheets/Input.css";

const Input = ({ handleChange, handleSubmit, message }) => (
    <form className="form" onSubmit={handleSubmit}>
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleChange}
        />
        <button className="sendButton">Send</button>
    </form>
);

export default Input;

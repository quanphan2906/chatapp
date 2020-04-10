import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/" component={Join} />
                <Route path="/chat" component={Chat} />
            </BrowserRouter>
        </div>
    );
}

export default App;

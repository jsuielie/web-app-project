import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from "./components/Board";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/board/:id" element={<Board />} />
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
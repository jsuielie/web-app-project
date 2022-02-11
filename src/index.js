import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCardForm from "./components/AddCardForm";
import Board from "./components/Board";
import Layout from "./components/layout";
import "./styles.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/board/:id" element={<Board />} />
                    <Route path="/board/:id/create" element={<AddCardForm />} />
                </Route>
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
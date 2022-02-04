import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgs: []
        }
        this.fetchBoard = this.fetchBoard.bind(this);
    }

    componentDidMount() {
        this.fetchBoard();
    }

    fetchBoard() {
        urlString = "http://localhost:5000/get-board/1";
        fetch(urlString, {method: "GET"})
            .then(response => response.json())
            .then(data =>{
                console.log(data);
                this.setState(data);
            })
    }

    render() {
        return (
            <div>
                {this.state.msgs.map((msg, index) => {<div key={index}>{msg}</div>})}
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById("root"));
import React from "react";
import ReactDOM from "react-dom";

class SingleCardContent extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.msg}
                </div>
            </div>
        )
    }
}

class Board extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.msgs.map( (msg, index) => <SingleCardContent key={index} msg={msg}/>)}
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BoardContent: []
        }
        this.fetchBoard = this.fetchBoard.bind(this);
    }

    fetchBoard() {
        let urlString = "http://localhost:5000/get-board/1";
        fetch(urlString, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log("This is front-end", data);
                this.setState(data);
            })
    }

    componentDidMount() {
        this.fetchBoard();
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Board msgs={this.state.BoardContent} />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("root"));
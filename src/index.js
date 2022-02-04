import React from "react";
import ReactDOM from "react-dom";

class SingleCardContent extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {"This is a card."}
                    {this.props.msgs}
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
                    {"This is a board."}
                    {this.props.msgs.map( (msg, index) => <SingleCardContent msg={msg}/>)}
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
                console.log(data);
                this.setState(data);
            })
    }

    componentDidMount() {
        this.fetchBoard();
    }

    render() {
        return (
            <div>
                <Board msgs={this.state.BoardContent} />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("root"));
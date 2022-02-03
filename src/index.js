import React from "react";
import ReactDOM from "react-dom";

class SingleCard extends React.Component {
    render() {
        return (
            <li>
                <pre>
                    {this.props.cardContent}
                </pre>
            </li>
        );
    }
}

class MultipleCards extends React.Component {
    render() {
        return (
            <div>
                <div>
                {this.props.msgs.map((msg, index) => <SingleCard key={index} cardContent={msg}></SingleCard>)}
                </div>
            </div>
        )
    }
}

class searchBoard extends React.Component {
    
    getBoard(event) {
        event.preventDefault();
        fetch("http://localhost:5000/board", {
        })
    }
    
    render() {
        return(
          <form onSubmit={}>
              <label>Board Title:</label>
              <textarea></textarea>
              <button type="submit">Search</button>
          </form>  
        );
    }
}

/*
function Board() {
    const [msgsOnBoard, setMsgsOnBoard] = useState(null);




    return (
    );
}


class App extends React.Component {

    queryBoardIDByTitle(title) {

        fetch(`http://localhost:5000/Board-store`)
            .then(res => res.json())
            .

    }

    render() {
        retrun();
    };
}
*/

ReactDOM.render(<App />, document.getElementById("root"));
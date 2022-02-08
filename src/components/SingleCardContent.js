import React from "react";

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

export default SingleCardContent;
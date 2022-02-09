import React from "react";

class SingleCard extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.cardData.Msgs}
                    {this.props.cardData.CreateTime}
                    {this.props.cardData.SenderFirstName}
                    {this.props.cardData.SenderLastName}
                    {this.props.cardData.ImageURL}
                </div>
            </div>
        )
    }
}

export default SingleCard;
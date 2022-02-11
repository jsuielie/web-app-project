import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
/*
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
*/

export default function SingleCard(props) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.cardData.SenderFirstName}
                    {props.cardData.SenderLastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.cardData.CreateTime}
                </Typography>
                <Typography variant="body2">
                    {props.cardData.Msgs}
                </Typography>
            </CardContent>
        </Card>
    );
}
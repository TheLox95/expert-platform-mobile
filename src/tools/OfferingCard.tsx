import React from "react";
import moment from 'moment';
import { Card, CardItem, Left, Thumbnail, Text, Body, Button, Icon, Right } from "native-base";
import { Image } from "react-native";
import { Offering } from "src/models";
import { DefaultTheme } from "../theme";
import { NOT_FOUND_IMAGE } from '../image';

const OfferingCard: React.FunctionComponent<{ offering: Offering }> = ({ offering }) => {

    return (
        <Card>
            <CardItem style={DefaultTheme.backgroundColorPrimaryColor}>
                <Left>
                    {offering.photos.length > 0 ? 
                        <Thumbnail source={{ uri: `http://localhost:1337${offering.photos[0].url}` }} />:
                        <Thumbnail source={NOT_FOUND_IMAGE} />
                    }
                    <Body>
                        <Text style={DefaultTheme.onPrimaryColorText}>{offering.name}</Text>
                        <Text style={DefaultTheme.onPrimaryColorText} note>by {offering.user.username}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody={true}>
            {offering.photos.length > 0 ? 
                <Image style={{height: 200, width: 200, flex: 1}} source={{ uri: `http://localhost:1337${offering.photos[0].url}` }} />:
                <Image style={{height: 200, width: 200, flex: 1}} source={NOT_FOUND_IMAGE} />
            }
            </CardItem>
            <CardItem>
                <Body>
                    <Button transparent>
                        <Icon style={DefaultTheme.textSecondaryColor} active name="chatbubbles" />
                        <Text style={DefaultTheme.textSecondaryColor}>{offering.opinions.length} Comments</Text>
                    </Button>
                </Body>
                <Right>
                    <Text>{moment(offering.created_at).fromNow()}</Text>
                </Right>
            </CardItem>
        </Card>
    );
}

export default OfferingCard

export const MemoizedOfferingCard = React.memo(OfferingCard);
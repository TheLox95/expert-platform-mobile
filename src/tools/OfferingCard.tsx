import React from "react";
import moment from 'moment';
import { Card, CardItem, Left, Thumbnail, Text, Body, Button, Icon, Right } from "native-base";
import { Image } from "react-native";
import { Offering } from "src/models";

const OfferingCard: React.FunctionComponent<{ offering: Offering }> = ({ offering }) => {

    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: 'https://bitsofco.de/content/images/2018/12/broken-1.png' }} />
                    <Body>
                        <Text>{offering.name}</Text>
                        <Text note>by {offering.user.username}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody={true}>
                <Image style={{height: 100, flex: 1}} source={{ uri: 'https://bitsofco.de/content/images/2018/12/broken-1.png' }} />
            </CardItem>
            <CardItem>
                <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>{offering.opinions.length} Comments</Text>
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
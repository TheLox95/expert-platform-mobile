import React from 'react';
import { Text, Container, Header, Left, Button, Title, Content, Icon, Footer, FooterTab, Right, Body } from "native-base";
import { WrappedComponent } from "../state/WrappedComponent";
import Wrapper from "../state/Wrapper";

const Skeleton: React.FunctionComponent = ({ children }) => {
    return (
        <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            {children}
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}

export default Skeleton;
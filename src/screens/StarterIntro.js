import React from 'react';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
`;
const WelcomeText = styled.Text`
  font-size: 22px;
  color: #7159c1;
  margin-top: 50px;
  font-weight: bold;
`;
const WelcomeImage = styled.View`
  flex: 1;
  justify-content: center;
`;
const WelcomeLogo = styled.Image`
  width: 200px;
  height: 200px;
`;
const BeginConfigArea = styled.View`
  width: 100%;
  margin-bottom: 50px;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

const Page = props => {
  const handleStart = () => {
    props.navigation.navigate('StarterName');
  };

  return (
    <Container>
      <WelcomeText>Welcome to DevFit</WelcomeText>
      <WelcomeImage>
        <WelcomeLogo source={require('../assets/boneco.png')} />
      </WelcomeImage>
      <BeginConfigArea>
        <DefaultButton width="100%" bgColor="#7159c1" onPress={handleStart}>
          <ButtonText>Start Configuration</ButtonText>
        </DefaultButton>
      </BeginConfigArea>
    </Container>
  );
};

Page.navigationOptions = {
  header: null,
};

export default Page;

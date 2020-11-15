import React from 'react';
import styled from 'styled-components/native';
import {TextHighlight, Paragraph, Title} from '../Components/Text';
import {Button, ButtonText} from '../Components/Button';
import { TouchableHighlight } from 'react-native';

const PageContainer = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const ActionContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25%;
`;

const IntroContainer = styled.View`
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RunningImage = styled.Image`
  height: 300px;
  width: 400px;
`;

const Register = ({navigation}) => {
  return (
    <PageContainer>
      <IntroContainer>
        <Title>Welcome to <TextHighlight>Project</TextHighlight></Title>
        <Paragraph>The fun and easy way to get Fit!</Paragraph>
        <RunningImage source={require('../../assets/running.png')}/>
      </IntroContainer>
      <ActionContainer>
        <Button onPress={()=> navigation.navigate('RegisterForm')}><ButtonText>Get Started</ButtonText></Button>
        <Paragraph>Already have an account? <TextHighlight onPress={() => navigation.navigate('Login')}>Sign in</TextHighlight></Paragraph>
      </ActionContainer>
    </PageContainer>
  )
}

export default Register;
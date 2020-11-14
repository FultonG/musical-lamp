import React from 'react';
import styled from 'styled-components/native';

const PageContainer = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f4f5f9;
`;

const Button = styled.TouchableHighlight`
  background-color: #7169e0;
  width: 225px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const ButtonText = styled.Text`
  color: #f3f2fc;
  font-weight: 500;
  font-size: 16px;
`;

const Title = styled.Text`
  color: #262a3a;
  font-weight: 600;
  font-size: 24px;
  margin: 10px;
`;

const Paragraph = styled.Text`
  color: #808ba5;
  font-size: 16px;
  font-weight: 500;
  margin: 10px;
`;

const TextHighlight = styled.Text`
  color: #6e66df;
`;

const ActionContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
`;

const IntroContainer = styled.View`
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Register = () => {
  return (
    <PageContainer>
      <IntroContainer>
        <Title>Welcome to <TextHighlight>Project</TextHighlight></Title>
        <Paragraph>The fun and easy way to get Fit!</Paragraph>
      </IntroContainer>
      <ActionContainer>
        <Button><ButtonText>Get Started</ButtonText></Button>
        <Paragraph>Already have an account? <TextHighlight>Sign in</TextHighlight></Paragraph>
      </ActionContainer>
    </PageContainer>
  )
}

export default Register;
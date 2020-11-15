import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { TextHighlight, Paragraph, Title } from '../Components/Text';
import {Button, ButtonText} from '../Components/Button';
import PageContainer from '../Components/PageContainer';
import Input from '../Components/Input';
import { useAuthReducer, useAuthState } from '../Context/AuthContext';

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 40px;
`;

const FormContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterForm = ({navigation}) => {
  let auth = useAuthState();
  let dispatch = useAuthReducer();
  let [data, setData] = useState(auth);
  const handleTransition = () => {
    dispatch({type: 'UPDATE_FORM', payload: {form: data}})
    navigation.navigate('RegisterProfileDetails');
  }

  const handleInputChange = (val, attr) => {
    setData(prev => ({...prev, [attr]: val}))
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <PageContainer>
          <TitleContainer>
            <Title>Create an <TextHighlight>Account</TextHighlight></Title>
            <Paragraph>We'll have you working out with friends in no time!</Paragraph>
          </TitleContainer>
          <FormContainer>
            <Input placeholder="Username" value={data.username} onChangeText={(text) => handleInputChange(text, 'username')} autoCompleteType="username" placeholderTextColor="#a2a4bd"></Input>
            <Input placeholder="Password" value={data.password} onChangeText={(text) => handleInputChange(text, 'password')} autoCompleteType="password" secureTextEntry placeholderTextColor="#a2a4bd"></Input>
            <Button onPress={handleTransition}><ButtonText>Add Profile Details</ButtonText></Button>
          </FormContainer>
        </PageContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default RegisterForm;
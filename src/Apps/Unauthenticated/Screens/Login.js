import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { TextHighlight, Paragraph, Title } from '../../../Components/Text';
import {Button, ButtonText} from '../../../Components/Button';
import PageContainer from '../../../Components/PageContainer';
import Input from '../../../Components/Input';
import API from '../../../API';
import { useAppReducer } from '../../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const initialData = {
  username: '',
  password: ''
}

const Login = ({navigation}) => {
  let dispatch = useAppReducer();
  let [data, setData] = useState(initialData);
  const handleTransition = async () => {
    try{
      let res = await API.login(data);
      await AsyncStorage.setItem('User', JSON.stringify(res.data.response));
      dispatch({type: 'UPDATE_USER', payload: { user: {...res.data.response}, auth: true}})
    } catch(e){
      console.log(e);
    }
  }

  const handleInputChange = (val, attr) => {
    setData(prev => ({...prev, [attr]: val}))
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <PageContainer>
          <TitleContainer>
            <Title>Account <TextHighlight>Sign in</TextHighlight></Title>
            <Paragraph>We'll have you working out with friends in no time!</Paragraph>
          </TitleContainer>
          <FormContainer>
            <Input placeholder="Username" value={data.username} onChangeText={(text) => handleInputChange(text, 'username')} autoCompleteType="username" placeholderTextColor="#a2a4bd"></Input>
            <Input placeholder="Password" value={data.password} onChangeText={(text) => handleInputChange(text, 'password')} autoCompleteType="password" secureTextEntry placeholderTextColor="#a2a4bd"></Input>
            <Button onPress={handleTransition}><ButtonText>Login</ButtonText></Button>
          </FormContainer>
        </PageContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default Login;
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import Input from '../../../Components/Input';
import styled from 'styled-components';
import { Paragraph, TextHighlight, Title } from '../../../Components/Text';
import { Button, ButtonText } from '../../../Components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useAuthState } from '../../../Context/AuthContext';
import API from '../../../API';
import { useAppReducer } from '../../../Context/AppContext';

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 20px;
`;

const IconContainer = styled.TouchableHighlight`
  border-radius: 50px;
  height: 100px;
  width: 100px;
  background-color: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.Image`
  border-radius: 50px;
  height: 100px;
  width: 100px;
`;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff'
  },
  scrollView: {
    width: '100%',
  },
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})

const RegisterProfileDetails = () => {
  let auth = useAuthState();
  let [data, setData] = useState(auth);
  let dispatch = useAppReducer();
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleTransition = async () => {
    try{
      let formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if(key === 'address'){
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
      formData.append('avatar', {
        name: image.fileName,
        type: image.type,
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      });
      console.log(formData);
      let res = await API.createUser(formData);
      dispatch({type: 'UPDATE_USER', payload: { user: {...res.data.response}, auth: true}})
    } catch(e){
      console.log(e, e.message);
    }
    
  }

  const handleInputChange = (val, attr) => {
    setData(prev => ({...prev, [attr]: val}))
  }

  const handleAddressChange = (val, attr) => {
    setData(prev => ({...prev, address: {...prev.address, [attr]: val}}))
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity}>
              <TitleContainer>
                <Title>Add <TextHighlight>Profile</TextHighlight> Details</Title>
                <Paragraph>This information will be displayed on your <TextHighlight>Project</TextHighlight> Profile!</Paragraph>
              </TitleContainer>
              <IconContainer onPress={pickImage}>
                {image ? <ProfileImage source={{ uri: image.uri }} /> : <Icon name="md-person-add" size={30} color="#6e66df"></Icon>}
              </IconContainer>
              {image === null && <Paragraph>Upload a Profile Picture</Paragraph>}
              <Input placeholder="First Name" autoCompleteType="name" value={data.first_name} onChangeText={(text) => handleInputChange(text, 'first_name')} placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="Last Name" value={data.last_name} onChangeText={(text) => handleInputChange(text, 'last_name')} placeholderTextColor="#a2a4bd"></Input>
              <TitleContainer>
                <Title>Address</Title>
                <Paragraph>Your address will not be visible on your profile but will be used for some location based challenges</Paragraph>
              </TitleContainer>
              <Input placeholder="Street Number" value={data.address.street_number} onChangeText={(text) => handleAddressChange(text, 'street_number')} autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="Street Name" value={data.address.street_name} onChangeText={(text) => handleAddressChange(text, 'street_name')} autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="City" value={data.address.city} onChangeText={(text) => handleAddressChange(text, 'city')} autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="State" value={data.address.state} onChangeText={(text) => handleAddressChange(text, 'state')} autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="Zip" value={data.address.zip} onChangeText={(text) => handleAddressChange(text, 'zip')} autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Button onPress={handleTransition}><ButtonText>Create Account</ButtonText></Button>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RegisterProfileDetails;
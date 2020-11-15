import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Input from '../Components/Input';
import styled from 'styled-components';
import { Paragraph, TextHighlight, Title } from '../Components/Text';
import { Button, ButtonText } from '../Components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
                {image ? <ProfileImage source={{ uri: image }} /> : <Icon name="md-person-add" size={30} color="#6e66df"></Icon>}
              </IconContainer>
              {image === null && <Paragraph>Upload a Profile Picture</Paragraph>}
              <Input placeholder="First Name" autoCompleteType="name" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="Last Name" placeholderTextColor="#a2a4bd"></Input>
              <TitleContainer>
                <Title>Address</Title>
                <Paragraph>Your address will not be visible on your profile but will be used for some location based challenges</Paragraph>
              </TitleContainer>
              <Input placeholder="Street Number" autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="Street Name" autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="City" autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="State" autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Input placeholder="Zip" autoCompleteType="street-address" placeholderTextColor="#a2a4bd"></Input>
              <Button><ButtonText>Create Account</ButtonText></Button>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RegisterProfileDetails;
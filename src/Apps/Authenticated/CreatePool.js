import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Paragraph, TextHighlight, Title } from '../../Components/Text';
import { useAppReducer, useAppState } from '../../Context/AppContext';
import styled from 'styled-components/native';
import { Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Input from '../../Components/Input';
import { Button, ButtonText } from '../../Components/Button';
import API from '../../API';

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
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

const CreatePool = ({navigation}) => {
  const [date, setDate] = useState(null);
  const [fee, setFee] = useState("");
  const [title, setTitle] = useState("");
  let dispatch = useAppReducer();
  const handleDateSelect = (day) => {
    setDate(day.dateString);
  }
  const handleCreatePool = async () => {
    try {
      let poolData = {
        _id: user._id,
        account_id: user.account,
        fee: parseInt(fee) || 0,
        expiration_date: new Date(date).getTime() / 1000,
        title
      }
      let res = await API.createPool(poolData);
      await AsyncStorage.setItem('User', JSON.stringify(res.data.response.user));
      dispatch({ type: 'UPDATE_USER', payload: { user: res.data.response.user, auth: true } })
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.log(e.message);
    }
  }
  let { user } = useAppState();
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <TitleContainer>
              <Title>Create a new <TextHighlight>Pool</TextHighlight></Title>
              <Paragraph>Start by giving your Pool a <TextHighlight>Title</TextHighlight></Paragraph>
            </TitleContainer>
            <Input placeholder="Pool Title" value={title} onChangeText={(e) => setTitle(e)} style={{ marginTop: 15 }}></Input>
            <Input placeholder="Entry Fee Amount" value={fee} onChangeText={(e) => setFee(e)} style={{ marginTop: 15 }} keyboardType="numeric"></Input>
            <TitleContainer>
              <Paragraph>Next select the <TextHighlight>Deadline</TextHighlight> for everyone to complete their tasks</Paragraph>
            </TitleContainer>
            <Calendar markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#6e66df',
                selectedTextColor: '#e4e0fe',
              },
            }} onDayPress={handleDateSelect}></Calendar>
            {date === null ? <Paragraph>No Date selected</Paragraph> : <Paragraph>Pool ends <TextHighlight>{date}</TextHighlight></Paragraph>}
            <Button onPress={handleCreatePool}><ButtonText>Create Pool</ButtonText></Button>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CreatePool;
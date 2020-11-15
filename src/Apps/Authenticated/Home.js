import React from 'react';
import {Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Paragraph, TextHighlight, Title } from '../../Components/Text';
import { useAppState } from '../../Context/AppContext';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import { Button, ButtonText } from '../../Components/Button';

const ExperienceCard = styled.View`
  height: 150px;
  width: 300px;
  background-color: #f4f6fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MetricCard = styled.View`
  width: 45%;
  height: 225px;
  ${({ color }) => color && `background-color: ${color};`}
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const MetricContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
`;

const MetricText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
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

const Home = () => {
  let { user } = useAppState();
  console.log(user);
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity}>
              <Paragraph><TextHighlight>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</TextHighlight></Paragraph>
              <Title>Hi, {user.first_name}</Title>
              <ExperienceCard>
                <Paragraph>Based on your overall tasks completed, your total score is {user.exp}</Paragraph>
              </ExperienceCard>
              <Title>Metrics</Title>
              <MetricContainer>
                <MetricCard color="#8c83fa">
                  <MaterialIcons name="group" size={50} color="white"></MaterialIcons>
                  <MetricText>Number of Pools</MetricText>
                  <MetricText>{user.pools.length}</MetricText>
                </MetricCard>
                <MetricCard color="#b090fc">
                  <Icon name="checklist" size={50} color="white" />
                  <MetricText>Tasks Completed</MetricText>
                  <MetricText>{user.tasks_completed_int}</MetricText>
                </MetricCard>
                <MetricCard color="#258bfb">
                  <FontistoIcons name="fire" size={50} color="white" />
                  <MetricText>Calories Burned</MetricText>
                  <MetricText>{user.tasks_completed_int}</MetricText>
                </MetricCard>
                <MetricCard color="#4c5a81">
                  <MaterialCommunityIcons name="shoe-print" size={50} color="white"/>
                  <MetricText>Steps</MetricText>
                  <MetricText>{user.tasks_completed_int}</MetricText>
                </MetricCard>
              </MetricContainer>
              <Button><ButtonText>Create a new Pool</ButtonText></Button>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

export default Home;
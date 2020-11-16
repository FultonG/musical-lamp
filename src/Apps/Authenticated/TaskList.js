import React from 'react';
import { Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native'
import { ButtonText , Button} from '../../Components/Button';
import { Paragraph, TextHighlight, Title } from '../../Components/Text';
import { useAppState } from '../../Context/AppContext';

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;

const TasksTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const TaskCard = styled.View`
  background-color: #8c83fa;
  width: 300px;
  height: 150px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
`;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
    height: '100%'
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

const TaskList = ({ navigation }) => {
  let {user} = useAppState();
  console.log(user);
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity}>
              <TitleContainer>
                <Title>{user.first_name}'s Tasks!</Title>
                <Paragraph>Done some exercise today? Tap the button below!</Paragraph>
                <Button onPress={() => navigation.navigate('AddTask')}><ButtonText>Add a Task</ButtonText></Button>
                {user.tasks_completed.map((task, index) => (
                  <TaskCard key={index}>
                    <TasksTitle>{task.title}</TasksTitle>
                    <TasksTitle>Exp. {task.exp}</TasksTitle>
                    <TasksTitle>Minutes: {task.value}</TasksTitle>
                    <TasksTitle>Date: {new Date(task.date).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</TasksTitle>
                  </TaskCard>
                ))}
              </TitleContainer>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

export default TaskList;
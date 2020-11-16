import React, { useEffect, useState } from 'react';
import { Button, ButtonText } from '../../Components/Button';
import Input from '../../Components/Input';
import PageContainer from '../../Components/PageContainer';
import { Paragraph, TextHighlight, Title } from '../../Components/Text';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { useAppReducer, useAppState } from '../../Context/AppContext';
import API from '../../API';
import { Picker } from '@react-native-picker/picker';

const AddTask = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(0);
  const [taskValue, setTaskValue] = useState("");
  let { user } = useAppState();
  let dispatch = useAppReducer();

  useEffect(() => {
    (async () => {
      try {
        let res = await API.getTasks();
        setTasks(res.data.response);
      } catch (e) {
        console.log(e.message);
      }
    })()
  }, []);

  const handleInvite = async () => {
    try{
      let data = {
        _id: user._id,
        taskId: tasks[selectedTask]._id,
        value: taskValue
      }

      let res = await API.addTask(data);
      res = await API.getUser(user._id);
      console.log(res.data);
      dispatch({ type: 'UPDATE_USER', payload: { user: res.data.response, auth: true } })
      navigation.navigate('TaskList')

    } catch(e) {
      console.log(e.response.data.response);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <PageContainer>
          <Title>Add a New <TextHighlight>Task</TextHighlight></Title>
          <Paragraph>Task Name</Paragraph>
            <Picker
              selectedValue={selectedTask}
              style={{ height: 50, width: 100, margin: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedTask(itemIndex)
              }>
              {tasks.map((task, index) => <Picker.Item label={task.title} value={index}></Picker.Item>)}
            </Picker>
          <Input placeholder="Task Value" value={taskValue} keyboardType="numeric" onChangeText={(text) => setTaskValue(text)}></Input>
          <Button onPress={handleInvite}><ButtonText>Invite</ButtonText></Button>
        </PageContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

export default AddTask;
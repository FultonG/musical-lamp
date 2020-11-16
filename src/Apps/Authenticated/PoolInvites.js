import React, { useState } from 'react';
import { Button, ButtonText } from '../../Components/Button';
import Input from '../../Components/Input';
import PageContainer from '../../Components/PageContainer';
import { TextHighlight, Title } from '../../Components/Text';
import {KeyboardAvoidingView, TouchableWithoutFeedback , Keyboard} from 'react-native';
import { useAppState } from '../../Context/AppContext';
import API from '../../API';

const PoolInvite = ({navigation, route}) => {
  const [friendCode, setFriendCode] = useState("");
  let {pool} = route.params;
  let {user} = useAppState();
  const handleInvite = async () => {
    let data = {
      _id: user._id,
      poolId: pool._id,
      toAddId: friendCode
    }

    try {
      let res = await API.addToPool(data);
      console.log(res.data.response);
    } catch(e) {
      console.log(e.message, e.response.data.response);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <PageContainer>
      <Title>Invite your <TextHighlight>friends</TextHighlight> to: </Title>
      <Title style={{marginBottom: 30}}>{pool.title}</Title>
      <Input placeholder="Friend Code" value={friendCode} onChangeText={(text) => setFriendCode(text)}></Input>
      <Button onPress={handleInvite}><ButtonText>Invite</ButtonText></Button>
    </PageContainer>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

export default PoolInvite;
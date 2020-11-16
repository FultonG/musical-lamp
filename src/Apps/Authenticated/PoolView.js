import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native'
import API from '../../API';
import { Paragraph, TextHighlight, Title } from '../../Components/Text';
import { useAppState } from '../../Context/AppContext';

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
`;

const ContenderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const ContenderCard = styled.View`
  background-color: #8c83fa;
  width: 300px;
  height: 100px;
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

const PoolView = ({ navigation, route }) => {
  const [contenders, setContenders] = useState([]);
  let { pool } = route.params;
  useEffect(() => {
    (async () => {
      try {
        let ids = pool.members.map(obj => obj._id);
        let res = await API.getMembers({ ids });
        let updateContenders = res.data.response.map(obj => {
          for(let x = 0; x < pool.members.length; x++){
            if(pool.members[x]._id === obj._id){
              let totalPoints = obj.tasks_completed_int - pool.members[x].startTasksInt;
              return {...obj, points: totalPoints}
            }
          }
        })
        setContenders(updateContenders);
      } catch (e) {
        console.log(e);
      }
    })()

  }, [])
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity}>
              <TitleContainer>
                <Title>{pool.title}</Title>
                <Paragraph>Keep going! there's still time to win that <TextHighlight>${pool.pool_size}</TextHighlight></Paragraph>
                <Title>Contenders</Title>
                {contenders.map(contender => (
                  <ContenderCard key={contenders._id}>
                    <ContenderTitle>Name {contender.first_name} {contender.last_name}</ContenderTitle>
                    <ContenderTitle>Level {contender.level}</ContenderTitle>
                    <ContenderTitle>Points {contender.points}</ContenderTitle>
                  </ContenderCard>
                ))}
              </TitleContainer>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

export default PoolView;
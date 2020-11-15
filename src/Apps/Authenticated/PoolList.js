import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import API from '../../API';
import { useAppState } from '../../Context/AppContext';
import { Title, TextHighlight } from '../../Components/Text';
import { ButtonText, SmallButton } from '../../Components/Button';

const TitleContainer = styled.View`
  display: flex;
  align-items: center;
  width: 90%;
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

const PoolCard = styled.TouchableHighlight`
  display: flex;
  height: 100px;
  width: 300px;
  background-color: #f5f6fa;
  border-radius: 20px;
  margin-bottom: 20px;
  justify-content: center;
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
`;

const PoolCardTitle = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 22px;
`;
const PoolCardText = styled.Text`
  color: #7a86a1;
  font-weight: 600;
  font-size: 18px;
`;

const PoolList = ({navigation}) => {
  let { user } = useAppState();
  let [pools, setPools] = useState([]);
  console.log(user);
  useEffect(() => {
    (async () => {
      try {
        let res = await API.getPools({ ids: user.pools })
        console.log(res.data.response);
        setPools(res.data.response);
      } catch (e) {
        console.log(e.response.data?.response)
      }
    })()
  }, []);
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.touchableOpacity}>
              <TitleContainer>
                <Title>List of your currently <TextHighlight>active</TextHighlight> Pools</Title>
              </TitleContainer>
              {pools.map(pool => (
                <PoolCard>
                  <PoolCard as={View}>
                    <View>
                    <PoolCardTitle>{pool?.title}</PoolCardTitle>
                    <PoolCardText>Pool Buy in ${pool.fee}</PoolCardText>
                      </View>
                    <SmallButton onPress={() => navigation.navigate('PoolInvite', {pool})}><ButtonText>Invite</ButtonText></SmallButton>
                  </PoolCard>
                </PoolCard>
              ))}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default PoolList;
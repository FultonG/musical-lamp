import AsyncStorage from '@react-native-async-storage/async-storage';
const AppReducer = (state, action) => {
  switch(action.type){
    case 'UPDATE_USER': 
      return updateUser(state, action.payload.user, action.payload.auth);
    case 'LOGOUT_USER':
      return logout(state);
    default:
      throw new Error();
  }
}

function updateUser(state, user, auth){
  return {...state, user, auth};
}

function logout(state){
  const {user, ...rest} = state;
  return {...rest, auth: false};
}

export default AppReducer;
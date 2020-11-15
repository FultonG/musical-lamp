const AppReducer = (state, action) => {
  switch(action.type){
    case 'UPDATE_USER': 
      return updateUser(state, action.payload.user);
    default:
      throw new Error();
  }
}

function updateUser(state, data){
  return {...state, ...data};
}

export default AppReducer;
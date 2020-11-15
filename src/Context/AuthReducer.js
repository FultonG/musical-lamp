const AuthReducer = (state, action) => {
  switch(action.type){
    case 'UPDATE_FORM': 
      return updateForm(state, action.payload.form);
    default:
      throw new Error();
  }
}

function updateForm(state, user){
  return {...state, user};
}

export default AuthReducer;
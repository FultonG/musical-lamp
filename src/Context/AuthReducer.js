const AuthReducer = (state, action) => {
  switch(action.type){
    case 'UPDATE_FORM': 
      return updateForm(state, action.payload.form);
    default:
      throw new Error();
  }
}

function updateForm(state, data){
  return {...state, ...data};
}

export default AuthReducer;
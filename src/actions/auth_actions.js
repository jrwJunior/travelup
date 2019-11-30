import * as actionTypes from './action_types';

const signIn = ({ email, password }) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

    localStorage.setItem('user', JSON.stringify({ loggedIn : true }));
    dispatch({ type: actionTypes.FETCH_LOGIN_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_LOGIN_ERROR, payload: {
      signIn: err.message
    }});
  }
}

const signUp = ({ email, password }) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

    localStorage.setItem('user', JSON.stringify({ loggedIn : true }));
    dispatch({ type: actionTypes.FETCH_LOGIN_SUCCESS });

    firestore.collection('users').doc(res.user.uid).set({
      email,
      password,
      avatar: null
    });
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_LOGIN_ERROR, payload: {
      signUp: err.message
    }});
  }
}

const signOut = () => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  localStorage.setItem('user', JSON.stringify({ loggedIn : false }));
  await firebase.auth().signOut();
  
  dispatch({ type: actionTypes.FETCH_LOGIN_OUT });
}

const signInGoogle = provider => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  await firebase.auth().signInWithPopup(provider);

  localStorage.setItem('user', JSON.stringify({ loggedIn : true }));
  dispatch({ type: actionTypes.FETCH_LOGIN_SUCCESS });
}

// const clearError = () => dispatch => {
//   dispatch({ type: actionTypesFETCH_LOGIN_ERROR, payload: {
//     signIn: null,
//     signUp: null
//   }});
// }

export {
  signIn,
  signOut,
  signUp,
  signInGoogle
};
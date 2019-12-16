import * as actionTypes from './action_types';

const signIn = ({ email, password }) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actionTypes.LOGIN_REQUSTED });

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: actionTypes.LOGIN_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.LOGIN_ERROR, payload: {
      signIn: err.message
    }});
  }
}

const signUp = ({ email, password }) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firestore.collection('users').doc(res.user.uid).set({
      email,
      password,
      avatar: null,
      uid: res.user.uid
    });

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.user.uid });
  } catch (err) {
    dispatch({ type: actionTypes.LOGIN_ERROR, payload: {
      signUp: err.message
    }});
  }
}

const signOut = () => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  await firebase.auth().signOut();
  dispatch({ type: actionTypes.LOGIN_OUT });
}

const signInGoogle = provider => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  await firebase.auth().signInWithPopup(provider);

  localStorage.setItem('user', JSON.stringify({ loggedIn : true }));
  dispatch({ type: actionTypes.LOGIN_SUCCESS });
}

export {
  signIn,
  signOut,
  signUp,
  signInGoogle
};
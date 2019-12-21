import * as actionTypes from './action_types';

const signIn = ({ email, password }) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actionTypes.LOGIN_REQUSTED });

  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.user.uid });
  } catch (e) {
    dispatch({ type: actionTypes.LOGIN_ERROR, payload: e.message });
  }
}

const signUp = ({ email, password }) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: actionTypes.LOGIN_REQUSTED });

  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firestore.collection('auth_users').doc(res.user.uid).set({
      email,
      password,
      avatar: null,
      uid: res.user.uid
    });

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.user.uid });
  } catch (e) {
    dispatch({ type: actionTypes.LOGIN_ERROR, payload: {
      signUp: e.message
    }});
  }
}

const signOut = () => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  await firebase.auth().signOut();
  dispatch({ type: actionTypes.LOGIN_OUT });
}

const signInSocials = provider => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const db = getFirestore();

  try {
    const res = await firebase.auth().signInWithPopup(provider);
    const { email, photoURL, uid } = res.user;

    db.collection('auth_users').doc(uid).set({
      email,
      uid,
      avatar: photoURL
    });

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: uid });
  } catch(e) {
    console.log(e.message);
  }
}

export {
  signIn,
  signOut,
  signUp,
  signInSocials
};
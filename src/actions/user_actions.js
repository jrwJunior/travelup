import * as actionTypes from './action_types';

const getUserData = () => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const db = getFirestore();
  const localData = JSON.parse(localStorage.getItem('_user'));

  dispatch({ type: actionTypes.USER_REQESTED });
  const docRef = db.collection('auth_users').doc(localData.uid);
  const res = await docRef.get();

  if (res.exists) {
    const { avatar } = res.data();

    if (!avatar) {
      const url = await firebase.storage().ref('users/user_default_avatar/5.png').getDownloadURL();
      const data = await fetch(url);

      if (data.ok) {
        const blob = await data.blob();
        const reader = new FileReader();

        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          dispatch({ type: actionTypes.USER_REQUEST_DATA, payload: reader.result });
        }
      }
    }

    if (avatar) {
      dispatch({ type: actionTypes.USER_REQUEST_DATA, payload: avatar });
    }
  } else {
    console.log("No such document!");
  }
}

const updateUserData = file => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const db = getFirestore();
  const localData = JSON.parse(localStorage.getItem('_user'));

  try {
    const snapshot = await firebase.storage().ref(`users/${localData.uid}/user_avatar/avatar`).put(file);
    const url = await snapshot.ref.getDownloadURL();

    db.collection('auth_users').doc(localData.uid).update({
      avatar: url
    });

    dispatch({ type: actionTypes.USER_REQUEST_DATA, payload: url });
  } catch(e) {
    console.log(e);
  }
}

export {
  getUserData,
  updateUserData
}
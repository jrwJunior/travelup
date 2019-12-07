import * as actionTypes from './action_types';

const getUserAvatar = async(url, dispatch) => {
  const res = await fetch(url);

    if (res.ok) {
      const blob = await res.blob();
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        dispatch({ type: actionTypes.FETCH_REQUEST_USER_DATA, payload: {
          userAvatar: reader.result
        }})
      }
    }
}

const getCurrentUser = uid => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    const url = await firebase.storage().ref(`users/${uid}/user_avatar/`).getDownloadURL();
    getUserAvatar(url, dispatch);
  } catch(e) {
    const url = await firebase.storage().ref('users/user_default_avatar/5.png').getDownloadURL();
    getUserAvatar(url, dispatch);
  }
};

const uploadUserPhoto = (uid, file) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  dispatch({ type: actionTypes.FETCH_REQUEST_DATA });

  try {
    const snapshot = await firebase.storage().ref(`users/${uid}/user_avatar/`).put(file);
    const url = await snapshot.ref.getDownloadURL();
    
    dispatch({ type: actionTypes.UPDATE_USER_PHOTO, payload: url });
  } catch(e) {
    console.log(e);
  }
}

export {
  getCurrentUser,
  uploadUserPhoto
}
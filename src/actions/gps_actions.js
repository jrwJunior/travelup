import * as actionTypes from './action_types';

const setGPSCoordinates = (uid, cords) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const db = getFirestore();
  
  try {
    await db.collection('location').doc(uid).set({
      [cords.id]: [{ ...cords }]
    });
    dispatch({ type: actionTypes.SET_GPS_COORDINATES, payload: [].concat(cords) });
  } catch(e) {
    console.log(e);
  }
}

const getGPSCoordinates = (uid) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const db = getFirestore();

  try {
    const docRef = await db.collection('location').doc(uid);
    const cords = await docRef.get();

    if (cords.exists) {
      const data = [];
      
      for (let key in cords.data()) {
        data.push(cords.data()[key]);
      }
      
      dispatch({ type: actionTypes.SET_GPS_COORDINATES, payload: data });
    }
  } catch(e) {
    console.log(e);
  }
}

export {
  setGPSCoordinates,
  getGPSCoordinates
}
import * as actionTypes from './action_types';

const setGPSCoordinates = (uid, cords) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const db = getFirestore();
  dispatch({ type: actionTypes.CORDS_FETCH_REQUESTED });

  try {
    const docRef = await db.collection('map_location').doc(uid);
    const refData = await docRef.get();

    if (refData.exists) {
      db.collection('map_location').doc(uid).update({
        [cords.id]: [{ ...cords }]
      });
    } else {
      db.collection('map_location').doc(uid).set({
        [cords.id]: [{ ...cords }]
      });
    }
    
    dispatch({ type: actionTypes.SET_MAP_COORDINATES, payload: cords });
  } catch(e) {
    console.log(e);
  }
}

const getGPSCoordinates = (uid) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const db = getFirestore();

  try {
    const docRef = await db.collection('map_location').doc(uid);
    const cords = await docRef.get();

    if (cords.exists) {
      const data = [];
      
      for (let key in cords.data()) {
        data.push(...cords.data()[key]);
      }
      
      dispatch({ type: actionTypes.SET_MAP_COORDINATES, payload: data });
    }
  } catch(e) {
    console.log(e);
  }
}

const deleteGPSCoordinates = (uid, id) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const db = getFirestore();

  const { marks } = getState().map;
  const data = getState().gallery.photos;
  
  if (!data.hasOwnProperty(id)) {
    const newMarks = marks.filter(el => el.id !== id);

    db.collection('map_location').doc(uid).update({
      [id]: db.FieldValue.delete()
    });

    dispatch({ type: actionTypes.DELETE_MAP_COORDINATES, payload: newMarks });
  }
}

const setMapId = id => dispatch => {
  dispatch({ type: actionTypes.SET_MAP_ID, payload: id });
}

export {
  setGPSCoordinates,
  getGPSCoordinates,
  setMapId,
  deleteGPSCoordinates
}
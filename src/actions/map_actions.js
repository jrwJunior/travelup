import * as actionTypes from './action_types';

const setGPSCoordinatesOfPhotos = (file, cords) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const db = getFirestore();
  const localData = JSON.parse(localStorage.getItem('_user'));
  dispatch({ type: actionTypes.COORDINATES_REQUESTED });

  try {
    const { id } = cords;
    const data = getState().gallery.photos;
    const dataIsEmpty = !!Object.keys(data).length;
    const docRef = await db.collection('map_location').doc(localData.uid);
    const refData = docRef.get();

    if (dataIsEmpty) {
      const { ref } = await firebase.storage().ref(`users/${localData.uid}/gallery/${id}/${file.name}`).put(file);
      const src = ref.getDownloadURL();

      if (!data.hasOwnProperty(id)) {
        data[id] = [{ src, name: ref.name }];
      }
    }

    if (refData.exists) {
      db.collection('map_location').doc(localData.uid).update({
        [id]: [{ ...cords }]
      });
    } else {
      db.collection('map_location').doc(localData.uid).set({
        [id]: [{ ...cords }]
      });
    }
    
    if (dataIsEmpty) {
      dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
    }

    dispatch({ type: actionTypes.SET_MAP_COORDINATES, payload: cords });
  } catch(e) {
    console.log(e);
  }
}

const getAllPhotosAndGPSCoordinates = () => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const db = getFirestore();
  const localData = JSON.parse(localStorage.getItem('_user'));

  try {
    const storageRef = await firebase.storage().ref(`users/${localData.uid}/`);
    const listRef = await storageRef.child(`gallery/`);
    const docRef = await db.collection('map_location').doc(localData.uid);
    const cords = await docRef.get();

    const list = await listRef.listAll();
    list.prefixes.forEach(async({ name: id, fullPath: url }) => {
      const res = await firebase.storage().ref(url).listAll();
      res.items.forEach(async({ name, fullPath: url }) => {
        const { timeCreated } = await firebase.storage().ref(url).getMetadata();
        const src = await firebase.storage().ref(url).getDownloadURL();
        const data = getState().gallery.photos;

        if (!data.hasOwnProperty(id)) {
          data[id] = [{ src, name, timeCreated }];
        }

        if (data[id].length) {
          const noMatches = data[id].every(el => el.name.includes(name));
          
          if (!noMatches) {
            data[id].push({ src, name, timeCreated });
          }
        }

        data[id].sort((a, b) => (
          new Date(b.timeCreated) - new Date(a.timeCreated)
        ))

        if (list.prefixes.length === Object.keys(data).length) {
          if (cords.exists) {
            const data = [];
            
            for (let key in cords.data()) {
              data.push(...cords.data()[key]);
            }
            
            dispatch({ type: actionTypes.SET_MAP_COORDINATES, payload: data });
          }

          dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
        }
      })
    })
  } catch(e) {
    console.log(e);
  }
}

const setPositionCenterMap = cords => dispatch => {
  const lat = cords[0];
  const lng = cords[1];

  dispatch({ type: actionTypes.SET_POSITION_CENTER_MAP, payload: {
    lat,
    lng
  }});
}

const deleteGPSCoordinates = id => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const db = getFirestore();
  const localData = JSON.parse(localStorage.getItem('_user'));

  const { marks } = getState().map;
  const data = getState().gallery.photos;
  
  if (!data.hasOwnProperty(id)) {
    const newMarks = marks.filter(el => el.id !== id);

    db.collection('map_location').doc(localData.uid).update({
      [id]: db.FieldValue.delete()
    });

    dispatch({ type: actionTypes.DELETE_MAP_COORDINATES, payload: newMarks });
  }
}

const setMapId = id => dispatch => {
  dispatch({ type: actionTypes.SET_MAP_ID, payload: id });
}

const failGPSCoordinates = () => dispatch => {
  dispatch({ type: actionTypes.SET_ERROR_MAP_COORDINATES });
}

export {
  setGPSCoordinatesOfPhotos,
  getAllPhotosAndGPSCoordinates,
  setPositionCenterMap,
  setMapId,
  deleteGPSCoordinates,
  failGPSCoordinates
}
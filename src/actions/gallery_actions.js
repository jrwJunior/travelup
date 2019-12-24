import * as actionTypes from './action_types';

const setGalleryPhoto = (id, files, cords) => async(dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const db = getFirestore();
  const localData = JSON.parse(localStorage.getItem('_user'));
  dispatch({ type: actionTypes.GALLERY_FETCH_REQUESTED });
  
  try {
    const data = getState().gallery.photos;
    const isCoincidence = getState().map.marks.some(el => el.id.includes(id));
    const docRef = await db.collection('map_location').doc(localData.uid);
    const refData = await docRef.get();
    console.log(data)
    if (files.length > 1) {
      for (let key in files) {
        console.log(files[key]);
      }
    } else {
      const dataCords = refData.data();
      const name = files[0].name;
      const { ref } = await firebase.storage().ref(`users/${localData.uid}/gallery/${id}/${files[0].name}`).put(files[0]);
      const { timeCreated } = await firebase.storage().ref(ref.fullPath).getMetadata();
      const src = await ref.getDownloadURL();
      
      if (!data.hasOwnProperty(id)) {
        data[id] = [{ src, name, timeCreated }];
        console.log('add')
      } else {
        if (!(data[id].every(el => el.name.includes(ref.name))) || !data[id].length) {
          data[id].push({ src, name, timeCreated });
          console.log('concat')
        }
      }

      if (refData.exists && !dataCords.hasOwnProperty(id)) {
        console.log('set')
        db.collection('map_location').doc(localData.uid).update({
          [id]: [{ ...cords }]
        });
      }

      if (!refData.exists) {
        console.log('update')
        db.collection('map_location').doc(localData.uid).set({
          [id]: [{ ...cords }]
        });
      }

      data[id].sort((a, b) => (
        new Date(b.timeCreated) - new Date(a.timeCreated)
      ));

      dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
      
      if (!isCoincidence) {
        dispatch({ type: actionTypes.SET_MAP_COORDINATES, payload: cords });
      }
    }
  } catch(e) {
    console.log(e);
  }
}

const deletedData = (id, delItem) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const localData = JSON.parse(localStorage.getItem('_user'));
  const data = getState().gallery.photos;
  const newData = {};

  data[id].forEach(el => {
    if (!delItem.keys.includes(el.name)) {
      newData[id] = [].concat(el);
    } else {
      firebase.storage().ref(`users/${localData.uid}/gallery/`).child(`${id}/${el.name}`).delete()
        .then(() => dispatch({ type: actionTypes.SET_NOTICE, payload: {
          notifi: true,
          message: 'Photo removed from gallery'
        }}));
    }
  });

  dispatch({ type: actionTypes.REMOVE_ITEM_GALLERY, payload: newData });
}

export {
  setGalleryPhoto,
  deletedData
}

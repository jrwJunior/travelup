import * as actionTypes from './action_types';

const setGalleryPhotos = (uid, file, id) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    const data = getState().gallery;
    const { ref } = await firebase.storage().ref(`users/${uid}/gallery/${id}/${file.name}`).put(file);
    const src = await ref.getDownloadURL();

    if (!data.hasOwnProperty(id)) {
      data[id] = [{ src, name: ref.name }];
    }

    dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
  } catch(e) {
    console.log(e);
  }
}

const getGalleryPhotos = uid => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    const storageRef = await firebase.storage().ref(`users/${uid}/`);
    const listRef = await storageRef.child(`gallery/`);

    const list = await listRef.listAll();
    list.prefixes.forEach(async({ name: id, fullPath: url }) => {
      const res = await firebase.storage().ref(url).listAll();
      res.items.forEach(async({ name, fullPath: url }) => {
        const { timeCreated } = await firebase.storage().ref(url).getMetadata();
        const src = await firebase.storage().ref(url).getDownloadURL();
        const data = getState().gallery;

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
          console.log('foo')
          dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
        }
      })
    })
  } catch(e) {
    console.log(e);
  }
}

const setDragFilesGallery = (uid, id, files) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  try {
    const data = getState().gallery;

    if (files.length > 1) {
      for (let key in files) {
        console.log(files[key]);
      }
    } else {
      const { ref } = await firebase.storage().ref(`users/${uid}/gallery/${id}/${files[0].name}`).put(files[0]);
      const src = await ref.getDownloadURL();
      
      if (!data.hasOwnProperty(id)) {
        data[id] = [{ src, name: ref.name }];
      } else {
        if (!(data[id].every(el => el.name.includes(ref.name))) || !data[id].length) {
          data[id].push({ src, name: ref.name });
        }
      }

      dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
    }
  } catch(e) {
    console.log(e);
  }
}

const deletedData = (uid, id, delItem) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const data = getState().gallery;

  data[id].forEach((el, idx) => {
    if (delItem.keys.includes(el.name)) {
      data[id].splice(idx, 1);

      firebase.storage().ref(`users/${uid}/gallery/`).child(`${id}/${el.name}`).delete()
        .then(() => dispatch({ type: actionTypes.SET_NOTIFICATION, payload: {
          notifi: true,
          message: 'Photo removed from gallery'
        }}));
    }
  });

  if (data.hasOwnProperty(id) && !data[id].length) {
    delete data[id];
  }

  dispatch({ type: actionTypes.REMOVE_ITEM_GALLERY, payload: data });
}

export {
  setGalleryPhotos,
  getGalleryPhotos,
  setDragFilesGallery,
  deletedData
}

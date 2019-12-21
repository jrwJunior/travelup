import * as actionTypes from './action_types';

const setGalleryPhotos = (file, id) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const localData = JSON.parse(localStorage.getItem('_user'));

  try {
    const data = getState().gallery.photos;
    const { ref } = await firebase.storage().ref(`users/${localData.uid}/gallery/${id}/${file.name}`).put(file);
    const src = await ref.getDownloadURL();

    if (!data.hasOwnProperty(id)) {
      data[id] = [{ src, name: ref.name }];
    }

    dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
  } catch(e) {
    console.log(e);
  }
}

const getGalleryPhotos = () => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const localData = JSON.parse(localStorage.getItem('_user'));

  try {
    const storageRef = await firebase.storage().ref(`users/${localData.uid}/`);
    const listRef = await storageRef.child(`gallery/`);

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
          dispatch({ type: actionTypes.SET_PHOTO_GALLERY, payload: data });
        }
      })
    })
  } catch(e) {
    console.log(e);
  }
}

const setDragFilesGallery = (id, files) => async(dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const localData = JSON.parse(localStorage.getItem('_user'));
  
  try {
    const data = getState().gallery.photos;
    dispatch({ type: actionTypes.GALLERY_FETCH_REQUESTED });

    if (files.length > 1) {
      for (let key in files) {
        console.log(files[key]);
      }
    } else {
      const { ref } = await firebase.storage().ref(`users/${localData.uid}/gallery/${id}/${files[0].name}`).put(files[0]);
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

const deletedData = (id, delItem) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const data = getState().gallery.photos;
  const localData = JSON.parse(localStorage.getItem('_user'));

  data[id].forEach((el, idx) => {
    if (delItem.keys.includes(el.name)) {
      data[id].splice(idx, 1);

      firebase.storage().ref(`users/${localData.uid}/gallery/`).child(`${id}/${el.name}`).delete()
        .then(() => dispatch({ type: actionTypes.SET_NOTICE, payload: {
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

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const config = {
	apiKey: "AIzaSyCL9jSqc6dVYH2PKMveC9yyymUkehSHBT4",
	authDomain: "travel-app-8a5ba.firebaseapp.com",
	databaseURL: "https://travel-app-8a5ba.firebaseio.com",
	projectId: "travel-app-8a5ba",
	storageBucket: "travel-app-8a5ba.appspot.com",
	messagingSenderId: "631642393110",
	appId: "1:631642393110:web:d1b2de3b7dad149ec6c337",
	measurementId: "G-CGRQ77C7TJ"
};

firebase.initializeApp(config);
// firebase.analytics();

export default firebase;
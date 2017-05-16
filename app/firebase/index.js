import firebase from 'firebase';

try {
	var config = {
	  apiKey: "AIzaSyDabT1vj0bk4BOHyzCQRVBZNleTsAXdmj8",
	  authDomain: "todo-app-84f14.firebaseapp.com",
	  databaseURL: "https://todo-app-84f14.firebaseio.com",
	  projectId: "todo-app-84f14",
	  storageBucket: "todo-app-84f14.appspot.com",
	  messagingSenderId: "65067992910"
	};

	firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;

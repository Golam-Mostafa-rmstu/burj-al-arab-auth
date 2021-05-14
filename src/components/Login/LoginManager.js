import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDqOnkFnE1anHUbs46agR4dne2cXwVOW1A",
    authDomain: "burj-al-arab-auth-72511.firebaseapp.com",
    projectId: "burj-al-arab-auth-72511",
    storageBucket: "burj-al-arab-auth-72511.appspot.com",
    messagingSenderId: "843446847268",
    appId: "1:843446847268:web:d1acd7cd02d727152d15b1"
  };
export const FirebaseConfig = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const createUserWIthEmaiAndPassword = (name, email, password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res);
        const newUserInfo = res;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
    })
    .catch((error) => {
        var errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.error= errorMessage;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
        const newUserInfo = res;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name,
    }).then(function() {
    // Update successful.
    }).catch(function(error) {
    // An error happened.
    });
}
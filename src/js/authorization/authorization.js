// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Notiflix from "notiflix";
import createPersonalCabinet from "../personal_cabinet/create-personal-cabinet";
import modalFill from "../personal_cabinet/cabinet-modal";
import storeAuth from "./storeAuth";

const googleLogin = document.querySelector("[google-auth]")
const twitterLogin = document.querySelector("[twitter-auth]")
const facebookLogin = document.querySelector("[facebook-auth]")
const registerBtn = document.querySelector("[register-btn]")
const signInBtn = document.querySelector("[sign-in-btn]")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqavfTUZDSNfAodjIsIbayLlfSMG5TINA",
  authDomain: "command-project-js-26372.firebaseapp.com",
  projectId: "command-project-js-26372",
  storageBucket: "command-project-js-26372.appspot.com",
  messagingSenderId: "496388065767",
  appId: "1:496388065767:web:a660a7b4d3c6a2974a5542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const twitterProvider = new TwitterAuthProvider(app);
const facebookProvider = new FacebookAuthProvider(app)

const auth = getAuth(app)

function register() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    Notiflix.Notify.failure('Your password less than 6 symbols or your email isnt correct')
    return
  }
  
  //Notiflix.Notify.success(`Congratulations! Your account was created!`)
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Notiflix.Notify.success(`Congratulations! Your account was created!`)
      document.getElementById('email').value = ""
      document.getElementById('password').value = ""
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

function validate_email(email) {
  const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
  if (expression.test(email) == true)
    return true
  else
      return false
}

function validate_password(password) {
  if (password.length < 6)
    return false
  else 
      return true
}

function validate_field(field) {
  if (field == null) {
    return false
  }
  else if (field.length < 1) {
    return false
  }
  else {
    return true
  }
}

registerBtn.addEventListener('click', (event) => {
  event.preventDefault()
  register()
})

signInBtn.addEventListener('click', (event) => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    // Signed in 
    const user = userCredential.user;
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""
    createPersonalCabinet(user.email[0].toUpperCase())

    document.querySelector('[auth-modal-open]').remove()
    document.querySelector("[auth-modal]").classList.add('is-hidden')
    Notiflix.Notify.success(`Congratulations! You was succesfully sign in!`)
    modalFill(user.email[0].toUpperCase(), user.email)
    storeAuth(user.email)
    location.href = location.href

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Notiflix.Notify.failure(errorMessage)
  });
})

googleLogin.addEventListener('click', (event) => {
  event.preventDefault()

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    Notiflix.Notify.success(`Thanks for your authorization ${user.email}`)
    document.querySelector("[auth-modal]").classList.add('is-hidden')
    createPersonalCabinet(user.email[0].toUpperCase())
    document.querySelector('[auth-modal-open]').remove()
    //successAuth(user.email)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    Notiflix.Notify.failure(errorMessage)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

twitterLogin.addEventListener('click', (event) => {
  event.preventDefault()

  signInWithPopup(auth, twitterProvider)
  .then((result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;

    // The signed-in user info.
    const user = result.user;

    Notiflix.Notify.success(`Thanks for your authorization ${user.displayName}`)

    createPersonalCabinet()
    document.querySelector('[auth-modal-open]').remove()
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    Notiflix.Notify.failure(errorMessage)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    // ...
  });
})

facebookLogin.addEventListener('click', (event) => {
  event.preventDefault()

  signInWithPopup(auth, facebookProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    Notiflix.Notify.success(`Thanks for your authorization ${user.displayName}`)

    createPersonalCabinet()
    document.querySelector('[auth-modal-open]').remove()
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    Notiflix.Notify.failure(errorMessage)
    // ...
  });
})
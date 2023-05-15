/**
 * Function called when clicking the Login/Logout button.
 */
function handleGoogleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);
  } else {
    alert("already signed in as " + firebase.auth().currentUser.email);
  }


  //document.getElementById('quickstart-sign-in').disabled = true;
}

/**
 * Handles the sign in button press.
 */
function handleSignIn() {
  if (firebase.auth().currentUser) {
    alert("already signed in as " + firebase.auth().currentUser.email);
  } 
  else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      //document.getElementById('quickstart-sign-in').disabled = false;
    });
    alert("signed in");
  }
  //document.getElementById('quickstart-sign-in').disabled = true;
}

function handleSignOut() {
  alert("signing out");
  if(firebase.auth().currentUser) {
    firebase.auth().signOut();
  } 
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    alert('Email Verification Sent!');
  });
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    alert('Password Reset Email Sent!');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    //document.getElementById('quickstart-verify-email').disabled = true;
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      if(document.getElementById('auth-status')) {
        document.getElementById('auth-status').textContent = 'Signed in';
        document.getElementById('auth-account-details').textContent = JSON.stringify(user, null, '  ');
      }
      document.getElementById("button-details").classList.remove("no-display");
      document.getElementById("button-sign-out").classList.remove("no-display");
      document.getElementById("button-sign-in").classList.add("no-display");
      document.getElementById("button-sign-up").classList.add("no-display");
      document.getElementById("button-reset-password").classList.add("no-display");
      /*if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }*/
    } else {
      // User is signed out.
      if(document.getElementById('auth-status')) {
        document.getElementById('auth-status').textContent = 'Signed out';
        document.getElementById('auth-account-details').textContent = 'null';
      }
      document.getElementById("button-details").classList.add("no-display");
      document.getElementById("button-sign-out").classList.add("no-display");
      document.getElementById("button-sign-in").classList.remove("no-display");
      document.getElementById("button-sign-up").classList.remove("no-display");
      document.getElementById("button-reset-password").classList.remove("no-display");
    }
    //document.getElementById('auth-in').disabled = false;
  });

  /*document.getElementById('auth-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('auth-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('auth-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('auth-password-reset').addEventListener('click', sendPasswordReset, false);*/
}

window.onload = function() {
  initApp();
};
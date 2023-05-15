/**
 * reads data from database
 * 
 * eg. getData("users/" + uid).then((data) => {..});
 */

function getData(ref_str) {
  return firebase.database().ref(ref_str).get();
}

/**
 * writes data to database
 * 
 * eg. setData("users/" + uid, {json});
 */

function setData(ref_str, data) {
  firebase.database().ref(ref_str).set(data);
}

/**
 * updates data in database
 */

function updateData(data) {
  firebase.database().ref().update(data);
}

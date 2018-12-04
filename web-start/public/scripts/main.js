/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var currentChatKey = ""; // 현재 선택된 채팅방
var currentChatUserInfo = []; // 위의 채팅방에 존재하는 유저들의 정보

// Signs-in Friendly Chat.

// Signs-out of Friendly Chat.
function signOut() { // 로그아웃.
  firebase.auth().signOut();
  // TODO 2: Sign out of Firebase.
}

var userPicElement = document.getElementById('profile-img');
var signOutButtonElement = document.getElementById('sign-out');

var userNameElement = document.getElementById('user-name');
var messageListElement = document.getElementById('message-box');
var messageFormElement = document.getElementById('message-form');

var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');

signOutButtonElement.addEventListener('click', signOut); // 로그아웃.

// Initiate firebase auth.
function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
  // TODO 3: Initialize Firebase.
}
function authStateObserver(user) { // 유저 상태가 변했을 떄
  if (user) { // User is signed in! // 로그인 상태일 때
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.src=profilePicUrl;
    userNameElement.textContent = userName;


    getChatList(); // 현재 로그인 한 유저의 채팅방 리스트 불러오기
    // We save the Firebase Messaging Device token and enable notifications.
    //saveMessagingDeviceToken();*/
  } else { // 로그아웃 됐을 때
    location.href="/login.html"; // 로그인 페이지로 이동
  }
}

function getUserName() { //현재 로그인 되어 있는 유저의 이름 가져오기
  return firebase.auth().currentUser.displayName;
}

function getProfilePicUrl() { // 현재 로그인 한 유저의 프로필 사진 불러오기, 없을 시 기본 사진 불러오기
  return firebase.auth().currentUser.photoURL || 'https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg';
}


function getUserUid(){ //현재 로그인 한 유저의 uid 불러오기
  return firebase.auth().currentUser.uid
}


function getChatList(){ // 현재 로그인 한 유저의 채팅방 리스트 불러오기
  var callback = function(snap) {
    var data = snap.val(); // 불러온 정보(snap)를 javascript로 사용할 수 있게 변경
    displayChatlist(snap.key, data.room_name);
  }
  var chatListRef = firebase.database().ref('/user_list/'+getUserUid()+'/room_list/').on('child_added', callback); // 자기 정보에 존재하는 채팅방 리스트 불러오기
                                                                                                                   // child_added 는 해당 데이터베이스에 데이터가 추가된 상태. 추가 됐는지 아닌지 계속 체크하다 child_added 됐을 시 callback 함수를 실행.
}

function displayChatlist(key,name) { // 채팅방 리스트에 채팅방 추가 함수
  var CHAT_LIST_TEMPLATE =  // 채팅방 이름이 들어갈 리스트 템플릿. html과 같음.
      '<div class="wrap"><div class="meta">' +
      '<p class="name"></p>' +
      '</div></div>';
  var chatListElement = document.getElementById("chat_list");

    var container = document.createElement('li'); // 채팅방 HTML list element 생성 부분.
    container.setAttribute('class', 'contact'); // 채팅방 HTML list element의 class에 contact 할당.
    container.setAttribute('id', key); // 채팅방 HTML list element의 id에 key 할당.
    container.innerHTML = CHAT_LIST_TEMPLATE; // container 안의 html을 CHAT_LIST_TEMPLATE으로.
    var div = container.firstChild; // container의 첫번째 자식을 div 변수에 할당.

  var nameElement = div.querySelector('.name'); // div안에서 name 클래스를 가진 element를 찾아 nameElement에 할당.
  nameElement.textContent = name; // nameElement의 text부분에 name 할당.
  container.addEventListener('click' , function(e){ // container(채팅방) 눌렸을 떄.
    firebase.database().ref('/chat_list/'+currentChatKey+'/user/').off(); // firebase DB에서 유저 정보 가져옴.
    firebase.database().ref('/chat_list/'+currentChatKey+'/message/').off(); // firebase DB에서 메세지 정보 가져옴.
    $("#chat_list>li.active").removeClass("active"); // (CSS 조작) - 기존 눌렸던 채팅방. chat_list id를 가진 것 중에서(>) list element 중에서 클래스가 active인 element를 찾아서 active클래서 삭제.
    $(this).addClass("active"); // (CSS 조작) - 새로 눌린 채팅방. 클래스에 active 추가.
    $("#message-box").html(''); // 기존 눌렸던 채방의 채팅 정보 삭제. id가 message-box인 것을 찾아서 html을 빈 칸으로 바꿈.
    currentChatKey = $(this).find(".name").text(); // 지금 현재 채팅 방의 이름을 변수로 할당.
    currentChatUserInfo = []; // 기존 채팅방에 존재하는 유저의 정보를 삭제.
    classClick(currentChatKey); // 새로 입장한 채팅방에 유저 정보를 삭제.
  });
  chatListElement.appendChild(container);
}

function addUserInfo(snap){ // currentChatUserInfo에 현재 선택된 채팅방의 유저 정보 넣기.
  var childData = snap.val();
      var info = {
        name : childData.name,
        uid : snap.key,
        picUrl : childData.profilePicUrl
      }
      currentChatUserInfo.push(info);
}

function classClick(chatKey){ // 현재 채팅방에 존재하는 유저의 정보 불러오기.
  firebase.database().ref('/chat_list/'+chatKey+'/user/').once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      addUserInfo(childSnapshot);
      loadMessages(chatKey);
      firebase.database().ref('/chat_list/'+chatKey+'/user/').on('child_added', function(snapshot){
        addUserInfo(childSnapshot);
      });
    });
  });
}

function loadMessages(chatKey) { // 현재 선택된 채팅방의 메세지 db에서 불러오기
  var callback = function(snap){
    var data = snap.val();
    for(var i = 0 ; i < currentChatUserInfo.length;i++){
      if(currentChatUserInfo[i]['uid']==data.user){
        var send = false;
        if(data.user == getUserUid()){
          send = true
        }
        displayMessage(snap.key,currentChatUserInfo[i]['name'],data.text,currentChatUserInfo[i]['picUrl'], send,data.imageUrl);
        break;
      }
    }
  }
  firebase.database().ref('/chat_list/'+chatKey+'/message/').limitToLast(12).on('child_added', callback);
  firebase.database().ref('/chat_list/'+chatKey+'/message/').limitToLast(12).on('child_changed', callback);
}

function displayMessage(key, name, text, picUrl, send,imageUrl) { // 메세지 보여주기.
  var li = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!li) {
    var li = document.createElement('li');
    li.innerHTML = '<img class="pic" src="">'+
                          '<div class="send_name"></div>'+
                          '<p class="message"></p>'+
                          '<i class="fas fa-heart like" style="font-size:12px;" aria-hidden="true"> 0</i>';
    li.setAttribute('id', key);
    if(send){
      li.setAttribute('class','sent');
    } else{
      li.setAttribute('class','replies');
    }
    messageListElement.appendChild(li);
  }
  if (picUrl) {
    li.querySelector('.pic').src=picUrl
  }
  li.querySelector('.send_name').textContent = name;
  var messageElement = li.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUrl) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      messageListElement.scrollTop = messageListElement.scrollHeight;
    });
    image.src = imageUrl + '&' + new Date().getTime();
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {li.classList.add('visible')}, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
 // messageInputElement.focus();
}

function saveMessage(messageText) { // DB에 메세지 저장하기.
  // Adds a new message entry to the Realtime Database.
  return firebase.database().ref('/chat_list/'+currentChatKey+'/message/').push({
   user: getUserUid(),
   text: messageText
 }).catch(function(error) {
   console.error('Error writing new message to Realtime Database:', error);
 });
}

messageFormElement.addEventListener('submit', onMessageFormSubmit);

function onMessageFormSubmit(e) {
  e.preventDefault();
  if (messageInputElement.value && (currentChatKey!="")) {
    saveMessage(messageInputElement.value).then(function() {
      // Clear message text field and re-enable the SEND button.
      $('.message-input input').val(null);
      toggleButton();
    });
  } else if(currentChatKey==""){
    $('.message-input input').val(null);
    alert("채팅방 입장 후 입력이 가능합니다.");
  }
  // Check that the user entered a message and is signed in.
}

function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

/*
// Returns the signed-in user's profile Pic URL.


// Returns the signed-in user's display name.


// Returns true if a user is signed-in.
function isUserSignedIn() {

  return !!firebase.auth().currentUser;
  // TODO 6: Return true if a user is signed-in.
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
  var callback = function(snap) {
    var data = snap.val();
    displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
  };
  firebase.database().ref('/messages/').limitToLast(12).on('child_added', callback);
  firebase.database().ref('/messages/').limitToLast(12).on('child_changed', callback);
  // TODO 7: Load and listens for new messages.
}

// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
   // Adds a new message entry to the Realtime Database.
   return firebase.database().ref('/messages/').push({
    name: getUserName(),
    text: messageText,
    profilePicUrl: getProfilePicUrl()
  }).catch(function(error) {
    console.error('Error writing new message to Realtime Database:', error);
  });
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  firebase.database().ref('/messages/').push({
    name: getUserName(),
    imageUrl: LOADING_IMAGE_URL,
    profilePicUrl: getProfilePicUrl()
  }).then(function(messageRef) {
    // 2 - Upload the image to Cloud Storage.
    var filePath = firebase.auth().currentUser.uid + '/' + messageRef.key + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
      // 3 - Generate a public URL for the image file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        // 4 - Update the chat message placeholder with the image's URL.
        return messageRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    });
  }).catch(function(error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  });
  // TODO 9: Posts a new image as a message.
}

// Saves the messaging device token to the datastore.
function saveMessagingDeviceToken() {
  firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      // Save the device token to the Realtime Database.
      firebase.database().ref('/fcmTokens').child(currentToken)
          .set(firebase.auth().currentUser.uid);
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  }).catch(function(error){
    console.error('Unable to get messaging device token:', error);
  });
  // TODO 10: Save the device token in the realtime datastore
}

// Requests permissions to show notifications.
function requestNotificationsPermissions() {
  // TODO 11: Request permissions to send notifications.
}

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  imageFormElement.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return;
  }
  // Check if the user is signed-in
  if (checkSignedInWithMessage()) {
    saveImageMessage(file);
  }
}

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (messageInputElement.value && checkSignedInWithMessage()) {
    saveMessage(messageInputElement.value).then(function() {
      // Clear message text field and re-enable the SEND button.
      resetMaterialTextfield(messageInputElement);
      toggleButton();
    });
  }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
  return false;
}

// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Displays a Message in the UI.
function displayMessage(key, name, text, picUrl, imageUrl) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    messageListElement.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUrl) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      messageListElement.scrollTop = messageListElement.scrollHeight;
    });
    image.src = imageUrl + '&' + new Date().getTime();
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
  messageInputElement.focus();
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');


// Saves message on form submit.
messageFormElement.addEventListener('submit', onMessageFormSubmit);


// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// Events for image upload.
imageButtonElement.addEventListener('click', function(e) {
  e.preventDefault();
  mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener('change', onMediaFileSelected);
*/

var addClassElement = document.getElementById('addclass'); // add class 버튼 불러오기

addClassElement.addEventListener('click', function(e){ // add class 버튼이 클릭됐을때 채팅방 추가하는 알림창 띄우기
    $("#myModal").modal('show')
});

$("#add-class-modal-btn").on('click', function() { // 채팅방 추가 알림창에서 추가하기 버튼 클릭했을 시
  var chatListRef = firebase.database().ref('chat_list/'+$("#chat-name-input").val());
  chatListRef.once('value', function(snapshot) { // 해당 목록에 존재하는 데이터 한번만 불러오기 https://firebase.google.com/docs/database/web/read-and-write?hl=ko
    if(snapshot.val()!=null){ // 해당 이름을 가진 채팅방이 존재할 시
      if(snapshot.val().code== $("#chat-code-input").val()){ // 해당 채팅방의 코드와 입력한 코드가 일치 할 시
        addRoomListInMyInfo($("#chat-name-input").val());
        updateMyInfoInChatRoom($("#chat-name-input").val());
      } else{ // 해당 채팅방의 코드와 입력한 코드가 일치하지 않을 시
        $("#myModal").modal('hide');
        alert("코드가 일치 하지 않습니다. 다시 시도 해 주세요")
      }
    } else { // 해당 이름을 가진 채팅방이 존재하지 않을 시
      $("#myModal").modal('hide');
      $("#confirmModal").modal('show'); // 해당 코드로 채팅방 생성할 것 인지 묻는 알림창 띄우기
    }
  });
});

$("#create-class-modal-btn").on('click', function(){ // 생성 하기 클릭 시
  firebase.database().ref('chat_list/'+$("#chat-name-input").val()+'/').set({ // 데이터 베이스에 Chat_list 항목에 해당 이름과 코드을 가진 채팅방 데이터베이스 생성
    code: $("#chat-code-input").val()                                         // set은 내가 정한 key값(과목이름)으로 데이터 넣기 https://firebase.google.com/docs/database/web/lists-of-data?hl=ko
  },function(error) {
    if (error) {  // 에러 생겼을 시
     alert("에러 발생!");
    } else { // 에러 없을 시
      addRoomListInMyInfo($("#chat-name-input").val());
      updateMyInfoInChatRoom($("#chat-name-input").val());
    }
  });
});

function addRoomListInMyInfo(name){ // 내가 가지고 있는 룸 리스트에 채팅방 추가 하기
  firebase.database().ref('user_list/'+getUserUid()+'/room_list').push({ // push는 firebase에서 겹치지 않는 key값으로 넣기 https://firebase.google.com/docs/database/web/lists-of-data?hl=ko
    room_name: name
  }, function(err){
    if(err){ // 에러 생겼을 시
      alert("에러 발생!");
    } else{ // 에러 없을 시
      $("#myModal").modal('hide');
      $("#confirmModal").modal('hide');
    }
  });
}

function updateMyInfoInChatRoom(chatKey){ // 룸 정보에 유저 정보 넣기
  firebase.database().ref('chat_list/'+chatKey+'/user/'+getUserUid()).update({ // push는 firebase에서 겹치지 않는 key값으로 넣기 https://firebase.google.com/docs/database/web/lists-of-data?hl=ko
    name: getUserName(),
    profilePicUrl: getProfilePicUrl()
  }, function(err){
    if(err){ // 에러 생겼을 시

    } else{ // 에러 없을 시
      firebase.database().ref('chat_list/'+chatKey+'/message/').push({ // push는 firebase에서 겹치지 않는 key값으로 넣기 https://firebase.google.com/docs/database/web/lists-of-data?hl=ko
        text: getUserName()+"님이 입장하셨습니다.",
        user: getUserUid()
      })
    }
  });
}

// initialize Firebase
initFirebaseAuth();


// We load currently existing chat messages and listen to new ones.
//loadMessages();

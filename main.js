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

var maxList=[];
var currentChatKey = ""; 
var currentChatUserInfo = [];

// Signs-in Friendly Chat.

// Signs-out of Friendly Chat.
function signOut() {
  firebase.auth().signOut();
  // TODO 2: Sign out of Firebase.
}


var userPicElement = document.getElementById('profile-img');
var signOutButtonElement = document.getElementById('sign-out');

var userNameElement = document.getElementById('user-name');
var messageListDiv = document.getElementById('messages-list')
var messageListElement = document.getElementById('message-box');
var messageFormElement = document.getElementById('message-form');

var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageAddButtonElement = document.getElementById('image_add');


var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');



//var mediaCaptureElement = document.getElementById('mediaCapture');
var rankElement = document.getElementById('rankIcon');
rankElement.addEventListener('click', ranking);


signOutButtonElement.addEventListener('click', signOut);

// Initiate firebase auth.
function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
  // TODO 3: Initialize Firebase.
}
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.src=profilePicUrl;
    userNameElement.textContent = userName;

    
    getChatList();
    // We save the Firebase Messaging Device token and enable notifications.
    //saveMessagingDeviceToken();*/
  } else { // 로그아웃 됐을 때
    location.href="/login.html";
  }
}

function getUserName() { //현재 로그인 되어 있는 유저의 이름 가져오기
  return firebase.auth().currentUser.displayName;
}

function getProfilePicUrl() { // 현재 로그인 한 유저의 프로필 사진 불러오기, 없을 시 기본 사진 불러오기
  return firebase.auth().currentUser.photoURL || 'https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg';
}

function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

function getUserUid(){ //현재 로그인 한 유저의 uid 불러오기
  return firebase.auth().currentUser.uid
}

function checkSignedInWithMessage() {
  if (isUserSignedIn()) {
    return true;
  }
}


function getChatList(){ // 현재 로그인 한 유저의 채팅방 리스트 불러오기
  var callback = function(snap) {
    var data = snap.val(); // 불러온 정보(snap)를 javascript로 사용할 수 있게 변경
    displayChatlist(snap.key, data.room_name);

    firebase.database().ref('/chat_list/'+data.room_name+'/user/'+getUserUid()+'/like_num').on('value',function(snapshot){//채티방 리스트에 존재하는 자기 아이디의 좋아요 개수 불러오기
      displayChatLikeList(snapshot.key, data.room_name,snapshot.val());
    });
  }
  firebase.database().ref('/user_list/'+getUserUid()+'/room_list/').on('child_added', callback); // 자기 정보에 존재하는 채팅방 리스트 불러오기
                                                                                                                   // child_added 는 해당 데이터베이스에 데이터가 추가 됐을 시 callback 함수를 실행하라는 의미
}
function displayChatLikeList(key, name,number){ //채팅방 좋아요 요소 불러오는 부분
  var chatLikeListElement = document.getElementById("chat-like-list"); // 채팅방 좋아요 리스트 넣는 요소 찾기
  var likeContainer;
  if(document.getElementById(name)){
    likeContainer =  document.getElementById(name);
  } else{
    likeContainer = document.createElement('li'); //채팅방 좋아요 리스트 생성
    likeContainer.setAttribute('class', 'chat-like'); 
    likeContainer.setAttribute('id', name);
  }

  likeContainer.innerHTML = name+'<span class="like-num">'+number+'</span>' //채팅방 좋아요 관련 정보 업데이트
  chatLikeListElement.appendChild(likeContainer);
}

function displayChatlist(key,name) { // 채팅방 리스트에 채팅방 추가 함수
  var CHAT_LIST_TEMPLATE =  // 채팅방 이름이 들어갈 리스트 템플릿. html과 같음.
      '<div class="wrap"><div class="meta">' +
      '<p class="name"></p>' +
      '</div></div>';

  var chatListElement = document.getElementById("chat_list");

  var container = document.createElement('li');
  container.setAttribute('class', 'contact');
  container.setAttribute('id', key);
  container.innerHTML = CHAT_LIST_TEMPLATE;
  var div = container.firstChild;
  
  var nameElement = div.querySelector('.name');
  nameElement.textContent = name;
  container.addEventListener('click' , function(e){
    firebase.database().ref('/chat_list/'+currentChatKey+'/user/').off();
    firebase.database().ref('/chat_list/'+currentChatKey+'/message/').off();
    $("#chat_list>li.active").removeClass("active");
    $(this).addClass("active");
    $("#message-box").html('');
    currentChatKey = $(this).find(".name").text();
    $("#chat-name").html(currentChatKey+" "+'&nbsp;&nbsp;<i class="fas fa-users"></i> <span id="chatUserCount"></span>');
    currentChatUserInfo = [];
    classClick(currentChatKey);
  });
  chatListElement.appendChild(container);
}

function addUserInfo(snap){
  var childData = snap.val();
  
      var info = {
        name : childData.name,
        uid : snap.key,
        picUrl : childData.profilePicUrl
      }

      //on에서 넘어온 유저 push될 때마다 length세서 참가인원수 표시.
      currentChatUserInfo.push(info);
      document.getElementById('chatUserCount').innerHTML = currentChatUserInfo.length;
      // document.getElementById('chatUserCount').text('3');

}

function classClick(chatKey){
  // firebase.database().ref('/chat_list/'+chatKey+'/user/').once('value',function(snapshot){ //새로고침 안해도 입장 메세지 보임.
  //     addUserInfo(snapshot);
  // });

  


  // child_added로 on 해둬도 어차피 초기화 하기 때문에 두번 쓸 필요 없어용. 구래서 위에 주석 해둠!
  var o = true;
  firebase.database().ref('/chat_list/'+chatKey+'/user/').on('child_added', function(snapshot){

    addUserInfo(snapshot);
    if(o){
      loadMessages(chatKey);  
      o = false;
    }

  });
}

function loadMessages(chatKey) {
  var callback = function(snap){
    var data = snap.val();
    for(var i = 0 ; i < currentChatUserInfo.length;i++){
      if(currentChatUserInfo[i]['uid']==data.user){
        var send = false;
        if(data.user == getUserUid()){
          send = true
        }
        var count;
        if(data.likeUserList==null){
          count = 0;
        } else{
          count = Object.keys(data.likeUserList).length;
        }
          // 2018. 12. 15. 메세지 받아올 때 좋아요 눌렀던 메세지일 때 하트 색 빨간 색으로. - 이원영
        var itsme = false; 
        if(data.likeUserList !== undefined && data.likeUserList[getUserUid()]){
          itsme = true;
        }
        // 파라메터 itsme 추가.        
        displayMessage(snap.key,currentChatUserInfo[i]['name'],data.text,currentChatUserInfo[i]['picUrl'], send,data.imageUrl, data.createdAt, count,currentChatUserInfo[i]['uid'], itsme);
        break;
      
      }
    }
  }
  firebase.database().ref('/chat_list/'+chatKey+'/message/').limitToLast(12).on('child_added', callback);
  firebase.database().ref('/chat_list/'+chatKey+'/message/').limitToLast(12).on('child_changed', callback);
}

function displayMessage(key, name, text, picUrl, send,imageUrl, createdAt, likeNum,messageUid, itsme = false) {
  var li = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!li) {
    li = document.createElement('li');


    li.innerHTML = '<img class="pic" src="">'+
                          '<div class="send_name"></div>'+
                          '<p class="message"></p>' +

                          '<i class="fas fa-heart like " style="font-size:12px; '+(itsme ? 'color:red;' : '')+'" aria-hidden="true"> 0</i>'+
                          '<label class="time" style="font-size: 7px; vertical-align: top;"></label>' ;

    li.setAttribute('id', key);
    if(send){
      li.setAttribute('class','sent');
    } else{
      li.setAttribute('class','replies');
    }
    messageListElement.appendChild(li);
  }
  var likeElement = li.querySelector('.like');
    likeElement.textContent = " "+likeNum;

    likeElement.onclick = function(e){
      var isUser = 0;
      firebase.database().ref('/chat_list/'+currentChatKey+'/message/'+$(this).parent().attr('id')+'/user/').transaction(function(user1){
        if(user1==getUserUid()){//본인 메세지인지 확인
          isUser = 1;//본인 메세지인 경우 isUser를1로

        }

      });
       

      if(isUser==0){//본인 메세지가 아닌 경우에만 좋아요 버튼 누르면 효과 있음
      
      firebase.database().ref('/chat_list/'+currentChatKey+'/message/'+$(this).parent().attr('id')+'/likeUserList/').transaction(function(result){

        var plusminus = 1;
        if(result){

          // 유저 리스트에 본인이 있는 경우
          if(result[getUserUid()]){

            likeElement.style.color="#32465a";  
            delete result[getUserUid()]; //리스트에서 본인 삭제 
            plusminus = -1;
          } else{
            likeElement.style.color="red";  
            result[getUserUid()] ={temp : 'temp'}; // 유저리스트에 본인이 없는 경우
          }
          

        } else{
          result = {}; 
          likeElement.style.color="red";  
          result[getUserUid()] ={temp : 'temp'}; // 메세지에 좋아한 유저가 없었을 때

          
        }


        firebase.database().ref('/chat_list/'+currentChatKey+'/user/'+messageUid+'/like_num').transaction(function(number) {
  
          if (number) {
            
              number = number + plusminus;

          } else{
            number = 1;
          }
          return number;
        });


        return result;
      });
}


  };

    
  if (picUrl) {
    li.querySelector('.pic').src=picUrl
  }
  li.querySelector('.send_name').textContent = name;

 li.querySelector('.time').textContent = createdAt;

  var messageElement = li.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  }
  else if (imageUrl) { // 이미지 메세지였다면
    var image = document.createElement('img');
    image.addEventListener('load', function() {
//    messageListDiv.scrollTop = messageListDiv.scrollHeight;
    image.style.borderRadius="0%";
    image.style.margin="0px 0px 0px 0px";
    image.style.height="auto"; //크기 조절
    image.style.width="280px";
    });
    image.src = imageUrl + '&' + new Date().getTime();
    messageElement.innerHTML = '';
    messageElement.appendChild(image);

  }

  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {li.classList.add('visible')}, 1);
  messageListDiv.scrollTop = messageListDiv.scrollHeight;
 // messageInputElement.focus();
}


function saveMessage(messageText) {
  // Adds a new message entry to the Realtime Database.
  var t = new Date(+new Date()+(1000*60*60*9));
  return firebase.database().ref('/chat_list/'+currentChatKey+'/message/').push({
   user: getUserUid(),
   text: messageText,
   createdAt: t.getUTCFullYear()+"."+ (t.getUTCMonth()+1) +"."+t.getUTCDate()+"   /   "+(t.getUTCHours())%24+":"+new Date().getUTCMinutes()
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
    }
  });
});

function addRoomListInMyInfo(name){ // 내가 가지고 있는 룸 리스트에 채팅방 추가 하기
  firebase.database().ref('user_list/'+getUserUid()+'/room_list').once('value', function(snapshot){
    var myRoomarr = [];                   // 내가 가지고 있는 채팅방 임시 저장 배열
    snapshot.forEach(function(childSnapshot) {  //내가 가지고있는 채팅방 이름 불러오기
      myRoomarr.push(childSnapshot.val().room_name);
    });
    var check = true;
    for(var i = 0 ; i < myRoomarr.length; i++){ // 만약 내가 가지고 있는 채팅방과 같은 이름의 채팅방 값이 들어왔을 시 false
      if(myRoomarr[i]==name){
        check = false;
      }
    }
    if(check){
      updateMyInfoInChatRoom(name);
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
    } else{
      alert("이미 존재하는 채팅방입니다!");
      $("#myModal").modal('hide');
      $("#confirmModal").modal('hide');
    };
  });
}

function updateMyInfoInChatRoom(chatKey){ // 룸 정보에 유저 정보 넣기
  firebase.database().ref('chat_list/'+chatKey+'/user/'+getUserUid()).update({ // push는 firebase에서 겹치지 않는 key값으로 넣기 https://firebase.google.com/docs/database/web/lists-of-data?hl=ko
    name: getUserName(),
    profilePicUrl: getProfilePicUrl(),
    like_num : 0
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



var deleteClassElement = document.getElementById('deleteclass'); // delete class 버튼 불러오기
deleteClassElement.addEventListener('click', function(e){ // delete class 버튼이 클릭됐을때 채팅방 추가하는 알림창 띄우기
    $("#myModal2").modal('show')
});

$("#delete-class-modal-btn").on('click', function() { // 채팅방 삭제 알림창에서 삭제하기 버튼 클릭했을 시
  var chatListRef = firebase.database().ref('chat_list/'+$("#chatToDelete-name-input").val());
  chatListRef.once('value', function(snapshot) { // 해당 목록에 존재하는 데이터 한번만 불러오기 https://firebase.google.com/docs/database/web/read-and-write?hl=ko
    if(snapshot.val()!=null){ // 해당 이름을 가진 채팅방이 존재할 시
      deleteRoomListInMyInfo($("#chatToDelete-name-input").val());  //삭제
      }
    else { // 해당 이름을 가진 채팅방이 존재하지 않을 시
      $("#myModal2").modal('hide');
      alert("해당 이름의 채팅방이 존재하지 않습니다")
    }
  });
});


function deleteRoomListInMyInfo(name){ // 내가 가지고 있는 룸 리스트에 채팅방 삭제 하기

  var keyVal;

  var ref = firebase.database().ref('user_list/'+getUserUid()+'/room_list');
  if (ref.orderByChild('room_name').equalTo(name).on("value", function(snapshot) {
      snapshot.forEach((function(child) { keyVal=child.key;  })) }) )
  {
      deleteMyInfoInChatRoom(name);
      firebase.database().ref('user_list/'+getUserUid()+'/room_list/'+keyVal).remove();
      $("#myModal2").modal('hide');
      window.location.reload();
    }
  else{
    alert("존재하지 않는 채팅방입니다!");
    $("#myModal2").modal('hide');
  };

}

function deleteMyInfoInChatRoom(chatKey){ // 룸 정보에서 유저 정보 빼기
  firebase.database().ref('chat_list/'+chatKey+'/user/'+getUserUid()).remove();
  firebase.database().ref('chat_list/'+chatKey+'/message/').push({
    text: getUserName()+"님이 퇴장하셨습니다.",
  });

}

//랭킹
function ranking(){
  if(currentChatKey ==""){
  alert("채팅방에 접속 후 이용이 가능합니다.")
} else{
  var likeNumArr = [];     // 좋아요 개수들의 배열
  var likeOwnerArr=[];  //좋아요 주인이름의 배열
  firebase.database().ref('/chat_list/'+currentChatKey+'/user/').once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot) {  //좋아요 개수들의 배열 불러오기
      if(childSnapshot.val().like_num){  //좋아요 받은 기록이 있다면
        likeNumArr.push(childSnapshot.val().like_num); //좋아요 배열에 좋아요 수 저장
        likeOwnerArr.push(childSnapshot.val().name);  //이름 배열에 사람 이름 저장
      }
    });
  })
  for (var i=1; i<likeNumArr.length; i++){  //like_num 내림차순으로 배열 정렬
    var key= likeNumArr[i];
    var name=likeOwnerArr[i];
    for (var j=i-1; j>=0 && likeNumArr[j]<key; j--){
      likeNumArr[j+1]=likeNumArr[j];
      likeOwnerArr[j+1]=likeOwnerArr[j];
    }
    likeNumArr[j+1]=key;
    likeOwnerArr[j+1]=name;
  }

  maxList=[];
  for(var i=0; i<5 ; i++){  //최댓값 5개 가져오기-> 배열 길이는 10개(이름, 좋아요수 순으로)가 됨
    if(likeNumArr[i]) //데이터 있으면
      maxList.push(likeOwnerArr[i],likeNumArr[i]);
    else { //빈 데이터면
      maxList.push("순위 없음", null);
    }
  } //좋아요 숫자에 접근하려면 2*i, 이름에 접근하려면 2*i+1 로 해야함

  createChart();
  $("#rankModal").modal('show');
}
}

function createChart(){

  $('#rankModal').modal({ //초기화..
      refresh: true
  });
  var chart;
  //chart 생성하기!!!!!!!!!!
    am4core.useTheme(am4themes_animated);
    chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingBottom = 30;
    chart.data = [{
        "name": maxList[0],
        "steps": maxList[1]
    }, {
        "name": maxList[2],
        "steps": maxList[3]
    }, {
        "name": maxList[4],
        "steps": maxList[5]
    }, {
        "name": maxList[6],
        "steps": maxList[7]
    }, {
        "name": maxList[8],
        "steps": maxList[9]
    }];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    var series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = "steps";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = - 6;
    series.columnsContainer.zIndex = 100;

    var columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 30;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
    series.mainContainer.mask = undefined;

    var cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    var bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 15;
    bullet.valign = "bottom";
    bullet.align = "center";
    bullet.isMeasured = true;
    bullet.interactionsEnabled = false;
    bullet.verticalCenter = "bottom";

    var hoverState = bullet.states.create("hover");

    var outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function (radius, target) {
        var circleBullet = target.parent;
        return circleBullet.circle.pixelRadius + 10;
    })

    var previousBullet;
    chart.cursor.events.on("cursorpositionchanged", function (event) {
        var dataItem = series.tooltipDataItem;

        if (dataItem.column) {
            var bullet = dataItem.column.children.getIndex(1);

            if (previousBullet && previousBullet != bullet) {
                previousBullet.isHover = false;
            }

            if (previousBullet != bullet) {

                var hs = bullet.states.getKey("hover");
                hs.properties.dy = -bullet.parent.pixelHeight + 30;
                bullet.isHover = true;

                previousBullet = bullet;
            }
        }
    })
}

// 이미지 업로드를 위한 이벤트 처리
imageButtonElement.addEventListener('click', function(e) {
  e.preventDefault();
  mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener('change', onMediaFileSelected);


var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';  //로딩 아이콘

// Firebase에 image 메세지를 저장
// Cloud Storage에 이미지를 먼저 저장함
function saveImageMessage(file) {
  // 1 -메세지 placeholder 만들어서 로딩 아이콘 보여주기
  firebase.database().ref('/chat_list/'+currentChatKey+'/message/').push({
    user: getUserUid(),
    imageUrl: LOADING_IMAGE_URL,
    createdAt: new Date().getUTCFullYear()+"."+ (new Date().getUTCMonth()+1) +"."+new Date().getUTCDate()+"   /   "+(new Date().getUTCHours()+9)%24+":"+new Date().getUTCMinutes()
//    profilePicUrl: getProfilePicUrl()
  }).then(function(messageRef) {
    // 2 - Cloud Storage에 이미지를 업로드
    var filePath = firebase.auth().currentUser.uid + '/' + messageRef.key + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
      // 3 - 이미지 파일로부터 public URL 만들기
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        // 4 - 이미지 URL로 메세지 placeholder 업데이트
        return messageRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    });
  }).catch(function(error) {
    console.error('Cloud Storage에 업로드하던 중 에러가 발생했습니다:', error);
  });
}

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  imageFormElement.reset();


  // Check if the user is signed-in
  if (checkSignedInWithMessage()) {
    saveImageMessage(file);
  }
}


// initialize Firebase
initFirebaseAuth();

var wCloudElement = document.getElementById('word-Cloud');

wCloudElement.addEventListener('click', goWordCloud);

function goWordCloud(){
  if(currentChatKey ==""){
    alert("채팅방에 접속 후 이용이 가능합니다.")
  } else{
    window.open('wordcloud.html?chatkey='+currentChatKey,'pop', 'menubar=no,status=no,scrollbars=no,resizable=no ,width=800,height=600,top=50,left=50');
  }
}


// We load currently existing chat messages and listen to new ones.
//loadMessages();

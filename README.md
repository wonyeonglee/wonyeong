"KINTERACT: "
============
### 수업 중 단체 웹 채팅
------------


# 1. 앱 Kinteract
## 1.1 앱 설명
>Kinteract는 K와 interact의 합성어로서, K= I(In) + C(Class)로 수업중 소통한다는 의미를 담고있습니다.
>Kinteract의 이름에서 알 수 있듯이 In Class, 즉 수업 시간에 활용하거나 질문을 돕는 웹 채팅입니다. 
>Kinteract 채팅 웹을 통해 좋아요-가산점 기능, 단체 채팅, word cloud을 주요 기능으로 구현하였습니다.

## 1.2 앱 설치 방법 및 사용법
## 1.3 주요기능및 관련 코드/API 설명

### - Ranking 
랭킹 표시 기능. 각 채팅방에 저장되어 있는 유저들의 좋아요 개수 목록을 불러와 내림차순으로 정렬 후 최댓값 5개 데이터의 사용자 이름, 받은 좋아요 개수를 저장한다. 이 데이터를 기반으로 랭킹 차트 생성하여 모달에 표시한다. 차트 생성하는 함수는 amChart에서 참고한 것으로, 

```
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
  for(var i=0; i<5 ; i++){ 
    if(likeNumArr[i]) //데이터 있으면
      maxList.push(likeOwnerArr[i],likeNumArr[i]);
    else //빈 데이터면
      maxList.push("순위 없음", null);
  } 
  createChart();  //차트 생성
  $("#rankModal").modal('show');  //모달 띄우기
 }
}

function createChart(){
  $('#rankModal').modal({   // 채팅방마다 새로운 모달이 생성될 수 있도록
      refresh: true // refresh 시키기
  });
  var chart;  //chart 생성할 변수 선언
  am4core.useTheme(am4themes_animated); // 애니메이션 효과 주기 위해 테마 설정
  chart = am4core.create("chartdiv", am4charts.XYChart);  //차트 생성
  chart.paddingBottom = 30;
  chart.data = [{     // 해당 채팅방의 top 5 데이터(이름, 좋아요 수)를 차트 데이터로 넘겨줌
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
  // 이하 생략 - 차트 데이터 표시 단위, 그래프 단위와 사이즈 등을 조절하는 부분임
}
```
### - Submit Image

사진 파일 전송 기능. 먼저 Firebase Cloud Storage에 이미지를 먼저 업로드하고 이미지 파일로부터 만든 URL을 메세지로 보여준다.

```
function saveImageMessage(file) {
  // 1 -메세지 placeholder
  firebase.database().ref('/chat_list/'+currentChatKey+'/message/').push({
    user: getUserUid(),
    imageUrl: LOADING_IMAGE_URL, //기다리는 동안 보여줄 로딩 아이콘
    createdAt: new Date()
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
```

### - Delete Class
채팅방 삭제 기능. 삭제를 위해서는 Firebase database의 'chat_list'/해당 채팅방/'user'에서 해당 사용자를 삭제하고 'user_list'/해당 사용자/'room_list'에서 해당 채팅방을 삭제한다.
```

// 해당 사용자의 room_list에서 해당 채팅방 삭제
function deleteRoomListInMyInfo(name){ 
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
// 채팅방 리스트의 해당 채팅방 유저 목록에서 해당 유저 삭제
function deleteMyInfoInChatRoom(chatKey){ 
firebase.database().ref('chat_list/'+chatKey+'/user/'+getUserUid()).remove();
  firebase.database().ref('chat_list/'+chatKey+'/message/').push({
    text: getUserName()+"님이 퇴장하셨습니다.",
  });
}

```


## 2. 개발자 정보

- 1415088 홍정수 (jsjs0) 
  : jungsoobranch
  채팅방 생성 기능 구현, 채팅창 기능 구현, 좋아요 기능 구현, 좋아요-마이페이지 연동 기능 구현, word-cloud기능 구현
- 1771016 김은지 (eun-g-kim)
  : eunjiBranch
  기존 UI에서 불필요한 부분 삭제, 좋아요 및 word Cloud UI 구현, 랭킹 차트 UI 및 기능 구현, 채팅방 삭제 기능 구현, 채팅 시간 표시, 파일 전송 기능 구현
- 1771044 이원영 (wonyeonglee) 
  : wonyeongbranch
 로그인창 UI, 팝업창 UI, 마이페이지 랭킹 UI, 좋아요 버튼 UI 구현, 랭킹 페이지 UI 구현(삭제), 기존 UI에서 불필요한 부분 삭제
- 1771098 이가은 (gaeunleeandlee) 
  : 기존 UI에서 불필요한 부분 삭제, 마이페이지 UI 수정, 버튼 UI 수정, 
  
  

## 4. 라이센스 정보
See [LICENSE](LICENSE), Apache License 2.0

## 5. 사용 open source
+ Firebase 웹 메신저 오픈소스 : https://github.com/firebase/friendlychat-web
+ 질문 데이터 시각화 Word Cloud 오픈소스 : https://github.com/wvengen/d3-wordcloud
+ Main 채팅 창 UI 오픈소스 : https://bootsnipp.com/snippets/35mvD
+ 랭킹 chart 생성 api: https://www.amcharts.com/demos/column-chart-images-top/

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

Delete Class : 채팅방 삭제 기능. 삭제를 위해서는 Firebase database의 'chat_list'/해당 채팅방/'user'에서 해당 사용자를 삭제하고 'user_list'/해당 사용자/'room_list'에서 해당 채팅방을 삭제한다.
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
  기존 UI에서 불필요한 부분 삭제, 좋아요 UI 구현, word Cloud UI 구현, UI 위치 오류 나는 부분 수정
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

<!DOCTYPE html>
<html>
<head

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#2d89ef">
<meta name="theme-color" content="#ffffff">


<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300' rel='stylesheet' type='text/css'>

<meta name='viewport' content='width=device-width, initial-scale=1'>
<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css' integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU' crossorigin='anonymous'>

<script src="https://use.typekit.net/hoy3lrg.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

<script src="https://d3js.org/d3.v3.min.js" > </script>
<script src="https://rawgit.com/jasondavies/d3-cloud/master/build/d3.layout.cloud.js" type="text/JavaScript"></script>

<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'><link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css'>
<style class="cp-pen-styles">
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #F6F6F6;
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  font-size: 1em;
  letter-spacing: 0.1px;
  color: #32465a;
  text-rendering: optimizeLegibility;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  -webkit-font-smoothing: antialiased;
}

#frame {
  width: 95%;
  min-width: 360px;
  max-width: 1000px;
  height: 92vh;
  min-height: 300px;
  max-height: 720px;
  background: #EDEDED;
}
@media screen and (max-width: 360px) {
  #frame {
    width: 100%;
    height: 100vh;
  }
}
#frame #sidepanel {
  float: left;
  min-width: 280px;
  max-width: 340px;
  width: 40%;
  height: 100%;
  background: #2c3e50;
  color: #f5f5f5;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel {
    width: 58px;
    min-width: 58px;
  }
}
#frame #sidepanel #profile {
  width: 80%;
  margin: 25px auto;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile {
    width: 100%;
    margin: 0 auto;
    padding: 5px 0 0 0;
    background: #32465a;
  }
}
#frame #sidepanel #profile.expanded .wrap {
  height: 300px;
  line-height: initial;
}
#frame #sidepanel #profile.expanded .wrap p {
  margin-top: 20px;
}
#frame #sidepanel #profile.expanded .wrap i.expand-button {
  -moz-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}
#frame #sidepanel #profile .wrap {
 height: 60px;
  line-height: 60px;
  overflow: hidden;
  -moz-transition: 0.3s height ease;
  -o-transition: 0.3s height ease;
  -webkit-transition: 0.3s height ease;
  transition: 0.3s height ease;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap {
    height: 55px;
  }
}
#frame #sidepanel #profile .wrap img {
  width: 50px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #e74c3c;
  height: auto;
  float: left;
  cursor: pointer;
  -moz-transition: 0.3s border ease;
  -o-transition: 0.3s border ease;
  -webkit-transition: 0.3s border ease;
  transition: 0.3s border ease;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap img {
    width: 40px;
    margin-left: 4px;
  }
}
#frame #sidepanel #profile .wrap img.online {
  border: 2px solid #2ecc71;
}
#frame #sidepanel #profile .wrap img.away {
  border: 2px solid #f1c40f;
}
#frame #sidepanel #profile .wrap img.busy {
  border: 2px solid #e74c3c;
}
#frame #sidepanel #profile .wrap img.offline {
  border: 2px solid #95a5a6;
}
#frame #sidepanel #profile .wrap p {
  float: left;
  margin-left: 15px;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap p {
    display: none;
  }
}
#frame #sidepanel #profile .wrap i.expand-button {
  float: right;
  margin-top: 23px;
  font-size: 0.8em;
  cursor: pointer;
  color: #435f7a;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #profile .wrap i.expand-button {
    display: none;
  }
}

#frame #sidepanel #profile .wrap #expanded {
  padding: 100px 0 0 0;
  display: block;
  line-height: initial !important;
}
#frame #sidepanel #profile .wrap #expanded label {
  float: left;
  clear: both;
  margin: 0 8px 5px 0;
  padding: 5px 0;
}
#frame #sidepanel #profile .wrap #expanded input {
  border: none;
  margin-bottom: 6px;
  background: #32465A;
  border-radius: 3px;
  color: #f5f5f5;
  padding: 7px;
  width: calc(100% - 43px);
}
#frame #sidepanel #profile .wrap #expanded input:focus {
  outline: none;
  background: #435f7a;
}

#frame #sidepanel #profile .wrap #chat-like-list .chat-like{
  font-size:80%;margin-left:10px;margin-bottom:10px
}

#frame #sidepanel #profile .wrap #chat-like-list .chat-like .like-num{
  float : right;
}
#frame #sidepanel #profile .wrap #chat-like-list {
  overflow-y: scroll;
  overflow-x: hidden;
}

#frame #sidepanel #profile .wrap #chat-like-list::-webkit-scrollbar {
  width: 8px;
  background: #2c3e50;
}
#frame #sidepanel #profile .wrap #chat-like-list::-webkit-scrollbar-thumb {
  background-color:#32465A; /*채팅목록스크롤바색깔 */
}
#frame #sidepanel #contacts {
  height: calc(100% - 150px);
  overflow-y: scroll;
  overflow-x: hidden;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts {
    height: calc(100% - 149px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #frame #sidepanel #contacts::-webkit-scrollbar {
    display: none;
  }
}
#frame #sidepanel #contacts.expanded {
  height: calc(100% - 390px);
}
#frame #sidepanel #contacts::-webkit-scrollbar {
  width: 8px;
  background: #2c3e50;
}
#frame #sidepanel #contacts::-webkit-scrollbar-thumb {
  background-color:#32465A; /*채팅목록스크롤바색깔 */
}
#frame #sidepanel #contacts ul li.contact {
  text-align:center;
  position: relative;
  padding: 10px 0 15px 0;
  font-size: 0.9em;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact {
    padding: 6px 0 46px 8px;
  }
}
#frame #sidepanel #contacts ul li.contact:hover {
  background: #32465a; /* 여기다!!!!!!!!!!!!!!!!!!!*/
}
#frame #sidepanel #contacts ul li.contact.active {
  background: #32465a;
  border-right: 5px solid #435f7a;
}

#frame #sidepanel #contacts ul li.contact .wrap {
  width: 88%;
  margin: 0 auto;
  position: relative;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact .wrap {
    width: 100%;
  }
}
#frame #sidepanel #contacts ul li.contact .wrap span {
  position: absolute;
  left: 0;
  margin: -2px 0 0 -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
  background: #95a5a6;
}
#frame #sidepanel #contacts ul li.contact .wrap span.online {
  background: #2ecc71;
}
#frame #sidepanel #contacts ul li.contact .wrap span.away {
  background: #f1c40f;
}
#frame #sidepanel #contacts ul li.contact .wrap span.busy {
  background: #e74c3c;
}
#frame #sidepanel #contacts ul li.contact .wrap img {
  width: 40px;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact .wrap img {
    margin-right: 0px;
  }
}
#frame #sidepanel #contacts ul li.contact .wrap .meta {
  padding: 5px 0 0 0;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #contacts ul li.contact .wrap .meta {
    display: none;
  }
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .name {
  font-weight: 600;
}

#frame #sidepanel #bottom-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
}
#frame #sidepanel #bottom-bar button {
  float: left;     /*아래 add class, settings 버튼*/
  border: none;
  width: 50%;
  padding: 10px 0;
  background: #32465a;
  color: #f5f5f5;
  cursor: pointer;
  font-size: 0.85em;
  font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button {
    float: none;
    width: 100%;
    padding: 15px 0;
  }
}
#frame #sidepanel #bottom-bar button:focus {
  outline: none;
}
#frame #sidepanel #bottom-bar button:nth-child(1) {
  border-right: 1px solid #2c3e50;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button:nth-child(1) {
    border-right: none;
    border-bottom: 1px solid #2c3e50;
  }
}
#frame #sidepanel #bottom-bar button:hover {
  background: #435f7a;
}
#frame #sidepanel #bottom-bar button i {
  margin-right: 3px;
  font-size: 1em;
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button i {
    font-size: 1.3em;
  }
}
@media screen and (max-width: 735px) {
  #frame #sidepanel #bottom-bar button span {
    display: none;
  }
}
#frame .content {
  float: right;
  width: 60%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 735px) {
  #frame .content {
    width: calc(100% - 58px);
    min-width: 300px !important;
  }
}
@media screen and (min-width: 900px) {
  #frame .content {
    width: calc(100% - 340px);
  }
}
#frame .content .contact-profile {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f5f5f5;
}

#frame .content .contact-profile p {
  margin-left: 20px;
  float: left;
}
#frame .content .contact-profile .wordCloud {
  float: right;
}
#frame .content .contact-profile .wordCloud i {
  margin-left: 20px;
  vertical-align:middle;
  cursor: pointer;
}
#frame .content .contact-profile .wordCloud i:nth-last-child(1) {
  margin-right: 20px;
}
#frame .content .contact-profile .wordCloud i:hover {
  color: #435f7a;
}
.sent {
   position:relative;
}
#frame .content .messages {
  height: auto;
  min-height: calc(100% - 93px);
  max-height: calc(100% - 93px);
  overflow-y: scroll;
  overflow-x: hidden;
}
@media screen and (max-width: 735px) {
  #frame .content .messages {
    max-height: calc(100% - 105px);
  }
}
#frame .content .messages::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}
#frame .content .messages::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}
#frame .content .messages ul li {
  display: inline-block;
  clear: both;
  float: left;
  margin: 15px 15px 5px 15px;
  width: calc(100% - 25px);
  font-size: 0.9em;
}

#frame .content .messages ul li img {
  width: 22px;
  border-radius: 50%;
  float: left;
}
#frame .content .messages ul li p {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 205px;
  line-height: 130%;
}

@media screen and (min-width: 735px) {
  #frame .content .messages ul li p {
    max-width: 300px;
  }
}

#frame .content .messages ul li:nth-last-child(1) {
  margin-bottom: 20px;
}

#frame .content .messages ul li.sent img {   /*프사*/
  float: right;
  margin: 6px 0 0 8px;
}

#frame .content .messages ul li.sent .send_name { /* 현재 메세지 보내는 유저. main.js에서 사용. */
  position:absolute;   /*보내는 사람 이름*/
  right: 20px;
  top: -16px;

}
#frame .content .messages ul li.sent p {   /*메세지 내용*/
  float: right;
  position:relative;
  background: #435f7a;
  color: #f5f5f5;   /*하얀글씨*/
  margin-bottom:15px;
}

#frame .content .messages ul li.sent i {
	
  float: right;
  margin-right: 3px;
  margin-top: 14px;
  cursor: pointer;
}
#frame .content .messages ul li.sent i:link {
  color: #32465a;
}
#frame .content .messages ul li.sent i:visited {
  color: #FF0000;
}
#frame .content .messages ul li.sent i:hover {
  color: #435f7a;
}
#frame .content .messages ul li.sent i:active {
  color: #FF0000;
}


#frame .content .messages ul li.replies img {
    margin: 6px 8px 0 0;
}
#frame .content .messages ul li.replies p {
  background: #f5f5f5;
}
#frame .content .messages ul li.replies i {
  margin-left: 3px;
  margin-top: 5px;
  cursor: pointer;
}
#frame .content .messages ul li.replies i:link {
  color: #32465a;
}
#frame .content .messages ul li.replies i:visited {
  color: #FF0000;
}
#frame .content .messages ul li.replies i:hover {
  color: #FF0000;
}
#frame .content .messages ul li.replies i:active {
  color: #FF0000;
}


#frame .content .message-input {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 99;
}
#frame .content .message-input .wrap {
  position: relative;
}
#frame .content .message-input .wrap input {
  font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
  float: left;
  border: none;
  width: calc(100% - 90px);
  padding: 11px 32px 10px 8px;
  font-size: 0.8em;
  color: #32465a;
}
@media screen and (max-width: 735px) {
  #frame .content .message-input .wrap input {
    padding: 15px 32px 16px 8px;
  }
}
#frame .content .message-input .wrap input:focus {
  outline: none;
}
#frame .content .message-input .wrap .attachment {
  position: absolute;
  right: 60px;
  z-index: 4;
  margin-top: 10px;
  font-size: 1.1em;
  color: #435f7a;
  opacity: .5;
  cursor: pointer;
}
@media screen and (max-width: 735px) {
  #frame .content .message-input .wrap .attachment {
    margin-top: 17px;
    right: 65px;
  }
}
#frame .content .message-input .wrap .attachment:hover {
  opacity: 1;
}
#frame .content .message-input .wrap button {
  float: right;
  border: none;
  width: 50px;
  padding: 12px 0;
  cursor: pointer;
  background: #32465a;
  color: #f5f5f5;
}
@media screen and (max-width: 735px) {
  #frame .content .message-input .wrap button {
    padding: 16px 0;
  }
}
#frame .content .message-input .wrap button:hover {
  background: #435f7a;
}
#frame .content .message-input .wrap button:focus {
  outline: none;
}


#frame .content .contact-profile button {
  float: right;   /*로그아웃버튼*/
  border: none;
  border-radius: 6px;
  width: 100px;
  height: 40px;
  margin-left: 10px;
  margin-top: 10px;
  line-height:1.5;
  vertical-align:middle;


  background: #32465a;
  color: #f5f5f5;
  cursor: pointer;
  font-size: 0.8em;
  font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
}
</style>

</head><body>
<!--

A concept for a chat interface.

Try writing a new message! :)


Follow me here:
Twitter: https://twitter.com/thatguyemil
Codepen: https://codepen.io/emilcarlsson/
Website: http://emilcarlsson.se/

-->

<div id="frame">
   <div id="sidepanel">
      <div id="profile">
         <div class="wrap">
            <img id="profile-img" src="https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg" class="online" alt="" />
            <p id="user-name">이화연</p>
            <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
            <div id="expanded">
                 <div style="background-color:#32465a;height:200%">
            <h1 style="text-align:center;height:150%">My incentive</h1>
          </div>
          <div style="margin-top:3px">
          <ul id="chat-like-list">
            <!--<li class ="chat-like" >자료구조            <span class="like-num">6</span></li>
            <li class ="chat-like">오픈플랫폼         <span class="like-num">10</span></li>
            <li class ="chat-like">고전읽기와글쓰기   13</li>
             <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
              <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
               <li style="font-size:80%;margin-left:10px;margin-bottom:10px">고전읽기와글쓰기   13</li>
-->
          </ul>
        </div>
            </div>
         </div>
      </div>

      <div style="background-color:#435F7A; height:5px">      </div>      <!--/*경계선*/-->

      <div id="contacts">
         <ul id="chat_list">
            <!--<li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">시스템소프트웨어</p>
                  </div>
               </div>
            </li>
            <li class="contact active">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">오픈SW플랫폼</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">자료구조</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">컴퓨터구조</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">JAVA프로그래밍</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">문학으로읽는사랑의역사</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">인물로읽는한국사</p>

                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">사용자경험과인간중심디자인</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">고영</p>
                  </div>
               </div>
            </li>
            <li class="contact">
               <div class="wrap">
                  <div class="meta">
                     <p class="name">대영</p>
                  </div>
               </div>
            </li> main.js CHAT_LIST_TEMPLATE 으로 자동 생성-->
         </ul>
      </div>
      <div id="bottom-bar">
         <button id="addclass" ><i class="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add class</span></button>
         <button id="deleteclass"><i class="fa fa-trash" aria-hidden="true"></i> <span>Delete class</span></button>
      </div>
   </div>
    <div class="content">
      <div class="contact-profile">
         <p>오픈SW플랫폼</p>
         <div class="wordCloud">
             <i class="fa fa-cloud" style="font-size:36px; " aria-hidden="true"></i>
            </div>
            <button id="sign-out" ><i class="fa fa-sign-out" aria-hidden="true"></i> <span>LOG OUT</span></button>
      </div>
      <div class="messages" id="messages-list">
         <ul id="message-box">
            <!--<li class="sent">
          <img src="https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg" alt="" />
          <div>sd</div>
               <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
            </li>
            <li class="replies">
               <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="" />
               <p>When you're backed against the wall, break the god damn thing down.</p>
                    <i class="fas fa-heart" style="font-size:12px;" aria-hidden="true"></i>
            </li>
            <li class="replies">
               <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="" />
               <p>Excuses don't win championships.</p>
          <i class="fas fa-heart" style="font-size:12px;" aria-hidden="true"></i>
            </li>
            <li class="sent">
               <img src="https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg" alt="" />
               <p>Oh yeah, did Michael Jordan tell you that?</p>
            </li>
            <li class="replies">
               <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="" />
               <p>No, I told him that.</p>
          <i class="fas fa-heart" style="font-size:12px;" aria-hidden="true"></i>
            </li>
            <li class="replies">
               <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="" />
               <p>What are your choices when someone puts a gun to your head?</p>
          <i class="fas fa-heart" style="font-size:12px;" aria-hidden="true"></i>
            </li>
            <li class="sent">
               <img src="https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg" alt="" />
               <p>What are you talking about? You do what they say or they shoot you.</p>
            </li>
            <li class="replies">
               <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" alt="" />
           <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
          <i class="fas fa-heart" style="font-size:12px;" aria-hidden="true"></i>
            </li>-->
         </ul>
    </div>
    <form id="message-form">
      <div class="message-input">
         <div class="wrap">
      		<input id="message" type="text" placeholder="Write your message..." /> </form>
         	<button id="submit" class="disabled"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
         	 <i  id="submitImage"  class="fa fa-paperclip attachment" aria-hidden="true"></i>
         </div>
         
         <form hidden id="image-form" action="#">
            <input hidden id="mediaCapture" type="file" accept="image/*" capture="camera">
         </form>
       
    </div>
    </form>
   </div>
</div>

<div class="modal" id="myModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  style="color:#FF007F">채팅방 추가</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p style="font-size:90%">추가할 채팅방 이름을 적어주세요.</p>
        <input type="text" class="form-control" id="chat-name-input">
        <p style="font-size:90%">채팅방 코드를 입력해주세요</p>
        <input type="text" class="form-control" id="chat-code-input">
      </div>
      <div class="modal-footer">
        <button style="background:#FF007F"  type="button" id="add-class-modal-btn" class="btn btn-primary">추가</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
      </div>
    </div>
  </div>
</div>
<div class="modal" id="confirmModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">채팅방 추가</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>채팅방이 존재하지 않아 새로 생성해야 합니다. 해당 코드로 생성 하시겠습니까?</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="create-class-modal-btn" class="btn btn-primary">생성</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
      </div>
    </div>
  </div>
</div>


<div class="modal" id="myModal2" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  style="color:#FF007F">채팅방 삭제</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p style="font-size:90%">삭제할 채팅방 이름을 적어주세요.</p>
        <input type="text" class="form-control" id="chatToDelete-name-input">
      </div>
      <div class="modal-footer">
        <button style="background:#FF007F"  type="button" id="delete-class-modal-btn" class="btn btn-primary">삭제</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
      </div>
    </div>
  </div>
</div>


<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script>

$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$(".expand-button").click(function() {
    $("#profile").toggleClass("expanded");
     $("#contacts").toggleClass("expanded");
});

/*
function newMessage() {
   message = $(".message-input input").val();
   if($.trim(message) == '') {
      return false;
   }
   $('<li class="sent"><img src="https://t3.ftcdn.net/jpg/01/50/44/40/500_F_150444057_XafiBkyICzuWgYHWAPCYETzH5zwCKSri.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
   $('.message-input input').val(null);
   $(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$('.submit').click(function() {
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});*/
//# sourceURL=pen.js
</script>

<script src="/__/firebase/5.5.9/firebase-app.js"></script>
<script src="/__/firebase/5.5.9/firebase-auth.js"></script>
<script src="/__/firebase/5.5.9/firebase-database.js"></script>
<script src="/__/firebase/5.5.9/firebase-storage.js"></script>
<script src="/__/firebase/5.5.9/firebase-messaging.js"></script>
<script src="/__/firebase/init.js"></script>

<script type="text/javascript" src="scripts/main.js"></script>
</body></html>

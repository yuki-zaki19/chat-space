$(document).on('turbolinks:load',function() {

  var user_list = $("#user-search-result")

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class ="chat-group-user clearfix">${ msg }</div>`
    user_list.append(html);
  }


  //新しいチャットメンバーの追加
  var users_list = $("#chat-group-users");
  $(document).on("click", ".chat-group-user__btn--add", function(){
  var addHtml = `<div class='chat-group-user clearfix js-chat-member' id=${this.getAttribute('data-user-id')}>
                  <input name='group[user_ids][]' type='hidden' value=${this.getAttribute('data-user-id')}>
                  <p class='chat-group-user__name'>${this.getAttribute('data-user-name')}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    users_list.append(addHtml);
    $("#user-search-result").empty();
  });
  //削除ボタンを押すと、そのユーザーが削除されるコマンド
  $(document).on("click", '.user-search-remove', function(){
    $(this).parent().remove();
  })



  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input == "") {
        $("#user-search-result").empty();
      }
      else if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendErrMsgToHTML("ユーザーが見つかりません");
      }
    })

    .fail(function(){
      alert("検索に失敗しました");
    });
  });
});
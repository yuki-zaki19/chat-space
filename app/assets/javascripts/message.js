$(document).on('turbolinks:load',function(){

  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class = message>
                  <div class = message__upper-info>
                    <div class = message__upper-info__talker>
                      ${message.user_name}
                    </div>
                    <div class = message__upper-info__date>
                      ${message.created_at.strftime("%Y-%m-%d %H:%M")}
                    </div>
                  </div>
                  <div class = message__text>
                    <p>
                      ${message.content}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    })

    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    })
  });

  var buildMessageHTML = function(message) {
    var insert_html =`<div class="message__upper-info">
                        <div class="message__upper-info__talker">
                          ${message.user_name}
                        </div>
                        <div class="message__upper-info__date">
                          ${message.created_at}
                        </div>
                      </div>`
      //data-idが反映されるようにしている
    var htmlContentImage =`<div class="message" data-id="${message.id}">
                ${insert_html}
                <div class="message__text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                  <img src=${message.image.url} class="lower-message__image" >
                </div>
              </div>`
      //同様に、data-idが反映されるようにしている
    var htmlContent =`<div class="message" data-id="${message.id}">
                ${insert_html}
                <div class="message__text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                </div>
              </div>`
      //同様に、data-idが反映されるようにしている
    var htmlImage =`<div class="message" data-id="${message.id}">
                ${insert_html}
                <div class="message__text">
                  <img src=${message.image.url} class="lower-message__image" >
                </div>
              </div>`

    var html = message.content && message.image.url
        ? `${htmlContentImage}`
        :(message.content ? htmlContent : htmlImage);
        
    return html;
  };

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得

    if($('.message').length){

      last_message_id = $('.message:last').data('id');
      group_id = $('.main-header__left-box__current-group').data('group_id');

      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: '/groups/' + group_id + '/api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessageHTML(message);
        });
        $('.messages').append(insertHTML);
        if(insertHTML.length){
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
        }
      })
      .fail(function() {
        alert("自動更新が失敗しました");

      });
    }
  };
  setInterval(reloadMessages, 5000);
});


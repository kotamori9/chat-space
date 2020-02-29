$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="message__message-list">
            <div class="message__message-list__box__data">
              <div class="message__message-list__box__data__name">
                ${message.user_name}
              </div>
              <div class="message__message-list__box__data__day">
                ${message.created_at}
              </div>
            </div>
            <div class="message__message-list__box__text">
              <p class="message__message-list__box__text__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
        
    } else {
      var html =
      `<div class="message" data-message-id=${message.id}>
      <div class="message__message-list">
        <div class="message__message-list__box__data">
          <div class="message__message-list__box__data__name">
            ${message.user_name}
          </div>
          <div class="message__message-list__box__data__day">
            ${message.created_at}
          </div>
        </div>
        <div class="message__message-list__box__text">
          <p class="message__message-list__box__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
    return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
        $('.hako').append(html);
        $('.hako').animate({ scrollTop: $('.hako')[0].scrollHeight});
        $('form')[0].reset();
        $("input").prop("disabled", false);
      })

      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      alert('error');
    });
  };

});
$(function(){
  
  var buildHTML = function buildHTML(message){
    if (message.content && message.image ) {
      var html =
       `<div class="message" data-message-id= ${message.id} >
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
              <img src=" ${message.image} " class="lower-message__image">
          </div>
        </div>`

    } else if (message.content) {
      var html = 
        `<div class="message" data-message-id= ${message.id} >
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
          </div>
      </div>`

    } else if (message.image) {
      var html =
        `<div class="message" data-message-id= ${message.id} >
          <div class="message__message-list">
            <div class="message__message-list__box__data">
              <div class="message__message-list__box__data__name">
                ${message.user_name}
              </div>
            <div class="message__message-list__box__data__day">
              ${message.created_at}
            </div>
            </div>
          <div class="lower-message">
            <img src=" ${message.image} " class="lower-message__image" >
          </div> 
        </div>`
    };
    return html;
  };

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
    var last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !==0){
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.hako').append(insertHTML);
        $('.hako').animate({ scrollTop: $('.hako')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
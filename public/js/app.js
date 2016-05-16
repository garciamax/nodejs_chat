(function () {
    var App = function () {
        var _ = {
            lastMsgId:0,mutex:false,
            $nickname:{},$message:{},$chatbox:{},
            handleMessages: function hangleMessages(response){
                if(_.mutex) return;
                _.mutex = true;
                if($.isArray(response)){
                    response.map(_.drawMessage);
                    var _lastmessage = response[response.length-1];
                    if(_lastmessage) {
                        _.lastMsgId = _lastmessage.messages_id;
                    }
                }else{
                    _.drawMessage(response);
                    _.lastMsgId = response.messages_id;
                }
                setTimeout(function () {
                    _.mutex = false;
                    _.getMessages(_.lastMsgId);
                },1000)
            },
            drawMessage:function drawMessage(msgObj){
                var _msg = (msgObj.nickname||msgObj.user_id) + ': ' + msgObj.message + '<br>';
                _.$chatbox.append(_msg)
            },
            getMessages: function getMessages(lastId){
               $.getJSON('/api/messages' + (lastId ? '?last_id='+lastId : ''),_.handleMessages)
            },
            sendMessage: function sendMessage(e){
                e.preventDefault();
                $.post('/api/message',
                    {nickname:_.$nickname.val(),message:_.$message.val()},
                    _.handleMessages)
            },
            bind:function bind(){
                $('form').on('submit',_.sendMessage);
                _.$nickname = $('#nickname');
                _.$message = $('#message');
                _.$chatbox = $('#chatbox');
            }
        };

        return {
            init:function(){
                _.bind();
                _.getMessages();
            }
        }
    };
    $(function(){
        var _app = new App();
        _app.init();
    });

}());
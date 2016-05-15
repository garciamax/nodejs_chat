(function () {
    var App = function () {
        var _ = {
            lastMsgId:0,
            $nickname:{},$message:{},$chatbox:{},
            hangleMessages: function hangleMessages(response){
                if($.isArray(response)){
                    response.map(_.drawMessage);
                    var _lastmessage = response[response.length-1];
                    if(_lastmessage) {
                        l('a',response);
                        _.getMessages(_lastmessage.messages_id);
                        _.lastMsgId = _lastmessage.messages_id;
                    }else{
                        l('b',_.lastMsgId,response);
                        _.getMessages(_.lastMsgId);
                    }
                }else{
                    _.drawMessage(response);
                    _.getMessages(response.messages_id);
                    _.lastMsgId = response.messages_id;
                }
            },
            drawMessage:function drawMessage(msgObj){
                var _msg = (msgObj.nickname||msgObj.user_id) + ': ' + msgObj.message + '</br>';
                _.$chatbox.append(_msg)
            },
            getMessages: function getMessages(lastId){
                var _timeout = 50;
                if(lastId)_timeout=1000;
                setTimeout(function(){
                    $.getJSON('/api/messages' + (lastId ? '?last_id='+lastId : ''),_.hangleMessages)
                },_timeout);
            },
            sendMessage: function sendMessage(e){
                e.preventDefault();
                $.post('/api/message',
                    {nickname:_.$nickname.val(),message:_.$message.val()},
                    _.hangleMessages)
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
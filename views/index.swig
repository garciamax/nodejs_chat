{% extends 'layout.swig' %}
{% block body %}
    <nav class="top-nav">
        <div class="container">
            <div class="nav-wrapper"><a class="page-title">Chat for the dapulse</a></div>
        </div>
    </nav>
    <div class="row">
        <div class="col s12">
            <h4>Welcome to the chat.</h4>
            <p>the messages will appear in the box below.</p>
        </div>
        <div class="col s12">
            <p id="chatbox" class="z-depth-1">Bot: Hey!<br></p>
        </div>
        <form class="col s12">
            <div class="row">
                <div class="input-field col s4">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="nickname" type="text" class="validate" required>
                    <label for="nickname">Nickname</label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">mode_edit</i>
                    <input id="message" type="text" class="validate" required>
                    <label for="message" class="">Message</label>
                </div>
                <div class="input-field col s2">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </div>

            </div>
        </form>
    </div>
{% endblock %}
{% block bottom_scripts %}
    <script>var l = console.log.bind(console);</script>
    <script src="/js/external/jquery-2.2.3.min.js"></script>
    <script src="/js/external/materialize.min.js"></script>
    <script src="/js/app.js"></script>
{% endblock %}

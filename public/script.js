var socket = io.connect();
 var canvas;
 var context;


function addMessage(msg, me) {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
   
    var radius = 10;
    var startAngle = 0 * Math.PI;
    var endAngle = 2* Math.PI;
    var counterClockwise = false;

    context.beginPath();
    context.arc(msg.x, msg.y, radius, startAngle, endAngle, counterClockwise);
    context.fillStyle =  (me)?'orange':'green';
    context.fill();
    //context.stroke();
}

function sentMessage() {
    if ($('#messageInput').val() != "") 
    {
        socket.emit('message', $('#messageInput').val());
        addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        $('#messageInput').val('');
    }
}

function setPseudo() {
    if ($("#pseudoInput").val() != "")
    {
        socket.emit('setPseudo', $("#pseudoInput").val());
        $('#chatControls').show();
        $('#pseudoInput').hide();
        $('#pseudoSet').hide();
    }
}

socket.on('message', function(data) {
    addMessage(data['message'], false);
});

$(function() {
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage();});

    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        addMessage(mousePos, true);
        socket.emit('message', mousePos);
      }, false);
});

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      
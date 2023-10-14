var app = require("express")();
//var http = require("http").Server(app);
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {  
    socket.on('mando chat', (msg) => {
        io.emit('mando chat', msg);
    });
});


http.listen(port, () => {
    console.log("listening on *:" + port);
});






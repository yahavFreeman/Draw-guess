const asyncLocalStorage = require("./als.service");
const logger = require("./logger.service");

var gIo = null;
var isDrawer = true;
var users = 0;
var currUsers=[]
function connectSockets(http, session) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    console.log("New socket", socket.id);
    socket.on("disconnect", (socket) => {
        currUsers.length=0
        if(users){
            users-=1
        }
        if(users===0){
            isDrawer=true
        }
        console.log(users);
      console.log("Someone disconnected");
    });
    socket.on("game-ready", (topic) => {
      users += 1;
      console.log("topic", topic);
      if (socket.myTopic === topic) return;
      if (socket.myTopic) {
        socket.leave(socket.myTopic);
      }
      socket.join(topic);
      socket.myTopic = topic;
      console.log(isDrawer);

      if (users > 1) {
        console.log("in");
        gIo.emit("start-playing");
      }
    });

    socket.on("set-drawer", (user) => {
        if(currUsers.length<2){
            currUsers.push(user)
        }
      if (isDrawer) {
          gIo.emit("drawer", user);
          isDrawer = false;
        }else{
            gIo.emit("guesser", currUsers);
      }
    });

    socket.on("word-and-difficulty", (wordAndDifficulty) => {
      gIo.emit("newWord", wordAndDifficulty);
    });
    socket.on("drawer-done", (canvasImg) => {
      gIo.emit("newDrawing", canvasImg);
    });
    socket.on("guesser-done", (msg) => {
      gIo.emit("sessionOver", msg);
    });
  });
}

module.exports = {
  connectSockets,
};

var ws = null;

const unique_id = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

const id = unique_id();

function init() {
  let main = {
    vars: {
      latencycount: 0,
      latencyarray: []
    }
  };

  var latencytest = () => {};
  // Let us open a web socket
  ws = new WebSocket("ws://192.168.1.123:8080?id=" + id);

  ws.onopen = function() {
    console.log("WebSocket Connection Opened");
    let mv = main.vars;

    latencytest = setInterval(function() {
      mv.latencyarray.push(new Date());
      ws.send(JSON.stringify({ type: "client2server" }));
    }, 1000);
  };

  ws.onmessage = function(e) {
    let data = JSON.parse(e.data);

    switch (data.type) {
      case "message":
        //message to be displayed on the screen
        $("#messagebox").innerHTML = data.message;
        $("#messagebox").classList.add("blink");
        setTimeout(function() {
          $("#messagebox").classList.remove("blink");
        }, 3000);
        break;
      case "gamelistupdate":
        //sends a brodcast to all connected sockets
        //to add a channel to their game list
        $("#gamestojoin").innerHTML +=
          '<option value="' + data.channel + '">' + data.channel + "</option>";
        break;
      case "gamelistpost":
        //when the game first loads it receives the
        //list of open games to add to its select tag
        data.list.forEach((element, index, array) => {
          $("#gamestojoin").innerHTML +=
            "<option value='" +
            element.channel +
            "'>" +
            element.channel +
            "</option>";
        });
        break;
      case "gamelistremoval":
        //when a game is filled, this broadcast
        //removes the game from every connected socket
        for (var i = 0; i < $("#gamestojoin").length; i++) {
          if ($("#gamestojoin").options[i].value == e.data.channel)
            $("#gamestojoin").remove(i);
        }
        break;
      case "gamedata":
        //after a game is joined by a 2nd player,
        //final game init data is sent to both players

        let who = gameinfo.find({ who: { $ne: "" } })[0].who;

        let playername = who == "host" ? data.guestname : data.hostname;
        let opponentname = who == "host" ? data.hostname : data.guestname;

        gameinfo.update(
          { channel: { $eq: data.channel } },
          {
            channel: data.channel,
            playername: playername,
            opponentname: opponentname
          }
        );

        $("#opponent").innerHTML = opponentname;
        $("#channel").innerHTML = data.channel;
        break;

      case "server2client":
        // In order to create a real-time latency check, we have to first store date/time in an array.
        // This is done via function 'client2server' and stores the date in array main.variables.latencyarray.
        // The server receives the signal from the client, and responds with signal server2client.
        // This function subtracts the date in the latencystart array at the latencycount position and displays it on the screen.
        let mv = main.vars;
        gameinfo.updateById(
          //{ who: "" || "guest" || "host" },
          1,
          {
            latency: Date.now() - mv.latencyarray[mv.latencycount] + " ms"
          }
        );
        mv.latencycount++;

        // Keep main.variables.latencyarray.length at about 300
        // The function main.methods.latency fires every 1 second
        // So this gives it about 5 minutes worth of latency data
        if (mv.latencyarray.length > 300) {
          mv.latencyarray.splice(0, 1);
          mv.latencycount--;
        }
        $("#showlatency").innerText = gameinfo.find({
          latency: { $ne: "" }
        })[0].latency;
        break;
    }
  };

  ws.onclose = function() {
    console.log("Connection is closed...");
    clearInterval(latencytest);
  };
}

function check() {
  if (!ws || ws.readyState == 3) init();
}

init();

var connection = setInterval(() => {
  if (!ws || ws.readyState === 3) init();
}, 5000);

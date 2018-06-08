let vars = {
  sprites: {
    playerflag: new Image(),
    opponentflag: new Image(),
    greencircle: new Image()
  },
  initialized: false
};

vars.sprites.playerflag.src = "../images/waving-flag-red.png";
vars.sprites.opponentflag.src = "../images/waving-flag-blue.png";
vars.sprites.greencircle.src = "../images/green-circle.png";

$("#canvas").addEventListener("click", function(e) {
  //  alert("test");
});

$("#btn_menu").addEventListener("click", function() {
  if ($("#container").dataset.flag == "false") {
    $("#container").classList.add("container_reveal");
    $("#container").dataset.flag = true;
  } else {
    $("#container").classList.remove("container_reveal");
    $("#container").dataset.flag = false;
  }
});

$("#hostorjoin").addEventListener("change", function() {
  if ($("#hostorjoin").value == "host") {
    $("#startgame").style.display = "block";
    $("#newgame").required = true;
    $("#gamestojoin").required = false;
    $("#joingame").style.display = "none";
  } else {
    $("#startgame").style.display = "none";
    $("#newgame").required = false;
    $("#gamestojoin").required = true;
    $("#joingame").style.display = "block";
  }
});

$("#userinfo").addEventListener("submit", function(e) {
  e.preventDefault();

  data = {
    type: $("#hostorjoin").value == "join" ? "joingame" : "newgame",
    live: "false",
    channel:
      $("#hostorjoin").value == "join"
        ? $("#gamestojoin").value
        : $("#newgame").value,
    playername: $("#username").value,
    who: $("#hostorjoin").value == "join" ? "guest" : "host",
    gamesize: $("#gamesize").value,
    goalcount: $("#goalcount").value
  };

  gameinfo.update(1, {
    who: $("#hostorjoin").value == "join" ? "guest" : "host"
  });

  ws.send(JSON.stringify(data));

  /*
  setPerameters();
});

const setPerameters = () => {
*/

  // initialize the flag images
  let host = { x: 700 / 2, y: 0 };
  let guest = { x: 700 / 2, y: 0 };
  let hostflag_y = 0;
  let guestflag_y = 0;
  let who = gameinfo.find({ who: { $ne: "" } })[0].who;

  who == "host" ? (host.y = 670) : (host.y = 30);
  who == "guest" ? (guest.y = 670) : (guest.y = 30);
  who == "host" ? (hostflag_y = host.y) : (hostflag_y = host.y / 2);
  who == "guest" ? (guestflag_y = guest.y) : (guestflag_y = guest.y / 2);

  goals.update(
    { who: { $eq: "host" } },
    {
      x: host.x,
      y: host.y
    }
  );

  goals.update(
    { who: { $eq: "guest" } },
    {
      x: guest.x,
      y: guest.y
    }
  );

  // initialize the flags
  flags.update(
    { who: { $eq: "host" } },
    {
      x: host.x,
      y: hostflag_y
    }
  );

  flags.update(
    { who: { $eq: "guest" } },
    {
      x: guest.x,
      y: guestflag_y
    }
  );

  // initialize the goal boundries
  goalboundry.update(
    { who: "host" },
    {
      x: 700 / 2 - 80,
      y: 1,
      w: 160,
      h: 100,
      c: "rgba(130, 205, 255, 0.75)"
    }
  );

  goalboundry.update(
    { who: "guest" },
    {
      x: 700 / 2 - 80,
      y: 700 - 102,
      w: 160,
      h: 100,
      c: "rgba(130, 205, 255, 0.75)"
    }
  );

  // set initialiazed to true;
  //vars.initialized = true;

  //repaint();
});

let repaint = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let who = gameinfo.find({ who: { $ne: "" } })[0].who;

  let gb1 = goalboundry.find({ who: { $eq: "host" } })[0];
  let gb2 = goalboundry.find({ who: { $eq: "guest" } })[0];
  let f1 = flags.find({ who: { $eq: "host" } })[0];
  let f2 = flags.find({ who: { $eq: "guest" } })[0];

  ctx.strokeStyle = "#44A9EC";
  //ctx.shadowColor = "rgba(0,0,0,.85)";
  //ctx.shadowBlur = 20;
  ctx.fillStyle = "rgba(27, 79, 114, .75)";
  ctx.lineWidth = 1;
  ctx.rect(gb1.x, gb1.y, gb1.w, gb1.h);
  ctx.fillRect(gb1.x, gb1.y, gb1.w, gb1.h);
  ctx.stroke();

  ctx.rect(gb2.x, gb2.y, gb2.w, gb2.h);
  ctx.fillRect(gb2.x, gb2.y, gb2.w, gb2.h);
  ctx.stroke();

  if (who == "host") {
    ctx.drawImage(vars.sprites.playerflag, f1.x, f1.y);
    ctx.drawImage(vars.sprites.opponentflag, f2.x, f2.y);
  } else {
    ctx.drawImage(vars.sprites.opponentflag, f1.x, f1.y);
    ctx.drawImage(vars.sprites.playerflag, f2.x, f2.y);
  }

  window.requestAnimationFrame(repaint);
};

let vars = {
  sprites: {
    playerflag: new Image(),
    opponentflag: new Image()
  },
  initialized: false
};

vars.sprites.playerflag.src = "../images/waving-flag-blue.png";
vars.sprites.opponentflag.src = "../images/waving-flag-red.png";

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

  setPerameters();
});

const setPerameters = () => {
  // initialize the flag images
  let host = { x: 700 / 2, y: 0 };
  let guest = { x: 700 / 2, y: 0 };
  let hostflag_y = 0;
  let guestflag_y = 0;
  let who = gameinfo.find({ who: { $ne: "" } })[0].who;

  who == "host" ? (host.y = 30) : (host.y = 670);
  who == "guest" ? (guest.y = 670) : (guest.y = 30);
  who == "host" ? (hostflag_y = host.y / 2) : (hostflag_y = host.y);
  who == "guest" ? (guestflag_y = guest.y) : (guestflag_y = guest.y / 2);
  /*
  db.goals.update(1, {
    x: host.x,
    y: host.y
  });

  db.goals.update(2, {
    x: guest.x,
    y: guest.y
  });
  // initialize the flags
  db.flags.update(1, {
    x: host.x,
    y: hostflag_y
  });

  db.flags.update(2, {
    x: guest.x,
    y: guestflag_y
  });
*/
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
  vars.initialized = true;

  repaint();
};

let promise = new Promise(function(resolve, reject) {});

//function repaint() {
let repaint = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let gb1 = goalboundry.find({ who: { $eq: "host" } })[0];
  let gb2 = goalboundry.find({ who: { $eq: "guest" } })[0];

  console.log(gb1.x);
  console.log(gb2.x);

  ctx.strokeStyle = "#44A9EC";
  ctx.shadowColor = "rgba(0,0,0,.85)";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "rgba(27, 79, 114, .75)";
  ctx.lineWidth = 1;
  ctx.rect(gb1.x, gb1.y, gb1.w, gb1.h);
  ctx.fillRect(gb1.x, gb1.y, gb1.w, gb1.h);
  ctx.stroke();

  ctx.rect(gb2.x, gb2.y, gb2.w, gb2.h);
  ctx.fillRect(gb2.x, gb2.y, gb2.w, gb2.h);
  ctx.stroke();
  /*
    .then(
      yield db.goalboundry.get(2, function(b) {
        ctx.strokeStyle = "#44A9EC";
        ctx.lineWidth = 1;
        ctx.rect(b.x, b.y, b.w, b.h);
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.stroke();
      })
    )
    .then(
      yield db.flags.get(1, function(flag) {
        ctx.drawImage(vars.sprites.playerflag, flag.x, flag.y);
      })
    )
    .then(
      yield db.flags.get(2, function(flag) {
        ctx.drawImage(vars.sprites.opponentflag, flag.x, flag.y);
      })
    )
    .then(yield window.requestAnimationFrame(repaint));
*/
};

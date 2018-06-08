let ctx = $("canvas").getContext("2d");
let canvas = $("canvas");
//var particles = [];

const drawGreenCircle = (x, y) => {
  let who = "";
  try {
    who = gameinfo.find({ who: { $ne: "" } })[0].who;
  } catch {
    who = "";
  }
  if (who != "") {
    let dotgroup = dots.find({ who: { $eq: who }, dropped: { $eq: true } });
    dotgroup.forEach(element => {
      ctx.drawImage(vars.sprites.greencircle, element.x, element.y);
    });
  }
};

function message(message) {
  $("#messagebox").innerHTML = message;
  $("#messagebox").classList.add("blink");
  setTimeout(function() {
    $("#messagebox").classList.remove("blink");
  }, 3000);
}

canvas.addEventListener("click", function(e) {
  let mx = getMousePos(canvas, e).x;
  let my = getMousePos(canvas, e).y;
  let who = "";
  try {
    who = gameinfo.find({ who: { $ne: "" } })[0].who;
  } catch {
    who = "";
  }
  //drawScene(mx, my);

  if (who != "") {
    let dot = dots.find({
      who: { $eq: who },
      dropped: { $eq: false }
    })[0];

    if (dot == undefined) {
      message("You have placed all available dots on the game grid.");
    } else {
      dots.update(
        {
          who: { $eq: who },
          number: { $eq: dot.number }
        },
        {
          x: mx,
          y: my,
          r: "7",
          dropped: true
        }
      );
    }
  } else {
    message("You have not setup your game yet.");
  }

  drawGreenCircle(mx, my);
});

const drawGoals = () => {
  db.gameinfo.get(1, function(info) {});
};

const getMousePos = (canvas, evt) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left - 25),
    y: Math.round(evt.clientY - rect.top - 25)
  };
};

const drawGoalsAndFlags = function() {
  let who = "";
  try {
    who = gameinfo.find({ who: { $ne: "" } })[0].who;
  } catch {
    who = "";
  }

  if (who != "") {
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
  }
};
/*
const drawScene = (mx, my) => {
  ctx.drawImage(png, mx, my);

  var data = ctx.getImageData(0, 0, png.width + mx, png.height + my);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#3EB83E";

  for (var y = 0 + my, y2 = data.height; y < y2; y++) {
    for (var x = 0 + mx, x2 = data.width; x < x2; x++) {
      if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
        var particle = {
          x0: x,
          y0: y,
          x1: png.width / 2 + mx,
          y1: png.height / 2 + my,
          //x1: png.width / 2,
          //y1: png.height / 2,
          speed: Math.random() * 4 + 2
        };
        TweenMax.to(particle, particle.speed, {
          x1: particle.x0,
          y1: particle.y0,
          delay: 0,
          ease: Elastic.easeOut
        });
        particles.push(particle);
      }
    }
  }

  requestAnimationFrame(render);
  setTimeout(() => {
    if (particles.length % 569 != 0) {
      particles = particles.slice(particles.length % 569, particles.length + 1);
    }
    particles = particles.slice(570, particles.length + 1);
    drawGreenCircle(mx, my);
  }, 3000);
};
*/

const render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGoalsAndFlags();
  drawGreenCircle();
  /*
  for (var i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    ctx.fillRect(particle.x1 * 1, particle.y1 * 1, 1, 1);
  }
  */
  requestAnimationFrame(render);
};
render();
//const png = new Image();
//png.src = "./images/white-circle.png";
//png.src = "./images/ww_logo_txt.png";
//png.src = "./images/white-circle2.png";
//png.src = "./images/ww_logo-circle.png";

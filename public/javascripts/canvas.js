let ctx = $("canvas").getContext("2d");
let canvas = $("canvas");
var particles = [];

const drawFlags = () => {};

const clearRect = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawGoalBoundries = () => {};

/*
canvas.addEventListener("click", function(e) {
  let mx = getMousePos(canvas, e).x;
  let my = getMousePos(canvas, e).y;
  drawScene(mx, my);
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
          delay: 1, //y / 30,
          ease: Elastic.easeOut
        });
        particles.push(particle);
      }
    }
  }

  requestAnimationFrame(render);
};
const render = function() {
  requestAnimationFrame(render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    ctx.fillRect(particle.x1 * 1, particle.y1 * 1, 1, 1);
  }
};

const png = new Image();
png.src = "./images/white-circle.png";
//png.src = "./images/ww_logo_txt.png";
//png.src = "./images/white-circle2.png";
//png.src = "./images/ww_logo-circle.png";
*/

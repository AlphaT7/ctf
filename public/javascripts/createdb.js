const $ = function(q) {
  return document.querySelector(q);
};

let fdb = new ForerunnerDB();
let db = fdb.db("ctf");
let goals = db.collection("goals");
let flags = db.collection("flags");
let goalboundry = db.collection("goalboundry");
let dropboundry = db.collection("dropboundry");
let dots = db.collection("dots");
let gameinfo = db.collection("gameinfo");

goals.insert([
  {
    _id: 1,
    who: "host",
    x: 0,
    y: 0
  },
  {
    _id: 2,
    who: "guest",
    x: 0,
    y: 0
  }
]);

flags.insert([
  {
    _id: 1,
    who: "host",
    x: 0,
    y: 0
  },
  {
    _id: 2,
    who: "guest",
    x: 0,
    y: 0
  }
]);

goalboundry.insert([
  {
    _id: 1,
    who: "host",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    c: ""
  },
  {
    _id: 2,
    who: "guest",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    c: ""
  }
]);

dropboundry.insert({
  _id: 1,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  c: ""
});

gameinfo.insert({
  _id: 1,
  who: "",
  live: "",
  latency: "",
  channel: "",
  playername: "",
  opponentname: ""
});

for (i = 1; i <= 10; i++) {
  dots.insert({
    _id: i,
    who: "host",
    number: i,
    x: 0,
    y: 0,
    r: 0,
    type: "placeholder",
    live: "false"
  });
}

for (i = 1; i <= 10; i++) {
  dots.insert({
    _id: i + 10,
    who: "guest",
    number: i + 10,
    x: 0,
    y: 0,
    r: 0,
    type: "placeholder",
    live: "false"
  });
}

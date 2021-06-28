const MOV_STEP = 20;

var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

var engine = Engine.create();

var render = Render.create({
  element: document.getElementById("game"),
  engine: engine,
  options: {
    width: 300,
    height: 400,
    //wireframes: false
  },
});

var player = Bodies.rectangle(50, 20, 20, 20);
player.render.sprite.texture = "./player.png";
Matter.Body.setInertia(player, Infinity);

//var ground = Bodies.rectangle(150, 1600, 280, 30, { isStatic: true });
//var ground2 = Bodies.rectangle(0, 800, 810, 60, { isStatic: true });

Composite.add(engine.world, [player]);

function genRandomBlock() {    
    var blockPosition = Math.floor(Math.random() * 3);
    console.log(blockPosition);
    switch (blockPosition) {
      case 0:
        var block = Bodies.rectangle(0, player.position.y+50, 60, 30, { isStatic: true });
        console.log('gen 1');
        break;
      case 1:
        var block = Bodies.rectangle(100,  player.position.y+50, 60, 30, { isStatic: true });
        console.log('gen 2');

          break;
      case 2:
        var block = Bodies.rectangle(200,  player.position.y+50, 60, 30, { isStatic: true });
        console.log('gen 3');

        break;
      default:
        break;
    }
    Composite.add(engine.world, [block]);
    //console.log(blockPosition);
}

var startTime = null;
Matter.Events.on(render, "afterRender", (obj) => {
  var object={x:150, y:player.position.y+150};
  Render.lookAt(render, [object], Matter.Vector.create(150, 50));
  
  if(obj.timestamp - startTime > 1000){
    genRandomBlock();
    startTime = obj.timestamp;
  }
  

  //console.log(obj.timestamp);
});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

function left() {
  var width = player.bounds.max.x - player.bounds.min.x;
  Matter.Body.setPosition(player, Matter.Vector.create(Math.max(width/2, player.position.x-MOV_STEP), player.position.y));
}

function right() {
  var width = player.bounds.max.x - player.bounds.min.x;
  Matter.Body.setPosition(player, Matter.Vector.create(Math.min(300-(width/2), player.position.x+MOV_STEP), player.position.y));
}

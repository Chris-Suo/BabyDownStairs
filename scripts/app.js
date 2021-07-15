const MOV_STEP = 20;
const MAX_SCREEN_BLOCK = 5;

var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Composite = Matter.Composite;

var engine = Engine.create();

var render = Render.create({
  element: document.getElementById("game"),
  engine: engine,
  options: {
    width: 300,
    height: 400,
    wireframes: false
  },
});

var mouse = Mouse.create(render.canvas);
render.mouse = mouse;
// Events.on(mouseConstraint, 'mousedown', function(event) {
//   var mousePosition = event.mouse.position;
//   console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
//   shakeScene(engine);
// });


var player = Bodies.rectangle(50, 20, 20, 20);
player.render.sprite.texture = "./player2.png";
Matter.Body.setInertia(player, Infinity);

var camera = Bodies.rectangle(150, 200, 20, 20, { isStatic: true, render: { visible: false } });

//var ground = Bodies.rectangle(150, 1600, 280, 30, { isStatic: true });

Composite.add(engine.world, [player, camera]);



function initStage() {
  for (let i = 2; i < MAX_SCREEN_BLOCK; i++) {
    let _vPosition = (i * 80) + Math.floor(Math.random() * 60);

    let _hPosition = Math.floor(Math.random() * 3);
    let block;
    switch (_hPosition) {
      case 0:
        block = Bodies.rectangle(35, _vPosition, 60, 30, { isStatic: true });
        Composite.add(engine.world, [block]);
        break;
      case 1:
        block = Bodies.rectangle(135, _vPosition, 60, 30, { isStatic: true });
        Composite.add(engine.world, [block]);
        break;
      case 2:
        block = Bodies.rectangle(235, _vPosition, 60, 30, { isStatic: true });
        Composite.add(engine.world, [block]);
        break;
      default:
        break;
    }
  }
}

initStage();


function genRandomBlock() {
  let _vPosition = render.bounds.max.y;

  let _hPosition = Math.floor(Math.random() * 3);
  let block;
  switch (_hPosition) {
    case 0:
      block = Bodies.rectangle(35, _vPosition, 60, 30, { isStatic: true });
      Composite.add(engine.world, [block]);
      break;
    case 1:
      block = Bodies.rectangle(135, _vPosition, 60, 30, { isStatic: true });
      Composite.add(engine.world, [block]);
      break;
    case 2:
      block = Bodies.rectangle(235, _vPosition, 60, 30, { isStatic: true });
      Composite.add(engine.world, [block]);
      break;
    default:
      break;
  }
}

function isOutOfBund() {
  return (player.position.y > render.bounds.max.y) || (player.position.y < render.bounds.min.y) ;
}

var startTime = null;
var Score = 0;
Matter.Events.on(render, "afterRender", (obj) => {
  Render.lookAt(render, [camera], Matter.Vector.create(150, 50));
  Matter.Body.setPosition(camera, Matter.Vector.create(camera.position.x, camera.position.y + 2));

  if (obj.timestamp - startTime > 1000) {
    genRandomBlock();
    startTime = obj.timestamp;
  }

  if (isOutOfBund()) {
    Render.stop(render);
    document.getElementById('msg').innerHTML="GG";
  }
  Score++;
  document.getElementById('score').innerHTML="Score: "+Score;

});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

function left() {
  var width = player.bounds.max.x - player.bounds.min.x;
  Matter.Body.setPosition(player, Matter.Vector.create(Math.max(width / 2, player.position.x - MOV_STEP), player.position.y));
}

function right() {
  var width = player.bounds.max.x - player.bounds.min.x;
  Matter.Body.setPosition(player, Matter.Vector.create(Math.min(300 - (width / 2), player.position.x + MOV_STEP), player.position.y));
}

document.addEventListener('keydown', keyEvent);
function keyEvent(e) {
  if (e.code == 'ArrowRight') {
    right();

  }
  else if (e.code == 'ArrowLeft') {
    left()
  }

  //console.log(e.code);
}
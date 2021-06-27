// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.getElementById('game'),
    engine: engine,
    options: {
        width:300,
        height:400,
        //background:'#FF1234',
        wireframes: false
    }
});
//render.options.background='#FF0000';

// create two boxes and a ground
var boxA = Bodies.rectangle(150, 20, 50, 78);
//boxA.set();
boxA.render.sprite.texture = "./player.png";
//boxA.inertia = 'Infinity';
Matter.Body.setInertia(boxA, Infinity);
//console.log(boxA.render.sprite);


var boxB = Bodies.rectangle(450, 50, 80, 80);
//var ground = Bodies.rectangle(400, 610, 810, 60);
var ground = Bodies.rectangle(0, 400, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);


//Render.lookAt(render, {position:boxA.position}, Matter.Vector.create(800,40), true);
// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


function left(){
    boxA.position.x-=5;
}

function right(){
    boxA.position.x+=5;

}
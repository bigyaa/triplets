const game = () => {
  // initialize
  let canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;

  const Engine = Matter.Engine,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    World = Matter.World,
    Runner = Matter.Runner,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    engine = Engine.create(),
    render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false
      }
    });

  // reverse gravity
  engine.world.gravity.y = -2;

  // add walls
  const walls = Boundaries(canvas, Bodies);
  World.add(engine.world, walls);

  // add obstacles
  let size = 33,
    xIncrement = randomNumber(size * 3, 100),
    yIncrement = randomNumber(size * 3, 100);
  const triangles = [];

  for (let i = 100; i < canvas.width - 50; i += xIncrement) {
    for (let j = 50; j < canvas.height - 50; j += yIncrement) {
      triangles.push(Triangle(Bodies, Body, i, j, size));
      xIncrement = randomNumber(size * 3, 200);
      yIncrement = randomNumber(size * 3, 200);
    }
  }
  World.add(engine.world, triangles);

  // add players (squares)
  let players = [];
  const playerHeight = 40;
  for (let y = 50; y <= playerHeight * 4; y += playerHeight) {
    players.push(
      Bodies.rectangle(20, y, playerHeight, playerHeight, {
        isStatic: false
      })
    );
  }
  World.add(engine.world, players);

  // add player shack
  const startingShack = Bodies.rectangle(50, 10, 100, 5, {
    isStatic: true
  });
  const endingShack = Bodies.rectangle(
    canvas.width - 100,
    canvas.height - 80,
    200,
    5,
    {
      isStatic: true
    }
  );

  World.add(engine.world, [startingShack, endingShack]);

  // add mouse control
  let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        render: {
          visible: true
        }
      }
    });

  World.add(engine.world, mouseConstraint);

  console.log("eventss", players);

  // check winning criteria
  const checkWinningCriteria = () => {
    let playerCount = players.length - 1;
    let playerPosition = players[playerCount].position;

    if (
      playerPosition.x > endingShack.vertices[0].x &&
      playerPosition.y > endingShack.vertices[0].y
    ) {
      alert("its a wiiiiiiiiiiiiiin", endingShack);
      World.remove(engine.world, players[playerCount])
      cancelAnimationFrame(loop);
    }
    let loop = requestAnimationFrame(checkWinningCriteria);
  };

  checkWinningCriteria();

  //   Matter.Pairs.clear();
  //   const pair = Matter.Pairs.create();
  //   console.log("pairs", pair);

  //   Matter.Events.on(engine, "collisionEnd", (event) => {
  //     console.log("collided", Matter.Detector);
  //   });

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Engine.run(engine);
  Render.run(render);
};

game();

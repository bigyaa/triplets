const game = () => {
    // initialize
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    const Engine = Matter.Engine,
        Render = Matter.Render,
        Bodies = Matter.Bodies,
        World = Matter.World,
        Composites = Matter.Composites,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        engine = Engine.create(),
        render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: canvas.width,
                height: canvas.height
            }
        });

    // reverse gravity
    engine.world.gravity.y = -1;

    // add walls
    const walls = Boundaries(canvas, Bodies);
    World.add(engine.world, walls);

    // add obstacles
    const triangles = [],
        numOfTriangles = 25,
        size = 33;

    for (let j = 1; j <= numOfTriangles; j++) {
        triangles.push(
            Triangle(
                Bodies,
                randomNumber(100, canvas.width - 100),
                randomNumber(100, canvas.height - 100),
                size)
        );
    }
    World.add(engine.world, triangles);

    // add players

    //     const players = [],
    //         numOfPlayers = 3;
    //     for (let i = 1; i <= numOfPlayers; i++) {
    // players.push()
    //     }

    World.add(engine.world, Bodies.circle(200, 200, 20, {
        isStatic: false
    }));

    console.log("eventss", Matter.Events)

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

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Engine.run(engine);
    Render.run(render);
}

game();

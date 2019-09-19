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
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        engine = Engine.create(),
        render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: canvas.width,
                height: canvas.height,
                wireframes: true
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

    for (let i = 100; i < canvas.width-50 ; i += xIncrement) {
        for (let j = 50; j < canvas.height - 50; j += yIncrement) {
            triangles.push(Triangle(Bodies, Body, i, j, size));
            xIncrement = randomNumber(size * 3, 200);
            yIncrement = randomNumber(size * 3, 200);
        }
    }
    World.add(engine.world, triangles);

    // add players

    //     const players = [],
    //         numOfPlayers = 3;
    //     for (let i = 1; i <= numOfPlayers; i++) {
    // players.push()
    //     }

    World.add(engine.world, Bodies.circle(20, 20, 20, {
        isStatic: false,
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

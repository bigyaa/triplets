const Boundaries = (canvas, Bodies) => {
    const wall = (x, y, width, height) => {
        return Bodies.rectangle(x, y, width, height, {
            isStatic: true, 
            render: {
                fillStyle: 'black'
            }
        });
    };

    return ([
        // wall(canvas.width / 2, 0, canvas.width, 1), //top
        wall(canvas.width / 2, canvas.height, canvas.width, 1), //bottom
        wall(canvas.width, canvas.height / 2, 1, canvas.height), //right
        wall(0, canvas.height / 2, 1, canvas.height) //left
    ]);
};
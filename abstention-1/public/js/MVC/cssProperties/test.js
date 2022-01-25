const Transform = require("./Transform");

let test1 = new Transform().translate(10,12).scale(5,6).rotate(90);

let test2 = new Transform().translate(0,0).scale(0,0).rotate(0);

console.log(test1.interpolateWith(test2, 0.5));
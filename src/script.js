
import { Canvas } from './canvas.js'
import { DrawingContext } from './context.js';
import { Map } from './map.js';

var canvas = new Canvas();
var context = new DrawingContext();

for (let i = 0; i < context.transforms.length; i++)
{
    context.transforms[i].transformForm.init_form();
}

var map = new Map();

context.lines = map.get_lines();

function redraw()
{
    context.transform.reload();
    canvas.draw(context);
    requestAnimationFrame(redraw);
}

redraw();
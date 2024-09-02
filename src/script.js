
import { Canvas } from './canvas.js'
import { DrawingContext } from './context.js';
import { Map } from './map.js';
import { FileRead } from './read_file.js';

var canvas = new Canvas();
var context = new DrawingContext();
var map = new Map(context);
var file = new FileRead(map);

for (let i = 0; i < context.transforms.length; i++)
{
    context.transforms[i].transformForm.init_form();
}


function redraw()
{
    context.transform.reload();
    canvas.draw(context);
    requestAnimationFrame(redraw);
}

redraw();
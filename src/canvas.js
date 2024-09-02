
export class Canvas
{

    constructor()
    {
        this.canvas = document.getElementById("canvas");
        this.canvas_container = document.getElementById("canvas-container");
        this.ctx = this.canvas.getContext("2d");
    }

    update_dimensions()
    {
        var position_info = this.canvas_container.getBoundingClientRect();
        this.width = position_info.width;
        this.height = position_info.width / 1.618;
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
    }

    fill_background(color)
    {
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    center_point(point)
    {
        return [
            point[0] + this.width / 2,
            point[1] + this.height / 2,
            point[2]
        ];
    }

    draw_line(context, line, line_color)
    {
        var start = this.center_point(
            context.transform.apply_to_point(line[0]));
        var end = this.center_point(
            context.transform.apply_to_point(line[1]));
        this.ctx.beginPath();
        this.ctx.strokeStyle = line_color;
        this.ctx.moveTo(start[0], start[1]);
        this.ctx.lineTo(end[0], end[1]);
        this.ctx.stroke();
    }
    
    draw_lines(context)
    {
        for (let i = 0; i < context.lines.length; i++)
        {
            this.draw_line(context, context.lines[i], context.line_color);
        }
    }

    draw(context)
    {
        this.update_dimensions();
        this.fill_background(context.background_color);
        this.draw_lines(context);
    }
}


export class Map
{

    constructor(context)
    {
        this.context = context;
        this.map = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 2, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        this.width = 5;
        this.height = 5;
        this.context.lines = this.get_lines();
    }

    center_point(point)
    {
        return [
            (point[0] - (this.height - 1) / 2),
            (point[1] - (this.width - 1) / 2),
            point[2]
        ];
    }

    get_lines()
    {
        var lines = [];
        for (let x = 0; x < this.width; x++)
        {
            for (let y = 0; y < this.height; y++)
            {
                if (x < this.width - 1)
                {
                    lines.push(
                        [
                            this.center_point([y, x, this.map[x][y]]),
                            this.center_point([y, x + 1, this.map[x + 1][y]])
                        ]
                    );
                }
                if (y < this.height - 1)
                {
                    lines.push(
                        [
                            this.center_point([y, x, this.map[x][y]]),
                            this.center_point([y + 1, x, this.map[x][y + 1]])
                        ]
                    );
                }
            }
        }
        return lines;
    }

}
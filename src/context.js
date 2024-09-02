import { Transform, Scale, RotationX, RotationY, RotationZ, Zoom, Translation } from "./transform.js";

export class DrawingContext
{

    constructor()
    {
        this.background_color = "rgb(100, 100, 100)";
        this.line_color = "#ffffff";
        this.lines = [
            [[10, 10, 0], [20, 20, 0]],
            [[10, 10, 0], [100, 20, 0]],
        ];
        this.transforms = [
            new Scale(50, 50, 50),
            new RotationZ(0, 0.3),
            new RotationY(0, 0),
            new RotationX(5, 0),
            new Zoom(0.5, 0),
            new Translation(0, 0, 0)
        ]
        this.transform = new Transform(
            this.transforms
        );
    }

}

import { TransformForm } from "./forms.js";

export class Transform
{

    constructor(factors, animation_speed)
    {
        this.factors = factors;
        this.reload();
        this.animation_speed = animation_speed;
    }

    identity()
    {
        this.transform = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    set_transform(values)
    {
        for (let row = 0; row < 4; row++)
        {
            for (let column = 0; column < 4; column++)
            {
                this.transform[row][column] = values[row][column];
            }
        }
    }

    get_animation_frame()
    {
        return this.animation_speed * Date.now() / 1000;
    }

    compose_transform(other)
    {
        var temp = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    
        for (let row = 0; row < 4; row++)
        {
            for (let column = 0; column < 4; column++)
            {
                temp[row][column] =
                    this.transform[row][0] * other.transform[0][column]
                    + this.transform[row][1] * other.transform[1][column]
                    + this.transform[row][2] * other.transform[2][column]
                    + this.transform[row][3] * other.transform[3][column];
            }
        }

        this.set_transform(temp);
    }

    apply_to_point(point)
    {
        var p = point;
        var t = this.transform;
        var a = p[0] * t[0][0] + p[1] * t[1][0] + p[2] * t[2][0] + t[3][0];
        var b = p[0] * t[0][1] + p[1] * t[1][1] + p[2] * t[2][1] + t[3][1];
        var c = p[0] * t[0][2] + p[1] * t[1][2] + p[2] * t[2][2] + t[3][2];
        var w = p[0] * t[0][3] + p[1] * t[1][3] + p[2] * t[2][3] + t[3][3];
        return [a / w, b / w, c / w];
    }

    reload()
    {
        this.identity();
        if (this.factors != null)
        {
            for (let t = 0; t < this.factors.length; t++)
            {
                this.factors[t].reload();
                this.compose_transform(this.factors[t]);
            }
        }
    }

}

export class Scale extends Transform
{

    constructor(x, y, z, animation_speed)
    {
        super(null, animation_speed);
        this.x = x;
        this.y = y;
        this.z = z;
        this.transformForm = new TransformForm(
            "Scale",
            this,
            ["x", "y", "z"]
        );
        this.reload();
    }

    get_display_value(attribute)
    {
        if (attribute == "x" || attribute == "y" || attribute == "z")
        {
            return this[attribute] ;
        }
        if (attribute == "animation_speed")
        {
            return this[attribute] * 100;
        }
    }

    set_display_value(attribute, value)
    {
        if (attribute == "x" || attribute == "y" || attribute == "z")
        {
            this[attribute] = value ;
        }
        if (attribute == "animation_speed")
        {
            this[attribute] = value / 100;
        }
    }

    reload()
    {
        this.identity();
        this.transform[0][0] = this.x;
        this.transform[1][1] = this.y;
        this.transform[2][2] = this.z;
    }

}

export class RotationX extends Transform
{

    constructor(angle, animation_speed)
    {
        super(null, animation_speed);
        this.angle = angle;
        this.transformForm = new TransformForm(
            "X Rotation",
            this,
            ["angle", "animation_speed"]
        );
        this.reload();
    }

    get_display_value(attribute)
    {
        if (attribute == "angle")
        {
            return this[attribute] * 100 / (Math.PI * 2);
        }
        if (attribute == "animation_speed")
        {
            return this[attribute] * 100;
        }
    }

    set_display_value(attribute, value)
    {
        if (attribute == "angle")
        {
            this[attribute] = value * (Math.PI * 2) / 100;
        }
        if (attribute == "animation_speed")
        {
            this[attribute] = value / 100;
        }
    }

    reload()
    {
        var angle = this.angle + this.get_animation_frame();
        this.identity();
        this.transform[1][1] = Math.cos(angle);
        this.transform[1][2] = -Math.sin(angle);
        this.transform[2][1] = Math.sin(angle);
        this.transform[2][2] = Math.cos(angle);
    }

}

export class RotationY extends Transform
{

    constructor(angle, animation_speed)
    {
        super(null, animation_speed);
        this.angle = angle;
        this.transformForm = new TransformForm(
            "Y Rotation",
            this,
            ["angle", "animation_speed"]
        );
        this.reload();
    }

    get_display_value(attribute)
    {
        if (attribute == "angle")
        {
            return this[attribute] * 100 / (Math.PI * 2);
        }
        if (attribute == "animation_speed")
        {
            return this[attribute] * 100;
        }
    }

    set_display_value(attribute, value)
    {
        if (attribute == "angle")
        {
            this[attribute] = value * (Math.PI * 2) / 100;
        }
        if (attribute == "animation_speed")
        {
            this[attribute] = value / 100;
        }
    }

    reload()
    {
        var angle = this.angle + this.get_animation_frame();
        this.identity();
        this.transform[0][0] = Math.cos(angle);
        this.transform[0][2] = Math.sin(angle);
        this.transform[2][0] = -Math.sin(angle);
        this.transform[2][2] = Math.cos(angle);
    }

}

export class RotationZ extends Transform
{

    constructor(angle, animation_speed)
    {
        super(null, animation_speed);
        this.angle = angle;
        this.transformForm = new TransformForm(
            "Z Rotation",
            this,
            ["angle", "animation_speed"]
        );
        this.reload();
    }

    get_display_value(attribute)
    {
        if (attribute == "angle")
        {
            return this[attribute] * 100 / (Math.PI * 2);
        }
        if (attribute == "animation_speed")
        {
            return this[attribute] * 100;
        }
    }

    set_display_value(attribute, value)
    {
        if (attribute == "angle")
        {
            this[attribute] = value * (Math.PI * 2) / 100;
        }
        if (attribute == "animation_speed")
        {
            this[attribute] = value / 100;
        }
    }

    reload()
    {
        var angle = this.angle + this.get_animation_frame();
        this.identity();
        this.transform[0][0] = Math.cos(angle);
        this.transform[0][1] = -Math.sin(angle);
        this.transform[1][0] = Math.sin(angle);
        this.transform[1][1] = Math.cos(angle);
    }

}
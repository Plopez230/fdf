

export class FileRead
{
    
    constructor(map)
    {
        this.map = map;
        this.input = document.getElementById("input-file");
        this.input.addEventListener("change", this.read_file.bind(this));
    }

    read_file(e)
    {
        var file = e.target.files[0];
        if (!file) {
            return; 
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            this.load_map(contents);
        }.bind(this);
        reader.readAsText(file);
    }

    load_map(contents)
    {
        this.map.map = [];
        var rows = contents.split("\n");
        for (let i = 0; i < rows.length; i++)
        {
            var str_values = rows[i].split(" ");
            var values = [];
            for (let x = 0; x < str_values.length; x++)
            {
                values.push(parseInt(str_values[x]));
            }
            this.map.height = Math.max(this.map.height, values.length);
            this.map.map.push(values);
        }
        this.map.width = rows.length;
        this.map.context.lines = this.map.get_lines();
    }

}
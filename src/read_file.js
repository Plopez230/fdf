

export class FileRead
{
    
    constructor(map)
    {
        this.map = map;
        this.input = document.getElementById("input-file");
        this.input.addEventListener("change", this.read_file.bind(this));
        document.querySelectorAll('a[example]').forEach(link => {
            link.addEventListener('click', this.read_example.bind(this));
            link.innerHTML = link.getAttribute("example");
        });
    }

    read_example(e)
    {
        e.preventDefault();
        var name = e.target.getAttribute("example");
        fetch('./examples/'+name)
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            response.text().then(function(data) {
                //console.log(data);
                this.load_map(data);
            }.bind(this));
            }.bind(this)
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
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
        delete this.map.map;
        this.map.map = [];
        this.map.width = 0;
        this.map.height = 0;
        var rows = contents.split("\n");
        for (let i = 0; i < rows.length; i++)
        {
            var str_values = rows[i].split(" ");
            var values = [];
            for (let x = 0; x < str_values.length; x++)
            {
                var value = parseInt(str_values[x]);
                if (!isNaN(value))
                    values.push(value);
            }
            this.map.height = Math.max(this.map.height, values.length);
            this.map.map.push(values);
        }
        this.map.width = rows.length;
        this.map.context.lines = this.map.get_lines();
    }

}
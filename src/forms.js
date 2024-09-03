
export class TransformForm
{

    constructor(name, transform, attributes)
    {
        this.name = name;
        this.transform = transform;
        this.attributes = attributes;
        this.id = this.gen_id();
        document.getElementById("transformations").innerHTML += this.get_form();
    }

    gen_id()
    {
        return Date.now().toString()
            + Math.floor(Math.random() * 100000).toString();
    }

    get_form()
    {
        var form = `
            <div class="accordion-item" id="${this.id}">
                <h2 class="accordion-header" id="heading-${this.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${this.id}">
                    ${this.name}
                </button>
                </h2>
                <div id="collapse-${this.id}" class="accordion-collapse collapse" data-bs-parent="#transformations">
                    <div class="accordion-body">
        `;
        for (let i = 0; i < this.attributes.length; i++)
        {
            form += `
            <label for="customRange1" class="form-label">${this.attributes[i]}</label>
            <input type="range" class="form-range" id="range-${this.attributes[i]}-${this.id}" value="${this.transform.get_display_value(this.attributes[i])}" el="${this.attributes[i]}">
            `;
        }
        form += `
                    </div>
                </div>
            </div>
        `;
        return form;
    }

    init_form()
    {
        for (let i = 0; i < this.attributes.length; i++)
        {
            var element = document.getElementById(
                `range-${this.attributes[i]}-${this.id}`);
            element.oninput = function(event){
                var el = event.target.getAttribute("el");
                var val = Math.floor(event.target.value);
                this.transform.set_display_value(el, val);
            }.bind(this);
        }
    }
}

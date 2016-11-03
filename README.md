# Form component built using ReactJS

This is a reusable piece of code which renders the fields described in the `config` object in a form tag. Here is a sample `config` object

    config = {
        id: "info",
        name: "info",
        label: "Form header",
        fields: [{
            label: "Greeting",
            value: "Hello",
            type: "text"
        },
        {
            label: "Fruits",
            options: options,
            type: "select",
            selected: "c"
        },
        {
            label: "Fruits",
            values: radios,
            type: "radio",
            selectedValue: "c"
        },
        {
            label: "Fruits",
            values: checkboxes,
            type: "checkbox"
        },
        {
            value: "Submit",
            type: "submit"
        }],
        onSubmit: function () {
            console.log("Form submitted");
        },
        action: "/abc"
    }
    
Bootstrap is used to style and layout the form

## Usage

    ReactDOM.render(<ReactForm config={config} />,document.getElementById('root'));
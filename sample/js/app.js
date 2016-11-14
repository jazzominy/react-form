var options = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];
var checkboxes = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];
var radios = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];

var config = {
    id: "info",
    name: "info",
    label: "Form header",
    fields: [{
        label: "Greeting",
        value: "Hello World",
        type: "text"
    },
    {
        label: "Password",
        value: "Hello",
        type: "password",
        required: true
    },
    {
        label: "Fruits",
        options: options,
        type: "select",
        selected: "c",
        required: true
    },
    {
        label: "Fruits",
        values: radios,
        type: "radio",

        required: true
    },
    {
        label: "Fruits",
        values: checkboxes,
        type: "checkbox",
        selectedValue: ["a","c"],
        required: true
    },
    {
        value: "Submit",
        type: "submit"
    }],
    validator: true,
    onSubmit: function (fieldMap, form, event) {
        if(event && event.defaultPrevented)
        {
            console.log("Form is still invalid");
            return;
        }

        console.log("Form onSubmit called");
    },
    action: "/abc"
}

var form = ReactDOM.render(<RForm config={config} />,document.getElementById('root'));

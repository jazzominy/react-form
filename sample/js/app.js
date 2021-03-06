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
        type: "password"
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
        type: "checkbox",
        selectedValue: ["a","c"]
    },
    {
        value: "Submit",
        type: "submit"
    }],
    onSubmit: function (fieldMap, form) {
        console.log("Form onSubmit called");
    },
    action: "/abc"
}

var form = ReactDOM.render(<RForm config={config} />,document.getElementById('root'));

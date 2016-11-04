var options = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];
var checkboxes = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];
var radios = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];

var config = {
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
        type: "checkbox",
        selectedValue: ["a","c"]
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

ReactDOM.render(<ReactForm config={config} />,document.getElementById('root'));

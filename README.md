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
            type: "checkbox",
            selectedValue: ["a","c"]
        },
        {
            value: "Submit",
            type: "submit"
        }],
        onSubmit: function (fieldMap) {
            console.log("Form submitted");
        },
        action: "/abc"
    }


Bootstrap is used to style and layout the form.

### Usage

    ReactDOM.render(<ReactForm config={config} />,document.getElementById('root'));

### `config`

This prop specifies which how a form is to be rendered. It have these properties `id`, `name`, `label`, `fields`, `onSubmit` and `action`

##### `id`

Holds the value of `id` property of the form

##### `name`

Holds the value of `name` property of the form

##### `fields`

The `fields` property is of type array and holds the configuration for the fields to be rendered. Each object in this array looks like this

    {
        id: "", /*This property is required and used when retrieving data when submitting form*/
        label: "Field Label", /*The label for the field*/
        value: "Hello", /*field value that is initially displayed*/
        type: "text" /*type of the field (text|select|radio|checkbox|submit)*/
    }

##### `onSubmit`

The handler function that is called when the form is submitted. This function is called with 2 parameters:

* `fieldMap` - a map of field `id` as the key and the value as value of respective fields. In case if the field `id` is not specified, the key is constructed from field `type` and `label` as `type_label`

* `form` - reference to the form

##### `action`

Specifies the destination url where the form is to be submitted
var FormTextIp = React.createClass({
	getInitialState: function(){
		return {value:""}
	},

    componentWillMount: function(){
        this.setState({value:this.props.value});
    },

	handleChange:function(event){
		this.setState({value:event.target.value});
	},

	render:function(){

        return (<div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="inputName">{this.props.label}</label>
                    <div className="col-sm-9">
                        <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange}/>
                    </div>
                </div>);
	}
});

var FormTextArea = React.createClass({
	getInitialState: function(){
		return {value:""}
	},

    componentWillMount: function(){
        this.setState({value:this.props.value});
    },

    handleChange:function(event){
		this.setState({value:event.target.value});
	},

    render: function(){
        return (<div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="inputName">{this.props.label}</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" type="text" value={this.state.value} onChange={this.handleChange}/>
                    </div>
                </div>);
	}
});

var FormDropdown = React.createClass({
    getInitialState: function(){
		return {value:""}
	},

    componentWillMount: function(){
        this.setState({value:this.props.selected});
    },

    handleChange:function(event){
		this.setState({value:event.target.value});
	},

	render: function(){
        var options = [];

        if(this.props.options && this.props.options.length)
        {
            this.props.options.forEach(function(item,index,arr){
                options.push(<option value={item.value} key={index}>{item.label}</option>);
            })
        }

        return (<div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="inputName">{this.props.label}</label>
                    <div className="col-sm-9">
                        <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                            {options}
                        </select>
                    </div>
                </div>);
	}
});

var FormCheckbox = React.createClass({

    render: function(){

        var style = {paddingLeft: "0px"};
        var checkboxes = [];

        if(this.props.values && this.props.values.length)
        {
            this.props.values.forEach(function(item,index,arr){
                var checked = item.checked === true ? true : false;
                checkboxes.push(<div className="checkbox checkbox-inline" key={index} style={style}>
                                  <label>
                                    <input type="checkbox" value={item.value} defaultChecked={checked}/>{item.label}
                                  </label>
                                </div>);
            })
        }

        return (<div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="inputName">{this.props.label}</label>
                    <div className="col-sm-9">
                        {checkboxes}
                    </div>
                </div>);
    }
});

var FormRadio = React.createClass({

    render: function(){
        var radios = [];
        var props = this.props;

        if(this.props.values && this.props.values.length)
        {
            this.props.values.forEach(function(item,index,arr){
                var checked = props.selectedValue === item.value ? true : false;
                radios.push(<label className="radio-inline" key={index}>
                              <input type="radio" name="options" value={item.value} defaultChecked={checked}/>{item.label}
                            </label>);
            })
        }

        return (<div className="form-group">
                    <label className="col-sm-3 control-label">{this.props.label}</label>
                    <div className="col-sm-9">
                      {radios}
                    </div>
                </div>);
    }
});

var FormSubmitButton = React.createClass({
    render: function(){
        return (<div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button className="btn btn-primary" type="submit">{this.props.value}</button>
                    </div>
                </div>);
    }
});

var Form = React.createClass({

    componentWillMount: function(){
        this.setState({value:this.props.value});
    },

    onSubmit: function(event){

        if(this.props.config && typeof this.props.config.onSubmit === "function"){
            event.preventDefault();
            this.props.config.onSubmit();
        }
    },

    render: function(){
        var id = this.props.config.id;
        var name = this.props.config.name;
        var action = this.props.config.action;
        var config = this.props.config;
        var fields = config.fields;
        var formFields = fields.map(function(item, index, arr){
            var props = {
                label: item.label,
                value: item.value,
                type: item.type,
                key: index
            }

            var formItem = <FormTextIp {...props}/>;

            if(item.type == "select")
            {
                formItem = <FormDropdown {...props} options={item.options} selected={item.selected}/>
            }
            else if(item.type == "radio")
            {
                formItem = <FormRadio {...props} values={item.values} selectedValue={item.selectedValue}/>
            }
            else if(item.type == "checkbox")
            {
                formItem = <FormCheckbox {...props} values={item.values}/>
            }
            else if(item.type == "submit")
            {
                formItem = <FormSubmitButton {...props}/>
            }

            return formItem;
        });

        return (<form id={id} name={name} className="form-horizontal" onSubmit={this.onSubmit} method="post"
                      action={action} autoComplete="off">
                    {formFields}
                </form>);
    }
});

var options = [{label:"Apple",value:"a"},{label:"Banana",value:"b"},                                               {label:"Cranberry",value:"c"}];
var checkboxes = [{label:"Apple",value:"a",checked:false},{label:"Banana",value:"b",checked:true},                                               {label:"Cranberry",value:"c"}];
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
        type: "checkbox"
    },
    {
        value: "Submit",
        type: "submit"
    }],
    onSubmit: function(){
        console.log("Form submitted");
    },
    action: "/abc"
}

/*ReactDOM.render(<Form options={options} checkboxes={checkboxes}
                radios={radios}/>,document.getElementById('root'));*/
ReactDOM.render(<Form config={config} />,document.getElementById('root'));

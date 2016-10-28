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

        if(this.props.checkboxes && this.props.checkboxes.length)
        {
            this.props.checkboxes.forEach(function(item,index,arr){
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

        if(this.props.radios && this.props.radios.length)
        {
            this.props.radios.forEach(function(item,index,arr){
                var checked = item.selected === true ? true : false;
                radios.push(<label className="radio-inline" key={index}>
                              <input type="radio" name="options" value={item.value} defaultChecked={checked}/>{item.label}
                            </label>);
            })
        }

        return (<div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="inputName">{this.props.label}</label>
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
                        <button className="btn btn-primary" type="submit">{this.props.text}</button>
                    </div>
                </div>);
    }
});

var Form = React.createClass({
    componentWillMount: function(){
        this.setState({value:this.props.value});
    },
    onSubmit: function(event){
        event.preventDefault();
    },
    render: function(){
        return (<form className="form-horizontal" onSubmit={this.onSubmit}>
                    <FormTextIp label="Greeting" value="Hello"/>
                    <FormTextArea label="Description"/>
                    <FormDropdown label="Fruits" options={this.props.options}/>
                    <FormCheckbox label="Fruits" checkboxes={this.props.checkboxes}/>
                    <FormRadio label="Fruits" radios={this.props.radios}/>
                    <FormSubmitButton text="Submit"/>
                </form>);
    }
});

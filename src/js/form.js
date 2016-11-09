;(function(){
    var FormTextIp = React.createClass({
        getInitialState: function () {
            return {value: ""};
        },

        componentWillMount: function () {
            this.setState({value: this.props.value});
        },

        handleChange: function (event) {
            this.setState({value: event.target.value});

            if(typeof this.props.updateData === "function")
                this.props.updateData(this.props.id, event.target.value);
        },

        render: function () {

            return (<div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor={this.props.id}>{this.props.label}</label>
                        <div className="col-sm-9">
                            <input id={this.props.id} name={this.props.name} className="form-control" type={this.props.type} value={this.state.value} onChange={this.handleChange}/>
                        </div>
                    </div>);
        }
    });

    var FormTextArea = React.createClass({
        getInitialState: function () {
            return {value:""}
        },

        componentWillMount: function () {
            this.setState({value:this.props.value});
        },

        handleChange:function(event){
            this.setState({value:event.target.value});

            if(typeof this.props.updateData === "function")
                this.props.updateData(this.props.id, event.target.value);
        },

        render: function () {
            return (<div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor={this.props.id}>{this.props.label}</label>
                        <div className="col-sm-9">
                            <textarea id={this.props.id} name={this.props.name} className="form-control" type="text" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                    </div>);
        }
    });

    var FormDropdown = React.createClass({
        getInitialState: function () {
            return {value:""}
        },

        componentWillMount: function () {
            this.setState({value:this.props.selected});
        },

        handleChange:function (event) {
            this.setState({value:event.target.value});

            if(typeof this.props.updateData === "function")
                this.props.updateData(this.props.id, event.target.value);
        },

        render: function () {
            var options = [];

            if(this.props.options && this.props.options.length)
            {
                this.props.options.forEach(function(item,index,arr){
                    options.push(<option value={item.value} key={index}>{item.label}</option>);
                })
            }

            return (<div className="form-group">
                        <label className="col-sm-3 control-label" htmlFor={this.props.id}>{this.props.label}</label>
                        <div className="col-sm-9">
                            <select id={this.props.id} name={this.props.name} className="form-control" value={this.state.value} onChange={this.handleChange}>
                                {options}
                            </select>
                        </div>
                    </div>);
        }
    });

    var FormCheckbox = React.createClass({

        getInitialState: function () {
            return {value:[]}
        },

        componentWillMount: function () {
            this.setState({value:this.props.selectedValue});
        },

        handleChange:function (event) {
            var value = this.state.value;
            var index = value.indexOf(event.target.value);

            if(event.target.checked && index == -1)
                value.push(event.target.value);
            else if(!event.target.checked && index != -1)
                value.splice(index,1);

            this.setState({value:value});

            if(typeof this.props.updateData === "function")
                this.props.updateData(this.props.id, value);
        },

        render: function () {
            var handleChange = this.handleChange;
            var style = {paddingLeft: "0px"};
            var selectedValue = this.state.value.join(",");
            var checkboxes = [];

            if(this.props.values && this.props.values.length)
            {
                this.props.values.forEach(function(item,index,arr){
                    var checked = selectedValue.search(item.value) != -1 ? true : false;
                    checkboxes.push(<div className="checkbox checkbox-inline" key={index} style={style}>
                                      <label>
                                        <input type="checkbox" value={item.value} checked={checked} onChange={handleChange}/>{item.label}
                                      </label>
                                    </div>);
                });
            }

            return (<div className="form-group">
                        <label className="col-sm-3 control-label">{this.props.label}</label>
                        <div className="col-sm-9">
                            {checkboxes}
                        </div>
                    </div>);
        }
    });

    var FormRadio = React.createClass({

        getInitialState: function () {
            return {value:""}
        },

        componentWillMount: function () {
            this.setState({value:this.props.selectedValue});
        },

        handleChange:function (event) {
            this.setState({value:event.target.value});

            if(typeof this.props.updateData === "function")
                this.props.updateData(this.props.id, event.target.value);
        },

        render: function () {
            var radios = [];
            var state = this.state;
            var handleChange = this.handleChange;

            if(this.props.values && this.props.values.length)
            {
                this.props.values.forEach(function(item,index,arr){
                    var checked = state.value === item.value ? true : false;
                    radios.push(<label className="radio-inline" key={index}>
                                  <input type="radio" name="options" value={item.value} checked={checked} onChange={handleChange}/>{item.label}
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
        render: function () {
            return (<div className="form-group">
                        <div className="col-sm-9 col-sm-offset-3">
                            <button className="btn btn-primary" type="submit">{this.props.value}</button>
                        </div>
                    </div>);
        }
    });

    var Form = React.createClass({

        componentWillMount: function () {
            this.setState({fieldMap:{}});
        },

        onSubmit: function(event){

            event.preventDefault();

            if(this.props.config && typeof this.props.config.onSubmit === "function"){

                var data = this.getData();
                this.props.config.onSubmit(data,this.form);
            }
            else
                console.log("No onSubmit handler provided");
        },

        render: function () {
            var fieldMap = this.state.fieldMap;
            var updateData = this.updateData;
            var id = this.props.config.id;
            var name = this.props.config.name;
            var action = this.props.config.action;
            var config = this.props.config;
            var fields = config.fields;
            var formFields = fields.map(function(item, index, arr){
                var key = item.id ? item.id : item.type +"_"+ item.label;
                item.id = key;
                //For button not need for updateData handler
                updateData = (item.type == "button" || item.type == "submit") ? null : updateData;

                var props = {
                    id: item.id,
                    name: item.name,
                    label: item.label,
                    value: item.value,
                    type: item.type,
                    key: index
                }

                if(updateData)
                    props.updateData = updateData;

                var formItem = <FormTextIp {...props} updateData={updateData}/>;
                fieldMap[item.id] = item.value;

                if(item.type == "select")
                {
                    props.options = item.options;
                    props.selected = item.selected;
                    fieldMap[item.id] = item.selected;
                    formItem = <FormDropdown {...props}/>
                }
                else if(item.type == "radio")
                {
                    props.values = item.values;
                    props.selectedValue = item.selectedValue;
                    fieldMap[item.id] = item.selectedValue;
                    formItem = <FormRadio {...props}/>
                }
                else if(item.type == "checkbox")
                {
                    props.values = item.values;
                    props.selectedValue = item.selectedValue;
                    fieldMap[item.id] = item.selectedValue;
                    formItem = <FormCheckbox {...props}/>
                }
                else if(item.type == "submit")
                {
                    formItem = <FormSubmitButton {...props}/>
                    delete fieldMap[item.id];
                }

                return formItem;
            });

            return (<form id={id} name={name} className="form form-horizontal"
                          onSubmit={this.onSubmit} method="post" ref={this.setFormRef}
                          action={action} autoComplete="off">
                        {formFields}
                    </form>);
        },

        setFormRef: function(ref){
            this.form = ref;
        },

        getData: function(){
            return this.state.fieldMap;
        },

        updateData: function(key,value){
            if(key && value)
            {
                this.state.fieldMap[key] = value;
            }
        }
    });

    window.RForm = Form;
})();

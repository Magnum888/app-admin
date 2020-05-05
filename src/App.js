import React, { Component } from 'react';
import Menu from './Menu';
import Content from './Content';
import axios from 'axios';
import {API_POST_COMMAND, API_GET_COMMAND} from './config';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectMenuItemName: '',
            selectMenuItem: {},
            formContent: {}
        };
        this.intervalID = 0

        this.changeSelectItemMenu = this.changeSelectItemMenu.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.getSelectCommandData = this.getSelectCommandData.bind(this);
        this.startInterval = this.startInterval.bind(this);
    }

    startInterval(name){
        /** content (right) - update every 3 seconds */
        if(name !== ''){
            this.intervalID = setInterval(()=>{
                this.getSelectCommandData(name)
            }, 3000);
        }
    }

    stopInterval(){
        if(this.intervalID !== 0){
            clearInterval(this.intervalID);
            this.intervalID = 0;
        }
    }

    changeSelectItemMenu(obj){
        let {name = ''} = obj;
        this.setState({selectMenuItemName: name, selectMenuItem: obj }, ()=>{
            this.getSelectCommandData(name);
            this.stopInterval();
            this.startInterval(name);
        })
    }

    async getSelectCommandData(name){
        let {selectMenuItem = {}} = this.state
        let {data = []} = await axios.get(`${API_GET_COMMAND}${name}`);
        if(data.length){
            let newSelectMenuItem = selectMenuItem;
            newSelectMenuItem.data = data.reverse();
            this.setState({selectMenuItem: newSelectMenuItem})
        }
    }

    onSubmitForm(e){
        e.preventDefault();
        let {
            selectMenuItemName = '',
            formContent:{
                textareaForm = '',
                selectTypeForm = ''
            } = {}
        } = this.state;
        if(textareaForm !== '' && selectTypeForm !== '' && selectMenuItemName !== ''){
            let obj = {
                "type": selectTypeForm,
  	            "command": textareaForm
            }
            axios.post(`${API_POST_COMMAND}${selectMenuItemName}`, obj)
            .then((response) => {
                console.log('response', response);
                this.getSelectCommandData(selectMenuItemName);
            })
            .catch((error) => {
                console.log('error', error);
            });


        }
    }

    onChangeInfo(e){
        let {formContent = {}} = this.state;
        let {
            target: {
                value = '',
                name = ''
            } = {}
        } = e;
        let newFormContent = formContent;
        if(name !== ''){
            newFormContent[name] = value;
            this.setState({formContent: newFormContent})
        }
    }

    render() {
        const { selectMenuItemName } = this.state;

        const contentInfoObj = {
            selectMenuItem: this.state.selectMenuItem,
            infoDataCommand: this.state.infoDataCommand,
            onSubmitForm: this.onSubmitForm,
            formContent: this.state.formContent,
            onChangeInfo: this.onChangeInfo
        }
        
        return (
            <div className="main">
                <div className="row">
                    <div className="col-sm-3">
                        <Menu 
                            changeSelectItemMenu={this.changeSelectItemMenu} 
                            selectMenuItemName={selectMenuItemName}
                        />
                    </div>
                    <div className="col-sm-9">
                        <Content {...contentInfoObj}/>
                    </div>
                </div>   
            </div>
        );
    }
}

export default App;
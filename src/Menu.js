import React, { Component } from 'react';
import {API_GET_LIST} from './config';
import axios from 'axios';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        };
        this.intervalID = 0;
        this.getDataList = this.getDataList.bind(this);
        this.startInterval = this.startInterval.bind(this);
    }
    

    async getDataList(){
        let {data = {}} = await axios.get(API_GET_LIST);

        let arr = [];
        if(typeof data === 'object'){
            Object.keys(data).map((key) => {
                let date = data[key] && data[key].length ? new Date(data[key]).toLocaleString() : data[key];
                let timestamp = data[key] && data[key].length ? new Date(data[key]) : data[key];
                arr.push({
                    name: key,
                    value: data[key],
                    time: date,
                    timestamp: timestamp
                });
            });
        }
        let sortedDate = []
        if(arr.length && arr[0].timestamp && arr[1].timestamp){
            sortedDate = arr.slice().sort((a, b) => b.timestamp - a.timestamp);
        }else{
            sortedDate = arr;
        }

        this.setState({list: sortedDate});
    }

    startInterval(){
        /** content (left) - update every 10 seconds */
        this.intervalID = setInterval(this.getDataList, 10000)
    }

    componentDidMount(){
        this.getDataList();
        this.startInterval();
    }


    render() {
        const {list = [] } = this.state;
        const {changeSelectItemMenu, selectMenuItemName = '' } = this.props;

        return (
            <div className="left-menu">
                <div className="list-group">
                    {list && list.length ? list.map((item) => {
                        return(
                            item.name && item.time ? <button 
                                key={item.name} type="button" 
                                onClick={()=>changeSelectItemMenu(item)} 
                                className={`list-group-item list-group-item-action btn-sm ${item.name === selectMenuItemName ? 'active' : ''}`} >
                                {item.name}

                                <br/>
                                
                                {item.time}
                            </button> : false
                        )
                    }) : false}
                </div>
            </div>
        );
    }
}

export default Menu;
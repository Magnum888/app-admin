import React, {Fragment} from 'react';
import {COMMANDS} from './config';

const Content = (props) => {

    const { 
        selectMenuItem: {
            name: selectMenuItemName = '',
            value: selectMenuItemValue = '',
            data: infoDataMenuItemArray = []
        } = {},
        formContent: {
            textareaForm = '',
            selectTypeForm = ''
        } = {},
        onSubmitForm,
        onChangeInfo
    } = props;
    
    return (
        <div className="container main-content">
            {selectMenuItemName !== '' && <Fragment>
                <h4>SELECT COMMAND: {selectMenuItemName} </h4>
                <h5>TIME: {selectMenuItemValue}</h5>
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="selectTypeForm">Example select</label>
                        <select name="selectTypeForm" value={selectTypeForm} onChange={onChangeInfo} className="form-control form-control-sm" id="selectTypeForm">
                            <option value="">-</option>
                            {COMMANDS.map((command)=>{
                                return(
                                    <option key={command} value={command}>{command}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textareaForm">Text:</label>
                        <textarea name="textareaForm" className="form-control form-control-sm" id="textareaForm" rows="2" value={textareaForm} onChange={onChangeInfo}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            {infoDataMenuItemArray.length ? infoDataMenuItemArray.map((info)=>{
                                return(
                                    <li key={info.id} className="list-group-item">
                                        {info.id && <div>
                                            ID: {info.id}
                                        </div>} 
                                        {info.status && <div>
                                            STATUS: {info.status}
                                        </div>}
                                        
                                        {info.type && <div>
                                            TYPE: {info.type}
                                        </div>}
                                        
                                        {info.command && <div>
                                            COMMAND: {info.command}
                                        </div>}
                                        
                                        { info.result && <div>
                                            RESULT: {info.result}
                                        </div>}
                                    </li>
                                )
                            }) : false}
                        </ul>
                        
                    </div>
                </div>
            </Fragment> }
        </div>
    );

}

export default Content;
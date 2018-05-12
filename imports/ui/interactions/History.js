import React, {Component} from 'react';
import "./History.css";

export default class History extends Component{

    render(){
        let history = [];
        let data = this.props.data;
        if(data.length>0){
            data.forEach((d)=>{
                history.push(
                    <li key={d.routeTag} className="list-group-item">
                        <h4>{d.agencyTag+": "+d.routeTag}</h4>
                    </li>);
            });
        }
        return(
            <div className="row top-all">
                <div className="card col-12 card-top">
                    <div className="card-header bg-info">
                        <h2>Top Searches</h2>
                    </div>
                    <ul className="list-group list-group-flush top-searches">
                        {history}
                    </ul>
                </div>
            </div>
        );
    }
}
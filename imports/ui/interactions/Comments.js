import React, {Component} from 'react';

export default class Comments extends Component{

    handleComment(){
        let val = e.target.value;
        this.props.handleComment(val);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.submitAction}>

                    <div className="form-group center-items">
                        <div className={"form-group" }>
                            <label htmlFor="password">Confirm Password:</label>
                            <input placeholder="comment" type="text" id="comment"
                                   className={"form-control"}
                                   onChange={this.handleComment.bind(this)}
                                   aria-label="Text input"
                            />
                        </div>
                        <button type="submit"
                                className="btn"
                                aria-label={" button"}>
                            {this.props.typeAuth}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
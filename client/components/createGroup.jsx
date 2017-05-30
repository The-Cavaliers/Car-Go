import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';


class component1 extends React.Component {
    constructor(props){
        super(props);
        this.clickHandler= this.clickHandler.bind(this);
    }
    clickHandler() {
        this.props.createGroup(1);
    }

    render() {
        const style = {
            margin: 12,
        };
        return(
          <div>
            <p>
              <Link to ="/createGroup"> Component1 </Link> 
             </p>            
            <RaisedButton
              label="Click Me" 
              primary={true} 
              style={style}
              onTouchTap={this.clickHandler} 
            />
          </div>
        );
    }
} 
export default component1 ;
import './App.css';
import React from 'react';

class App extends React.Component{
    constructor(props){
      super(props);
      this.state={
        count:0
      };
    }
    increament(){
      this.setState({count:this.state.count+1})
    }
    decreament(){
      this.setState({count:this.state.count-1})
    }
    render(){
      return (
          <div className='container'>
            <h1>Counter App Using React</h1>
            <div className='display'>
              {this.state.count}
            </div>
            <div className="butten">
              <button onClick={this.increament.bind(this)}>Increament</button>
              <button onClick={this.decreament.bind(this)}>Decreament</button>
            </div>
          </div>

      )
    }
}
export default App;

import React from 'react';

export default class Symbols extends React.Component{
    constructor(props){
        super(props);

        this.state={
            input:'',
            symbol:[]
        }
        this.changeInput=this.changeInput.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.generatelist();
    }
    changeInput(e){
        this.setState({
            input: e.target.value
        });
        console.log(this.state.input);
    }

    generatelist(){
        const pointer=this;
        let keyword = this.state.input;
        let API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=YT17685SYYDRGFF2`;
        fetch(API_Call)
          .then(
              function(response) {
                  return response.json();
              }
          )
          .then(
              function(data){
                  console.log(data);
                  
                  pointer.setState({
                      symbol: data['bestMatches'],
                  })
                  console.log(pointer.state.symbol)
              }
          )
    }

    makeTable(){
        return this.state.symbol.map(sym=>{
            return(
                <tr>
                    <td>{sym['1. symbol']}</td>
                    <td>{sym['2. name']}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h2>Search Stock Symbols</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <input  type="text"
                        required
                        className="form-control"
                        onChange={this.changeInput}
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Stock Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.makeTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    
}
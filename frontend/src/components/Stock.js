import React from 'react';
import Plot from 'react-plotly.js';
import Button from 'react-bootstrap/Button';
import Symbols from './Symbolview';
import UserStocks from './UserStocks';

import axios from 'axios';

const SearchSymbol = (props) => {
    if(props.search){
      return (
      <div>
        <Symbols/>
        <hr style={{borderColor:'black'}}/>
      </div>
      )
    }
    return <div> </div>;
}

const Show = (props) => {
  if(props.Updated){
    return (
    <div>
      <UserStocks id={props.id} key={props.id}/>
    </div>
    )
  }
  return <div> </div>;
}

class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      price:{},
      API: 'YT17685SYYDRGFF2',
      search:false,

      username: '',
      wallet: 0,
      in:0,
      out:0,

      
      stocks:[],
      enterSymbol:'',
      stockSymbol:'',
      qty:0,
      sell:0,
      Updated: false
      
    }

    this.changeSymbol=this.changeSymbol.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onDeposit= this.onDeposit.bind(this);
    this.onTake= this.onTake.bind(this);

    this.onBuy=this.onBuy.bind(this);
    this.onChangeqty=this.onChangeqty.bind(this);
    this.onChangesell=this.onChangesell.bind(this);
    this.onSell=this.onSell.bind(this)
    
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          wallet: response.data.wallet,
          stocks: response.data.stocks,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
    refresh(){
      axios.get('http://localhost:5000/users/'+this.props.id)
      .then(response => {
        this.setState({
          wallet: response.data.wallet,
          stocks: response.data.stocks,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  
    onDeposit(amount) {
      
      const user = {
            wallet: this.state.wallet+amount
          };
  
      console.log(user);
  
      axios.post('http://localhost:5000/users/update/' + this.props.id, user)
          .then(res => console.log(res.data));
        
      
      }
    
  
    onTake(amt) {
      
      if(amt>this.state.wallet){
          alert("Insufficient Amount in Wallet")
        }
      else{
          const user = {
            wallet: this.state.wallet-amt
          };
  
      console.log(user);
  
      axios.post('http://localhost:5000/users/update/' + this.props.id, user)
          .then(res => console.log(res.data));
        
      }
    }
    
    onSubmit(e){
      e.preventDefault();
      this.fetchStock();
    }

    changeSymbol(e){
      this.setState({
        enterSymbol: e.target.value
      })
    }
    
    
    fetchStock() {
      const pointerToThis = this;
      console.log(pointerToThis);
      let StockSymbol = this.state.enterSymbol;
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${this.state.API}`;
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];

      fetch(API_Call)
        .then(
          function(response) {
            return response.json();
          }
        )
        .then(
          function(data) {
            console.log(data);

            for (var key in data['Time Series (Daily)']) {
              stockChartXValuesFunction.push(key);
              stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            }

            // console.log(stockChartXValuesFunction);
            pointerToThis.setState({
              stockChartXValues: stockChartXValuesFunction,
              stockChartYValues: stockChartYValuesFunction
            });
          }
        )
        .catch((error) => {
          console.log(error);
        })
        

        API_Call=`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${StockSymbol}&apikey=${this.state.API}`
        fetch(API_Call)
        .then(
          function(response) {
            return response.json();
          }
        )
        .then(
          function(data){
            console.log(data);
            if(data['Global Quote']!==undefined){
            pointerToThis.setState({
              price: data['Global Quote']
            });}
            else{
              alert("Wrong Symbol");
              pointerToThis.setState({
                enterSymbol:''
              })
            }
          }
        )
        .catch((error) => {
          console.log(error);
        })
    }

    onChangeqty(e){
      this.setState({
        qty: e.target.value,
        Updated: false
      });
    }

    onChangesell(e){
      this.setState({
        sell: e.target.value,
        Updated: false
      });
    }

    onBuy(e){
      e.preventDefault();
      console.log(this.state.price['01. symbol']);
      if(this.state.price['01. symbol']===undefined){
        return alert('Choose A Symbol First')
      }
      const amount=Number(this.state.price['05. price']) * this.state.qty;
      console.log(this.state.qty)
      console.log(amount)
      this.onTake(amount);

      if(amount<=this.state.wallet){
      const addStock={stock:
        {
        name: this.state.price['01. symbol'],
        quantity: Number(this.state.qty)
      }
      };
      console.log(addStock);

      axios.post('http://localhost:5000/users/stock/' + this.props.id, addStock)
          .then(res =>{ 
            console.log(res.data);
            this.setState({
              qty: 0,
              Updated: true
            })
            this.refresh();
          });
    }
    }

    onSell(e){
      e.preventDefault();
      console.log(this.state.price['01. symbol']);
      if(this.state.price['01. symbol']===undefined){
        return alert('Choose A Symbol First')
      }
      var check=0;
      var qty=0;
      // eslint-disable-next-line
      this.state.stocks.map(stock=>{
       if(stock.name===this.state.price['01. symbol']){
         console.log(stock.name)
         console.log(stock.quantity)
         console.log(this.state.sell)
         if(stock.quantity>=this.state.sell){
          qty=stock.quantity;
          check=1;
        }
      }
      })
      console.log(check);
      if(check===0){
        return alert("You cannot sell this stock")
      }
      const amount=Number(this.state.price['05. price']) * this.state.sell;
      
      console.log(amount)

      this.onDeposit(amount);
      console.log(qty);
      if (Number(qty)===Number(this.state.sell)){
          const sym={name: this.state.price['01. symbol']}
          axios.post('http://localhost:5000/users/delete/' + this.props.id, sym)
          .then(res => {
            console.log(res.data)
            this.setState({
              sell: 0,
              Updated: true
            })
            this.refresh();
          });
          return ;
      }
      
      const addStock={stock:
        {
        name: this.state.price['01. symbol'],
        quantity: Number(this.state.sell) * (-1)
      }
      };
      console.log(addStock);

       axios.post('http://localhost:5000/users/stock/' + this.props.id, addStock)
          .then(res => {
            console.log(res.data)
            this.setState({
              sell: 0,
              Updated: true
            })
            this.refresh();
          });
  }

  render() {
    return (
      <div>
        <hr style={{borderColor:'black'}}/>  
        <h3>Wallet(USD): {this.props.wallet.toFixed(3)}</h3>
        <br/>
        <div>
          <UserStocks id={this.props.id}key={this.props.id}/>
        </div>
        <h3>Stock Market</h3>
        <br/>
        <Button variant="outline-info" size="sm" onClick={()=>this.setState({search: true})}><em>Search Stock Symbols</em></Button>{' '}
        <br/><br/>
        <div><SearchSymbol search={this.state.search}/></div>
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
             <label>Enter Stock Symbol: </label>
             <input  type="text"
                required
                className="form-control"
                onChange={this.changeSymbol}
                />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'Past 100 Days Graph'}}
        />
        <div>
        <h3>Daily Charts</h3>
          <table className="table">
            <tbody>
                <tr><th >Open Price</th><td>{this.state.price['02. open']} </td></tr>
                <tr><th >High Price</th><td>{this.state.price['03. high']} </td></tr>
                <tr><th>Low Price</th><td>{this.state.price['04. low']} </td></tr>
                <tr><th>Volume</th><td>{this.state.price['06. volume']} </td></tr>
                <tr><th>Previous Close</th><td>{this.state.price['08. previous close']} </td></tr>
                <tr><th>Change</th><td>{this.state.price['09. change']} </td></tr>
                <tr><th>Change Percentage</th><td>{this.state.price['10. change percent']} </td></tr>
                <tr><th>Current Price(USD)</th><td><strong>{this.state.price['05. price']}</strong> </td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3>Buy {this.state.price['01. symbol']}</h3>
          <form onSubmit={this.onBuy}>
          <div className="form-group"> 
            <label style={{color:'rgb(29,79,145,1)'}}>Quantity: </label>
            <input  type="number"
                required min="1"
                className="form-control"
                value={this.state.qty}
                onChange={this.onChangeqty}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="BUY" className="btn btn-primary" />
          </div>
        </form>
        </div> 

        <div>
          <h3>Sell {this.state.price['01. symbol']}</h3>
          <form onSubmit={this.onSell}>
          <div className="form-group"> 
            <label style={{color:'rgb(29,79,145,1)'}}>Quantity: </label>
            <input  type="number"
                required min="1"
                className="form-control"
                value={this.state.sell}
                onChange={this.onChangesell}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="SELL" className="btn btn-primary" />
          </div>
        </form>
        </div>
        <div>
          {console.log(this.state.Updated)}
          <Show Updated={this.state.Updated} id={this.props.id} wallet={this.state.wallet}/>
        </div> 
      </div>
    )
  }
}

export default Stock;
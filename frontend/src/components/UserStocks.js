import React from 'react';
import axios from 'axios';

class UserStocks extends React.Component {
    constructor(props){
        super(props);

        this.state={
            stocks: []
        }

    }

    componentDidMount(){
      axios.get('http://localhost:5000/users/'+this.props.id)
        .then(response => {
          this.setState({
            stocks: response.data.stocks,
          })   
        })
        .catch(function (error) {
          console.log(error);
      })
    }

    stockList(){
      return this.state.stocks.map(stock=>{
        return(
            <tr>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
            </tr>
        )
    })
    }

    render(){
        return(
            <div>
              <h2>Owned Stocks</h2>
                <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Stock Symbol</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.stockList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default UserStocks;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var BlockIPOContractABI = [{"constant":true,"inputs":[],"name":"ownerCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_company","type":"bytes32"},{"name":"_to","type":"address"},{"name":"_shares","type":"uint256"}],"name":"addIssued","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"getIssued","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"issued","outputs":[{"name":"name","type":"bytes32"},{"name":"company","type":"bytes32"},{"name":"shares","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_shares","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"times","type":"uint256"}],"name":"split","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}]
var BlockIPOContractAddress = '0xeacb835a0c7284b4a3d77b32c3ad82ddc2be286c'

var BlockIPOContract = ETHEREUM_CLIENT.eth.contract(BlockIPOContractABI).at(BlockIPOContractAddress)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      names: [],
      companys: [],
      shares: [],
      TxAddress: [],
    }
  }
  componentWillMount() {
    var data = BlockIPOContract.getIssued()
    this.setState({
      names: String(data[0]).split(','),
      companys: String(data[1]).split(','),
      shares: String(data[2]).split(','),
      TxAddress: String(data[3]).split(','),
    })
  }

  render() {

    var TableRows = []

    _.each(this.state.names, (value, index) => {
      TableRows.push(
        <tr>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.names[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.companys[index])}</td>
          <td>{this.state.shares[index]}</td>
        </tr>
      )
    })


    return (
      <div className="App">
        <div className="App-header">
          <h2>BlockIPO</h2>
          <h3>Verify Your Security on Ethereum</h3>
        </div>

        <p className="App-intro">
          BlockIPO is a dApp built on Ethereum to let companies issue securities verifiably on the blockchain.
        </p>
        <div class="row">
          <div class="col-lg-1 col-centered"></div>
            <div className="App-Content">
              <table align="center">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {TableRows}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }
}

export default App;

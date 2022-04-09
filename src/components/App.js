import React, { Component } from 'react'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import Navbar from './Navbar'
import Swap from './Swap'
import Nft from './Nft'
import Ico from './Ico'
import Wallet from './Wallet'

import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Token
    const networkId =  await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]

    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  transferTokens = (tokenAmount, receiver ) => {
    this.state.token.methods.transfer(tokenAmount, receiver).
    send({ from: this.state.account }).on('transactionHash', (hash) => {
      alert(1);    })
  }

   transferEth = (tokenAmount, receiver ) => {
    alert(tokenAmount);
    alert(receiver);
    this.state.token.methods.sendEth(tokenAmount, receiver).
    send({ value: tokenAmount, from: this.state.account }).on('transactionHash', (hash) => {
      alert(1);    })
  }

  buyTokens = (etherAmount) => { 
    this.state.token.methods.buy().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      alert(hash); })
  }

  sellTokens = (tokenAmount) => {
      this.state.token.methods.sell(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
alert(hash); })
  }

  changeLocation = (location) => {
    this.loading = location;
  }

  constructor(props) {
   super(props)          // super() is used to call the parent constructor
                          // super(props) would pass props to the parent constructor
    this.state = {
      account: '',
      token: {},
      nft: {},
      ethBalance: '0',
      tokenBalance: '0',
    }
    }
  
  render() {
    let content
   
    let  content1 = <Swap
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
      />

     let content2 = <Ico
        ethBalance={this.state.ethBalance}
        transferEth={this.transferEth}
      />  

    let content3 = <Wallet
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
      />
    let content4 = <Nft
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
      /> 


    return (
      <div>
        
<ul>
  <h2><a href="www.github.com/himang305">Universal Interface {this.state.loading} </a></h2>
 </ul>
      <ul>
  <li><a href="" onClick={() => {    }}>Eths Transfer</a></li>
  <li><a href="" onClick={() => {    }}>Token Transfer</a></li>
  <li><a href="" onClick={() => {    }}>ICO - Exchange Holdings</a></li>
  <li><a href="" onClick={() => {    }}>NFT Minting Market Place</a></li>
  <li><a href="" onClick={() => {    }}>NFT Market Place</a></li>

</ul>


        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
               
                
                {content1}

               </div>
             </main>
          </div>
        </div>


        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
               
                
                {content2}

               </div>
             </main>
          </div>
        </div>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
               
                
                {content3}

               </div>
             </main>
          </div>
        </div>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
               
                
                {content4}

               </div>
             </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

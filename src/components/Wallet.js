import React, { Component } from 'react'

class Wallet extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id="content" className="mt-3">

        <div className="card mb-4" >

          <div className="card-body">

        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          let receiver
          receiver = this.input.value
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount)
        }}>

        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const receiver = this.input.value
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; Receiver Address
            </div>
          </div>
        </div> 

        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const etherAmount = this.input.value.toString()
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; DappTokens
            </div>
          </div>
        </div>
       
       
      
        <button type="submit" className="btn btn-primary btn-block btn-lg">Transfer Tokens</button>
      </form>

          </div>

        </div>

      </div>
    );
  }
}

export default Wallet;

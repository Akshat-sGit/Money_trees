import React from 'react';
import { Link } from 'react-router-dom';
// 0xfa941be4c0ae46332f087b290dbab9a5b7930e04
// import { useSendTransaction, usePrepareSendTransaction } from "wagmi";  
// import { parseUnits} from "viem";  
 


// 0x17C179d1Aaede098Bb92EbaFe66989Ea441A54Db 

// use ethers to send a transaction of 0.001 ETH to the address 0x17C179d1Aaede098Bb92EbaFe66989Ea441A54Db 


async function sendTransactiontest(count) {  
  let params = [{ 
    from: "0xBDc2C9AD96313b5d11147378B927820718Bb5FEe",
    to: "0x3B7e7512a66A3b46BD7e0fF1b043A7455a7971E3", 
    gas: Number(21000).toString(16), 
    gasPrice: Number(10000000000).toString(16), 
    value: Number(count*1000000000000000).toString(16),
  }]
  let result = await window.ethereum.request({method: 'eth_sendTransaction', params: params}) 

  
}



const Cart = ({ cart, setCart }) => {
  return (
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {cart.length === 0 ? (
          <>
            <div className='text-center'>
            <h1>Your Cart is Empty</h1>
              <Link to={"/"} className='btn btn-warning'>Continue Shopping...</Link>
            </div>
          </>
        ) : (
          cart.map((product) => (
            <div className="card mb-3 my-5" style={{ width: '700px' }} key={product.id}>
              <div className="row g-0 cart-card">
                <div className="col-md-4">
                  <img src={product.imgSrc} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

      </div>

      {cart.length !== 0 && (
        <div className="container text-center my-5" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button className='btn btn-warning mx-5 ' onClick={() => sendTransactiontest(cart.length)}>CheckOut</button>
          <button onClick={() => setCart("")} className='btn btn-danger'>Clear Cart</button>
        </div>
      )}
    </>
  )
}

export default Cart;
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { BsFillCartCheckFill } from 'react-icons/bs';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        // Request MetaMask account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Handle successful connection
        console.log('Connected accounts:', accounts);
        // Perform further actions or state updates upon successful connection
      } else {
        console.error('MetaMask not detected');
        // Optionally, provide a message or UI indication that MetaMask is not installed
      }
    } catch (error) {
      // Handle errors or user rejections
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };


  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={'/'} className="brand">
            MoneyTrees
          </Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
          </form>

          <div className="connect">
            <button onClick={connectToMetaMask} type="button" className="btn btn-primary">
              Connect
            </button>
          </div> 

          <Link to={'/cart'} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
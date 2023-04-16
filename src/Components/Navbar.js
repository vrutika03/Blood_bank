import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import { apiurl } from './api';

function Horizontal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state.email);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  const handleSubscribe = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        
        body: JSON.stringify({ email })
      };Swal.fire({
        icon: 'success',
        title: 'Place check your email',
        text: 'You are succesfully subscribed wohoo!!',
        
      })
  
      const response = await fetch(apiurl + 'subscription', requestOptions);
      const data = await response.json();
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDonate = async () => {
    try {
      const requestOptions = {
        method: 'POST',
       
        body: JSON.stringify({ email })
      };Swal.fire({
        icon: 'success',
        title: 'Place check your email for details',
      })
  
      const response = await fetch(apiurl + 'donationemail', requestOptions);
      const data = await response.json();
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">Blood Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Available Blood</Nav.Link>
          {/* <Nav.Link href="/request">Request</Nav.Link>  */}
        </Nav>
        <Nav>
          <Nav.Link onClick={handleDonate}>Want to donate?</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleSubscribe}>Subscribe</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Horizontal;

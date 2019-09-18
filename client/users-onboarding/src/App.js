import React from 'react';
import axios from 'axios';

import './App.css';

axios.defaults.withCredentials = true;

function App() {

  const login = () => {
    console.log('Login Function Start')
    axios
      .post('http://localhost:5000/api/users/login', { username: 'andrew', password: 'allen' })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getUsers = () => {
    console.log('Get Users Function Start')
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const logout = () => {
    console.log('Logout Function Start')
    axios
      .get('http://localhost:5000/api/users/logout')
      .then(res => {
        console.log(res)

      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        User Onboarding
        <button onClick={login}>Login</button>
        <button onClick={getUsers}>Get Users</button>
        <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';

import './App.css';
import UserContext from './store/user-context';

function App() {
  const [user, setUser] = useState({ user: { firstName: '', lastName: '' } })


  console.log('APP', user)

  useEffect(() => {
    let storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      handleUserUpdate({ firstName: parsedUser.firstName, lastName: parsedUser.lastName })
    }
  }, [])

  const handleUserUpdate = (user) => {
    setUser(user)
  }
  
  return (
    <UserContext.Provider value={{ user, onUserUpdate: handleUserUpdate }}>
      <div className="App">
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;

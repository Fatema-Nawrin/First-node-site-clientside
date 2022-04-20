import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }
    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers)
        console.log(data);
      })
  }
  return (
    <div className="App">
      <h2>Own data:{users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="text" name='email' placeholder='Email' required />
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.id} {user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;

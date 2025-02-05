import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])







  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));



    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));




  }, []);


  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = () => { users.filter((user) => {
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredUsers(filteredItems)

    }
  }

  useEffect(() => {
    if (users.length > 0 && posts.length > 0) {
      const data = users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        return {
          name: user.name,
          email: user.email,
          city: user.address.city,
          posts: userPosts
        };
      });
      setMergedData(data);
    }
  }, [users, posts]);

  return (
    <div>

      <div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      </div>




      {mergedData.map(user => (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>City: {user.city}</p>
          
          <h3>Posts:</h3>
          <ul>
            <hr />


            {user.posts.map(post => (
              <li>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
           <br /><br /><br /> <br />
        </div>
      ))}
    </div>
  ); 
};

export default App;

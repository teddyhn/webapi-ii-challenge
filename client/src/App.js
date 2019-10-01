import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
        setPosts(res.data);
      })
  }, []);

  return (
    <div className="App">
      <h1>POSTS</h1>
      <div className="posts">
        {posts && posts.map(post => (
          <Card style={{ width: '40vw' }}>
            <Card.Body>
              <Card.Title>
                {post.title}
              </Card.Title>
              <Card.Text>
                {post.contents}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;

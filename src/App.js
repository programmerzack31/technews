import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [newsdata, setnewsdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=pub_70803f76cfc1801e3eb610969f9b2325c775c&q=programming%20and%20ai `
      )
      .then((res) => {
        setnewsdata(res.data.results);
        setloading(false);
      })
      .catch((error) => {
        seterror('Failed to fetch news');
        setloading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="App">
      <div>
      <h1>Technical News </h1>
      </div>
      {newsdata.map((article, index) => (
        <div key={index} className="article">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;

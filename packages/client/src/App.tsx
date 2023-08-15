import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return <div>Вот тут будет жить ваше при ложение :)</div>;
};

export default App;

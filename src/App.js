import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories( response.data );
    });
  }, []);

  async function handleAddRepository() {
    const request = await api.post( 'repositories', {
      title: `New Repo ${ Date.now() }`,
      url: "https://github.com/brunomendonca-com/node-concepts",
      techs: [ "node.js", "javascript", "reactjs" ]
    } );

    const newRepo = request.data;

    setRepositories( [ ...repositories, newRepo ] );

  }

  async function handleRemoveRepository(id) {
    await api.delete( `repositories/${ id }` );

    const updatedRepositories = repositories.filter( repo => repo.id !== id );
    setRepositories( updatedRepositories );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( repo => {
          return (
            <li key={repo.id}>
              { repo.title }
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

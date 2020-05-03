import React, { useEffect, useState } from 'react'
import api from './services/api'
import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Desafio completo',
      url: 'https://github.com/VictorHCord/desafio-conceito-reactjs',
      techs: ['nodejs, reactjs'],
    })

    console.log(response)
    const repo = response.data
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter((repository) => repository.id !== id))
  }

  useEffect(() => {
    api
      .get('/repositories')
      .then((response) => setRepositories(response.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App

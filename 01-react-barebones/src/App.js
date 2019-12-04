import React from "react";
import { useQuery } from "urql";

const getMovies = `
  query {
    movies {
      id
      title
    }
  }
`;

function App() {
  const [res] = useQuery({
    query: getMovies
  });

  return (
    <div>
      <h1>Movies app</h1>
      {res.fetching ? (
        <p>Loading...</p>
      ) : res.error ? (
        <p style={{ color: "red" }}>{res.error.message}</p>
      ) : (
        res.data.movies.map(movie => <p key={movie.id}>{movie.title}</p>)
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";

function Movie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: "ba93d47944dcdc9fbcc575b8943ef3e2",
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la película", error);
      });
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Typography variant="h4">{movie.title}</Typography>
      <Card>
        <CardMedia
          component="img"
          height="700"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {movie.overview}
          </Typography>
          <Typography variant="subtitle2" component="div">
            Fecha de lanzamiento: {movie.release_date}
          </Typography>
          <Typography variant="subtitle2" component="div">
            Calificación: {movie.vote_average}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Movie;

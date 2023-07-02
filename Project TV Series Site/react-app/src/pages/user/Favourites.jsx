import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const handleRemoveFromFavourites = (id) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== id);
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const renderFavorites = () => {
    return favourites.map((fav) => (
      <Grid item xs={12} sm={6} md={4} key={fav.id}>
        <Card
          sx={{
            backgroundColor: 'mediumseagreen',
            color: 'white',
            fontSize: '2rem',
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={fav.image || ''}
            alt={fav.name}
          />
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {fav.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Year: {fav.premiered?.substring(0, 4) || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seasons: {fav.seasons || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Episodes: {fav.episodes || 'N/A'}
            </Typography>
            <Link to={`/product/${fav.id}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="success" sx={{ marginTop: '1rem' }}>
                View Details
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: '1rem' }}
              onClick={() => handleRemoveFromFavourites(fav.id)}
            >
              Remove from Favorites
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Container>
      <Typography sx={{ marginBottom: '2rem' }}>
        
      </Typography>
      <Grid container spacing={3}>
        {favourites.length > 0 ? renderFavorites() : <p>No favorites selected.</p>}
      </Grid>
    </Container>
  );
};

export default Favourites;

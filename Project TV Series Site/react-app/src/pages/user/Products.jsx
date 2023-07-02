import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  TextField,
} from '@mui/material';

const API_URL = 'https://api.tvmaze.com/shows';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSeasonsAndEpisodes = async (id) => {
    try {
      const [seasonsResponse, episodesResponse] = await Promise.allSettled([
        fetch(`${API_URL}/${id}/seasons`),
        fetch(`${API_URL}/${id}/episodes`),
      ]);

      const seasonsData = await seasonsResponse.value.json();
      const episodesData = await episodesResponse.value.json();

      const seasonsCount = seasonsData.length;
      const episodesCount = episodesData.length;

      return { seasons: seasonsCount, episodes: episodesCount };
    } catch (error) {
      console.log(error);
      return { seasons: 0, episodes: 0 };
    }
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then(async (data) => {
        const promises = data.map(async (product) => {
          const { seasons, episodes } = await fetchSeasonsAndEpisodes(product.id);
          return { ...product, seasons, episodes };
        });

        const updatedProducts = await Promise.allSettled(promises);

        const resolvedProducts = updatedProducts
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);

        setProducts(resolvedProducts);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prevCount) => prevCount + 20);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProducts = () => {
    const visibleProductList = filteredProducts.slice(0, visibleProducts);

    return visibleProductList.map((product) => {
      const isProductInFavourites = checkIfProductInFavourites(product.id);

      return (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
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
              image={product.image?.medium || ''}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Year: {product.premiered?.substring(0, 4)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seasons: {product.seasons ? product.seasons : 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Episodes: {product.episodes ? product.episodes : 'N/A'}
              </Typography>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success" sx={{ marginTop: '1rem' }}>
                  View Details
                </Button>
              </Link>
              <Button
                variant="contained"
                color={isProductInFavourites ? 'error' : 'primary'}
                sx={{ marginTop: '1rem', marginLeft: '0.5rem' }}
                onClick={() =>
                  handleAddToFavourites(
                    product.id,
                    product.name,
                    product.image?.medium,
                    product.premiered,
                    product.seasons,
                    product.episodes
                  )
                }
              >
                {isProductInFavourites ? 'Remove Favourites' : 'Add Favourites'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  const handleAddToFavourites = (id, name, image, premiered, seasons, episodes) => {
    const storedFavourites = localStorage.getItem('favourites');
    const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];

    const isProductInFavourites = favourites.some((favourite) => favourite.id === id);

    if (isProductInFavourites) {
      const updatedFavourites = favourites.filter((favourite) => favourite.id !== id);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    } else {
      const newFavourite = { id, name, image, premiered, seasons, episodes };
      const updatedFavourites = [...favourites, newFavourite];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    }
  };

  const checkIfProductInFavourites = (id) => {
    const storedFavourites = localStorage.getItem('favourites');
    const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];
    return favourites.some((favourite) => favourite.id === id);
  };

  return (
    <Container>
      <Typography sx={{ marginBottom: '1rem' }}></Typography>
      <Typography sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          sx={{ marginRight: '1rem' }}
        />
        <Button variant="contained" onClick={() => setSearchQuery('')}>
          Clear
        </Button>
      </Typography>
      {loading ? (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {renderProducts()}
        </Grid>
      )}
      {visibleProducts < filteredProducts.length && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Products;
 
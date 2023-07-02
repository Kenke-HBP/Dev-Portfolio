import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, CardMedia } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = `https://api.tvmaze.com/shows/${id}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <CardMedia
        component="img"
        height="400"
        image={product.image?.original || ''}
        alt={product.name}
        sx={{ marginBottom: '1rem' }}
      />
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Season {product.season} | Episode {product.number}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginTop: '1rem' }}
        dangerouslySetInnerHTML={{ __html: product.summary }}
      ></Typography>
    </Container>
  );
};

export default ProductDetails;

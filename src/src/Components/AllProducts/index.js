/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ProductCard from 'src/src/Shared/ProductCard';
import HeaderPrimary from 'src/src/Shared/SectionHeader/HeaderPrimary';
// import Image from '../../assets/image.webp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'src/Redux/slice/productSlice';

// const products = [
//   {
//     id: 1,
//     image: Image,
//     title: 'Traditional Window Style Mirror',
//     oldPrice: '$50',
//     newPrice: '$35',
//     soldItems: 100,
//   },
//   {
//     id: 2,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 3,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 4,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 5,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 6,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 7,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 8,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 9,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 10,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 11,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
//   {
//     id: 12,
//     image: Image,
//     title: 'Product 2',
//     oldPrice: '$80',
//     newPrice: '$60',
//     soldItems: 75,
//   },
// ];

const AllProducts = () => {
  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => {
    console.log(state);
    return state?.productSlice?.data;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return 'Loading...';
  if (error) return JSON.stringify(error);
  console.log(products, loading, error);

  return (
    <Stack py={4} spacing={2}>
      <HeaderPrimary title="PRODUCTS" />
      <Typography textAlign={'center'} fontSize={'12px'} fontWeight={400}>
        View All
      </Typography>
      <Box>
        <Container maxWidth="lg">
          <Grid rowSpacing={6} columnSpacing={2} container>
            {Array.isArray(products) &&
              products.map((item) => (
                <Grid key={item._id} item md={3} xs={12}>
                  <ProductCard item={item} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </Stack>
  );
};

export default AllProducts;

// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { buscarProdutos } from '../services/mockapi';
import { Container, Typography, Grid } from '@mui/material'; // 1. Importe o Grid
import ProductCard from '../components/ProductCard'; // 2. Importe o ProductCard

function HomePage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const data = await buscarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <div>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nossos Produtos
        </Typography>
        {/* 3. Substitua o <pre> por este Grid */}
        <Grid container spacing={3}>
          {produtos.map((produto) => (
            // O 'key' é essencial para o React identificar cada item da lista
            <Grid item key={produto.id} xs={12} sm={6} md={4}>
              <ProductCard produto={produto} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
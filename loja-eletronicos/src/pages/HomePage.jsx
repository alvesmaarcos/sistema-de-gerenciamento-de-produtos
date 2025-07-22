import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { buscarProdutos } from '../services/mockapi';
import { Link } from 'react-router-dom'; // Para a navegação

// 1. Unificamos os imports do Material-UI em uma única linha
import { Container, Typography, Grid, Button } from '@mui/material'; 
import ProductCard from '../components/ProductCard';


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
      <Container sx={{ mt: 4, mb: 4 }}>
        
        {/* 2. Adicionamos esta div para alinhar o título e o botão */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Typography variant="h4" component="h1">
            Produtos Disponíveis
          </Typography>
          <Button component={Link} to="/cadastrar" variant="contained" color="primary">
            Adicionar Produto
          </Button>
        </div>
        
        <Grid container spacing={3}>
          {produtos.map((produto) => (
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
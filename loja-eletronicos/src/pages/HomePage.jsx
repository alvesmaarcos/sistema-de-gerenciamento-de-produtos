import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { buscarProdutos, excluirProduto } from '../services/mockapi';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [produtos, setProdutos] = useState([]);
  
  // --- NOVO CÓDIGO: Estados para o diálogo de confirmação ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

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

  // --- NOVO CÓDIGO: Funções para controlar o diálogo ---
  const handleOpenDialog = (produto) => {
    setProdutoSelecionado(produto);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setProdutoSelecionado(null);
  };

  const handleConfirmDelete = async () => {
    if (produtoSelecionado) {
      try {
        await excluirProduto(produtoSelecionado.id);
        setProdutos(produtos.filter(p => p.id !== produtoSelecionado.id));
        handleCloseDialog();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <Container sx={{ mt: 4, mb: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Typography variant="h4" component="h1">
            Nossos Produtos
          </Typography>
          <Button component={Link} to="/cadastrar" variant="contained" color="primary">
            Adicionar Produto
          </Button>
        </div>
        
        <Grid container spacing={3}>
          {produtos.map((produto) => (
            <Grid item key={produto.id} xs={12} sm={6} md={4}>
              <ProductCard 
                produto={produto} 
                onDelete={() => handleOpenDialog(produto)} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja excluir o produto "{produtoSelecionado?.nome}"? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomePage;
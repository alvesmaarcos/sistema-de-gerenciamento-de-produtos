// src/pages/CreateProductPage.jsx
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { adicionarProduto } from '../services/mockapi';

function CreateProductPage() {
  const [produto, setProduto] = useState({
    nome: '', preco: '', estoque: '', categoria: '', descricao: '', imagem: ''
  });
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'info' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Verificando produto:', produto);
    if (!produto.nome.trim() || !produto.preco) {
      setFeedback({ open: true, message: 'Nome e Preço são campos obrigatórios.', severity: 'error' });
      return;
    }
    if (parseFloat(produto.preco) < 0) {
      setFeedback({ open: true, message: 'O preço do produto deve ser maior que zero.', severity: 'error' });
      return;
    }

    try {
      const produtoParaEnviar = {
        ...produto,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque, 10) || 0,
        disponivel: true
      };
      await adicionarProduto(produtoParaEnviar);
      setFeedback({ open: true, message: 'Produto cadastrado com sucesso!', severity: 'success' });
      setProduto({ nome: '', preco: '', estoque: '', categoria: '', descricao: '', imagem: '' });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setFeedback({ open: true, message: 'Falha ao cadastrar o produto. Tente novamente.', severity: 'error' });
    }
  };

  return (
    <div>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastrar Novo Produto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="nome" label="Nome do Produto" name="nome" value={produto.nome} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="preco" label="Preço" name="preco" type="number" value={produto.preco} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="estoque" label="Quantidade em Estoque" name="estoque" type="number" value={produto.estoque} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="categoria" label="Categoria" name="categoria" value={produto.categoria} onChange={handleChange} />
          <TextField margin="normal" fullWidth id="imagem" label="URL da Imagem" name="imagem" value={produto.imagem} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="descricao" label="Descrição" name="descricao" multiline rows={4} value={produto.descricao} onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Cadastrar
          </Button>
        </Box>
      </Container>
      
      <Snackbar open={feedback.open} autoHideDuration={6000} onClose={() => setFeedback({ ...feedback, open: false })}>
        <Alert onClose={() => setFeedback({ ...feedback, open: false })} severity={feedback.severity} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateProductPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { adicionarProduto } from '../services/mockapi';

function CreateProductPage() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    estoque: '',
    categoria: '',
    descricao: '',
    imagem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepara o objeto para a API, convertendo os números
      const produtoParaEnviar = {
        ...produto,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque, 10),
        disponivel: true // Definimos como disponível por padrão
      };

      await adicionarProduto(produtoParaEnviar);
      alert('Produto cadastrado com sucesso!');
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Falha ao cadastrar o produto.');
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
    </div>
  );
}

export default CreateProductPage;
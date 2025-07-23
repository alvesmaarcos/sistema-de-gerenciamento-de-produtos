// src/pages/EditProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { buscarProdutoPorId, editarProduto } from '../services/mockapi';

function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null);
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        async function fetchProduto() {
            try {
                const data = await buscarProdutoPorId(id);
                setProduto(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
            }
        }
        fetchProduto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!produto.name.trim()) {
            setFeedback({ open: true, message: 'Nome é um campo obrigatório.', severity: 'error' });
            return;
        }
        if (!produto.price) {
          setFeedback({ open: true, message: 'Preço é um campo obrigatório.', severity: 'error' });
          return;
      }
        if (parseFloat(produto.price) <= 0) {
            setFeedback({ open: true, message: 'O preço do produto deve ser maior que zero.', severity: 'error' });
            return;
        }

        try {
            const produtoParaEnviar = {
                ...produto,
                price: parseFloat(produto.price),
                estoque: parseInt(produto.estoque, 10) || 0,
            };
            await editarProduto(id, produtoParaEnviar);
            setFeedback({ open: true, message: 'Produto atualizado com sucesso!', severity: 'success' });
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Erro ao editar produto:', error);
            setFeedback({ open: true, message: 'Falha ao editar o produto. Tente novamente.', severity: 'error' });
        }
    };

    if (!produto) {
        return <Typography>Carregando...</Typography>;
    }

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Editar Produto
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="name" label="Nome do Produto" name="name" value={produto.name} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth id="price" label="Preço" name="price" type="number" value={produto.price} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth id="estoque" label="Quantidade em Estoque" name="estoque" type="number" value={produto.estoque} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth id="categoria" label="Categoria" name="categoria" value={produto.categoria} onChange={handleChange} />
                    <TextField margin="normal" fullWidth id="imagem" label="URL da Imagem" name="imagem" value={produto.imagem} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth id="descricao" label="Descrição" name="descricao" multiline rows={4} value={produto.descricao} onChange={handleChange} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Salvar Alterações
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

export default EditProductPage;
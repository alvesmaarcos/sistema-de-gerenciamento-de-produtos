import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

// --- MUDANÇA: Recebendo a prop 'onDelete' ---
function ProductCard({ produto, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={produto.imagem || 'https://placehold.co/600x400'}
        alt={produto.nome}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {produto.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {produto.categoria}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          R$ {produto.preco}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/editar/${produto.id}`} size="small">
          Editar
        </Button>        <Button size="small" color="error" onClick={onDelete}>
          Excluir
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
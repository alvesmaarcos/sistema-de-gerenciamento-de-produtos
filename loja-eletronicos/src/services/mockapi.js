const API_URL = 'https://6873f534c75558e27355beac.mockapi.io/Produtos';

export async function buscarProdutos() {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.map(item => ({
        id: item.id,
        nome: item.name || item.nome,
        preco: item.price || item.preco,
        categoria: item.categoria || 'Sem categoria',
        estoque: item.estoque || 10,
        disponivel: item.disponivel !== false
    }));
}

export async function adicionarProduto(produto) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: produto.nome,
        price: produto.preco,
        categoria: produto.categoria,
        imagem: produto.imagem,
        descricao: produto.descricao,
        estoque: produto.estoque,
        disponivel: produto.disponivel
      })
    });
    
    return await response.json();
  }

  export async function buscarProdutoPorId(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  }
  
  export async function editarProduto(id, produto) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    });
    return await response.json();
  }
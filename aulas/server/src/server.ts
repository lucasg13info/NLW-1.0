import express, { request } from 'express';

const app = express();


//ROTA: ENDEREÇO COMPLETO DA REQUISIÇÃO
//RECURSO: QUAL ENTIDADE ESTAMOS ACESSANDO DO SISTEMA


//GET: Navegador só faz get; Buscar uma ou mais informações do back-end;
//POST: Criar uma nova informação no back-end;
//PUT: Atualizar uma informação existente no back-end;
//DELETE: remover uma informação do back-end.

//POST http://localhost:3333/users = Criar users
 //GET http://localhost:3333/users = Listar usuários
// GET http://localhost:3333/users/5 = Buscar dados do usuário com id 5


app.get('/users', (requist, response) => {
    console.log('Listagem de usuários');

// JSON

    return response.json([
        'Diego',
        'Cleiton',
        'Robson',
        'Daniel'
    ]);
});


app.post('/users', (request, response) => {
    const user = {
        name: 'Diego',
        email: 'diego@rocketseat.com.br'
    }

    return response.json(user);
})

app.listen(3333);


import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de Usuarios');
    
    response.json([
        'Diego',
        'Cleiton',
        'Robson',
        'Fabio'
    ]);
    
});

app.listen(3333);
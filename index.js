const express = require('express');

const server = express();

server.use(express.json());

const cursos = ['Programacao','Banco de dados','Front end'];

//Retorna um curso
server.get('/cursos/:index',(req,res) => {
    const { index } = req.params;
    return res.json(cursos[index]);
})

//Retorna todos os cursos
server.get('/cursos',(req,res) => {
    return res.json(cursos);
})













//porta que sistema fica escutando para retornar
server.listen(3000);
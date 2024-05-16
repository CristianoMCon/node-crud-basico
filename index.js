const express = require('express');
const server = express();
const cursos = ['Programacao','Banco de dados','Front end','PUBG'];
const portaServer = 3000;
//node index.js

server.use(express.json());


//Retorna todos os cursos
server.get('/cursos',(req,res) => {
    return res.json(cursos);
});

//Retorna um curso
server.get('/cursos/:index',(req,res) => {
    const { index } = req.params;
    return res.json(cursos[index]);
});

//Criar um curso
server.post('/cursos',(req,res) => {    
    //return res.json(req.body);
    const { name } = req.body;
    cursos.push(name);
    //return res.json(req.body);
    return res.json(cursos);
});

//Atualizar um curso
server.put('/cursos/:index',(req,res) => {
    const { index } = req.params;
    const { name } = req.body;
    cursos[index] = name;
    return res.json(cursos);
});

//Deletar um curso
server.delete('/cursos/:index',(req,res) => {
    const { index } = req.params;
    cursos.splice(index,1);
    return res.json({message: "O curso foi deletado"});
});


//porta que sistema fica escutando para retornar
server.listen(portaServer);
//process.exit();
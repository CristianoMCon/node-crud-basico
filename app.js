const express       = require('express');
const server        = express();
const cursos        = ['Programacao','Banco de dados','Front end','PUBG'];
const serverDoor   = 8080;
const bodyParser    = require('body-parser');

//BODY PARSER - TRABALHANDO COM FORMULARIOS
//app.use 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(express.json());

//DEFAULT
server.get('/',function(req,res){
    //forma abreviada = app.get('/',(req,res){

    res.sendFile(__dirname + '/default.html');

    //usando senFile nao precisa colocar res.end
    //res.end;
});

//BODY PARSER - TRABALHANDO COM FORMULARIOS
server.post('/receber',(req,res) => {    
    res.write('Ola, me chamo '+req.body.nome+' e gosto de programacao, atuo ha '+req.body.experiencia+' anos com a linguagem de programacao '+req.body.linguagem+'.');
    res.end();
});

//MIDDLEWARE
function checkNameExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Ops! Falta o nome do curso!' });
    }
    return next();
}
function checkIndexInArray(req, res, next) {
    const geek = cursos[req.params.index];
    if (!geek) {
        return res.status(400).json({ error: 'Ops! Curso nao existe com o codigo informado!' });
    }    
    req.geek = geek;    
    return next();
}

//ROTAS
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
server.post('/cursos',checkNameExists,(req,res) => {    
    //return res.json(req.body);
    const { name } = req.body;
    cursos.push(name);
    //return res.json(req.body);
    return res.json(cursos);
});

//Atualizar um curso
server.put('/cursos/:index',checkIndexInArray,checkNameExists,(req,res) => {
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
server.listen(serverDoor);
//process.exit();
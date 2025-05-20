const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

//Configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'node2'
});

conexao.connect(function (erro) {
    if (erro) throw erro;
    console.log("Conectado no banco de dados!");
});




app.get('/', (req, res) => {
    let sql = 'select * from users';
    conexao.query(sql, function (erro, retorno) {
        if (erro) throw erro
        res.render('index', {
            listagem: retorno
        });
    });
})


app.get('/register', function (req, res) {
    res.render('formulario')
});

app.post('/store', (req, res) => {

    let sql = 'insert into users (username, email, password, access_level) VALUES (?, ?, ?, ?)'
    let data = [req.body.username, req.body.email, req.body.password, req.body.access_level]

    conexao.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(`Usuario ${req.body.username} criado com sucesso!`)
    })

    res.redirect('/')



})



app.get('/login', function (req, res) {
    let sql = 'select * from users';
    conexao.query(sql, function (erro, retorno) {
        res.render('formulario', { listagem: retorno });
    });
});

app.post('/store', (req, res) => {

    let sql = 'insert into users (username, email, password, access_level) VALUES (?, ?, ?, ?)'
    let data = [req.body.username, req.body.email, req.body.password, req.body.access_level]

    conexao.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(`Usuario ${req.body.username} criado com sucesso!`)
    })

    res.redirect('/')
})


app.post('/cadastrar', function (req, res) {
    let nome = req.body.nome;
    console.log(req.body);
    res.write('sadfsadf');
    res.end();
});


app.listen(3000);
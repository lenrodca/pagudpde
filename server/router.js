//mensaje dgram 
let database = require('../server')
const bodyParser = require('body-parser')
const express = require('express');
let app = express();
const path = require('path');
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
module.exports = app
app.use(express.static('public'));
//static files 
app.use(express.static(path.join(__dirname,"../views")));
app.use("/",express.static('./'));
//Rutas Paginas webs
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/historicos1',(rqe,res)=>{
    res.sendFile(path.join(__dirname,'../views/h1.html'))
})

app.get('/historicos2',(rqe,res)=>{
    res.sendFile(path.join(__dirname,'../views/h2.html'))
})

//Rutas de comunicación
app.get('/data', function (req, res) {
    let sql = "SELECT * FROM localitation ORDER BY id DESC limit 1"
    database.query(sql,(err,result)=>{
        console.log(`EL resultado es ${result[0]} `);
        res.json(result[0])
    })
	// res.json({ latitud:10.93,longitud:-74.2});
});

app.post('/h1',(req,res)=>{
    let fyh1 = req.body.fecha1+ " "+ req.body.hora1;
    let fyh2 = req.body.fecha2+ " "+ req.body.hora2;
    let sql = "SELECT * FROM localitation WHERE fechaYhora BETWEEN ? AND ?"
    let value=[
        fyh1,
        fyh2
    ]
    database.query(sql,value,function(err,result){
        if (err) throw err;
        res.json(result)
    })
    // console.log(`fecha1: ${f1},fecha2: ${f2}, hora1: ${h1}, hora2: ${h2} `);
    
});

app.post('/h2',(req,res)=>{
    var sql = "SELECT * FROM localitation WHERE (latitud  BETWEEN ? AND ? )AND (longitud  BETWEEN ? AND ?)";
    var value = [
        req.body.lat1,
        req.body.lat2,
        req.body.lon1,
        req.body.lon2
    ];
    database.query(sql, value, function(err, result) {
        if (err) throw err;
        res.json(result);
        //con.end();
      });
});

app.listen('49152', function () {
	console.log(`Example app listening at http://localhost:8080`)
});
//IMPORTARLO
import express from 'express'
const app = express();
import fs  from 'fs';
import { Contenedor } from './contenedor.js';
//CONECTARLO
const PORT = 8080;
const dia = new Date();
const hora = dia.toLocaleString();
const saludo = dia.getHours();
(()=>{
    if(saludo >= 0 && saludo < 12){
        console.log('Buenos días.')
    }
    
    if(saludo >= 12 && saludo < 18){
        console.log('Buenas Tardes.')
    }
    
    if(saludo >= 18 && saludo < 24){
        console.log('Buenas noches.')
    }
})();
const server = app.listen(PORT, ()=>{
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}, el día: ${hora}`)
})
server.on('Error', error=>{
    console.log(`Error en el servidor ${error}`)
})
app.get('/', (req, res)=>{
    res.send('<h1 style="color: blue;">Bienvenidos al servidor express</h1>')
})
app.get('/productos', (req, res)=>{
    let datos = fs.readFileSync('./productos.json');
    res.json(datos)
})
app.get('/productosRandom', (req, res)=>{
    let datos = fs.readFileSync('./productos.json','utf8')
    let producto = JSON.parse(datos)
    let random = Math.floor(Math.random()*producto.length);
    let randomObj = producto[random]
    res.json(randomObj)
})
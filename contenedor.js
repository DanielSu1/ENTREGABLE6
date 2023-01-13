import fs  from 'fs';
export class Contenedor{
constructor(datos){
this.datos = datos
}
async save(object) {
const objects = await this.getAll();
const id = (objects[objects.length - 1]?.id ?? 0) + 1
const objectToSave = { id, ...object };
const objectsToSave = JSON.stringify([ ...objects, objectToSave ])
try {
await fs.promises.writeFile(this.datos, objectsToSave)
return id;
} catch (error) {
throw new Error(error);
}
}
async getAll(){
const data = await fs.promises.readFile(this.datos)
console.log(`Los productos son: ${data}`)
return JSON.parse(data)
}
async deleteAll(){
fs.writeFileSync('./productos.json','',()=>{
if (true) {
console.log('Eliminado con exito!')
}
})
}
async getById(id) {
const objects = await this.getAll();
return objects.find(object => object.id === id);
}
}
const user1 = new Contenedor('productos.json')
const probando = user1.save({ name: 'Chrome', type: 'navigator' })

console.log(`The program has been created successfully with id ${probando}`)

user1.getAll()
/* user1.deleteAll() /* user1.getById() */
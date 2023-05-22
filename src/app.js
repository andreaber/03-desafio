import express from 'express'
import ProductManager from './components/ProductManager.js'

const app = express()
app.use(express.urlencoded({extended: true}))

const products = new ProductManager()
const readProducts = products.readProducts()

app.get('/products', async (request, response) => {
    const limit = parseInt(request.query.limit)
    const allProducts = await readProducts

    if (!limit) {
        response.send(await readProducts)
    } else {
        const productLimit = allProducts.slice(0, limit)
        response.send(productLimit)
    }
})

app.get('/products/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const allProducts = await readProducts
    const productById = allProducts.find(prod => prod.id === id)

    if (productById) {
        response.send(productById)
    } else {
        response.status(404).send({ error: 'El producto no existe' })
    }
    
})

const port = 8080
const server = app.listen(port, () => {
    console.log(`Servidor Express en el puerto ${server.address().port}`)
})
server.on('error', (err) => console.log(`Error del servidor ${err}`))



/*
Después de iniciar el servidor, se probaron las siguientes consultas:
localhost:8080/products 
localhost:8080/products/?limit=5
localhost:8080/products/2 
localhost:8080/products/34123123
*/
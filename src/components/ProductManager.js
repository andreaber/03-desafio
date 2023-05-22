import fs from 'fs'

class ProductManager {
    constructor() {
        this.path = "./products.json"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        const newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        const res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return res
    }

    getProducts = async () => {
        const res2 = await this.readProducts()
        return console.log(res2)
    }

    getProductById = async (id) => {
        const res3 = await this.readProducts()
        const filter = res3.find(prod => prod.id === id)
        // if (!filter) {
        //     console.log('Producto no encontrado')
        // } else {
        //     console.log(filter)
        // }
        !filter ? console.log('Producto no encontrado') : console.log(filter)
    }

    deleteProduct = async (id) => {
        const res4 = await this.readProducts()
        const productFilter = res4.filter(prod => prod.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))
        console.log('Producto eliminado')
    }

    updateProduct = async({id, ...product}) => {
        await this.deleteProduct(id)
        const productOld = await this.readProducts()
        const productsUpdate = [
            {id, ...product},
            ...productOld
        ]
        await fs.promises.writeFile(this.path, JSON.stringify(productsUpdate))
    }
}

export default ProductManager

// const products = new ProductManager()

// products.addProduct('Apple iPad', 'La tableta perfecta para reemplazar tu computadora.', 250, 'ruta-imagen-1.jpg', '001', 18)
// products.addProduct('iPhone 4', 'El primer iPhone con cámara frontal y FaceTime.', 390, 'ruta-imagen-2.jpg', '002', 25)
// products.addProduct('Samsung Galaxy Note', 'Un teléfono inteligente de alta calidad de Samsung.', 420, 'ruta-imagen-3.jpg', '003', 11)
// products.addProduct('Microsoft Surface', 'La mejor experiencia en tabletas y portátiles Windows.', 190, 'ruta-imagen-4.jpg', '004', 21)
// products.addProduct('Samsung Smart Watch', 'Un reloj inteligente con estilo y funcionalidad.', 280, 'ruta-imagen-5.jpg', '005', 33)
// products.addProduct('Ring', 'Un timbre inteligente con cámara para mayor seguridad.', 95, 'ruta-imagen-6.jpg', '006', 9)
// products.addProduct('Amazon Echo', 'Un altavoz inteligente con Alexa para controlar tu hogar.', 170, 'ruta-imagen-7.jpg', '007', 12)
// products.addProduct('AirPods', 'Audífonos inalámbricos de Apple con sonido de alta calidad.', 110, 'ruta-imagen-8.jpg', '008', 27)
// products.addProduct('Sony Trinitron', 'Un televisor con tecnología avanzada y colores vibrantes.', 720, 'ruta-imagen-9.jpg', '009', 15)
// products.addProduct('Apple Macintosh', 'Una computadora revolucionaria en la interacción humano-computadora.', 850, 'ruta-imagen-10.jpg', '010', 5)


// products.getProducts()

// products.getProductById(3)

// products.deleteProduct(2)

// products.updateProduct({
//     id: 4,
//     title: 'Microsoft Surface',
//     description: 'La mejor experiencia en tabletas y portátiles Windows.',
//     price: 300,
//     thumbnail: 'ruta-imagen-4.jpg',
//     code: '004',
//     stock: 21
// })
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as restify from "restify";
import { Item } from "./entity/Item";

let connection
const server = restify.createServer({
    name: 'schema-api',
})

const createItems = async (req, res, next) => {
    const hits = req.body.map(({ _source: {
        itemNo,
        itemName,
        colorCode,
        styleNo
    } }) => ({
        itemNo,
        itemName,
        colorCode,
        styleNo
    }))

    for (let index = 0; index < hits.length; index++) {
        const {
            itemNo,
            itemName,
            colorCode,
            styleNo
        } = hits[index];

        const item = new Item();
        item.skuNumber = itemNo;
        item.styleNumber = styleNo;
        item.variantNumber = `${styleNo}_${colorCode}`
        item.name = itemName
        item.marketingName = itemName
        item.chain = 'Urban'
        await connection.manager.save(item);
    }

    res.send(201, 'ok')
    next()
}

const getItems = async (req, res, next) => {
    const items = await connection.manager.find(Item);
    res.send(200, items)
    next()
}

const setRoutes = (server) => {
    server.post('/items', createItems)
    server.get('/items', getItems)
}

createConnection().then(async conn => {
    connection = conn
    setRoutes(server)
    server.use(restify.plugins.bodyParser())
    server.listen(8081, () => {
        console.log('API is ready to handle requests')
    })

}).catch(error => console.log(error));

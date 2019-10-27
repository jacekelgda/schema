import "reflect-metadata";
import { createConnection, FileLogger } from "typeorm";
import * as restify from "restify";
import { Item } from "./entity/Item";

let connection
const server = restify.createServer({
    name: 'schema-api',
})

const createItems = async (req, res, next) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.send(500, 'Error creating item')
    }
    next()
}

const getItems = async (req, res, next) => {
    const items = await connection.manager.find(Item);
    res.send(200, items)
    next()
}

const search = async (req, res, next) => {
    const { type, filterBy } = req.body

    const filterFlag = Object.keys(filterBy).pop()
    const filterByWhitelist = ['styleNumber']

    let items = await connection
        .getRepository(Item)
        .createQueryBuilder("item")

    if (filterBy && filterByWhitelist.includes(filterFlag)) {
        items = await items.having(`item.${filterFlag} = :${filterFlag}`, filterBy)
    }

    switch (type) {
        case 'style':
            items = await items
                .select(["item.name", "item.styleNumber"])
                .groupBy("item.styleNumber")
                .addGroupBy("item.name")
                .getRawMany()

            break;

        case 'variant':
            items = await items
                .select(["item.name", "item.styleNumber", "item.variantNumber"])
                .groupBy("item.variantNumber")
                .addGroupBy("item.styleNumber")
                .addGroupBy("item.name")
                .getRawMany()

            break;

        case 'sku':
            items = await items
                .select(["item.name", "item.styleNumber", "item.variantNumber", "item.skuNumber"])
                .groupBy("item.skuNumber")
                .addGroupBy("item.variantNumber")
                .addGroupBy("item.styleNumber")
                .addGroupBy("item.name")
                .getRawMany()

            break;

        default:
            break;
    }

    res.send(201, { metadata: { count: items.length }, payload: items })
    next()
}

const setRoutes = (server) => {
    server.post('/items', createItems)
    server.get('/items', getItems)
    server.post('/search', search)
}

createConnection().then(async conn => {
    connection = conn
    setRoutes(server)
    server.use(restify.plugins.bodyParser())
    server.listen(8081, () => {
        console.log('API is ready to handle requests')
    })

}).catch(error => console.log(error));

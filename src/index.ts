import "reflect-metadata";

import * as restify from "restify";
import { createConnection } from "typeorm";
import { Field } from "./entity/Field";
import { FieldValue } from "./entity/FieldValue";
import { Item } from "./entity/Item";
import { Template } from "./entity/Template";

let connection
const server = restify.createServer({
    name: 'schema-api',
})

const search = async (req, res, next) => {
    try {
        let items
        const template = await connection
            .getRepository(Template)
            .createQueryBuilder("template")
            .where('template.name = :type', req.body)
            .getOne()
        if (!template) {
            throw new Error('Template not found')
        }

        const itemRepository = connection.getRepository(Item)
        items = await itemRepository
            .find({ where: { template } })

        const { includeRelated, type } = req.body


        const getRelated = async ({ reference }) => {
            /**
             * @todo: in${type} ? based on relations
             */
            const field = await connection.getRepository(Field)
                .findOne({ where: { name: `in${type.charAt(0).toUpperCase()}${type.slice(1)}` } })
            const fieldValue = await connection.getRepository(FieldValue)
                .find({ where: { field, value: reference }, relations: ["item"] })
            return fieldValue.map(({ item }) => item)
        }

        items = await itemRepository
            .find({ where: { template } })

        const formated = []
        for (const item of items) {
            const fields = item.fieldValues.map(({ value, field }) => ({ name: field.name, value }))
            const { fieldValues, ...sth } = item

            let related = []
            if (includeRelated) {
                related = await getRelated({ reference: item.reference })
            }

            formated.push({ ...sth, fields, related })
        }

        res.send(201, formated)
    } catch ({ message }) {
        res.send(500, message)
    }
    next()
}

const createItem = async (req, res, next) => {
    try {
        const template = await connection
            .getRepository(Template)
            .createQueryBuilder("template")
            .where('template.name = :templateName', req.body)
            .getOne()
        if (!template) {
            throw new Error('Template not found')
        }
        const { reference } = req.body
        const item = new Item();
        item.reference = reference
        item.template = template
        await connection.manager.save(item);

        res.send(201, item)
    } catch ({ message }) {
        res.send(500, message)
    }

    next()
}

const createTemplate = async (req, res, next) => {
    try {
        const { name } = req.body
        const template = new Template();
        template.name = name
        await connection.manager.save(template);
        res.send(201, template)
    } catch ({ message }) {
        res.send(500, message)
    }

    next()
}

const createField = async (req, res, next) => {
    try {
        const { name } = req.body
        const field = new Field();
        field.name = name
        await connection.manager.save(field);
        res.send(201, field)
    } catch ({ message }) {
        res.send(500, message)
    }

    next()
}

const fieldvalue = async (req, res, next) => {
    try {
        const { value } = req.body
        const item = await connection
            .getRepository(Item)
            .createQueryBuilder("item")
            .where('item.reference = :itemReference', req.body)
            .getOne()
        if (!item) {
            throw new Error('Item not found')
        }

        const field = await connection
            .getRepository(Field)
            .createQueryBuilder("field")
            .where('field.name = :fieldName', req.body)
            .getOne()
        if (!field) {
            throw new Error('Field not found')
        }

        const fieldValue = new FieldValue()
        fieldValue.field = field
        fieldValue.item = item
        fieldValue.value = value
        await connection.manager.save(fieldValue);

        res.send(201, fieldValue)
    } catch ({ message }) {
        res.send(500, message)
    }
    next()
}

const setRoutes = (server) => {
    server.post('/item', createItem)
    server.post('/template', createTemplate)
    server.post('/field', createField)
    server.post('/fieldvalue', fieldvalue)
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

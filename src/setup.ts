import axios from 'axios'

const main = async () => {
    console.log('main setup / usage example')

    const instance = axios.create({
        baseURL: 'http://localhost:8081'
    });

    let fieldNames = [
        'variantNumber',
        'marketingName',
        'inStyle',
        'skuNumber',
        'inVariant',
        'bundleNumber',
        'bundlePartNumber',
        'inBundlePart',
        'inBundle'
    ]

    for (const name of fieldNames) {
        await instance({
            method: 'post',
            url: '/field',
            data: { name }
        }).catch(e => {
            console.log(`/field Failed`)
        })
    }

    const templateNames = [
        'variant',
        'style',
        'sku',
        'bundlePart',
        'bundle'
    ]

    for (const name of templateNames) {
        await instance({
            method: 'post',
            url: '/template',
            data: { name }
        })
            .catch(e => {
                console.log('/template Failed')
            })
    }

    const items = [
        { reference: '7236389_F900', templateName: 'variant' },
        { reference: '7236389_F901', templateName: 'variant' },
        { reference: '7236389_F902', templateName: 'variant' },
        { reference: '72363890015', templateName: 'sku' },
        { reference: '7236389', templateName: 'style' },
        { reference: 'BP001_A', templateName: 'bundlePart' },
        { reference: 'BP001_B', templateName: 'bundlePart' },
        { reference: 'B001', templateName: 'bundle' }
    ]

    for (const item of items) {
        await instance({
            method: 'post',
            url: '/item',
            data: item
        })
            .catch(e => {
                console.log('/item Failed')
            })
    }

    const fieldValues = [
        {
            "fieldName": "inBundle",
            "itemReference": "BP001_B",
            "value": "B001"
        },
        {
            "fieldName": "inBundle",
            "itemReference": "BP001_A",
            "value": "B001"
        },
        {
            "fieldName": "inBundlePart",
            "itemReference": "7236389_F900",
            "value": "BP001_A"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "BP001_B",
            "value": "Pants"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "BP001_A",
            "value": "Tee shirts/shirts"
        },
        {
            "fieldName": "bundleNumber",
            "itemReference": "B001",
            "value": "B001"
        },
        {
            "fieldName": "bundlePartNumber",
            "itemReference": "BP001_B",
            "value": "BP001_B"
        },
        {
            "fieldName": "bundlePartNumber",
            "itemReference": "BP001_A",
            "value": "BP001_A"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "B001",
            "value": "Levis casual outfit"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "7236389",
            "value": "Levis Classic Tee"
        },
        {
            "fieldName": "inStyle",
            "itemReference": "7236389_F900",
            "value": "7236389"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "72363890015",
            "value": "adi_OZWEEGO_EE6464_FTWWHT/FTW"
        },
        {
            "fieldName": "inVariant",
            "itemReference": "72363890015",
            "value": "7236389_F900"
        },
        {
            "fieldName": "skuNumber",
            "itemReference": "72363890015",
            "value": "72363890015"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "7236389_F901",
            "value": "adi_SOMETHING_ELSE_FTWWHT/FTW"
        },
        {
            "fieldName": "marketingName",
            "itemReference": "7236389_F900",
            "value": "adi_OZWEEGO_EE6464_FTWWHT/FTW"
        },
        {
            "fieldName": "variantNumber",
            "itemReference": "7236389_F900",
            "value": "7236389_F900"
        }
    ]

    for (const fieldValue of fieldValues) {
        await instance({
            method: 'post',
            url: '/fieldvalue',
            data: fieldValue
        })
            .catch(e => {
                console.log('/fieldvalue Failed')
            })
    }
}

main()

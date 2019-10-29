import axios from 'axios'

const main = async () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8081'
    });

    const { data: bundles } = await instance({
        method: 'post',
        url: '/search',
        data: {
            "type": "bundle",
            "includeRelated": true
        }
    })

    console.log(JSON.stringify(bundles, null, 4));

    const { data: bundleParts } = await instance({
        method: 'post',
        url: '/search',
        data: {
            "type": "bundlePart",
            "includeRelated": true
        }
    })

    console.log(JSON.stringify(bundleParts, null, 4));

    const { data: styles } = await instance({
        method: 'post',
        url: '/search',
        data: {
            "type": "style",
            "includeRelated": true
        }
    })

    console.log(JSON.stringify(styles, null, 4));

    const { data: variants } = await instance({
        method: 'post',
        url: '/search',
        data: {
            "type": "variant",
            "includeRelated": true
        }
    })

    console.log(JSON.stringify(variants, null, 4));
}

main()
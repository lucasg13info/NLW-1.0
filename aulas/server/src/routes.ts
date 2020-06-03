import express, { response } from 'express';
import Knex from './database/connection'

const routes = express.Router();


routes.get('/items', async (request, response) => {
    const items = await Knex('items').select('*');

    const serializedItems = items.map(item =>{
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });
    return response.json({serializedItems})
});

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

   const ids = await Knex('points').insert({
        image: 'image-fake',   
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    const pointItems = items.map((item_id: Number) => {
        return {
            item_id,
            point_id: ids[0],
        }
    })

    await Knex('point_items').insert(pointItems);

    return response.json({sucess: true});
});

export default routes;
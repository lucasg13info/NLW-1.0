import { Request, Response } from 'express';
import Knex from '../database/connection';


class PointsController {

    async show(request:Request, response: Response){
        const { id } = request.params;

        const point = await Knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message: 'Point not faund.'})
        } 


        const items = await Knex('items')
            .join( 'point_items',  'item.id',  '=', 'point_items.item_id')
            .where('point_items.point_id', id);



        return response.json({point, items});
    }
    async create(request: Request, response: Response){
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
    
        const trx = await Knex.transaction();

        const point ={
            
                image: 'image-fake',   
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
        };
    
       const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems);
    
        return response.json({
            id: point_id,
            ...point,
        });
    }
    }


export default PointsController;
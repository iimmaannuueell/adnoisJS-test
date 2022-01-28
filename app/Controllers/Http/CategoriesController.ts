import Category from 'App/Models/Category'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'


export default class CategoriesController {

    /**
     * Get all category
     * @param param0 
     * @returns json
     */
     public async index({ response }: HttpContextContract) {
        

        const categorys = await Category.all();

        
        let data = {
            success: true,
            message: null,
            data: categorys
        };
        response.status(200);
        return data;
    }


    /**
     * Get single category
     * @param param0 
     * @returns json
     */
     public async show({ params, response }: HttpContextContract) {

        const category = await Category.find(params.id);
        
        let data = {
            success: true,
            message: null,
            data: category
        };
        response.status(200);
        return data;
    }

    /**
     * Create new category
     * @param param0 
     * @returns json
     */
    public async store({ request, response }: HttpContextContract) {
        /**
         * Schema definition
         */
        const newcategorySchema = schema.create({
            user_id: schema.number(),
            category_id: schema.number(),
            sub_category_id: schema.number(),
            name: schema.string({}),
            description: schema.string({}),
            price: schema.number(),
        })

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: newcategorySchema })

        const newcategory = await Category.create(request.body());
        
        let data = {
            success: true,
            message: 'category created successfully',
            data: newcategory
        };
        response.status(201);
        return data;
    }
    
    
    /**
     * Update  category
     * @param param0 
     * @returns json
     */
     public async update({ params, request, response, }: HttpContextContract) {
        const category = await Category.findOrFail(params.id);
        category.fill(request.body());
        await category.save();
        
        let data = {
            success: true,
            message: 'category updated successfully',
            data: category
        };
        response.status(201);
        return data;
    } 


    /**
     * Update  category
     * @param param0 
     * @returns json
     */
     public async destroy({ params, request, response, }: HttpContextContract) {
        const category = await Category.findOrFail(params.id);
        category.fill( request.body() );
        await category.save();
        
        let data = {
            success: true,
            message: 'category delete successfully',
            data: category
        };
        response.status(201);
        return data;
    } 

}

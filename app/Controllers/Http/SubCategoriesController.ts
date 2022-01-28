import SubCategory from 'App/Models/SubCategory'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'


export default class SubCategoriesController {

    /**
     * Get all subCategory
     * @param param0 
     * @returns json
     */
     public async index({ response }: HttpContextContract) {
        

        const subCategorys = await SubCategory.all();

        
        let data = {
            success: true,
            message: null,
            data: subCategorys
        };
        response.status(200);
        return data;
    }


    /**
     * Get single subCategory
     * @param param0 
     * @returns json
     */
     public async show({ params, response }: HttpContextContract) {

        const subCategory = await SubCategory.find(params.id);
        
        let data = {
            success: true,
            message: null,
            data: subCategory
        };
        response.status(200);
        return data;
    }

    /**
     * Create new subCategory
     * @param param0 
     * @returns json
     */
    public async store({ request, response }: HttpContextContract) {
        /**
         * Schema definition
         */
        const newsubCategorySchema = schema.create({
            category_id: schema.number(),
            name: schema.string({}),
        })

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: newsubCategorySchema })

        const newsubCategory = await SubCategory.create(request.body());
        
        let data = {
            success: true,
            message: 'subCategory created successfully',
            data: newsubCategory
        };
        response.status(201);
        return data;
    }
    
    
    /**
     * Update  subCategory
     * @param param0 
     * @returns json
     */
     public async update({ params, request, response, }: HttpContextContract) {
        const subCategory = await SubCategory.findOrFail(params.id);
        subCategory.fill(request.body());
        await subCategory.save();
        
        let data = {
            success: true,
            message: 'subCategory updated successfully',
            data: subCategory
        };
        response.status(200);
        return data;
    } 


    /**
     * Update  subCategory
     * @param param0 
     * @returns json
     */
     public async destroy({ params, response, }: HttpContextContract) {
        const subCategory = await SubCategory.findOrFail(params.id);
        subCategory.delete();
        await subCategory.save();
        
        let data = {
            success: true,
            message: 'subCategory delete successfully',
            data: subCategory
        };
        response.status(200);
        return data;
    } 

}

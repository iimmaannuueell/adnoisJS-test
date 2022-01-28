import Product from 'App/Models/Product'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'


export default class ProductsController {

    /**
     * Get all product
     * @param param0 
     * @returns json
     */
     public async index({ response }: HttpContextContract) {
        

        const products = await Product.all();

        
        let data = {
            success: true,
            message: null,
            data: products
        };
        response.status(200);
        return data;
    }


    /**
     * Get single product
     * @param param0 
     * @returns json
     */
     public async show({ params, response }: HttpContextContract) {

        const product = await Product.find(params.id);
        
        let data = {
            success: true,
            message: null,
            data: product
        };
        response.status(200);
        return data;
    }

    /**
     * Create new product
     * @param param0 
     * @returns json
     */
    public async store({ request, response }: HttpContextContract) {
        /**
         * Schema definition
         */
        const newProductSchema = schema.create({
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
        await request.validate({ schema: newProductSchema })

        const newProduct = await Product.create(request.body());
        
        let data = {
            success: true,
            message: 'Product created successfully',
            data: newProduct
        };
        response.status(201);
        return data;
    }
    
    
    /**
     * Update  product
     * @param param0 
     * @returns json
     */
     public async update({ params, request, response, }: HttpContextContract) {
        const product = await Product.findOrFail(params.id);
        product.fill(request.body());
        await product.save();
        
        let data = {
            success: true,
            message: 'Product updated successfully',
            data: product
        };
        response.status(201);
        return data;
    } 


    /**
     * Update  product
     * @param param0 
     * @returns json
     */
     public async destroy({ params, response, }: HttpContextContract) {
        const product = await Product.query().where('id', params.id).delete();
        
        let data = {
            success: true,
            message: 'Product delete successfully',
            data: product
        };
        response.status(201);
        return data;
    } 

}

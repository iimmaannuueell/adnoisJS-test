import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

    /**
     * Login user
     * @param param0 
     * @returns Json
     */
    public async login({ request, response, auth }: HttpContextContract) {
        /**
         * Schema definition
         */
        const newUserSchema = schema.create({
            email: schema.string({}, [rules.email()]),
            password: schema.string(),
        })

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: newUserSchema })

        try {
            const email = request.input("email");
            const password = request.input("password");
            const token = await auth.use("api").attempt(email, password, {
            expiresIn: "1 day",
            });

            let data = {
                success: true,
                message: 'User login successful',
                data: {
                    user: auth.use('api').user!,
                    accessToken: token.toJSON()
                }
            };
            response.status(200);
            return data;
        } catch (error) {
            response.status(400);
            let data = {
                success: false,
                message: error.message,
                data: null
            };
            return data
        }
    }


    /**
     * Create new user
     * @param param0 
     * @returns json
     */
    public async register({ request, response, auth }: HttpContextContract) {
        /**
         * Schema definition
         */
         const newUserSchema = schema.create({
            username: schema.string({ trim: true }),
            first_name: schema.string({ trim: true }),
            last_name: schema.string({ trim: true }),
            gender: schema.string({ trim: true }),
            phone_number: schema.string({ trim: true }),
            address: schema.string({ trim: true }),
            email: schema.string({},[rules.email()]),
            password: schema.string({}),
        })

        /**
         * Validate request body against the schema
         */
        const payload = await request.validate({ schema: newUserSchema })

        const newUser = await User.create(payload);

        const token = await auth.use("api").login(newUser, {
          expiresIn: "1 day",
        });
        
        let data = {
            success: true,
            message: 'User registered successfully',
            data: {
                user: auth.use('api').user!,
                accessToken: token.toJSON()
            }
        };
        response.status(201);
        return data;
    }


    /**
     * Logout auth user
     * @param param0 
     * @returns 
     */
    public async logout({ response, auth }: HttpContextContract) {
        try {
            await auth.logout()
            let data = {
                success: true,
                message: 'User logged out successfully',
                data: null
            };
            response.status(200);
            return data;
        } catch (error) {
            let data = {
                success: false,
                message: error,
                data: null
            };
            response.status(400);
            return data;
        }
    }
    
}

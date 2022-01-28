/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})


Route.group(() => {

	/** AUTH **/
	Route.group(() => {
		Route.post('/login', 'AuthController.login')
		Route.post('/register', 'AuthController.register')
		Route.post('/logout', 'AuthController.logout')
	}).prefix('/auth')


	/** Product **/
	Route.group(() => {
		Route.get('/', 'ProductController.index')
		Route.get('/:id', 'ProductController.show')
		Route.post('/create', 'ProductController.store')
		Route.put('/update', 'ProductController.update')
		Route.delete('/delete', 'ProductController.destory')
	}).middleware("auth:api").prefix('/products')


	/** category **/
	Route.group(() => {
		Route.get('/', 'CategoryController.index')
		Route.get('/:id', 'CategoryController.show')
		Route.post('/create', 'CategoryController.store')
		Route.put('/update', 'CategoryController.update')
		Route.delete('/delete', 'CategoryController.destory')
	}).middleware("auth:api").prefix('/categories')

	/** sub category **/
	Route.group(() => {
		Route.get('/', 'SubCategoryProductController.index')
		Route.get('/:id', 'SubCategoryProductController.show')
		Route.post('/create', 'SubCategoryProductController.store')
		Route.put('/update', 'SubCategoryProductController.update')
		Route.delete('/delete', 'SubCategoryProductController.destory')
	}).middleware("auth:api").prefix('/sub-categories');

}).prefix('/api')

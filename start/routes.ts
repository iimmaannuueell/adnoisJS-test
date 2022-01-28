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
		Route.get('/', 'ProductsController.index')
		Route.get('/:id', 'ProductsController.show')
		Route.post('/create', 'ProductsController.store')
		Route.put('/update', 'ProductsController.update')
		Route.delete('/:id/delete', 'ProductsController.destroy')
	}).middleware("auth:api").prefix('/products')


	/** category **/
	Route.group(() => {
		Route.get('/', 'CategoriesController.index')
		Route.get('/:id', 'CategoriesController.show')
		Route.post('/create', 'CategoriesController.store')
		Route.put('/update', 'CategoriesController.update')
		Route.delete('/:id/delete', 'CategoriesController.destroy')
	}).middleware("auth:api").prefix('/categories')

	/** sub category **/
	Route.group(() => {
		Route.get('/', 'SubCategoriesController.index')
		Route.get('/:id', 'SubCategoriesController.show')
		Route.post('/create', 'SubCategoriesController.store')
		Route.put('/update', 'SubCategoriesController.update')
		Route.delete('/:id/delete', 'SubCategoriesController.destroy')
	}).middleware("auth:api").prefix('/sub-categories');

}).prefix('/api')

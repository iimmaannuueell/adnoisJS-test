import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.integer('category_id', 255).notNullable()
      table.integer('sub_category_id', 255).notNullable()
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.integer('price').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

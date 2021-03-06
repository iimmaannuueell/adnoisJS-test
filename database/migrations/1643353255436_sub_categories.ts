import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubCategories extends BaseSchema {
  protected tableName = 'sub_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id', 255).notNullable()
      table.string('name', 255).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

// import { ioc } from '@adonisjs/fold'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UserRepository {

    async fetchAll() {
        return await User.all();
    }
    
    
    async store(body: any) {
        const trx = await Database.transaction()

        try {
            await trx
            const user = new User();
            // The fill method overrides existing model instance key/pair values:
            user.fill({ ...body });
            await user.save();
            await trx.commit()
            return user;
        } catch (e) {
          throw e;
        }
    }
    
      async getById(id) {
        return await User.findOrFail(id);
      }
    
    async update(body, id) {
        const trx = await Database.transaction()

        try {
            await trx
            const user = await this.getById(id);

            const newUser = new User();
            // The fill method overrides existing model instance key/pair values:
            newUser.fill({ ...body });
            await user.save();
            await trx.commit()
            return user;
        } catch (e) {
          throw e;
        }
    }
    
    
    async delete(id) {
        const trx = await Database.transaction()

        try {
            await trx
            const user = await this.getById(id);
            await user.delete();

            await trx.commit()
            return user;
        } catch (e) {
          throw e;
        }
    }

}

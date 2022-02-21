import { Injectable } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Odoo = require('odoo-xmlrpc')

@Injectable()
export class OdooService {
  private odoo

  constructor() {
    this.odoo = new Odoo({
      url: 'https://odoo-demo.mazi-lab.carbon8test.com',
      // port: 443,
      db: 'odoo_demo_db',
      username: 'loi.tra@9thwonder.com',
      password: 'ee35d003ab78d1b7694df8317b26b925c5565a8c'
    })
  }

  execute(model: string, funtion: string, params: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.odoo.connect((error: any) => {
        if (error) {
          reject(error)
        }
        this.odoo.execute_kw(model, funtion, params, (err: any, value: any) => {
          if (err) {
            reject(err)
          }
          resolve(value)
        })
      })
    })
  }
}

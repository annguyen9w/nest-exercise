import {
  Column, Entity as TypeormEntity, Generated
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'

@TypeormEntity()
export class Orders extends BaseEntity {
  @Column()
  @Generated('increment')
    orderNumber: number

  @Column()
    jobNumber: number

  @Column('varchar', { length: 20, nullable: true })
    orderType: string

  @Column('varchar', { length: 20 })
    resolution: string

  @Column('timestamp')
    orderStartTime: Date

  @Column()
    month: number

  @Column()
    year: number

  @Column('varchar', { length: 100 })
    estimateNumber

  @Column()
    orderComcast: number

  // countHDFee
  // countHDFee_c
  // countHDNull
  // countHDNull_c

  // countSDFee
  // countSDFee_c
  // countSDNull
  // countSDNull_c

  // OTHER_charge
  // OTHER_charge_c

  // countRadioFee
  // countRadioFee_c
  // countRadioNull
  // countRadioNull_c

  // countTrafficFee
  // countTrafficFee_c
  // countTrafficNull
  // countTrafficNull_c

  // relashionship
  // id_Client
  // id_Advertiser
  // id_Brand
  // id_Vendor
  // id_Billing

  // Orders » Join » POs::poNumber
  // Orders » Join » ArchivedPOs::poNumber
  // Orders » Join » Invoices::invoiceNumber
  // Orders » Join » ArchivedInvoices::invoiceNumber
  // flagMismatchJobAdBrand
  // Orders » Billing::billingNumber
}

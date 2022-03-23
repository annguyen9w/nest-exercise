import { Column, Entity as TypeormEntity } from 'typeorm'

import { BaseEntity } from '../common/base.entity'

@TypeormEntity()
export class Entity extends BaseEntity {
  @Column('integer', { nullable: true })
    callNumber: string

  @Column('text', { nullable: true })
    category: string

  @Column('integer', { nullable: true })
    credits_HD: string

  @Column('integer', { nullable: true })
    credits_RADIO: string

  @Column('integer', { nullable: true })
    credits_SD: string

  @Column('integer', { nullable: true })
    customCalendar: string

  @Column('text', { nullable: true })
    data: string

  @Column('integer', { nullable: true })
    dataNumber: string

  @Column('text', { nullable: true })
    department: string

  @Column('text', { nullable: true })
    entityType: string

  @Column('uuid', { nullable: true })
    id_Advertisor: string

  @Column('uuid', { nullable: true })
    id_Client: string

  @Column('uuid', { nullable: true })
    id_ContactMethod_primary: string

  @Column('uuid', { nullable: true })
    ID_CURRENTITEM: string

  @Column('uuid', { nullable: true })
    id_Entity_customer: string

  @Column('uuid', { nullable: true })
    id_Location_primary: string

  @Column('smallint', { nullable: true })
    isActive: string

  @Column('smallint', { nullable: true })
    isInactive: string

  @Column('smallint', { nullable: true })
    isPrimary: string

  @Column('text', { nullable: true })
    market: string

  @Column('text', { nullable: true })
    nameFirst: string

  @Column('text', { nullable: true })
    nameFull: string

  @Column('text', { nullable: true })
    nameLast: string

  @Column('text', { nullable: true })
    nameSalutation: string

  @Column('text', { nullable: true })
    notes: string

  @Column('text', { nullable: true })
    region: string

  @Column('text', { nullable: true })
    source: string

  @Column('text', { nullable: true })
    state: string

  @Column('text', { nullable: true })
    status: string

  @Column('text', { nullable: true })
    terms: string

  @Column('text', { nullable: true })
    title: string

  @Column('text', { nullable: true })
    type: string

  @Column('text', { nullable: true })
    url: string
}

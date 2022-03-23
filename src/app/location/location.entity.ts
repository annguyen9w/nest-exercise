import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entity } from '../entity/entity.entity'

@TypeormEntity()
export class Location extends BaseEntity {
  @Column('text', { nullable: true })
    addressLine1: string

  @Column('text', { nullable: true })
    addressLine2: string

  @Column('text', { nullable: true })
    attn: string

  @Column('text', { nullable: true })
    city: string

  @Column('varchar', { length: 100, nullable: true })
    country: string

  @Column('text', { nullable: true })
    id_ContactMethod: string

  @ManyToOne(() => Entity)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entity[]

  @Column('text', { nullable: true })
    name: string

  @Column('varchar', { length: 100, nullable: true })
    state: string

  @Column('varchar', { length: 20, nullable: true })
    zipCode: string
}

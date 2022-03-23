import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entity } from '../entity/entity.entity'

@TypeormEntity()
export class ContactMethod extends BaseEntity {
  @ManyToOne(() => Entity)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entity[]

  @Column('text', { nullable: true })
    type: string

  @Column('text', { nullable: true })
    value: string
}

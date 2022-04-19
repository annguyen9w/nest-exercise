import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entities } from '../entities/entities.entity'

@TypeormEntity()
export class ContactMethods extends BaseEntity {
  @Column('text', { nullable: true })
    type: string

  @Column('text', { nullable: true })
    value: string

  @ManyToOne(() => Entities)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entities[]
}

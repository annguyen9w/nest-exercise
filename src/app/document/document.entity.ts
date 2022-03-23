import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entity } from '../entity/entity.entity'

@TypeormEntity()
export class Document extends BaseEntity {
  @Column('text', { nullable: true })
    fileName: string

  @ManyToOne(() => Entity)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entity[]

  @Column('text', { nullable: true })
    title: string

  @Column('text', { nullable: true })
    type: string
}

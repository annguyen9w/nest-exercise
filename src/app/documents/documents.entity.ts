import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entities } from '../entities/entities.entity'

@TypeormEntity()
export class Documents extends BaseEntity {
  @Column('text', { nullable: true })
    fileName: string

  @Column('text', { nullable: true })
    title: string

  @Column('text', { nullable: true })
    type: string

  @ManyToOne(() => Entities)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entities[]
}

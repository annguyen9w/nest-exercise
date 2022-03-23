import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entity } from '../entity/entity.entity'

@TypeormEntity()
export class Activity extends BaseEntity {
  @Column({ nullable: true })
    date: Date

  @Column('text', { nullable: true })
    email: string

  @ManyToOne(() => Entity)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entity[]

  @Column('uuid', { nullable: true })
    id_Entity_person: string

  @Column('uuid', { nullable: true })
    id_User: string

  @Column('text', { nullable: true })
    message: string

  @Column('text', { nullable: true })
    name: string

  @Column({ nullable: true })
    sentDate: Date

  @Column('time', { nullable: true })
    sentTime: string

  @Column('text', { nullable: true })
    status: string

  @Column('text', { nullable: true })
    subject: string

  @Column('time', { nullable: true })
    time: string

  @Column('text', { nullable: true })
    type: string
}

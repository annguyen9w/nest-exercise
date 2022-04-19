import {
  Column, Entity as TypeormEntity, ManyToOne, JoinColumn
} from 'typeorm'

import { BaseEntity } from '../common/base.entity'
import { Entities } from '../entities/entities.entity'

@TypeormEntity()
export class Activities extends BaseEntity {
  @Column({ nullable: true })
    date: Date

  @Column('text', { nullable: true })
    email: string

  @Column('uuid', { nullable: true })
    id_Entity_person: string

  @Column('uuid', { nullable: true })
    id_User: string

  @Column('text', { nullable: true })
    message: string

  @Column('text', { nullable: true })
    name: string

  @Column('date', { nullable: true })
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

  @ManyToOne(() => Entities)
  @JoinColumn({ name: 'id_Entity' })
    entities: Entities[]
}

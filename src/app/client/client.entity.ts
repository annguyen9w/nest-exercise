import {
  Column, Entity as TypeormEntity, JoinColumn, OneToOne, PrimaryGeneratedColumn
} from 'typeorm'

import { Entity } from '../entity/entity.entity'

@TypeormEntity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Entity)
  @JoinColumn({ name: 'id' })
    id: string

  @Column('integer', { nullable: true })
    clientNumber: string

  @Column('text', { nullable: true })
    entityType: string
}

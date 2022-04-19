import {
  Column, Entity as TypeormEntity, JoinColumn, OneToOne, PrimaryGeneratedColumn
} from 'typeorm'

import { Entities } from '../entities/entities.entity'

@TypeormEntity()
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Entities)
  @JoinColumn({ name: 'id' })
    id: string

  @Column('integer')
    clientNumber: number

  @Column('text')
    entityType: string
}

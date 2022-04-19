import {
  Column, Entity as TypeormEntity, JoinColumn, PrimaryGeneratedColumn, OneToOne
} from 'typeorm'

import { Entities } from '../entities/entities.entity'

@TypeormEntity()
export class Advertisers {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Entities)
  @JoinColumn({ name: 'id' })
    id: string

  @Column('integer')
    advertiserNumber: number

  @Column('text', { nullable: true })
    entityType: string

  @Column('uuid', { nullable: true })
    hd: string

  @Column('uuid', { nullable: true })
    hd_rush: string

  @Column('time', { nullable: true })
    radio: string

  @Column('text', { nullable: true })
    radio_rush: string

  @Column('text', { nullable: true })
    sd: string

  @Column('time', { nullable: true })
    sd_rush: string

  @Column('text', { nullable: true })
    week: string

  @Column('text', { nullable: true })
    month: string

  @Column('text', { nullable: true })
    period: string

  @Column('date', { nullable: true })
    quarter: Date

  @Column('text', { nullable: true })
    traffic: string

  @Column('text', { nullable: true })
    trafficHourly: string
}

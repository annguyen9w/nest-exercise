import { Module } from '@nestjs/common'
import { PrefixIsciService } from './prefix-isci.service'
import { PrefixIsciController } from './prefix-isci.controller'

@Module({
  controllers: [PrefixIsciController],
  providers: [PrefixIsciService]
})
export class PrefixIsciModule {}

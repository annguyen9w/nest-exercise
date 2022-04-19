import { Test, TestingModule } from '@nestjs/testing'
import { ContactMethodsController } from './contact-methods.controller'
import { ContactMethodsService } from './contact-methods.service'

describe('ContactMethodsController', () => {
  let controller: ContactMethodsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactMethodsController],
      providers: [ContactMethodsService]
    }).compile()

    controller = module.get<ContactMethodsController>(ContactMethodsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

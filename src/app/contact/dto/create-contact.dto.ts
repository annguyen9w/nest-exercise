// import { ApiProperty } from '@nestjs/swagger'

export class CreateContactDto implements Readonly<CreateContactDto> {
  name: string

  parent_id: number

  function: string

  phone: string

  mobile: string

  email: string

  website: string

  title: number
}

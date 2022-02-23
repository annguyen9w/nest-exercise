// import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountDto implements Readonly<CreateAccountDto> {
  name: string

  street: string

  street2: string

  city: string

  state_id: number

  zip: string

  country_id: number

  vat: string

  phone: string

  mobile: string

  email: string

  website: string

  is_company: boolean
}

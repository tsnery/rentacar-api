import { container } from 'tsyringe'
import { IDateProvider } from './dateProvider/dateProvider.types'
import { DayJSProvider } from './dateProvider/implementations/dayjs.provider'

container.registerSingleton<IDateProvider>(
  'DateProvider',
  DayJSProvider
)
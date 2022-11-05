import { SkillBuilders } from 'ask-sdk'
import handlers from './handlers'
import errorHandle from './handlers/error.handle'
import interceptors from './interceptor'

const builder = SkillBuilders.standard()

export const handler = builder
  .addRequestHandlers(...handlers)
  .addErrorHandlers(errorHandle)
  .addRequestInterceptors(...interceptors)
  .lambda()

import { HandlerInput } from 'ask-sdk-core'

const getRequestAttributes = (input: HandlerInput) =>
  input.attributesManager.getRequestAttributes()

export { getRequestAttributes }

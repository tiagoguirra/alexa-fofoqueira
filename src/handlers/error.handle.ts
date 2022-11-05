import { HandlerInput, ResponseBuilder } from 'ask-sdk-core'
import { CustomSkillErrorHandler } from 'ask-sdk-core/dist/dispatcher/error/handler/CustomSkillErrorHandler'
import { Response } from 'ask-sdk-model'
import { RequestAttributes } from '../types/request'

class ErrorHandle implements CustomSkillErrorHandler {
  canHandle() {
    return true
  }
  async handle(input: HandlerInput, error: Error): Promise<Response> {
    const attributes: RequestAttributes =
      input.attributesManager.getRequestAttributes() as RequestAttributes

    console.log(`Error handled: ${error.message}`)
    console.log(`Error stack: ${error.stack}`)

    return input.responseBuilder
      .speak(attributes.t('ERROR_MESSAGE'))
      .reprompt(attributes.t('ERROR_MESSAGE'))
      .getResponse()
  }
}

export default new ErrorHandle()

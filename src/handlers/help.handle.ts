import { ResponseBuilder } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { RequestAttributes } from '../types/request'
import { AlexaHandle } from './handle'

class HelpHandle extends AlexaHandle {
  requestType: string = 'IntentRequest'
  intentName: string[] = ['AMAZON.HelpIntent']

  async execute({
    response,
    attributes
  }: {
    response: ResponseBuilder
    attributes: RequestAttributes
  }): Promise<Response> {
    return response
      .speak(attributes.t('help_text'))
      .reprompt(attributes.t('help_reprompt'))
      .getResponse()
  }
}
export default new HelpHandle()

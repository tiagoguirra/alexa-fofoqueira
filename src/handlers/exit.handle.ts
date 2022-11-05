import { ResponseBuilder } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { RequestAttributes } from '../types/request'
import { AlexaHandle } from './handle'

class ExitHandle extends AlexaHandle {
  requestType: string = 'IntentRequest'
  intentName: string[] = ['AMAZON.CancelIntent', 'AMAZON.StopIntent']

  async execute({
    response,
    attributes
  }: {
    response: ResponseBuilder
    attributes: RequestAttributes
  }): Promise<Response> {
    return response.speak(attributes.t('stop_text')).getResponse()
  }
}
export default new ExitHandle()

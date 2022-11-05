import { HandlerInput, ResponseBuilder } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { RequestAttributes } from '../types/request'
import { AlexaHandle } from './handle'

class SessionEndedHandle extends AlexaHandle {
  requestType: string = 'SessionEndedRequest'

  async execute({
    response,
    input,
    attributes
  }: {
    response: ResponseBuilder
    input: HandlerInput
    attributes: RequestAttributes
  }): Promise<Response> {
    console.log(
      `Session ended with reason: ${input.requestEnvelope.request['reason']}`
    )

    return response.speak(attributes.t('stop_text')).getResponse()
  }
}

export default new SessionEndedHandle()

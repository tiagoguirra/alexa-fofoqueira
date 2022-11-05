import { ResponseBuilder } from 'ask-sdk'
import { Intent, Response } from 'ask-sdk-model'
import { RequestAttributes, Session } from '../../types/request'
import { AlexaHandle } from '../handle'

class FatherHandle extends AlexaHandle {
  requestType: string = 'IntentRequest'
  intentName: string = 'FatherIntent'

  async execute({
    response,
    attributes,
    intent
  }: {
    response: ResponseBuilder
    attributes: RequestAttributes
    session?: Session
    intent?: Intent
  }): Promise<Response> {
    const fatherSlot = intent.slots?.father
    if (fatherSlot && fatherSlot?.value) {
      return response
        .speak(attributes.t('pregnant.was_father', { father: fatherSlot.value }))
        .withShouldEndSession(true)
        .getResponse()
    }

    const wasPregnant = attributes.t('pregnant.who_father')
    return response.speak(wasPregnant).reprompt(wasPregnant).getResponse()
  }
}

export default new FatherHandle()

import { ResponseBuilder } from 'ask-sdk'
import { Intent, Response } from 'ask-sdk-model'
import { RequestAttributes, Session } from '../../types/request'
import { AlexaHandle } from '../handle'

class PregnantHandle extends AlexaHandle {
  requestType: string = 'IntentRequest'
  intentName: string = 'PregnantIntent'

  async execute({
    response,
    attributes,
    session,
    intent
  }: {
    response: ResponseBuilder
    attributes: RequestAttributes
    session?: Session
    intent?: Intent
  }): Promise<Response> {
    const womanSlot = intent.slots?.woman
    if (womanSlot && womanSlot?.value) {
      const wasPregnant = attributes.t('pregnant.was_pregnant', {
        woman: womanSlot.value
      })
      return response
        .speak(wasPregnant)
        .reprompt(wasPregnant)
        .getResponse()
    }

    const wasPregnant = attributes.t('pregnant.who_pregnant')
    return response.speak(wasPregnant).reprompt(wasPregnant).getResponse()
  }
}

export default new PregnantHandle()

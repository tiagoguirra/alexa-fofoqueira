import { ResponseBuilder } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { RequestAttributes } from '../types/request'
import { AlexaHandle } from './handle'
class launchHandle extends AlexaHandle {
  requestType: string = 'LaunchRequest'

  async execute({
    response,
    attributes
  }: {
    response: ResponseBuilder
    attributes: RequestAttributes
  }): Promise<Response> {
    const launchPhrase = attributes.t('launch')

    console.info('launchPhrase', launchPhrase)

    return response.speak(launchPhrase).reprompt(launchPhrase).getResponse()
  }
}

export default new launchHandle()

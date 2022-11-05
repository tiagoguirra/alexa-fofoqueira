import { HandlerInput, ResponseBuilder } from 'ask-sdk-core'
import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler'
import { Intent, Response } from 'ask-sdk-model'
import { RequestAttributes, Session } from '../types/request'

export class AlexaHandle implements CustomSkillRequestHandler {
  requestType: string
  intentName: string | string[] = null
  dialogState: string

  private hasIntent(intent: Intent) {
    if (!this.intentName) return true
    if (!Array.isArray(this.intentName)) return this.intentName === intent.name
    return this.intentName.length <= 0 || this.intentName.includes(intent.name)
  }

  canHandle(input: HandlerInput): boolean {
    const request = input.requestEnvelope.request

    console.info('canHandle ', JSON.stringify(request))
    return (
      request.type === this.requestType &&
      (!request['intent'] || this.hasIntent(request['intent'])) &&
      (!this.dialogState || request['dialogState'] === this.dialogState)
    )
  }

  handle(input: HandlerInput): Promise<Response> {
    console.info('handle', JSON.stringify(input))
    const attributes =
      input.attributesManager.getRequestAttributes() as RequestAttributes
    const response = input.responseBuilder
    const session = {
      get: (key?: string) => {
        const values = input.attributesManager.getSessionAttributes()

        if (key) return values[key] || null

        return values
      },
      set: (key: string, value: any) => {
        const newSession = {
          ...input.attributesManager.getSessionAttributes(),
          [key]: value
        }
        input.attributesManager.setSessionAttributes(newSession)
        return newSession
      }
    }

    return this.execute({
      input,
      attributes,
      response,
      session,
      intent: input.requestEnvelope.request['intent']
    })
  }

  async execute({
    input,
    response,
    attributes,
    session,
    intent
  }: {
    input: HandlerInput
    response: ResponseBuilder
    attributes: RequestAttributes
    session?: Session
    intent?: Intent
  }): Promise<Response> {
    const result = response
      .speak(attributes.t('help_text'))
      .reprompt(attributes.t('help_reprompt'))
      .getResponse()

    console.log('response', JSON.stringify(result))
    return result
  }
}

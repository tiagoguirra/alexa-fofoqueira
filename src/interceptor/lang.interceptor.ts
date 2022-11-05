import { CustomSkillResponseInterceptor } from 'ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillResponseInterceptor'
import i18next from 'i18next'
import locales from '../locales'
import mustache from 'mustache'

class LangInterceptor implements CustomSkillResponseInterceptor {
  async process(handlerInput) {
    const t = await i18next.init({
      resources: locales,
      lng: handlerInput.requestEnvelope.request.locale,
      returnObjects: true
    })

    const attr = handlerInput.attributesManager.getRequestAttributes()

    const render = (text: string, variables?: Object) => {
      console.log(text, variables)
      if (variables && typeof variables === 'object') {
        return mustache.render(text, variables)
      }
      return text
    }
    attr.t = (args: string, variables?: Object) => {
      const value = t(args)

      if (Array.isArray(value)) {
        return render(
          value[Math.floor(Math.random() * value.length)],
          variables
        )
      }

      return render(value, variables)
    }
  }
}

export default new LangInterceptor()

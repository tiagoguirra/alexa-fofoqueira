import { CustomSkillResponseInterceptor } from 'ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillResponseInterceptor'
import i18next from 'i18next'
import locales from '../locales'

i18next.init({
  resources: locales,
  lng: 'pt-BR'
})

class LangInterceptor implements CustomSkillResponseInterceptor {
  process(handlerInput) {
    console.log(handlerInput)
  }
}

export default new LangInterceptor()

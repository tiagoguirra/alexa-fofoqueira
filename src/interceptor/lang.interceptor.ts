import { CustomSkillResponseInterceptor } from "ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillResponseInterceptor";
import i18next from "i18next";
import locales from "../locales";

i18next.init({
  resources: locales,
  lng: "pt-BR",
});

class LangInterceptor implements CustomSkillResponseInterceptor {
  process(handlerInput) {
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = async (...args: string[]) => {
      // if (i18next.language !== handlerInput.requestEnvelope.request.locale) {
      //   i18next.changeLanguage(handlerInput.requestEnvelope.request.locale);
      // }
      return i18next.t(args);
    };
  }
}

export default new LangInterceptor();

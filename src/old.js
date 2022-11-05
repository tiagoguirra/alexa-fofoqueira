const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

const LaunchHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('LAUNCH');

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const InProgressPregnantHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'PregnantIntent'
        && request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;
    const intent = request.intent;
    
    return responseBuilder
      .addDelegateDirective(intent)
      .getResponse();
  },
};
const PregnantHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'PregnantIntent'
    );
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const responseBuilder = handlerInput.responseBuilder;
    const intent = request.intent;
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    
    const attributesManager = handlerInput.attributesManager

    const sessionAttributes = attributesManager.getSessionAttributes();
    const pregnantName = intent.slots.people.value || sessionAttributes['people'];
    
    console.log(JSON.stringify({request,intent,sessionAttributes}))
    if (pregnantName || intent.confirmationStatus === 'CONFIRMED') {
        let speakOutput = requestAttributes.t('WAS_PREGNANT');
        speakOutput = speakOutput.replace('{person}', pregnantName);

        return responseBuilder.speak(speakOutput).getResponse();
    } else {
      const femaleName = requestAttributes.t('FEMALE_NAME');
      sessionAttributes['people'] = femaleName
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      const speakOutput = 'a ' + femaleName + '?';
      return responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('HELP_MESSAGE'))
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput) {
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('FALLBACK_MESSAGE'))
      .reprompt(requestAttributes.t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('STOP_MESSAGE'))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
      console.log(JSON.stringify(handlerInput.requestEnvelope))
    console.log(
      `Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`
    );
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes =
      handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('ERROR_MESSAGE'))
      .reprompt(requestAttributes.t('ERROR_MESSAGE'))
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
    // Gets the locale from the request and initializes i18next.
    const localizationClient = i18n.init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
      returnObjects: true,
    });
    // Creates a localize function to support arguments.
    localizationClient.localize = function localize() {
      // gets arguments through and passes them to
      // i18next using sprintf to replace string placeholders
      // with arguments.
      const args = arguments;
      const value = i18n.t(...args);
      // If an array is used then a random value is selected
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };
    // this gets the request attributes and save the localize function inside
    // it to be used in a handler by calling requestAttributes.t(STRING_ID, [args...])
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    };
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchHandler,
    PregnantHandler,
    InProgressPregnantHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();

// TODO: Replace this data with your own.
// It is organized by language/locale.  You can safely ignore the locales you aren't using.
// Update the name and messages to align with the theme of your skill
const ptbrData = {
  translation: {
    SKILL_NAME: 'Alexa fofoqueira',
  },
};

const ptData = {
  translation: {
    SKILL_NAME: 'Alexa fofoqueira',
    GET_FACT_MESSAGE: 'Aqui vai: ',
    HELP_MESSAGE: 'Modo maria fifi está habilitado!',
    HELP_REPROMPT: 'Qual é a fofofa do dia?',
    FALLBACK_MESSAGE: 'Quem somos nós pra julgar ?',
    FALLBACK_REPROMPT: 'Quer me contar mais alguma coisa?',
    ERROR_MESSAGE: 'Desculpa, algo deu errado aqui.',
    STOP_MESSAGE: 'Tchau!',
    SURPRISE: [
      'mentira? ',
      'não acredito?',
      'que bafão!',
      'ta de brincadeira?',
      'eita geovana!',
    ],
    LAUNCH: [
      'me conta tudo!',
      'conta logo, quero saber de tudo',
      'mulher conta logo que eu sou curiosa!',
      'qual a novidade?',
    ],
    FEMALE_NAME: [
      'mariana',
      'karla',
      'karine',
      'luana',
      'fernanda',
      'manuela',
      'rafaela',
      'leticia',
      'isabela',
      'juliana',
      'fernanda',
    ],
    WAS_PREGNANT: [
      'sério? eu achei que ela era crente',
      'a {person} não é crente?',
      'que falsa, ela julgava os outros e agora aparece gravida',
      'eita, coitada da {person}, tão novinha!',
      'não acredito nisso!',
    ],
  },
};

// constructs i18n and l10n data structure
const languageStrings = {
  pt: ptData,
  'pt-BR': ptbrData,
};

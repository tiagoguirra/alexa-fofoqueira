import { SkillBuilders } from "ask-sdk-core";
import handlers from "./handlers";
import errorHandle from "./handlers/error.handle";
import interceptors from "./interceptor";

const builder = SkillBuilders.custom();

export const handler = builder
  .addRequestHandlers(...handlers)
  .addErrorHandlers(errorHandle)
  .addRequestInterceptors(...interceptors)
  .withCustomUserAgent("sample/basic-fact/v2")
  .lambda();

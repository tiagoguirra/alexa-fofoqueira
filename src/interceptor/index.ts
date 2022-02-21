import { CustomSkillResponseInterceptor } from "ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillResponseInterceptor";
import langInterceptor from "./lang.interceptor";

const interceptors: CustomSkillResponseInterceptor[] = [langInterceptor];


export default interceptors
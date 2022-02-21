import launchHandle from "./launch.handle";
import helpHandle from "./help.handle";
import exitHandle from "./exit.handle";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";


const handlers: CustomSkillRequestHandler[] = [launchHandle, exitHandle, helpHandle]

export default handlers;

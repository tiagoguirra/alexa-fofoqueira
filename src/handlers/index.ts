import { CustomSkillRequestHandler } from 'ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler'
import launchHandle from './launch.handle'
import helpHandle from './help.handle'
import exitHandle from './exit.handle'
import pregnantHandle from './pregnant/pregnant.handle'
import sessionendedHandle from './sessionended.handle'
import fatherHandle from './pregnant/father.handle'

const handlers: CustomSkillRequestHandler[] = [
  launchHandle,
  pregnantHandle,
  exitHandle,
  helpHandle,
  sessionendedHandle,
  fatherHandle
]

export default handlers

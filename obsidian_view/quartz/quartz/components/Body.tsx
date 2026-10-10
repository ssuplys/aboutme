import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Chatbot from "./Chatbot"

const ChatbotComponent = Chatbot()

const Body: QuartzComponent = (props: QuartzComponentProps) => {
  const { children } = props
  return (
    <div id="quartz-body">
      {children}
      <ChatbotComponent {...props} />
    </div>
  )
}

Body.css = ChatbotComponent.css
Body.afterDOMLoaded = ChatbotComponent.afterDOMLoaded

export default (() => Body) satisfies QuartzComponentConstructor

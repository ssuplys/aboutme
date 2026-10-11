import { QuartzComponent, QuartzComponentConstructor } from "./types"

const Chatbot: QuartzComponent = () => {
  return (
    <div class="quartz-chat" data-chatbot>
      <button
        class="quartz-chat__toggle"
        type="button"
        aria-expanded="false"
        aria-controls="quartz-chat-panel"
      >
        <span class="quartz-chat__spark" aria-hidden="true">
          ✦
        </span>
        <span class="quartz-chat__toggle-label">Pergunte à magia</span>
      </button>

      <section
        class="quartz-chat__panel"
        id="quartz-chat-panel"
        hidden
        aria-label="Assistente do site"
      >
        <header class="quartz-chat__header">
          <div class="quartz-chat__identity">
            <span class="quartz-chat__avatar" aria-hidden="true">
              ✧
            </span>
            <span>
              <strong>Assistente da magia</strong>
              <small>Baseado nas notas do site</small>
            </span>
          </div>
          <button class="quartz-chat__close" type="button" aria-label="Fechar chat">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div class="quartz-chat__messages" data-chat-messages role="log" aria-live="polite">
          <div class="quartz-chat__message quartz-chat__message--assistant" data-chat-welcome>
            Posso procurar informações nas notas. O que você quer saber?
          </div>
        </div>

        <form class="quartz-chat__form" data-chat-form>
          <textarea
            data-chat-input
            rows={1}
            maxLength={500}
            placeholder="Digite sua pergunta..."
            aria-label="Pergunta para o assistente"
          ></textarea>
          <button type="submit" data-chat-submit aria-label="Enviar pergunta">
            <span aria-hidden="true">↑</span>
          </button>
        </form>
        <p class="quartz-chat__status" data-chat-status role="status"></p>
      </section>
    </div>
  )
}

Chatbot.css = `
.quartz-chat {
  --chat-bg: var(--light, #faf8f8);
  --chat-text: var(--dark, #2b2b2b);
  --chat-muted: var(--gray, #777);
  --chat-accent: var(--secondary, #284b63);
  --chat-accent-soft: color-mix(in srgb, var(--chat-accent) 12%, var(--chat-bg));
  --chat-border: color-mix(in srgb, var(--chat-text) 14%, transparent);
  position: fixed;
  right: max(1.25rem, env(safe-area-inset-right));
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  z-index: 1000;
  color: var(--chat-text);
  font-family: var(--bodyFont);
}

.quartz-chat__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.9rem;
  border: 1px solid color-mix(in srgb, #fff 24%, var(--chat-accent));
  border-radius: 999px;
  padding: 0.75rem 1.05rem;
  background: linear-gradient(135deg, var(--chat-accent), color-mix(in srgb, var(--chat-accent) 70%, #000));
  color: #fff;
  box-shadow: 0 0.65rem 1.8rem #0004, inset 0 1px #ffffff33;
  cursor: pointer;
  font: inherit;
  font-weight: 650;
  transition: transform 160ms ease, filter 160ms ease;
}

.quartz-chat__toggle:hover,
.quartz-chat__toggle:focus-visible {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.quartz-chat__spark {
  font-size: 1.15rem;
  line-height: 1;
}

.quartz-chat__panel {
  position: absolute;
  right: 0;
  bottom: calc(100% + 0.8rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: min(25rem, calc(100vw - 2rem));
  height: min(36rem, 72dvh);
  min-height: 22rem;
  border: 1px solid var(--chat-border);
  border-radius: 1.15rem;
  background: var(--chat-bg);
  box-shadow: 0 1.25rem 3.5rem #0005, 0 0 0 1px #ffffff12;
  backdrop-filter: blur(18px);
  animation: quartz-chat-in 180ms ease-out;
}

.quartz-chat__panel[hidden] {
  display: none !important;
}

@keyframes quartz-chat-in {
  from { opacity: 0; transform: translateY(0.5rem) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.quartz-chat__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0.95rem;
  border-bottom: 1px solid var(--chat-border);
  background: linear-gradient(135deg, color-mix(in srgb, var(--chat-accent) 16%, transparent), transparent);
}

.quartz-chat__identity {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.quartz-chat__identity > span:last-child {
  display: grid;
  gap: 0.18rem;
  min-width: 0;
}

.quartz-chat__identity strong,
.quartz-chat__identity small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quartz-chat__identity small,
.quartz-chat__status {
  color: var(--chat-muted);
  font-size: 0.74rem;
}

.quartz-chat__avatar {
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 0.7rem;
  background: var(--chat-accent);
  color: #fff;
  box-shadow: inset 0 1px #ffffff44;
  font-size: 1.25rem;
}

.quartz-chat__close {
  display: grid;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--chat-border);
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: 1.35rem;
  line-height: 1;
  transition: background 160ms ease, transform 160ms ease;
}

.quartz-chat__close:hover,
.quartz-chat__close:focus-visible {
  background: var(--chat-accent-soft);
  transform: rotate(90deg);
}

.quartz-chat__messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 1rem;
  scrollbar-width: thin;
}

.quartz-chat__message {
  max-width: 88%;
  padding: 0.7rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 0.95rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 0.9rem;
  line-height: 1.48;
}

.quartz-chat__message--assistant {
  align-self: flex-start;
  border-color: var(--chat-border);
  background: var(--chat-accent-soft);
}

.quartz-chat__message--user {
  align-self: flex-end;
  background: var(--chat-accent);
  color: #fff;
  box-shadow: 0 0.25rem 0.75rem #0002;
}

.quartz-chat__sources {
  display: grid;
  gap: 0.25rem;
  margin-top: 0.55rem;
  padding-top: 0.45rem;
  border-top: 1px solid currentColor;
  opacity: 0.82;
  font-size: 0.74rem;
}

.quartz-chat__sources a {
  color: inherit;
}

.quartz-chat__form {
  display: flex;
  align-items: flex-end;
  gap: 0.55rem;
  padding: 0.75rem;
  border-top: 1px solid var(--chat-border);
}

.quartz-chat__form textarea {
  min-width: 0;
  min-height: 2.7rem;
  max-height: 7rem;
  flex: 1;
  resize: none;
  border: 1px solid var(--chat-border);
  border-radius: 0.8rem;
  padding: 0.7rem 0.75rem;
  background: color-mix(in srgb, var(--chat-bg) 80%, var(--chat-text));
  color: inherit;
  font: inherit;
  font-size: 16px;
  line-height: 1.3;
  outline: none;
}

.quartz-chat__form textarea:focus {
  border-color: var(--chat-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--chat-accent) 20%, transparent);
}

.quartz-chat__form button {
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 0.8rem;
  background: var(--chat-accent);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 1.35rem;
  line-height: 1;
  transition: filter 160ms ease, transform 160ms ease;
}

.quartz-chat__form button:hover,
.quartz-chat__form button:focus-visible {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.quartz-chat__form button:disabled {
  cursor: wait;
  opacity: 0.55;
  transform: none;
}

.quartz-chat__status {
  min-height: 1rem;
  margin: 0;
  padding: 0 0.85rem 0.6rem;
}

@media (max-width: 600px) {
  .quartz-chat {
    right: max(0.75rem, env(safe-area-inset-right));
    bottom: max(0.75rem, env(safe-area-inset-bottom));
  }

  .quartz-chat__toggle-label {
    display: none;
  }

  .quartz-chat__toggle {
    width: 3.15rem;
    height: 3.15rem;
    justify-content: center;
    padding: 0;
  }

  .quartz-chat__panel {
    right: 0;
    width: min(25rem, calc(100vw - 1.5rem));
    height: min(70dvh, 34rem);
    min-height: 19rem;
    border-radius: 1rem;
  }

  .quartz-chat__messages {
    padding: 0.8rem;
  }
}

@media (max-height: 520px) and (orientation: landscape) {
  .quartz-chat__panel {
    height: calc(100dvh - 5rem);
    min-height: 16rem;
  }
}
`

Chatbot.afterDOMLoaded = String.raw`
const setupQuartzChat = () => {
  const root = document.querySelector("[data-chatbot]");
  if (!root || root.getAttribute("data-chat-ready") === "true") return;

  root.setAttribute("data-chat-ready", "true");
  const toggle = root.querySelector(".quartz-chat__toggle");
  const panel = root.querySelector(".quartz-chat__panel");
  const close = root.querySelector(".quartz-chat__close");
  const form = root.querySelector("[data-chat-form]");
  const input = root.querySelector("[data-chat-input]");
  const submit = root.querySelector("[data-chat-submit]");
  const messages = root.querySelector("[data-chat-messages]");
  const status = root.querySelector("[data-chat-status]");
  const storageKey = "quartz-chat-history-v1";
  const chatHistory = [];

  if (!toggle || !panel || !close || !form || !input || !submit || !messages || !status) return;

  const loadHistory = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(saved)) return;
      saved
        .filter((message) => message && (message.role === "user" || message.role === "assistant"))
        .filter((message) => typeof message.content === "string" && message.content.trim())
        .slice(-20)
        .forEach((message) => chatHistory.push({
          role: message.role,
          content: message.content.slice(0, 2000),
          sources: Array.isArray(message.sources) ? message.sources.slice(0, 3) : []
        }));
    } catch {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // Some private browsing modes block both reading and removing storage.
      }
    }
  };

  const saveHistory = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(chatHistory.slice(-20)));
    } catch {
      // Private browsing or storage limits should not disable the chat.
    }
  };

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
  };

  const addMessage = (role, text, sources) => {
    const message = document.createElement("div");
    message.className = "quartz-chat__message quartz-chat__message--" + role;
    message.textContent = text;

    if (role === "assistant" && Array.isArray(sources) && sources.length > 0) {
      const sourceList = document.createElement("div");
      sourceList.className = "quartz-chat__sources";
      const basePath = document.body.dataset.basepath || "";
      sources.slice(0, 3).forEach((source) => {
        if (!source || typeof source.path !== "string") return;
        const path = source.path.replace(/^\/+|\.md$/g, "");
        if (!path || path.includes("://")) return;
        const link = document.createElement("a");
        link.href = basePath + "/" + path;
        link.textContent = String.fromCharCode(0x2197) + " " + (source.title || path);
        sourceList.appendChild(link);
      });
      if (sourceList.childElementCount > 0) message.appendChild(sourceList);
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const restoreMessages = () => {
    loadHistory();
    if (chatHistory.length === 0) return;
    messages.replaceChildren();
    chatHistory.forEach((message) => addMessage(message.role, message.content, message.sources));
  };

  const send = async () => {
    const question = input.value.trim();
    if (!question || submit.disabled) return;

    input.value = "";
    addMessage("user", question);
    status.textContent = "Consultando as notas...";
    submit.disabled = true;
    input.disabled = true;

    try {
      const basePath = document.body.dataset.basepath || "";
      const response = await fetch(basePath + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: chatHistory.slice(-6) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao consultar a IA.");

      const answer = data.response || "N" + String.fromCharCode(0xe3) + "o encontrei essa informa" + String.fromCharCode(0xe7) + "o nas minhas notas.";
      addMessage("assistant", answer, data.sources);
      chatHistory.push(
        { role: "user", content: question, sources: [] },
        { role: "assistant", content: answer, sources: Array.isArray(data.sources) ? data.sources.slice(0, 3) : [] }
      );
      saveHistory();
      status.textContent = "";
    } catch (error) {
      addMessage("assistant", error instanceof Error ? error.message : "N" + String.fromCharCode(0xe3) + "o foi poss" + String.fromCharCode(0xed) + "vel consultar a IA agora.");
      status.textContent = "";
    } finally {
      submit.disabled = false;
      input.disabled = false;
      input.focus();
    }
  };

  const onToggle = () => setOpen(panel.hidden);
  const onClose = () => setOpen(false);
  const onSubmit = (event) => {
    event.preventDefault();
    void send();
  };
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  restoreMessages();
  setOpen(false);
  toggle.addEventListener("click", onToggle);
  close.addEventListener("click", onClose);
  form.addEventListener("submit", onSubmit);
  input.addEventListener("keydown", onKeyDown);

  if (window.addCleanup) {
    window.addCleanup(() => {
      toggle.removeEventListener("click", onToggle);
      close.removeEventListener("click", onClose);
      form.removeEventListener("submit", onSubmit);
      input.removeEventListener("keydown", onKeyDown);
    });
  }
};

document.addEventListener("nav", setupQuartzChat);
document.addEventListener("render", setupQuartzChat);
setupQuartzChat();
`

export default (() => Chatbot) satisfies QuartzComponentConstructor

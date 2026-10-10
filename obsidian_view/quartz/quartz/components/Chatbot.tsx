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
        <span aria-hidden="true">✦</span>
        <span class="quartz-chat__toggle-label">Pergunte à magia</span>
      </button>

      <section
        class="quartz-chat__panel"
        id="quartz-chat-panel"
        hidden
        aria-label="Assistente do site"
      >
        <header class="quartz-chat__header">
          <div>
            <strong>Assistente da magia</strong>
            <small>Respostas baseadas nas notas do site</small>
          </div>
          <button class="quartz-chat__close" type="button" aria-label="Fechar chat">
            ×
          </button>
        </header>

        <div class="quartz-chat__messages" data-chat-messages role="log" aria-live="polite">
          <div class="quartz-chat__message quartz-chat__message--assistant">
            Posso procurar informações nas notas. O que você quer saber?
          </div>
        </div>

        <form class="quartz-chat__form" data-chat-form>
          <textarea
            data-chat-input
            rows={2}
            maxLength={500}
            placeholder="Digite sua pergunta..."
            aria-label="Pergunta para o assistente"
          ></textarea>
          <button type="submit" data-chat-submit>
            Enviar
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
  --chat-border: var(--lightgray, #e5e5e5);
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
  gap: 0.5rem;
  border: 0;
  border-radius: 999px;
  padding: 0.75rem 1rem;
  background: var(--chat-accent);
  color: #fff;
  box-shadow: 0 0.5rem 1.5rem #0003;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.quartz-chat__toggle:hover,
.quartz-chat__toggle:focus-visible {
  filter: brightness(1.1);
}

.quartz-chat__panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: min(23rem, calc(100vw - 2rem));
  height: min(34rem, calc(100vh - 7rem));
  margin-bottom: 0.75rem;
  border: 1px solid var(--chat-border);
  border-radius: 1rem;
  background: var(--chat-bg);
  box-shadow: 0 1rem 3rem #0004;
}

.quartz-chat__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--chat-border);
}

.quartz-chat__header div {
  display: grid;
  gap: 0.2rem;
}

.quartz-chat__header small,
.quartz-chat__status {
  color: var(--chat-muted);
  font-size: 0.75rem;
}

.quartz-chat__close {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}

.quartz-chat__messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  padding: 1rem;
}

.quartz-chat__message {
  max-width: 88%;
  padding: 0.65rem 0.8rem;
  border-radius: 0.85rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 0.9rem;
  line-height: 1.45;
}

.quartz-chat__message--assistant {
  align-self: flex-start;
  background: color-mix(in srgb, var(--chat-accent) 12%, var(--chat-bg));
}

.quartz-chat__message--user {
  align-self: flex-end;
  background: var(--chat-accent);
  color: #fff;
}

.quartz-chat__sources {
  display: grid;
  gap: 0.2rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.quartz-chat__sources a {
  color: inherit;
}

.quartz-chat__form {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid var(--chat-border);
}

.quartz-chat__form textarea {
  min-width: 0;
  flex: 1;
  resize: none;
  border: 1px solid var(--chat-border);
  border-radius: 0.65rem;
  padding: 0.65rem;
  background: transparent;
  color: inherit;
  font: inherit;
}

.quartz-chat__form button {
  border: 0;
  border-radius: 0.65rem;
  padding: 0.65rem 0.8rem;
  background: var(--chat-accent);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.quartz-chat__form button:disabled {
  cursor: wait;
  opacity: 0.6;
}

.quartz-chat__status {
  min-height: 1rem;
  margin: 0;
  padding: 0 0.75rem 0.65rem;
}

@media (max-width: 600px) {
  .quartz-chat {
    right: 0.75rem;
    bottom: 0.75rem;
  }

  .quartz-chat__toggle-label {
    display: none;
  }

  .quartz-chat__toggle {
    width: 3rem;
    height: 3rem;
    justify-content: center;
    padding: 0;
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
  const history = [];

  if (!toggle || !panel || !close || !form || !input || !submit || !messages || !status) return;

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
        const link = document.createElement("a");
        const path = source.path.replace(/^\/+|\.md$/g, "");
        link.href = basePath + "/" + path;
        link.textContent = "↗ " + (source.title || path);
        sourceList.appendChild(link);
      });
      message.appendChild(sourceList);
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
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
        body: JSON.stringify({ question, history: history.slice(-6) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao consultar a IA.");

      addMessage("assistant", data.response || "Não encontrei essa informação nas minhas notas.", data.sources);
      history.push({ role: "user", content: question }, { role: "assistant", content: data.response || "" });
      status.textContent = "";
    } catch (error) {
      addMessage("assistant", error instanceof Error ? error.message : "Não foi possível consultar a IA agora.");
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
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

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

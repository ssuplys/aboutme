export interface Env {
  AI: any;
  ASSETS: { fetch: typeof fetch };
}

interface ContentIndexItem {
  title?: string;
  content?: string;
}

interface ContentIndex {
  [path: string]: ContentIndexItem;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Rota da API da IA
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const { question } = (await request.json()) as { question: string };

        // 1. Busca o índice das notas
        const indexRes = await env.ASSETS.fetch(new Request(`${url.origin}/static/contentIndex.json`));
        const contentIndex = (await indexRes.json()) as ContentIndex;

        // 2. Monta o contexto
        let contextText = "";
        for (const [, data] of Object.entries(contentIndex)) {
          if (data && data.content) {
            contextText += `\n--- Nota: ${data.title ?? "Sem título"} ---\n${data.content}\n`;
          }
        }

        const truncatedContext = contextText.slice(0, 15000);

        // 3. Executa a IA restrita ao site
        const systemPrompt = `Você é o assistente virtual do site https://quartz.ssuplys.xyz/. Responda à pergunta do usuário utilizando EXCLUSIVAMENTE o conteúdo fornecido abaixo. Se a resposta não estiver no texto, diga amigavelmente: "Não encontrei essa informação nas minhas notas."\n\nConteúdo do site:\n${truncatedContext}`;

        const aiResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question }
          ]
        });

        return new Response(JSON.stringify({ response: aiResponse.response }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao consultar a IA." }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Para todas as outras rotas, serve os arquivos estáticos do Quartz
    return env.ASSETS.fetch(request);
  }
};
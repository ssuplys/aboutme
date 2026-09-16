interface ContentIndexItem {
  title?: string;
  content?: string;
}

interface ContentIndex {
  [path: string]: ContentIndexItem;
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const { question } = await request.json() as { question: string };

    // 1. Busca o arquivo de dados das notas do seu subdomínio
    const siteUrl = new URL(request.url).origin;
    const indexRes = await fetch(`${siteUrl}/static/contentIndex.json`);
    const contentIndex = (await indexRes.json()) as ContentIndex;

    // 2. Agrupa o texto das notas para dar como base de conhecimento à IA
    let contextText = "";
    for (const [, data] of Object.entries(contentIndex)) {
      if (data && data.content) {
        contextText += `\n--- Nota: ${data.title ?? "Sem título"} ---\n${data.content}\n`;
      }
    }

    // Limita o tamanho do texto enviado
    const truncatedContext = contextText.slice(0, 15000);

    // 3. Trava de segurança no prompt: responde APENAS sobre o seu site
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
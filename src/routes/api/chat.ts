import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import "@tanstack/react-start";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages))
          return new Response("Messages are required", { status: 400 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key)
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system:
            "Você é o assistente virtual da NEWBOX PHONES, uma loja premium especializada em iPhones lacrados e seminovos com 1 ano de garantia. " +
            "Você ajuda clientes com: modelos disponíveis (iPhone 11 ao 15 Pro Max), condições (lacrado ou seminovo), preços, garantia de 12 meses, " +
            "envio para todo o Brasil, nota fiscal, formas de pagamento e suporte pós-venda. " +
            "Seja amigável, direto e profissional. Sempre que possível, incentive o cliente a falar pelo WhatsApp oficial para fechar a compra. " +
            "O WhatsApp da loja é: https://wa.me/5515996860369. O Instagram é: https://www.instagram.com/newboxphones/",
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});

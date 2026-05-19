import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

import "@tanstack/react-start";

const MAX_MESSAGES = 20;
const MAX_PAYLOAD_BYTES = 64_000;
const MAX_MESSAGE_CHARS = 4_000;

const messageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    parts: z.array(z.unknown()).optional(),
    content: z.unknown().optional(),
  })
  .passthrough()
  .refine((m) => JSON.stringify(m).length <= MAX_MESSAGE_CHARS, {
    message: "Message too large",
  });

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_MESSAGES),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const contentLength = Number(request.headers.get("content-length") ?? 0);
        if (contentLength && contentLength > MAX_PAYLOAD_BYTES)
          return new Response("Payload too large", { status: 413 });

        const raw = await request.text();
        if (raw.length > MAX_PAYLOAD_BYTES)
          return new Response("Payload too large", { status: 413 });

        let parsedJson: unknown;
        try {
          parsedJson = JSON.parse(raw);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const parsed = bodySchema.safeParse(parsedJson);
        if (!parsed.success)
          return new Response("Invalid messages payload", { status: 400 });

        const messages = parsed.data.messages as unknown as UIMessage[];


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

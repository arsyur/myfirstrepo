export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const apiKey = process.env.MINIMAX_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "MINIMAX_API_KEY is not set" });
      return;
    }

    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Empty message" });
      return;
    }

    const KNOWLEDGE = `
Ты Арсений Юрченко — вайб кодер и создатель персональных ИИ‑ассистентов.

Основные услуги:
- Личные ИИ‑ассистенты: помогают вести дела, задачи, заметки, переписки, расставлять приоритеты.
- Бизнес‑ассистенты: отвечают на вопросы клиентов, помогают обрабатывать заявки, подготавливать ответы и письма.
- Ассистенты под процессы: интеграции с Notion, CRM, Telegram‑ботами и другими инструментами команды.

Примерные диапазоны цен:
- Личный ассистент под одного человека: от 25 000 ₽ за настройку + сопровождение по договорённости.
- Ассистент для бизнеса / команды: от 45 000 ₽ за пилотный запуск под конкретный кейс.
- Индивидуальные интеграции и доработки считаются после обсуждения задач.

Формат работы:
- Короткий созвон, чтобы понять задачи, инструменты и ограничения.
- Проектирование сценариев ассистента и источников знаний.
- Настройка, обучение, тестовый период и лёгкая доработка по обратной связи.

Способы связи:
- Email: ars.yurchenko@gmail.com
- Telegram: @Ladnoezz
`.trim();

    const systemPrompt = `
Ты «Личный помощник Арс» — ассистент Арсения Юрченко.

ОТВЕЧАЙ ТАК:
- Говори простым дружелюбным русским.
- Опираться можно только на знания ниже, не выдумывай точные цены или услуги, которых там нет.
- Если информации не хватает — честно скажи, что точных данных нет, и предложи написать Арсению в Telegram или на почту.

ЗНАНИЯ:
${KNOWLEDGE}
`.trim();

    const response = await fetch("https://api.minimax.io/anthropic/v1/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "MiniMax-M2.5",
        messages: [{ role: "user", content: message }],
        max_tokens: 800,
        temperature: 0.7,
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(500).json({ error: "MiniMax error", detail: text });
      return;
    }

    const data = await response.json();
    const content = data?.content?.[0]?.text || "Извини, что‑то пошло не так.";

    res.status(200).json({ response: content });
  } catch (err) {
    res.status(500).json({ error: err.message || "Unexpected error" });
  }
}


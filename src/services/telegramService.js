const TELEGRAM_BOT_TOKEN = '7462661833:AAEJiMlrsJtzgU3nN2JBdQD0wLzeGNaXyko';
const TELEGRAM_CHAT_IDS = ['709195195', '401439647', '758348467']; // Список chat_id для получения сообщений

export const sendToTelegram = async (formData) => {
  const { name, phone, email, message, source, plan } = formData;

  let messageText = `🔔 <b>Новая заявка с сайта</b>\n\n`;
  messageText += `👤 <b>Имя:</b> ${name}\n`;
  messageText += `📱 <b>Телефон:</b> ${phone}\n`;

  if (email) {
    messageText += `📧 <b>Email:</b> ${email}\n`;
  }

  if (message) {
    messageText += `💬 <b>Сообщение:</b> ${message}\n`;
  }

  messageText += `\n📍 <b>Источник:</b> ${source}\n`;

  if (plan) {
    messageText += `💰 <b>Выбранный тариф:</b> ${plan}\n`;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    // Отправляем сообщение всем чатам одновременно
    const sendPromises = TELEGRAM_CHAT_IDS.map(chatId =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'HTML',
        }),
      }).then(response => response.json())
    );

    const results = await Promise.all(sendPromises);

    // Проверяем, что хотя бы одно сообщение успешно отправлено
    const hasSuccess = results.some(data => data.ok);

    if (!hasSuccess) {
      throw new Error('Failed to send message to all chats');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return { success: false, error: error.message };
  }
};

// Функция для получения chat_id (использовать один раз для настройки)
export const getChatId = async () => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok && data.result.length > 0) {
      const chatId = data.result[0].message.chat.id;
      console.log('Your Chat ID:', chatId);
      return chatId;
    }
  } catch (error) {
    console.error('Error getting chat ID:', error);
  }
};

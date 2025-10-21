// Пытаемся импортировать конфиг, если он есть
let TELEGRAM_CONFIG = {};

try {
  const config = require('../config/telegram');
  TELEGRAM_CONFIG = config.TELEGRAM_CONFIG;
} catch (error) {
  // Если файла нет, используем переменные окружения
  TELEGRAM_CONFIG = {
    BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID
  };
}

export const sendTelegramNotification = async (message) => {
  // Если нет токена - ничего не делаем
  if (!TELEGRAM_CONFIG.BOT_TOKEN || !TELEGRAM_CONFIG.CHAT_ID) {
    console.log('📨 Telegram: Конфигурация не настроена');
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (response.ok) {
      console.log('✅ Уведомление отправлено в Telegram');
    } else {
      console.log('❌ Ошибка отправки в Telegram');
    }
  } catch (error) {
    console.log('📨 Telegram error:', error);
  }
};
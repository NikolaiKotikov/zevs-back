'use strict';

const { Telegraf } = require('telegraf');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const BOT_TOKEN = process.env.TG_BOT_TOKEN
const CHAT_ID = process.env.TG_CHAT_ID

const bot = new Telegraf(BOT_TOKEN)

const VALUE_NOT_PROVIDED = 'не заполнено'
const getValueOrDefault = (value) => value ?? VALUE_NOT_PROVIDED

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const message = `
<u>*** Новый Заказ №${result.id} ***</u>
<b>Имя</b>: ${getValueOrDefault(result.name)}
<b>Телефон</b>: <code>${getValueOrDefault(result.phone)}</code>
<b>Email</b>: <code>${getValueOrDefault(result.email)}</code>
<b>Комментарий</b>: ${getValueOrDefault(result.message)}
      `
      try {
        await bot.telegram.sendMessage(CHAT_ID, message, {parse_mode: 'HTML'})
      } catch (e) {
        console.log(e);
      }
    }
  }
};

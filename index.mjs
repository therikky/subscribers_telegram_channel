import 'dotenv/config';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN);

async function getSubscribers(channelName) {
    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getChatMembersCount?chat_id=${channelName}`);
    const data = await response.json();

    if (data.ok) {
        return data.result;
    } else {
        console.error(`Ошибка получения данных для канала ${channelName}:`, data.description);
        return 0;
    }
}

async function getTotalSubscribers(channelNames) {
    let totalSubscribers = 0;

    for (const channelName of channelNames) {
        const subscribers = await getSubscribers(channelName);
        totalSubscribers += subscribers;
    }

    return totalSubscribers;
}

bot.command('start', async (ctx) => {
    const channelNames = ['@username' и тп каналы через запятую];
    const channal = await(channelNames);
    const totalSubscribers = await getTotalSubscribers(channelNames);
        ctx.reply(`Каналы:\n${channal}\n\nПодписчиков:\n${totalSubscribers}`);
});

bot.launch();
console.log('Бот запущен');

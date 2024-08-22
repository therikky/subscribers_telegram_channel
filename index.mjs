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
    const channelNames = ['@arthub34', '@poppyplaytime34', '@purochanged34', '@furryhub34', '@judyhops34', '@lolabunny34', '@loonaboss', '-1001616733733', '-1001892940729', '@foxyfoxtrot34', '@pappyfox34', '-1001718104006', '-1001504340827', '-1001821932394', '@mlphub34', '-1001975452658', '-1001934688439', '-1001644008108', '-1001609568203', '@boykisser3', '@volumfurry', '@bluey_34', '@pawpatrol34', '@pomni34art', '@rambley34'];
    const channal = await(channelNames);
    const totalSubscribers = await getTotalSubscribers(channelNames);
        ctx.reply(`Каналы:\n${channal}\n\nПодписчиков:\n${totalSubscribers}`);
});

bot.launch();
console.log('Bot started...');

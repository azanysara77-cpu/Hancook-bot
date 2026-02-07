import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys';
import pino from 'pino';
import express from 'express';
import { handleMessage, sendAutoZikr } from './handler.js';
import chalk from 'chalk';

// === إعدادات الرقم ===
const PHONE_NUMBER = '967781818508';
const OWNER_JID = PHONE_NUMBER + '@s.whatsapp.net';

// === تسجيل وقت التشغيل ===
export const startTime = Date.now();

// === إعداد خادم Express لضمان بقاء الخدمة نشطة ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ status: 'Hancock Bot is running', target_number: PHONE_NUMBER, uptime: Date.now() - startTime });
});

app.listen(PORT, () => {
    console.log(chalk.green(`✅ Server is running on port ${PORT}`));
});

async function connectToWhatsApp() {
    console.log(chalk.cyan.bold('\n🧊 HANCOCK BOT - STARTING FOR ' + PHONE_NUMBER + ' 🧊\n'));
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: ['Ubuntu', 'Chrome', '20.0.04'], 
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        shouldIgnoreJid: (jid) => /status@broadcast/.test(jid),
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 15000,
        retryRequestDelayMs: 5000,
    });

    if (!sock.authState.creds.registered) {
        console.log(chalk.yellow(`⏳ Waiting 10 seconds before requesting pairing code for: ${PHONE_NUMBER}...`));
        setTimeout(async () => {
            try {
                const code = await sock.requestPairingCode(PHONE_NUMBER);
                console.log(chalk.white.bgGreen.bold('\n\n========================================='));
                console.log(chalk.white.bgGreen.bold('      YOUR WHATSAPP PAIRING CODE:       '));
                console.log(chalk.black.bgWhite.bold(`             ${code}             `));
                console.log(chalk.white.bgGreen.bold('=========================================\n\n'));
            } catch (err) {
                console.error(chalk.red('❌ Failed to request pairing code:'), err);
            }
        }, 10000);
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'connecting') console.log(chalk.blue('⏳ Connecting to WhatsApp...'));
        if (connection === 'open') {
            console.log(chalk.green.bold('\n✅ SUCCESS: Connected to ' + PHONE_NUMBER + '\n'));
            setTimeout(async () => {
                try {
                    await sock.sendMessage(OWNER_JID, { 
                        text: `*🧊 تم ربط هانكوك بوت بنجاح! 🧊*\n\nمرحباً بك يا صاحب الرقم ${PHONE_NUMBER}\nتم تفعيل نظام الأذكار التلقائي (كل 10 دقائق).` 
                    });
                } catch (err) {}
            }, 3000);
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) setTimeout(() => connectToWhatsApp(), 5000);
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        try {
            const message = m.messages[0];
            if (!message.message) return;
            await handleMessage(sock, message, OWNER_JID, PHONE_NUMBER);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    // نظام الأذكار التلقائي (كل 10 دقائق)
    setInterval(async () => {
        console.log(chalk.blue('🕌 Sending auto zikr to groups...'));
        try {
            await sendAutoZikr(sock);
        } catch (e) {
            console.error('❌ Error sending auto zikr:', e);
        }
    }, 10 * 60 * 1000);

    return sock;
}

process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', (err) => console.error('Unhandled Rejection:', err));

connectToWhatsApp().catch(err => console.error(chalk.red('Fatal Error:'), err));

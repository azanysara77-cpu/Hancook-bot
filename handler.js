import fs from 'fs';
import path from 'path';
import { startTime } from './index.js';

const DATA_DIR = './data';
const USERS_DB = path.join(DATA_DIR, 'users.json');
const GAMES_DB = path.join(DATA_DIR, 'games.json');
const AUTH_DB = path.join(DATA_DIR, 'authorized.json');
const SETTINGS_DB = path.join(DATA_DIR, 'settings.json');
const STATS_DB = path.join(DATA_DIR, 'stats.json');

function initDB() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(USERS_DB)) fs.writeFileSync(USERS_DB, JSON.stringify({}));
    if (!fs.existsSync(GAMES_DB)) fs.writeFileSync(GAMES_DB, JSON.stringify({}));
    if (!fs.existsSync(AUTH_DB)) fs.writeFileSync(AUTH_DB, JSON.stringify([]));
    if (!fs.existsSync(SETTINGS_DB)) fs.writeFileSync(SETTINGS_DB, JSON.stringify({ active: true, zikrActive: true, scratchCodes: [], lastCodeUpdate: 0, rewardGroups: [] }));
    if (!fs.existsSync(STATS_DB)) fs.writeFileSync(STATS_DB, JSON.stringify({ date: new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Riyadh'}), users: {} }));
}

const getDB = (file) => { initDB(); try { return JSON.parse(fs.readFileSync(file, 'utf-8')); } catch { return file.endsWith('json') ? {} : []; } };
const saveDB = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

const footer = "\n*『𝑯𝒂𝒏𝒄𝒐𝒄𝒌⊰❄️⊱𝒃𝒐𝒕』*";
const BANK_CAP = 999999999999999999;

const azkar = [
    "🌿 سُبحان الله وبحمده، سُبحان الله العظيم.",
    "🌿 لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
    "🌿 اللهم صلِّ وسلم على نبينا محمد.",
    "🌿 أستغفر الله العظيم وأتوب إليه.",
    "🌿 لا حول ولا قوة إلا بالله العلي العظيم.",
    "🌿 سُبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر.",
    "🌿 ربي اغفر لي ولوالدي وللمؤمنين والمؤمنات.",
    "🌿 حسبي الله ونعم الوكيل.",
    "🌿 لا إله إلا أنت سبحانك إني كنت من الظالمين.",
    "🌿 اللهم إنك عفو كريم تحب العفو فاعفُ عنا.",
    "🌿 يا حي يا قيوم برحمتك أستغيث.",
    "🌿 رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً.",
    "🌿 اللهم آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
    "🌿 سبحان الله وبحمده عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته.",
    "🌿 اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك.",
    "🌿 اللهم إني أسألك الهدى والتقى والعفاف والغنى.",
    "🌿 يا مقلب القلوب ثبت قلبي على دينك.",
    "🌿 الحمد لله حمداً كثيراً طيباً مباركاً فيه.",
    "🌿 اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
    "🌿 استغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه."
];

const shopItems = [
    { id: 1, name: "👁️ شارينغان", price: 15000 },
    { id: 2, name: "🔮 كرات دراغون بول", price: 45000 },
    { id: 3, name: "🍎 فاكهة شيطان", price: 35000 },
    { id: 4, name: "⚔️ سيف زورو (إنما)", price: 25000 },
    { id: 5, name: "🌀 عين الرينغان", price: 50000 },
    { id: 6, name: "🛡️ درع الساموراي", price: 10000 },
    { id: 7, name: "🏎️ سيارة رياضية", price: 100000 },
    { id: 8, name: "🏰 قصر ملكي", price: 500000 },
    { id: 9, name: "📱 آيفون 15 برو", price: 15000 },
    { id: 10, name: "⌚ ساعة رولكس", price: 25000 }
];

const jobs = ["طيار", "مبرمج", "طبيب", "مهندس", "عامل", "تاجر", "مدرس"];
const animeChars = ["ناروتو", "لوفي", "زورو", "سانجي", "إيتاتشي", "ليفاي", "ميكاسا", "إيرين", "غوكو", "فيجيتا", "ريك", "ديريل", "نيغان", "ميشون", "هانكوك", "ساسكي", "مادارا", "كاكاشي", "غارا", "هيناتا", "نامي", "روبين", "ايس", "سابو", "تيتش", "شانكس", "دوفلامينغو", "لاو", "كيد", "باغي", "غون", "كيلوا", "كورابيكا", "يوريو", "هيسوكا", "نيتيرو", "ميرويم", "سايتاما", "جينوس", "تاتسوماكي", "تانجيرو", "نيزوكو", "زينيتسو", "إينوسكي", "رينغوكو", "موزان", "غيو", "شينوبو", "كانروجي", "أوزوي", "غلين", "كارل", "شين", "ماغي", "ساشا", "أبراهام", "يوجين", "روزيتا", "جوديث", "ألفا"];

const flagsData = { "🇾🇪": "اليمن", "🇸🇦": "السعودية", "🇪🇬": "مصر", "🇵🇸": "فلسطين", "🇲🇦": "المغرب", "🇶🇦": "قطر", "🇦🇪": "الامارات", "🇰🇼": "الكويت", "🇯🇵": "اليابان", "🇧🇷": "البرازيل", "🇩🇿": "الجزائر", "🇮🇶": "العراق", "🇸🇾": "سوريا", "🇱🇧": "لبنان", "🇯🇴": "الاردن", "🇴🇲": "عمان", "🇧🇭": "البحرين", "🇹🇳": "تونس", "🇱🇾": "ليبيا", "🇸🇩": "السودان", "🇲🇷": "موريتانيا", "🇸🇴": "الصومال", "🇩🇯": "جيبوتي", "🇰🇲": "جزر القمر", "🇺🇸": "امريكا", "🇬🇧": "بريطانيا", "🇫🇷": "فرنسا", "🇩🇪": "المانيا", "🇮🇹": "ايطاليا", "🇪🇸": "اسبانيا", "🇷🇺": "روسيا", "🇨🇳": "الصين", "🇰🇷": "كوريا الجنوبية", "🇮🇳": "الهند", "🇹🇷": "تركيا", "🇨🇦": "كندا", "🇦🇺": "استراليا", "🇲🇽": "المكسيك", "🇦🇷": "الارجنتين", "🇵🇹": "البرتغال", "🇳🇱": "هولندا", "🇧🇪": "بلجيكا", "🇨🇭": "سويسرا", "🇸🇪": "السويد", "🇳🇴": "النرويج", "🇩🇰": "الدنمارك", "🇫🇮": "فنلندا", "🇬🇷": "اليونان", "🇿🇦": "جنوب افريقيا", "🇳🇬": "نيجيريا" };
const emojiData = { "🦁": "أسد", "🍎": "تفاحة", "🥕": "جزر", "🍌": "موز", "🐘": "فيل", "🍓": "فراولة", "🦒": "زرافة", "🍔": "همبرغر", "🍕": "بيتزا", "🐼": "باندا", "🐒": "قرد", "🐯": "نمر", "🦓": "حمار وحشي", "🐫": "جمل", "🐎": "حصان", "🐑": "خروف", "🐓": "ديك", "🐧": "بطريق", "🐬": "دولفين", "🦈": "قرش", "🍇": "عنب", "🍉": "بطيخ", "🍒": "كرز", "🍍": "أناناس", "🥑": "أفوكادو", "🌽": "ذرة", "🥦": "بروكلي", "🍦": "آيس كريم", "🍩": "دونات", "🍪": "كوكيز" };

const wouldYouRather = [
    "تعيش في الغابة أو تعيش في الصحراء؟", "تكون غني وحزين أو فقير وسعيد؟", "تطير أو تختفي؟", "تعرف مستقبلك أو تغير ماضيك؟", "تعيش بدون إنترنت أو بدون كهرباء؟",
    "تأكل بصل نيء أو تأكل ليمون حامض؟", "تكون مشهور ومكروه أو غير معروف ومحبوب؟", "تنام في مكان بارد جداً أو حار جداً؟", "تتكلم كل لغات العالم أو تتكلم مع الحيوانات؟", "تكون بطل خارق أو ساحر؟",
    "تعيش في الفضاء أو تحت البحر؟", "تخسر حاسة السمع أو حاسة البصر؟", "تكون دائماً متأخر أو دائماً مبكر جداً؟", "تأكل بيتزا للأبد أو برجر للأبد؟", "تكون ذكي جداً أو قوي جداً؟",
    "تعيش في الماضي أو في المستقبل؟", "تكون أصغر شخص في العالم أو أكبر شخص؟", "تمشي حافي على زجاج أو على جمر؟", "تكون عندك ذاكرة قوية أو تنسى الهموم؟", "تكون ملك في جزيرة أو مواطن في مدينة؟",
    "تأكل أكل حار جداً أو بارد جداً؟", "تكون دائماً تعبان أو دائماً جوعان؟", "تعيش بدون موسيقى أو بدون أفلام؟", "تكون عندك سيارة أحلامك أو بيت أحلامك؟", "تكون مشهور في اليوتيوب أو في التيك توك؟",
    "تلبس ملابس شتوية في الصيف أو صيفية في الشتاء؟", "تكون دائماً تضحك أو دائماً جاد؟", "تعيش في مدينة مزدحمة أو قرية هادئة؟", "تكون عندك أجنحة أو ذيل؟", "تأكل حلويات فقط أو موالح فقط؟",
    "تكون بطل في فيلم رعب أو فيلم كوميدي؟", "تعرف متى ستموت أو كيف ستموت؟", "تكون عندك قوة الجليد أو قوة النار؟", "تعيش بدون هاتف أو بدون تلفاز؟", "تكون دائماً عطشان أو دائماً نعسان؟",
    "تكون عندك قطة أو كلب؟", "تسافر بالقطار أو بالطائرة؟", "تكون رسام مشهور أو عازف مشهور؟", "تأكل في مطعم فاخر أو تطبخ في البيت؟", "تكون عندك حديقة كبيرة أو مسبح كبير؟",
    "تعيش في ناطحة سحاب أو في كوخ؟", "تكون دائماً لابس رسمي أو دائماً لابس رياضي؟", "تكون عندك قدرة قراءة الأفكار أو رؤية المستقبل؟", "تأكل فواكه فقط أو خضروات فقط؟", "تكون دائماً في ضوء الشمس أو في ضوء القمر؟",
    "تكون عندك سرعة البرق أو قوة العملاق؟", "تعيش بدون أصدقاء أو بدون عائلة؟", "تكون دائماً فائز أو دائماً محظوظ؟", "تأكل أخطبوط أو تأكل حشرات؟", "تكون عندك حياة طويلة ومملة أو قصيرة ومثيرة؟"
];

const animeQuiz = [
    { q: "من هو بطل أنمي ون بيس؟", a: "لوفي" }, { q: "ما هو اسم سيف زورو الذي حصل عليه من وانو؟", a: "انما" }, { q: "من هو مدرب ناروتو الأول؟", a: "ايروكا" }, { q: "ما هو اسم والد لوفي؟", a: "دراغون" }, { q: "من قتل إيتاتشي أوتشيها؟", a: "ساسكي" },
    { q: "ما هو اسم الوحش داخل ناروتو؟", a: "كوراما" }, { q: "من هو قبطان طاقم قراصنة القلب؟", a: "لاو" }, { q: "ما هو اسم الأنمي الذي فيه عملاقة؟", a: "هجوم العمالقة" }, { q: "من هو أقوى رجل في العالم في ون بيس سابقاً؟", a: "اللحية البيضاء" }, { q: "ما هو اسم بطل أنمي دراغون بول؟", a: "غوكو" },
    { q: "من هو الشخص الذي أعطى لوفي قبعته القشية؟", a: "شانكس" }, { q: "ما هو اسم عين ساسكي اليسرى؟", a: "رينغان" }, { q: "من هو بطل أنمي القناص؟", a: "غون" }, { q: "ما هو اسم والد غون؟", a: "جين" }, { q: "من هو بطل أنمي بليتش؟", a: "ايتشيغو" },
    { q: "ما هو اسم السيف الخاص بـ ميهوك؟", a: "يورو" }, { q: "من هو الأخ الأكبر لناروتو بالتبني؟", a: "ايروكا" }, { q: "ما هو اسم فاكهة لوفي؟", a: "نيكا" }, { q: "من هو بطل أنمي ديمون سلاير؟", a: "تانجيرو" }, { q: "ما هو اسم أخت تانجيرو؟", a: "نيزوكو" },
    { q: "من هو بطل أنمي جوجوتسو كايسن؟", a: "ايتادوري" }, { q: "من هو أقوى مستعمل جوجوتسو؟", a: "غوجو" }, { q: "ما هو اسم بطل أنمي ديث نوت؟", a: "لايت" }, { q: "من هو المحقق الذي يطارد لايت؟", a: "ال" }, { q: "ما هو اسم الشينيغامي الخاص بلايت؟", a: "ريوك" },
    { q: "من هو بطل أنمي بلاك كلوفر؟", a: "أستا" }, { q: "ما هو اسم بطل أنمي ماي هيرو أكاديميا؟", a: "ميدوريا" }, { q: "من هو المعلم في أنمي اغتيال الفصول؟", a: "كورو سينسي" }, { q: "ما هو اسم بطل أنمي ون بانش مان؟", a: "سايتاما" }, { q: "من هو تلميذ سايتاما؟", a: "جينوس" },
    { q: "ما هو اسم بطل أنمي طوكيو غول؟", a: "كانيكي" }, { q: "من هو بطل أنمي فايري تيل؟", a: "ناتسو" }, { q: "ما هو اسم القطة في فايري تيل? ", a: "هابي" }, { q: "من هو بطل أنمي الخطايا السبع المميتة؟", a: "ميليوداس" }, { q: "ما هو اسم خنزير ميليوداس؟", a: "هوك" },
    { q: "من هو بطل أنمي دريفترز؟", a: "تويوهيسا" }, { q: "ما هو اسم بطل أنمي كود غياس؟", a: "لولوش" }, { q: "من هو بطل أنمي سورد آرت أونلاين؟", a: "كيريتو" }, { q: "ما هو اسم حبيبة كيريتو؟", a: "أسونا" }, { q: "من هو بطل أنمي ري زيرو؟", a: "سوبارو" },
    { q: "ما هو اسم الخادمة الزرقاء في ري زيرو؟", a: "ريم" }, { q: "من هو بطل أنمي نو غيم نو لايف؟", a: "سورا" }, { q: "ما هو اسم أخت سورا؟", a: "شيرو" }, { q: "من هو بطل أنمي أوفرلورد؟", a: "آينز" }, { q: "ما هو اسم بطل أنمي تاتيت نو يوشا؟", a: "ناوفومي" },
    { q: "من هو بطل أنمي موشوكو تينسي؟", a: "روديوس" }, { q: "ما هو اسم بطل أنمي بلو لوك؟", a: "ايساغي" }, { q: "من هو بطل أنمي هايكيو؟", a: "هيناتا" }, { q: "ما هو اسم بطل أنمي كوروكو نو باسكت؟", a: "كوروكو" }, { q: "من هو بطل أنمي هاجيمي نو ايبو؟", a: "ايبو" }
];

const commands = {
    // === أوامر المالك ===
    'سماح': { category: 'المالك', desc: 'منح صلاحية لشخص (رد أو منشن)', handler: async (sock, m, args) => {
        let target = m.message?.extendedTextMessage?.contextInfo?.participant || m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);
        if (!target) return m.reply('❌ رد على الرسالة أو منشن الشخص لمنحه الصلاحية\nالشرح: .سماح <منشن>');
        let auth = getDB(AUTH_DB);
        if (!auth.includes(target)) { auth.push(target); saveDB(AUTH_DB, auth); m.reply(`✅ تم منح الصلاحية لـ @${target.split('@')[0]}`, { mentions: [target] }); }
        else { m.reply('⚠️ هذا الشخص لديه صلاحية بالفعل'); }
    }},
    'سحب': { category: 'المالك', desc: 'سحب صلاحية من شخص (رد أو منشن)', handler: async (sock, m, args) => {
        let target = m.message?.extendedTextMessage?.contextInfo?.participant || m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);
        if (!target) return m.reply('❌ رد على الرسالة أو منشن الشخص لسحب الصلاحية\nالشرح: .سحب <منشن>');
        let auth = getDB(AUTH_DB);
        auth = auth.filter(id => id !== target);
        saveDB(AUTH_DB, auth); m.reply(`✅ تم سحب الصلاحية من @${target.split('@')[0]}`, { mentions: [target] });
    }},
    'شحن': { category: 'المالك', desc: 'شحن رصيد لنفسك', handler: async (sock, m, args, sender) => {
        const amount = parseInt(args[0]);
        if (isNaN(amount)) return m.reply('❌ حدد المبلغ\nالشرح: .شحن <المبلغ>');
        let users = getDB(USERS_DB);
        if (!users[sender]) users[sender] = { wallet: 0, balance: 0, items: [] };
        users[sender].balance = Math.min(users[sender].balance + amount, BANK_CAP);
        saveDB(USERS_DB, users); m.reply(`✅ تم شحن ${amount}$ لحسابك البنكي`);
    }},
    'ادد': { category: 'المالك', desc: 'شحن رصيد لعضو برقم حسابه', handler: async (sock, m, args) => {
        const amount = parseInt(args[0]);
        const targetAcc = parseInt(args[1]);
        if (isNaN(amount) || isNaN(targetAcc)) return m.reply('❌ حدد المبلغ ثم رقم الحساب\nالشرح: .ادد <المبلغ> <رقم_الحساب>');
        let users = getDB(USERS_DB);
        let targetJid = Object.keys(users).find(k => users[k].accNum === targetAcc);
        if (!targetJid) return m.reply('❌ رقم الحساب غير صحيح');
        users[targetJid].balance = Math.min(users[targetJid].balance + amount, BANK_CAP);
        saveDB(USERS_DB, users); m.reply(`✅ تم شحن ${amount}$ للحساب ${targetAcc}`);
    }},
    'ق': { category: 'المالك', desc: 'عرض قائمة النخبة', handler: async (sock, m) => {
        const auth = getDB(AUTH_DB);
        if (auth.length === 0) return m.reply('⚠️ لا يوجد أشخاص مضافون في قائمة الصلاحية حالياً.');
        let list = '*📋 قائمة أصحاب الصلاحية (النخبة):*\n\n';
        auth.forEach((id, i) => { list += `${i + 1} - @${id.split('@')[0]}\n`; });
        list += `\n${footer}`;
        m.reply(list, { mentions: auth });
    }},
    'شغ': { category: 'المالك', desc: 'تشغيل استجابة البوت', handler: async (sock, m) => { 
        let settings = getDB(SETTINGS_DB); settings.active = true; saveDB(SETTINGS_DB, settings); 
        m.reply('✅ تم تشغيل استجابة البوت'); 
    }},
    'قف': { category: 'المالك', desc: 'إيقاف استجابة البوت', handler: async (sock, m) => { 
        let settings = getDB(SETTINGS_DB); settings.active = false; saveDB(SETTINGS_DB, settings); 
        m.reply('🛑 تم إيقاف استجابة البوت'); 
    }},
    'خص': { category: 'المالك', desc: 'تفعيل/إيقاف الأذكار التلقائية', handler: async (sock, m) => {
        let settings = getDB(SETTINGS_DB);
        settings.zikrActive = !settings.zikrActive;
        saveDB(SETTINGS_DB, settings);
        m.reply(settings.zikrActive ? '✅ تم تشغيل نظام الأذكار التلقائي' : '🛑 تم إيقاف نظام الأذكار التلقائي');
    }},
    'ريلود': { category: 'المالك', desc: 'إعادة ضبط بيانات البوت', handler: async (sock, m) => {
        saveDB(USERS_DB, {});
        saveDB(GAMES_DB, {});
        saveDB(AUTH_DB, []);
        saveDB(STATS_DB, { date: new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Riyadh'}), users: {} });
        saveDB(SETTINGS_DB, { active: true, zikrActive: true, scratchCodes: [], lastCodeUpdate: 0, rewardGroups: [] });
        m.reply('🔄 تم مسح كافة البيانات وإعادة ضبط البوت بنجاح.');
    }},
    'تصفير': { category: 'المالك', desc: 'تصفير بنك عضو برقم حسابه', handler: async (sock, m, args) => {
        const targetAcc = parseInt(args[0]);
        if (isNaN(targetAcc)) return m.reply('❌ حدد رقم الحساب\nالشرح: .تصفير <رقم_الحساب>');
        let users = getDB(USERS_DB);
        let targetJid = Object.keys(users).find(k => users[k].accNum === targetAcc);
        if (!targetJid) return m.reply('❌ رقم الحساب غير صحيح');
        users[targetJid].balance = 0;
        saveDB(USERS_DB, users); m.reply(`✅ تم تصفير رصيد البنك للحساب ${targetAcc}`);
    }},
    'وقت': { category: 'المالك', desc: 'معرفة وقت تشغيل البوت', handler: async (sock, m) => {
        const uptime = Date.now() - startTime;
        const hours = Math.floor(uptime / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
        m.reply(`⏱️ *وقت تشغيل البوت:*\n\nمنذ: ${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية${footer}`);
    }},
    'حد': { category: 'المالك', desc: 'تحديد قروب للجوائز اليومية', handler: async (sock, m) => {
        if (!m.key.remoteJid.endsWith('@g.us')) return m.reply('❌ هذا الأمر للقروبات فقط');
        let settings = getDB(SETTINGS_DB);
        if (!settings.rewardGroups) settings.rewardGroups = [];
        if (settings.rewardGroups.includes(m.key.remoteJid)) {
            settings.rewardGroups = settings.rewardGroups.filter(id => id !== m.key.remoteJid);
            m.reply('✅ تم إزالة هذا القروب من قائمة الجوائز اليومية');
        } else {
            settings.rewardGroups.push(m.key.remoteJid);
            m.reply('✅ تم إضافة هذا القروب لقائمة الجوائز اليومية');
        }
        saveDB(SETTINGS_DB, settings);
    }},

    // === أوامر النظام ===
    'بوا': { category: 'النظام', desc: 'عرض قائمة الأوامر الرئيسية', handler: async (sock, m) => {
        let help = `*‏『 𝑯𝑨𝑵𝑪𝑶𝑪𝑲 𝑩𝑶𝑻 • الأوامر 🧊 』*\n\n`;
        help += `*‏┫───〈 👑 قـسـم الـمـالـك 〉───┣*\n\n`;
        help += `*• [ .سماح ] :* منح صلاحية لشخص (رد/منشن)\n`;
        help += `*• [ .سحب ] :* سحب صلاحية من شخص (رد/منشن)\n`;
        help += `*• [ .شحن ] :* شحن رصيدك الشخصي\n`;
        help += `*• [ .ادد ] :* شحن رصيد لعضو برقم حسابه\n`;
        help += `*• [ .ق ] :* عرض قائمة النخبة\n`;
        help += `*• [ .شغ ] :* تفعيل استجابة البوت\n`;
        help += `*• [ .قف ] :* إيقاف استجابة البوت\n`;
        help += `*• [ .خص ] :* تفعيل/إيقاف الأذكار التلقائية\n`;
        help += `*• [ .ريلود ] :* إعادة ضبط بيانات البوت\n\n`;
        
        help += `*‏┫───〈 ⚙️ الـنـظـام 〉───┣*\n\n`;
        help += `*• [ .بوا ] :* عرض قائمة الأوامر الرئيسية\n`;
        help += `*• [ .المطور ] :* معلومات مطور البوت\n`;
        help += `*• [ .قر ] :* رابط مجموعة الدعم\n`;
        help += `*• [ .شات ] :* إحصائيات التفاعل اليومي\n\n`;

        help += `*‏┫───〈 💰 الـبـنـك 〉───┣*\n\n`;
        help += `*• [ .انش ] :* إنشاء حساب بنكي جديد\n`;
        help += `*• [ .مح ] :* عرض رصيد محفظتك\n`;
        help += `*• [ .حس ] :* تفاصيل حسابك البنكي\n`;
        help += `*• [ .ايداع ] :* تحويل من المحفظة للبنك\n`;
        help += `*• [ .سح ] :* سحب من البنك للمحفظة\n`;
        help += `*• [ .اس ] :* استثمار الرصيد (كل 30د)\n`;
        help += `*• [ .را ] :* استلام الراتب (كل 10د)\n`;
        help += `*• [ .تحويل ] :* تحويل مالي برقم الحساب\n`;
        help += `*• [ .زرف ] :* محاولة سرقة (كل 20د)\n`;
        help += `*• [ .الاغنياء ] :* قائمة توب 10 أغنياء\n`;
        help += `*• [ .حذ ] :* حذف الحساب نهائياً\n`;
        help += `*• [ .ك ] :* عرض أكواد الكشط اليومية\n`;
        help += `*• [ .كشط ] :* كشط كود للحصول على مبلغ\n\n`;

        help += `*‏┫───〈 🛒 الـمـتـجـر 〉───┣*\n\n`;
        help += `*• [ .متجر ] :* عرض قائمة السلع المتاحة\n`;
        help += `*• [ .شراء ] :* شراء سلعة محددة\n`;
        help += `*• [ .مم ] :* عرض ممتلكاتك الخاصة\n\n`;

        help += `*‏┫───〈 🎮 الـفـعـالـيـات 〉───┣*\n\n`;
        help += `*• [ .تر ] :* ترتيب الكلمات\n`;
        help += `*• [ .فك ] :* تفكيك الكلمات\n`;
        help += `*• [ .كت ] :* سرعة الكتابة\n`;
        help += `*• [ .علم ] :* تخمين الأعلام\n`;
        help += `*• [ .ح ] :* تخمين الإيموجي\n`;
        help += `*• [ .لو ] :* لعبة لو خيروك\n`;
        help += `*• [ .كك ] :* تحدي أسئلة الأنمي\n`;
        help += `*• [ .اكس ] :* بدء لعبة XO\n`;
        help += `*• [ .او ] :* الانضمام للعبة XO\n`;
        help += `*• [ .تخطي ] :* تجاوز اللعبة الحالية\n\n`;
        
        help += `*‏『 𝑯𝒂𝒏𝒄𝒐𝒄𝒌 ⊰❄️⊱ 𝑩𝒐𝒕 』*`;
        m.reply(help);
    }},
    'المطور': { category: 'النظام', desc: 'معلومات مطور البوت', handler: async (sock, m) => {
        m.reply(`*👤 معلومات المطور*\n\nالاسم: شوشو/هانكوك\nالرقم: 967781818508${footer}`);
    }},
    'قر': { category: 'النظام', desc: 'رابط مجموعة الدعم', handler: async (sock, m) => {
        m.reply(`*🧊 مجموعة هانكوك بوت الرسمية 🧊*\n\nالرابط: https://chat.whatsapp.com/ICVM0HR7CJcK8t0WJrBJYy?mode=gi_t${footer}`);
    }},
    'شات': { category: 'النظام', desc: 'إحصائيات التفاعل اليومي', handler: async (sock, m) => {
        const stats = getDB(STATS_DB);
        const jid = m.key.remoteJid;
        const groupStats = stats.users[jid] || {};
        const sorted = Object.entries(groupStats).sort((a, b) => b[1] - a[1]).slice(0, 10);
        if (sorted.length === 0) return m.reply('⚠️ لا يوجد تفاعل مسجل لهذا اليوم حتى الآن.');
        let totalMsgs = Object.values(groupStats).reduce((a, b) => a + b, 0);
        let txt = `📊 *تفاعل المجموعة اليوم (${stats.date})*\n\n📈 إجمالي الرسائل: ${totalMsgs}\n\n*🏆 توب المتفاعلين:*\n`;
        sorted.forEach((u, i) => { txt += `${i + 1}. @${u[0].split('@')[0]} - ${u[1]} رسالة\n`; });
        m.reply(txt + footer, { mentions: sorted.map(u => u[0]) });
    }},

    // === أوامر البنك ===
    'انش': { category: 'البنك', desc: 'إنشاء حساب بنكي جديد', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        if (users[sender]?.accNum) return m.reply(`⚠️ لديك حساب بالفعل: ${users[sender].accNum}`);
        const acc = Math.floor(100000 + Math.random() * 900000);
        const currentWallet = users[sender]?.wallet || 0;
        users[sender] = { accNum: acc, wallet: currentWallet + 1000, balance: 0, items: users[sender]?.items || [], lastSalary: 0, lastInvest: 0, lastRob: 0, lastScratch: 0 };
        saveDB(USERS_DB, users); m.reply(`✅ تم إنشاء حساب بنكي مميز!\nرقم الحساب: ${acc}\nهدية افتتاح: 1000$ تضاف لمحفظتك`);
    }},
    'مح': { category: 'البنك', desc: 'عرض رصيد محفظتك', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        m.reply(`👛 محفظتك: ${users[sender]?.wallet || 0}$`);
    }},
    'حس': { category: 'البنك', desc: 'تفاصيل حسابك البنكي', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        const u = users[sender];
        if (!u?.accNum) return m.reply('❌ ليس لديك حساب. اكتب .انش');
        m.reply(`🏦 *تفاصيل الحساب*\n\nرقم الحساب: ${u.accNum}\nالبنك: ${u.balance}$\nالمحفظة: ${u.wallet}$${footer}`);
    }},
    'ايداع': { category: 'البنك', desc: 'تحويل من المحفظة للبنك', handler: async (sock, m, args, sender) => {
        const amount = parseInt(args[0]);
        let users = getDB(USERS_DB);
        if (isNaN(amount) || (users[sender]?.wallet || 0) < amount) return m.reply('❌ رصيد المحفظة غير كافٍ\nالشرح: .ايداع <المبلغ>');
        users[sender].wallet -= amount;
        users[sender].balance = Math.min(users[sender].balance + amount, BANK_CAP);
        saveDB(USERS_DB, users); m.reply(`✅ تم ايداع ${amount}$ في البنك.`);
    }},
    'سح': { category: 'البنك', desc: 'سحب من البنك للمحفظة', handler: async (sock, m, args, sender) => {
        const amount = parseInt(args[0]);
        let users = getDB(USERS_DB);
        if (isNaN(amount) || (users[sender]?.balance || 0) < amount) return m.reply('❌ رصيد البنك غير كافٍ\nالشرح: .سح <المبلغ>');
        users[sender].balance -= amount; users[sender].wallet += amount;
        saveDB(USERS_DB, users); m.reply(`✅ تم سحب ${amount}$ إلى المحفظة.`);
    }},
    'اس': { category: 'البنك', desc: 'استثمار الرصيد (كل 30د)', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        const amount = parseInt(args[0]);
        if (!users[sender] || isNaN(amount) || amount > users[sender].balance) return m.reply('❌ رصيد البنك غير كافٍ\nالشرح: .اس <المبلغ>');
        const now = Date.now();
        if (now - (users[sender].lastInvest || 0) < 30 * 60 * 1000) return m.reply('⏳ يمكنك الاستثمار كل 30 دقيقة');
        const win = Math.random() > 0.5;
        const profit = win ? Math.floor(amount * 1.5) : -amount;
        users[sender].balance = Math.min(users[sender].balance + profit, BANK_CAP);
        users[sender].lastInvest = now;
        saveDB(USERS_DB, users);
        m.reply(win ? `📈 استثمار ناجح! ربحت ${profit}$` : `📉 استثمار فاشل! خسرت ${amount}$`);
    }},
    'را': { category: 'البنك', desc: 'استلام الراتب (كل 10د)', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        const now = Date.now();
        if (now - (users[sender]?.lastSalary || 0) < 10 * 60 * 1000) return m.reply('⏳ الراتب كل 10 دقائق');
        const job = jobs[Math.floor(Math.random() * jobs.length)];
        const sal = Math.floor(2000 + Math.random() * 3000);
        if (!users[sender]) return m.reply('❌ انشئ حساب أولاً');
        users[sender].wallet += sal; users[sender].lastSalary = now;
        saveDB(USERS_DB, users);
        m.reply(`👷 وظيفتك اليوم: ${job}\n💰 استلمت راتب: ${sal}$`);
    }},
    'تحويل': { category: 'البنك', desc: 'تحويل مالي برقم الحساب', handler: async (sock, m, args, sender) => {
        const amount = parseInt(args[0]);
        const targetAcc = parseInt(args[1]);
        let users = getDB(USERS_DB);
        if (!users[sender] || users[sender].balance < amount) return m.reply('❌ رصيد البنك غير كافٍ\nالشرح: .تحويل <المبلغ> <رقم_الحساب>');
        let targetJid = Object.keys(users).find(k => users[k].accNum === targetAcc);
        if (!targetJid) return m.reply('❌ رقم الحساب غير صحيح');
        users[sender].balance -= amount;
        users[targetJid].balance = Math.min(users[targetJid].balance + amount, BANK_CAP);
        saveDB(USERS_DB, users); m.reply(`✅ تم تحويل ${amount}$ إلى الحساب ${targetAcc}`);
    }},
    'حذ': { category: 'البنك', desc: 'حذف الحساب نهائياً', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        if (!users[sender]?.accNum) return m.reply('❌ ليس لديك حساب بنكي أصلاً!');
        delete users[sender]; saveDB(USERS_DB, users);
        m.reply(`⚠️ تم حذف حسابك البنكي وتصفير رصيدك وممتلكاتك بنجاح.`);
    }},
    'زرف': { category: 'البنك', desc: 'محاولة سرقة (كل 20د)', handler: async (sock, m, args, sender) => {
        let target = m.message?.extendedTextMessage?.contextInfo?.participant;
        if (!target || target === sender) return m.reply('❌ رد على رسالة الضحية لزرفها!\nالشرح: .زرف (بالرد على الرسالة)');
        let users = getDB(USERS_DB);
        if (!users[sender]) users[sender] = { wallet: 0, balance: 0, items: [], lastRob: 0 };
        const now = Date.now();
        if (now - (users[sender].lastRob || 0) < 20 * 60 * 1000) return m.reply('⏳ الزرف متاح كل 20 دقيقة');
        if (!users[target] || users[target].wallet < 100) return m.reply('❌ الضحية مفلسة (تحتاج 100$ على الأقل)');
        users[sender].lastRob = now;
        const win = Math.random() < 0.5;
        if (win) {
            const stolen = Math.min(Math.floor(users[target].wallet * 0.2), 2500);
            users[sender].wallet += stolen; users[target].wallet -= stolen;
            m.reply(`🥷 نجحت السرقة! زرفت ${stolen}$`);
        } else {
            const fine = 700;
            users[sender].wallet = Math.max(users[sender].wallet - fine, 0);
            m.reply(`👮 تم القبض عليك! تغرمت ${fine}$`);
        }
        saveDB(USERS_DB, users);
    }},
    'الاغنياء': { category: 'البنك', desc: 'قائمة توب 10 أغنياء', handler: async (sock, m) => {
        let users = getDB(USERS_DB);
        let top = Object.entries(users).sort((a, b) => (b[1].balance + b[1].wallet) - (a[1].balance + a[1].wallet)).slice(0, 10);
        let txt = `🏆 *أغنياء هانكوك*\n\n`;
        top.forEach((u, i) => txt += `${i+1}. @${u[0].split('@')[0]} - ${u[1].balance + u[1].wallet}$\n`);
        txt += `\n💡 *ملاحظة:* من يصل رصيده إلى 70,000$ سيحصل على رتبة "النخبة" تلقائياً!`;
        m.reply(txt, { mentions: top.map(u => u[0]) });
    }},
    'ك': { category: 'البنك', desc: 'عرض أكواد الكشط اليومية', handler: async (sock, m) => {
        let settings = getDB(SETTINGS_DB);
        updateScratchCodes(settings);
        let txt = `🎫 *أكواد الكشط اليومية*\n\n`;
        settings.scratchCodes.forEach((c, i) => {
            txt += `${i+1}. [ ${c.code} ] - ${c.used ? '❌ مستخدم' : '✅ متاح'}\n`;
        });
        txt += `\n💡 للكشط: .كشط <رقم الكود>\n⚠️ يمكنك الكشط مرة واحدة يومياً.`;
        m.reply(txt + footer);
    }},
    'كشط': { category: 'البنك', desc: 'كشط كود للحصول على مبلغ', handler: async (sock, m, args, sender) => {
        let settings = getDB(SETTINGS_DB);
        updateScratchCodes(settings);
        const codeIdx = parseInt(args[0]) - 1;
        if (isNaN(codeIdx) || !settings.scratchCodes[codeIdx]) return m.reply('❌ رقم الكود غير صحيح');
        if (settings.scratchCodes[codeIdx].used) return m.reply('❌ هذا الكود تم استخدامه بالفعل');
        
        let users = getDB(USERS_DB);
        if (!users[sender]) return m.reply('❌ انشئ حساب أولاً');
        
        const today = new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Riyadh'});
        if (users[sender].lastScratchDate === today) return m.reply('❌ لقد قمت بالكشط اليوم بالفعل، انتظر للغد!');
        
        const amount = settings.scratchCodes[codeIdx].amount;
        users[sender].balance += amount;
        users[sender].lastScratchDate = today;
        settings.scratchCodes[codeIdx].used = true;
        
        saveDB(SETTINGS_DB, settings);
        saveDB(USERS_DB, users);
        m.reply(`🎉 مبروك! كشطت الكود وحصلت على ${amount}$ أضيفت لبنكك.`);
    }},

    // === أوامر المتجر ===
    'متجر': { category: 'المتجر', desc: 'عرض قائمة السلع المتاحة', handler: async (sock, m) => {
        let txt = `🛒 *متجر هانكوك*\n\n`;
        shopItems.forEach(i => txt += `${i.id}. ${i.name} - ${i.price}$\n`);
        m.reply(txt + `\nللشراء: .شراء <رقم السلعة>${footer}`);
    }},
    'شراء': { category: 'المتجر', desc: 'شراء سلعة محددة', handler: async (sock, m, args, sender) => {
        const id = parseInt(args[0]);
        const item = shopItems.find(i => i.id === id);
        if (!item) return m.reply('❌ رقم السلعة خطأ\nالشرح: .شراء <رقم_السلعة>');
        let users = getDB(USERS_DB);
        if (!users[sender] || users[sender].wallet < item.price) return m.reply('❌ ليس لديك مال كافٍ في المحفظة');
        users[sender].wallet -= item.price;
        if (!users[sender].items) users[sender].items = [];
        users[sender].items.push(item.name);
        saveDB(USERS_DB, users); m.reply(`✅ مبروك! اشتريت ${item.name}`);
    }},
    'مم': { category: 'المتجر', desc: 'عرض ممتلكاتك الخاصة', handler: async (sock, m, args, sender) => {
        let users = getDB(USERS_DB);
        const items = users[sender]?.items || [];
        if (items.length === 0) return m.reply('📦 ممتلكاتك فارغة حالياً.');
        const counts = {};
        items.forEach(i => counts[i] = (counts[i] || 0) + 1);
        let txt = `📦 *ممتلكاتك:*\n\n`;
        for (let name in counts) txt += `- ${name} (${counts[name]})\n`;
        m.reply(txt + footer);
    }},

    // === أوامر الفعاليات ===
    'تخطي': { category: 'الفعاليات', desc: 'تجاوز اللعبة الحالية', handler: async (sock, m) => {
        let games = getDB(GAMES_DB);
        if (!games[m.key.remoteJid]) return m.reply('❌ لا توجد لعبة جارية');
        delete games[m.key.remoteJid]; saveDB(GAMES_DB, games); m.reply('✅ تم تخطي اللعبة');
    }},
    'تر': { category: 'الفعاليات', desc: 'ترتيب الكلمات', handler: async (sock, m) => {
        startActivity(sock, m, 'ترتيب', animeChars[Math.floor(Math.random() * animeChars.length)], (word) => word.split('').sort(() => 0.5 - Math.random()).join(''));
    }},
    'فك': { category: 'الفعاليات', desc: 'تفكيك الكلمات', handler: async (sock, m) => {
        startActivity(sock, m, 'تفكيك', animeChars[Math.floor(Math.random() * animeChars.length)], (word) => word, true);
    }},
    'كت': { category: 'الفعاليات', desc: 'سرعة الكتابة', handler: async (sock, m) => {
        startActivity(sock, m, 'كتابة', animeChars[Math.floor(Math.random() * animeChars.length)], (word) => word);
    }},
    'علم': { category: 'الفعاليات', desc: 'تخمين الأعلام', handler: async (sock, m) => {
        const emojis = Object.keys(flagsData);
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        startActivity(sock, m, 'الاعلام', flagsData[emoji], () => emoji);
    }},
    'ح': { category: 'الفعاليات', desc: 'تخمين الإيموجي', handler: async (sock, m) => {
        const emojis = Object.keys(emojiData);
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        startActivity(sock, m, 'الايموجي', emojiData[emoji], () => emoji, false, true);
    }},
    'لو': { category: 'الفعاليات', desc: 'لعبة لو خيروك', handler: async (sock, m) => {
        const q = wouldYouRather[Math.floor(Math.random() * wouldYouRather.length)];
        m.reply(`*┇⦏لو خيروك⦐┇*\n\n*❄️┇السؤال: ${q}⤹*${footer}`);
    }},
    'كك': { category: 'الفعاليات', desc: 'تحدي أسئلة الأنمي', handler: async (sock, m) => {
        const quiz = animeQuiz[Math.floor(Math.random() * animeQuiz.length)];
        startActivity(sock, m, 'أسئلة أنمي', quiz.a, () => quiz.q);
    }},
    'اكس': { category: 'الفعاليات', desc: 'بدء لعبة XO', handler: async (sock, m, args, sender) => {
        let games = getDB(GAMES_DB);
        const jid = m.key.remoteJid;
        if (games[jid]) return m.reply('⚠️ هناك لعبة جارية بالفعل! اكتب .تخطي');
        games[jid] = { type: 'xo', p1: sender, p2: null, board: ['1','2','3','4','5','6','7','8','9'], turn: sender, status: 'waiting' };
        saveDB(GAMES_DB, games);
        m.reply(`*┇⦏لعبة XO⦐┇*\n\n*❄️┇تم فتح لعبة جديدة!⤹*\n*❄️┇بانتظار لاعب للانضمام (أرسل ".او")⤹*${footer}`);
    }},
    'او': { category: 'الفعاليات', desc: 'الانضمام للعبة XO', handler: async (sock, m, args, sender) => {
        let games = getDB(GAMES_DB);
        const jid = m.key.remoteJid;
        if (!games[jid] || games[jid].type !== 'xo') return m.reply('❌ لا توجد لعبة XO بانتظار لاعبين.');
        if (games[jid].p1 === sender) return m.reply('❌ لا يمكنك اللعب مع نفسك!');
        if (games[jid].status !== 'waiting') return m.reply('❌ اللعبة بدأت بالفعل.');
        games[jid].p2 = sender; games[jid].status = 'playing'; saveDB(GAMES_DB, games);
        const board = games[jid].board;
        const msg = `*┇⦏بداية اللعبة⦐┇*\n\n${renderBoard(board)}\n\n*❄️┇الدور الآن لـ: @${games[jid].turn.split('@')[0]}⤹*\n*❄️┇أرسل رقم المربع (1-9) للعب⤹*${footer}`;
        m.reply(msg, { mentions: [games[jid].turn] });
    }}
};

function updateScratchCodes(settings) {
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-US', {timeZone: 'Asia/Riyadh'});
    if (settings.lastCodeUpdateDate !== todayStr) {
        settings.scratchCodes = [];
        for (let i = 0; i < 10; i++) {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            const amount = Math.floor(Math.random() * 3000000) + 1;
            settings.scratchCodes.push({ code, amount, used: false });
        }
        settings.lastCodeUpdateDate = todayStr;
        saveDB(SETTINGS_DB, settings);
    }
}

async function startActivity(sock, m, title, answer, displayFn, isFakik = false, isEmoji = false) {
    let games = getDB(GAMES_DB);
    const jid = m.key.remoteJid;
    if (games[jid]) return m.reply('⚠️ هناك لعبة جارية بالفعل! اكتب .تخطي');
    
    let msg;
    if (isEmoji) {
        msg = `*┇⦏فعـ🃏ـالية الايموجي⦐┇*\n\n*❄️┇الجائزة 💵┇50$⤹*\n*❄️┇الايموجي┇${displayFn()}⤹*\n*❄️┇المقدم ┇هانكوك ⤹*${footer}`;
    } else {
        const display = displayFn(answer);
        msg = `*┇⦏فعـ🃏ـالية ${title}⦐┇*\n\n*❄️┇الجائزة 💵┇50$⤹*\n*❄️┇السؤال┇${display}⤹*\n*❄️┇المقدم ┇هانكوك ⤹*${footer}`;
    }
    
    games[jid] = { type: 'لعبة', answer: answer, startTime: Date.now(), isFakik: isFakik };
    saveDB(GAMES_DB, games);
    m.reply(msg);
    setTimeout(async () => {
        let currentGames = getDB(GAMES_DB);
        if (currentGames[jid] && currentGames[jid].answer === answer) {
            delete currentGames[jid]; saveDB(GAMES_DB, currentGames);
            await sock.sendMessage(jid, { text: `⏳ انتهى الوقت! لم يقم أحد بالإجابة.\n✅ الإجابة الصحيحة هي: *${answer}*` });
        }
    }, 60000);
}

function renderBoard(b) {
    const map = { '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣', 'X': '❌', 'O': '⭕' };
    return `${map[b[0]]}${map[b[1]]}${map[b[2]]}\n${map[b[3]]}${map[b[4]]}${map[b[5]]}\n${map[b[6]]}${map[b[7]]}${map[b[8]]}`;
}

function checkWinner(b) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let w of wins) if (b[w[0]] === b[w[1]] && b[w[1]] === b[w[2]]) return b[w[0]];
    return b.every(s => s === 'X' || s === 'O') ? 'tie' : null;
}

function cleanText(t) {
    return t.trim().toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[ى]/g, 'ي');
}

export async function sendAutoZikr(sock) {
    const settings = getDB(SETTINGS_DB);
    if (!settings.zikrActive) return;

    const zikr = azkar[Math.floor(Math.random() * azkar.length)];
    const stats = getDB(STATS_DB);
    const groups = Object.keys(stats.users).filter(jid => jid.endsWith('@g.us'));
    
    for (const jid of groups) {
        try {
            await sock.sendMessage(jid, { text: `*🕋 ذكر الله طمأنينة 🕋*\n\n${zikr}${footer}` });
        } catch (e) {}
    }
}

export async function handleMessage(sock, m, ownerNum, ownerPhone) {
    const prefix = '.';
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const jid = m.key.remoteJid;
    const sender = m.key.fromMe ? (ownerPhone + '@s.whatsapp.net') : (isGroup ? m.key.participant : m.key.remoteJid);
    const body = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    if (!body) return;

    const safeSend = async (jid, content, options = {}) => {
        await sock.readMessages([m.key]);
        await sock.sendPresenceUpdate('composing', jid);
        const delay = Math.min(Math.max(body.length * 50, 1500), 4000);
        await new Promise(r => setTimeout(r, delay));
        return sock.sendMessage(jid, content, { quoted: m, ...options });
    };
    m.reply = (text, options = {}) => safeSend(m.key.remoteJid, { text, ...options });

    let stats = getDB(STATS_DB);
    const today = new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Riyadh'});
    
    if (stats.date !== today) {
        let settings = getDB(SETTINGS_DB);
        if (settings.rewardGroups && settings.rewardGroups.length > 0) {
            for (const groupJid of settings.rewardGroups) {
                const groupStats = stats.users[groupJid] || {};
                const sorted = Object.entries(groupStats).sort((a, b) => b[1] - a[1]).slice(0, 3);
                if (sorted.length > 0) {
                    let users = getDB(USERS_DB);
                    let rewardMsg = `🎊 *جوائز التفاعل اليومية (${stats.date})* 🎊\n\n`;
                    const rewards = [10000, 7000, 5000];
                    sorted.forEach((u, i) => {
                        const reward = rewards[i];
                        if (!users[u[0]]) users[u[0]] = { wallet: 0, balance: 0, items: [] };
                        users[u[0]].balance += reward;
                        rewardMsg += `${i+1}. @${u[0].split('@')[0]} فاز بـ ${reward}$\n`;
                    });
                    saveDB(USERS_DB, users);
                    await sock.sendMessage(groupJid, { text: rewardMsg + footer, mentions: sorted.map(u => u[0]) });
                }
            }
        }
        stats = { date: today, users: {} };
    }
    
    if (!stats.users[jid]) stats.users[jid] = {};
    stats.users[jid][sender] = (stats.users[jid][sender] || 0) + 1;
    saveDB(STATS_DB, stats);

    const settings = getDB(SETTINGS_DB);
    const owners = ['967781818508'];
    const senderNumber = sender.split('@')[0].replace(/[^0-9]/g, '');
    const isOwner = owners.some(o => senderNumber === o.replace(/[^0-9]/g, ''));
    
    let users = getDB(USERS_DB);
    let auth = getDB(AUTH_DB);

    if (users[sender]) {
        const totalWealth = (users[sender].balance || 0) + (users[sender].wallet || 0);
        if (totalWealth >= 70000 && !auth.includes(sender)) {
            auth.push(sender); saveDB(AUTH_DB, auth);
            m.reply(`🎊 تهانينا @${sender.split('@')[0]}! لقد وصلت ثروتك إلى 70,000$ وتم منحك رتبة "النخبة" تلقائياً!`, { mentions: [sender] });
        }
    }

    const games = getDB(GAMES_DB);
    const active = games[jid];

    if (active && active.type === 'لعبة') {
        let isCorrect = false;
        if (active.isFakik) {
            const spacedAnswer = active.answer.split('').join(' ');
            if (body.trim() === spacedAnswer) isCorrect = true;
        } else {
            if (cleanText(body) === cleanText(active.answer)) isCorrect = true;
        }

        if (isCorrect) {
            const time = ((Date.now() - active.startTime) / 1000).toFixed(2);
            delete games[jid]; saveDB(GAMES_DB, games);
            if (!users[sender]) users[sender] = { wallet: 0, balance: 0, items: [] };
            users[sender].wallet += 50; saveDB(USERS_DB, users);
            m.reply(`🎉 مبروك! إجابة صحيحة.\nالفائز: @${sender.split('@')[0]}\nالوقت: ${time} ثانية\nالجائزة: 50$`, { mentions: [sender] });
            return;
        }
    }

    if (active && active.type === 'xo' && active.status === 'playing') {
        if (sender !== active.turn) return;
        const move = parseInt(body.trim());
        if (isNaN(move) || move < 1 || move > 9 || active.board[move-1] === 'X' || active.board[move-1] === 'O') return;
        const mark = sender === active.p1 ? 'X' : 'O';
        active.board[move-1] = mark;
        const winner = checkWinner(active.board);
        if (winner) {
            const boardMsg = renderBoard(active.board);
            if (winner === 'tie') { m.reply(`🤝 تعادل!\n\n${boardMsg}${footer}`); } 
            else {
                const winPlayer = winner === 'X' ? active.p1 : active.p2;
                if (!users[winPlayer]) users[winPlayer] = { wallet: 0, balance: 0, items: [] };
                users[winPlayer].wallet += 200; saveDB(USERS_DB, users);
                m.reply(`🎉 مبروك الفوز @${winPlayer.split('@')[0]}!\nلقد حصلت على جائزة 200$\n\n${boardMsg}${footer}`, { mentions: [winPlayer] });
            }
            delete games[jid];
        } else {
            active.turn = sender === active.p1 ? active.p2 : active.p1;
            const boardMsg = renderBoard(active.board);
            m.reply(`${boardMsg}\n\n*❄️┇الدور الآن لـ: @${active.turn.split('@')[0]}⤹*`, { mentions: [active.turn] });
        }
        saveDB(GAMES_DB, games);
        return;
    }

    if (!isOwner && !auth.includes(sender)) return;
    if (m.key.fromMe && !isOwner) return;
    if (!settings.active && !isOwner) return;

    if (!body.startsWith(prefix)) return;
    const [command, ...args] = body.slice(prefix.length).trim().split(/\s+/);
    const cmd = command.toLowerCase();

    if (commands[cmd]) {
        const category = commands[cmd].category;
        if (category === 'المالك' && !isOwner) return;
        try { await commands[cmd].handler(sock, m, args, sender, ownerPhone); } catch (e) { console.error(e); }
    }
}

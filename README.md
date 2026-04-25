'use strict';

const MBTI_TYPES = [
  'INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'
];

const IDENTITY_OPTIONS = [
  { value: 'unknown', label: '不知道 / 不填' },
  { value: 'A', label: 'A｜更稳定、抗压、少内耗' },
  { value: 'T', label: 'T｜更敏感、进取、容易自我怀疑' }
];

const SBTI_TYPES = [
  { code: '', label: '不填写 SBTI' },
  { code: 'CTRL', label: 'CTRL｜拿捏者' },
  { code: 'LOVE-R', label: 'LOVE-R｜恋爱脑诗人' },
  { code: 'MONK', label: 'MONK｜清修型独立人' },
  { code: 'SOLO', label: 'SOLO｜独行玩家' },
  { code: 'HHHH', label: 'HHHH｜快乐发电机' },
  { code: 'DEAD', label: 'DEAD｜情绪省电模式' },
  { code: 'ZZZZ', label: 'ZZZZ｜装睡型高手' },
  { code: 'OJBK', label: 'OJBK｜随缘通过型' },
  { code: 'IMSB', label: 'IMSB｜敏感脑补机' },
  { code: 'ATM-ER', label: 'ATM-er｜付出型老好人' },
  { code: 'SHIT', label: '冷眼吐槽家' },
  { code: 'FIRE', label: 'FIRE｜高燃行动派' },
  { code: 'ICE', label: 'ICE｜冷静观察者' },
  { code: 'MOON', label: 'MOON｜夜间情绪家' },
  { code: 'SUN', label: 'SUN｜太阳能社交人' },
  { code: 'CUBE', label: 'CUBE｜秩序方块' },
  { code: 'FLOW', label: 'FLOW｜顺流随性派' },
  { code: 'CAT', label: 'CAT｜边界感猫猫' },
  { code: 'DOG', label: 'DOG｜热情陪伴型' },
  { code: 'NPC', label: 'NPC｜低调配合型' },
  { code: 'BOSS', label: 'BOSS｜掌控推进型' },
  { code: 'CLOWN', label: 'CLOWN｜气氛喜剧人' },
  { code: 'DIVA', label: 'DIVA｜戏剧高光型' },
  { code: 'TANK', label: 'TANK｜抗压坦克' },
  { code: 'BUBBLE', label: 'BUBBLE｜泡泡幻想家' },
  { code: 'STONE', label: 'STONE｜沉默稳定石' },
  { code: 'WAVE', label: 'WAVE｜情绪浪潮型' }
];

const CONTEXTS = [
  {
    id: 'close',
    title: '友谊 / 情侣',
    desc: '把朋友、暧昧、情侣放进同一情感关系组，报告里再拆成朋友版和情侣版。'
  },
  {
    id: 'collab',
    title: '搭子 / 学习 / 项目',
    desc: '适合室友、旅行搭子、学习搭子和项目搭档，重点看边界、分工和推进节奏。'
  }
];

const TONES = [
  { id: 'warm_roast', title: '温情吐槽', desc: '保留温柔，但会说几句像朋友一样的真话。' },
  { id: 'reality', title: '现实建议', desc: '更像关系说明书，直接告诉你们怎么减少内耗。' }
];

function normalizeContext(id) {
  if (['romantic', 'friendship'].includes(id)) return 'close';
  if (['roommate', 'teamwork'].includes(id)) return 'collab';
  return id || 'close';
}

function normalizeTone(id) {
  if (['warm', 'roast', 'meme'].includes(id)) return 'warm_roast';
  if (['realistic', 'reality'].includes(id)) return 'reality';
  return id || 'warm_roast';
}

const TRAIT_META = {
  extraversion: { label: '社交能量', low: '内收慢热', high: '外放主动' },
  openness: { label: '想象 / 开放', low: '现实稳妥', high: '抽象新鲜' },
  agreeableness: { label: '共情合作', low: '理性锋利', high: '温和共情' },
  conscientiousness: { label: '责任计划', low: '随性灵活', high: '计划明确' },
  neuroticism: { label: '压力敏感', low: '情绪稳定', high: '细腻敏感' },
  logicEmotion: { label: '理性 - 感性', low: '理性解决', high: '情绪感受' },
  emotionalExpression: { label: '情绪表达', low: '先收起来', high: '直接写脸上' },
  planningNeed: { label: '计划需求', low: '看情况再说', high: '提前安排' },
  noveltyNeed: { label: '新鲜感需求', low: '稳定重复', high: '探索变化' },
  intimacyNeed: { label: '亲密需求', low: '需要空间', high: '需要高频连接' },
  independenceNeed: { label: '独立需求', low: '愿意依赖', high: '强边界感' },
  conflictDirectness: { label: '冲突直接度', low: '先消化', high: '马上说清' },
  decisionSpeed: { label: '决策速度', low: '谨慎观察', high: '快速推进' },
  securityNeed: { label: '安全感需求', low: '不太焦虑', high: '需要确认' },
  controlNeed: { label: '掌控需求', low: '开放协商', high: '想掌控节奏' },
  authenticityNeed: { label: '真实表达', low: '场面优先', high: '真诚优先' },
  selfStability: { label: '自我稳定度', low: '易波动', high: '自我稳定' }
};


const TRAIT_COPY = {
  extraversion: {
    micro: '你们的社交电量差得不大，只是一个更容易先开口，另一个更习惯看准气氛再加入。这个差距不吵人，但会决定谁先破冰。',
    visible: '一个更靠交流回血，一个更靠安静回血。最容易误会的时刻，是外放的一方以为沉默等于冷淡，安静的一方以为热闹等于压力。',
    strong: '你们在社交能量上几乎像白天和夜晚：一个想继续聊，一个需要退回自己的小房间。吸引很明显，消耗也很容易。',
    bridge: '提前说清“我不是不想理你，只是在充电”，比事后解释一百句更有效。'
  },
  openness: {
    micro: '你们对新鲜感的需求只是轻微错位，一个更爱想象，一个更看现实可行性。这个差异像滤镜不同，不一定是方向不同。',
    visible: '一个更容易被可能性点燃，另一个更想先确认能不能落地。吸引点在这里，争论点也在这里。',
    strong: '一个在脑内开宇宙分店，一个在现实里检查地基稳不稳。别急着否定对方，那可能正是你们互补的入口。',
    bridge: '先让灵感被听见，再让现实来筛选，顺序反了就容易变成泼冷水。'
  },
  agreeableness: {
    micro: '你们的温和程度接近，但表达礼貌的方式不完全一样。一个更顾及感受，另一个更看重把事情说清。',
    visible: '一个更会先照顾气氛，另一个更容易直接指出问题。冲突不一定来自恶意，而是“在乎关系”和“在乎事实”的排序不同。',
    strong: '一个怕话说重了伤人，一个怕话说轻了没用。你们如果不翻译彼此，很容易一个觉得被刺，一个觉得对方绕。',
    bridge: '先讲立场，再讲感受；先说“我不是攻击你”，再说“这个点我确实在意”。'
  },
  conscientiousness: {
    micro: '你们的责任感差距不大，只是一个更愿意提前排队，一个更能现场调整。小差异会体现在出门、ddl 和临时变化上。',
    visible: '一个想把事情提前固定，另一个更相信到时候能处理。合作时容易一个嫌对方散，一个嫌对方紧。',
    strong: '一个脑子里有甘特图，一个活在“到时候再说”的宇宙。好处是一个能兜底，一个能救场；坏处是容易互相看不顺眼。',
    bridge: '把不可变的 deadline 写死，把可变的过程留一点弹性。'
  },
  neuroticism: {
    micro: '你们的敏感度差距轻微，更多是触发点不同。一个可能对语气敏感，另一个可能对不确定敏感。',
    visible: '一个更容易捕捉细节情绪，另一个更能把事情放过去。前者不是作，后者也不是冷，只是警报系统灵敏度不同。',
    strong: '一个心里会自动放大信号，另一个觉得没发生什么。这里最容易出现“你怎么这么敏感”和“你怎么这么不在乎”。',
    bridge: '不要争论“该不该难过”，先确认“你确实被触发了”。'
  },
  logicEmotion: {
    micro: '你们处理问题时一个稍偏感受，一个稍偏逻辑，但差距不算大。关键是别在对方需要安慰时提前开方案。',
    visible: '一个想先被理解，一个想先把问题解决。看似都在帮忙，其实接收方式完全不同。',
    strong: '你们像一个开情绪频道，一个开解决方案频道。频道不切换，再真诚也会听成“不懂我”。',
    bridge: '先问一句：你现在想要我安慰你，还是一起分析？'
  },
  emotionalExpression: {
    micro: '你们表达情绪的差距不大，只是一个更明显，一个更克制。小心不要把克制误读成没感觉。',
    visible: '一个情绪会写在脸上，一个会先放进心里处理。前者需要回应，后者需要空间。',
    strong: '一个像弹幕实时滚动，一个像后台静默运行。不是谁更真诚，而是表达接口完全不同。',
    bridge: '给情绪外放的人一个回应，给情绪内收的人一个缓冲时间。'
  },
  planningNeed: {
    micro: '你们对计划的需求只是轻微不同，一个更喜欢有大方向，另一个更能临场变通。',
    visible: '一个提前安排才安心，另一个看情况才舒服。旅行、约会、项目推进都容易在这里卡一下。',
    strong: '一个需要日程表，一个需要呼吸感。计划太满会窒息，完全不计划又会焦虑。',
    bridge: '只固定关键节点，不规定每一分钟怎么过。'
  },
  noveltyNeed: {
    micro: '你们对新鲜感的需求轻微错位，一个更爱换口味，另一个更珍惜稳定感。',
    visible: '一个想试试新的，另一个想待在熟悉的舒适区。这个差异处理好是带彼此看新世界，处理不好就是互相嫌弃。',
    strong: '一个关系里需要火花，一个关系里需要可预期。长期相处最怕一个觉得无聊，一个觉得被打扰。',
    bridge: '约定“固定安全区 + 定期新鲜感”，别让稳定和刺激互相打架。'
  },
  intimacyNeed: {
    micro: '你们对陪伴的需求接近，只是一个更喜欢主动确认，另一个更自然地相信关系在。',
    visible: '一个需要高频连接，一个需要保留私人空间。亲密需求差异不是爱不爱，而是电量管理方式不同。',
    strong: '一个越喜欢越想靠近，一个越在乎越需要空间保持自己。这里非常容易互相误伤。',
    bridge: '把“需要陪伴”和“需要独处”都说成需求，不要说成指责。'
  },
  independenceNeed: {
    micro: '你们边界感都不弱，只是独立的表达程度不同。一个更愿意一起商量，另一个更想自己先想清楚。',
    visible: '一个更想保持自己的节奏，另一个更希望被纳入对方生活。最容易卡在“你为什么不告诉我”。',
    strong: '一个关系里需要共同感，一个关系里需要个人领地。太靠近会压迫，太远又会不安。',
    bridge: '提前区分“我需要空间”和“我在疏远你”，这两个不是一回事。'
  },
  conflictDirectness: {
    micro: '你们处理不满的方式轻微不同，一个更快说出口，一个更会先观察。小心别把慢半拍当成逃避。',
    visible: '一个有矛盾想马上说清，一个需要先冷静消化。你们吵架的时间差，比吵架内容本身更容易伤人。',
    strong: '一个冲突来了要当场开会，一个冲突来了先进入飞行模式。没有规则的话，很容易变成追和躲。',
    bridge: '设置冷静时限：可以先停，但要约定什么时候回来继续说。'
  },
  decisionSpeed: {
    micro: '你们决策速度差距不大，只是一个更快拍板，一个更想再确认。',
    visible: '一个推进很快，一个需要更多信息。快的人容易嫌慢，慢的人容易觉得被催。',
    strong: '一个像按下启动键，一个像还在读说明书。合作时最怕没有分层：小事拖，大事冲。',
    bridge: '小事授权快速决定，大事留出确认窗口。'
  },
  securityNeed: {
    micro: '你们安全感需求都存在，只是触发方式不一样。一个需要回应，一个需要确定规则。',
    visible: '一个需要更多确认，另一个可能默认“没说就是没事”。这里很容易出现低成本误会。',
    strong: '一个关系里需要反复确认，一个觉得确认太多会被束缚。不是谁麻烦，是安全感开关不同。',
    bridge: '把确认变成固定小动作，而不是每次情绪爆发后的补救。'
  },
  controlNeed: {
    micro: '你们对掌控感的需求只是轻微不同，一个更想定规则，另一个更愿意灵活协商。',
    visible: '一个更想把节奏握在手里，另一个更讨厌被安排。冲突常常不是事情本身，而是谁说了算。',
    strong: '一个需要掌控来安心，一个需要自由来呼吸。权力感不处理好，关系会从合作变成拉扯。',
    bridge: '把“谁决定”拆成不同领域，不要所有事情都争主控权。'
  },
  authenticityNeed: {
    micro: '你们都重视真实，只是一个更愿意直接袒露，另一个更会看场合。',
    visible: '一个讨厌关系里的表演感，另一个可能更习惯先照顾场面。最容易误会成“你不够真”或“你太冲”。',
    strong: '一个宁愿难听也要真，一个宁愿缓一点也要体面。真诚和分寸如果不互相理解，会互相刺伤。',
    bridge: '用真话，但给真话包一层不伤人的外壳。'
  },
  selfStability: {
    micro: '你们自我稳定度差距轻微，一个更容易被当下情绪影响，另一个更能保持主轴。',
    visible: '一个比较容易跟着关系气氛波动，另一个更像有自己的内部锚点。吸引点是稳定感，摩擦点是理解速度。',
    strong: '一个需要对方帮自己稳住，一个很怕被卷进情绪风暴。这里处理不好，会一个觉得孤单，一个觉得累。',
    bridge: '稳定的一方不要只讲道理，波动的一方也尽量说清“我需要什么”。'
  }
};

const BAND_LABELS = {
  micro: '轻微差异',
  visible: '明显差异',
  strong: '强差异'
};

function gapBand(value) {
  if (value < 18) return 'micro';
  if (value < 38) return 'visible';
  return 'strong';
}

function traitCopy(key, band) {
  const fallback = {
    micro: '你们在这个维度上只是轻微不同，更像习惯差异，不必上升成性格不合。',
    visible: '这个差异已经会影响你们的日常互动，越早说清规则，越不容易误会。',
    strong: '这个差异是关系里很明显的触发点，需要用规则和翻译来保护彼此。',
    bridge: '先把差异说成需求，再一起讨论怎么配合。'
  };
  return TRAIT_COPY[key] || fallback;
}

const WEIGHTS_BY_CONTEXT = {
  close: {
    emotionalSync: 0.24,
    communicationFit: 0.20,
    lifestyleFit: 0.12,
    goalFit: 0.08,
    conflictRepair: 0.22,
    growthComplementarity: 0.14
  },
  collab: {
    emotionalSync: 0.10,
    communicationFit: 0.22,
    lifestyleFit: 0.15,
    goalFit: 0.23,
    conflictRepair: 0.16,
    growthComplementarity: 0.14
  }
};

let state = {
  context: 'close',
  tone: 'warm_roast',
  lastReport: null
};

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const round = (n) => Math.round(clamp(n));
const avg = (arr) => arr.reduce((sum, x) => sum + x, 0) / Math.max(arr.length, 1);
const gap = (a, b, key) => Math.abs((a[key] ?? 50) - (b[key] ?? 50));
const scoreFromGap = (g, scale = 1.18) => clamp(100 - g * scale);
const idealGapScore = (g, ideal, scale = 1.65) => clamp(100 - Math.abs(g - ideal) * scale);
const signedLabel = (v, key) => v >= 50 ? TRAIT_META[key].high : TRAIT_META[key].low;

function getBaseVector() {
  return {
    extraversion: 50,
    openness: 50,
    agreeableness: 50,
    conscientiousness: 50,
    neuroticism: 50,
    logicEmotion: 50,
    emotionalExpression: 50,
    planningNeed: 50,
    noveltyNeed: 50,
    intimacyNeed: 50,
    independenceNeed: 50,
    conflictDirectness: 50,
    decisionSpeed: 50,
    securityNeed: 50,
    controlNeed: 50,
    authenticityNeed: 50,
    selfStability: 50
  };
}

function addToVector(vector, patch) {
  Object.entries(patch).forEach(([key, value]) => {
    vector[key] = clamp((vector[key] ?? 50) + value);
  });
  return vector;
}

function buildMbtiVector(type, identity = 'unknown') {
  const v = getBaseVector();
  const letters = String(type || '').toUpperCase().split('');
  const [ei, sn, tf, jp] = letters;

  if (ei === 'E') addToVector(v, { extraversion: 30, conflictDirectness: 7, intimacyNeed: 8, independenceNeed: -8 });
  if (ei === 'I') addToVector(v, { extraversion: -28, conflictDirectness: -4, intimacyNeed: -6, independenceNeed: 12 });

  if (sn === 'N') addToVector(v, { openness: 30, noveltyNeed: 24, conscientiousness: -4, authenticityNeed: 7 });
  if (sn === 'S') addToVector(v, { openness: -22, noveltyNeed: -16, conscientiousness: 8, securityNeed: 6 });

  if (tf === 'F') addToVector(v, { agreeableness: 24, logicEmotion: 25, emotionalExpression: 18, neuroticism: 8, securityNeed: 6, authenticityNeed: 8 });
  if (tf === 'T') addToVector(v, { agreeableness: -14, logicEmotion: -24, conflictDirectness: 8, decisionSpeed: 8, emotionalExpression: -10 });

  if (jp === 'J') addToVector(v, { conscientiousness: 26, planningNeed: 28, decisionSpeed: 12, controlNeed: 12, noveltyNeed: -8 });
  if (jp === 'P') addToVector(v, { conscientiousness: -20, planningNeed: -24, decisionSpeed: -5, controlNeed: -8, noveltyNeed: 12 });

  const role = type.slice(1, 3);
  if (role === 'NT') addToVector(v, { controlNeed: 6, independenceNeed: 8, intimacyNeed: -4 });
  if (role === 'NF') addToVector(v, { authenticityNeed: 10, emotionalExpression: 8, intimacyNeed: 8 });
  if (role === 'SJ') addToVector(v, { securityNeed: 10, selfStability: 8, noveltyNeed: -6 });
  if (role === 'SP') addToVector(v, { noveltyNeed: 10, decisionSpeed: 6, planningNeed: -5 });

  if (identity === 'A') addToVector(v, { neuroticism: -18, selfStability: 20, securityNeed: -10, conflictDirectness: 4 });
  if (identity === 'T') addToVector(v, { neuroticism: 18, selfStability: -16, securityNeed: 12, authenticityNeed: 4 });

  return v;
}

const SBTI_VECTOR_PATCHES = {
  'CTRL': { controlNeed: 24, planningNeed: 18, decisionSpeed: 12, conflictDirectness: 18, agreeableness: -8, securityNeed: 10 },
  'LOVE-R': { intimacyNeed: 32, emotionalExpression: 24, neuroticism: 18, logicEmotion: 22, securityNeed: 20, independenceNeed: -16 },
  'MONK': { independenceNeed: 30, intimacyNeed: -16, emotionalExpression: -18, selfStability: 16, extraversion: -18, conflictDirectness: -10 },
  'SOLO': { independenceNeed: 28, extraversion: -14, intimacyNeed: -12, noveltyNeed: 8, selfStability: 6 },
  'HHHH': { extraversion: 28, noveltyNeed: 18, emotionalExpression: 18, decisionSpeed: 12, conscientiousness: -8 },
  'DEAD': { emotionalExpression: -22, neuroticism: 8, decisionSpeed: -18, extraversion: -18, selfStability: -6 },
  'ZZZZ': { decisionSpeed: -22, planningNeed: -12, conflictDirectness: -16, independenceNeed: 10, emotionalExpression: -12 },
  'OJBK': { planningNeed: -18, controlNeed: -16, agreeableness: 10, selfStability: 12, noveltyNeed: 10 },
  'IMSB': { neuroticism: 26, securityNeed: 22, authenticityNeed: 14, emotionalExpression: 12, conflictDirectness: -8 },
  'ATM-ER': { agreeableness: 26, intimacyNeed: 18, securityNeed: 8, independenceNeed: -18, selfStability: -8 },
  'SHIT': { agreeableness: -22, conflictDirectness: 22, authenticityNeed: 18, controlNeed: 10, emotionalExpression: 6 },
  'FIRE': { extraversion: 18, decisionSpeed: 24, conflictDirectness: 18, noveltyNeed: 14, neuroticism: 6 },
  'ICE': { emotionalExpression: -24, logicEmotion: -18, selfStability: 22, conflictDirectness: -6, agreeableness: -6 },
  'MOON': { neuroticism: 22, emotionalExpression: 20, openness: 18, intimacyNeed: 18, decisionSpeed: -8 },
  'SUN': { extraversion: 30, agreeableness: 14, emotionalExpression: 20, selfStability: 10, intimacyNeed: 8 },
  'CUBE': { planningNeed: 26, conscientiousness: 24, controlNeed: 14, noveltyNeed: -18, selfStability: 12 },
  'FLOW': { planningNeed: -24, noveltyNeed: 20, controlNeed: -20, decisionSpeed: -4, openness: 14 },
  'CAT': { independenceNeed: 28, intimacyNeed: -4, conflictDirectness: -8, authenticityNeed: 12, extraversion: -10 },
  'DOG': { intimacyNeed: 26, agreeableness: 22, extraversion: 12, securityNeed: 10, independenceNeed: -18 },
  'NPC': { agreeableness: 12, conflictDirectness: -16, extraversion: -10, selfStability: 8, controlNeed: -8 },
  'BOSS': { controlNeed: 26, decisionSpeed: 24, conflictDirectness: 20, conscientiousness: 14, agreeableness: -8 },
  'CLOWN': { extraversion: 24, emotionalExpression: 22, noveltyNeed: 18, neuroticism: -4, planningNeed: -12 },
  'DIVA': { emotionalExpression: 28, authenticityNeed: 22, intimacyNeed: 18, conflictDirectness: 12, neuroticism: 14 },
  'TANK': { selfStability: 24, conflictDirectness: 12, neuroticism: -16, planningNeed: 8, emotionalExpression: -6 },
  'BUBBLE': { openness: 24, noveltyNeed: 20, intimacyNeed: 14, planningNeed: -18, selfStability: -8 },
  'STONE': { selfStability: 26, emotionalExpression: -22, planningNeed: 10, extraversion: -12, conflictDirectness: -12 },
  'WAVE': { neuroticism: 26, emotionalExpression: 24, logicEmotion: 18, intimacyNeed: 16, selfStability: -12 }
};

function buildSbtiVector(code) {
  const v = getBaseVector();
  const patch = SBTI_VECTOR_PATCHES[code] || {};
  addToVector(v, patch);
  return v;
}

function blendVectors(primary, secondary, primaryWeight, secondaryWeight) {
  const out = getBaseVector();
  Object.keys(out).forEach(key => {
    out[key] = clamp((primary[key] ?? 50) * primaryWeight + (secondary[key] ?? 50) * secondaryWeight);
  });
  return out;
}

function buildPersona({ mbti, identity, sbti }) {
  const hasMbti = Boolean(mbti);
  const hasSbti = Boolean(sbti);
  if (hasMbti && hasSbti) {
    return {
      vector: blendVectors(buildMbtiVector(mbti, identity), buildSbtiVector(sbti), 0.68, 0.32),
      sourceCount: 2
    };
  }
  if (hasMbti) return { vector: buildMbtiVector(mbti, identity), sourceCount: 1 };
  if (hasSbti) return { vector: buildSbtiVector(sbti), sourceCount: 1 };
  return { vector: getBaseVector(), sourceCount: 0 };
}

function calculateMetrics(vecA, vecB, context) {
  const g = (key) => gap(vecA, vecB, key);
  const primaryGaps = [
    g('extraversion'), g('openness'), g('agreeableness'), g('conscientiousness'),
    g('neuroticism'), g('planningNeed'), g('intimacyNeed'), g('independenceNeed'),
    g('conflictDirectness'), g('decisionSpeed'), g('controlNeed'), g('selfStability')
  ];
  const averageGap = avg(primaryGaps);
  const largeGapPenalty = primaryGaps.filter(x => x > 45).length * 4.5;
  const similarity = clamp(100 - averageGap * 1.25 - largeGapPenalty);

  const complementTargets = normalizeContext(context) === 'collab'
    ? { extraversion: 22, logicEmotion: 28, planningNeed: 24, noveltyNeed: 24, decisionSpeed: 18, controlNeed: 18 }
    : { extraversion: 18, logicEmotion: 24, planningNeed: 18, noveltyNeed: 20, independenceNeed: 18, emotionalExpression: 16 };
  const compScores = Object.entries(complementTargets).map(([key, ideal]) => idealGapScore(g(key), ideal, 1.72));
  const complementarity = clamp(avg(compScores));

  const risk = clamp(
    g('neuroticism') * 0.18 +
    g('intimacyNeed') * 0.20 +
    g('independenceNeed') * 0.14 +
    g('planningNeed') * 0.16 +
    g('conflictDirectness') * 0.16 +
    g('logicEmotion') * 0.14 +
    g('controlNeed') * 0.12 +
    primaryGaps.filter(x => x > 52).length * 7
  );
  const conflictScore = clamp(100 - risk * 1.18);

  const dimensions = {
    emotionalSync: clamp(avg([
      scoreFromGap(g('neuroticism'), 1.35),
      scoreFromGap(g('intimacyNeed'), 1.25),
      scoreFromGap(g('logicEmotion'), 1.05),
      scoreFromGap(g('securityNeed'), 1.15)
    ])),
    communicationFit: clamp(avg([
      scoreFromGap(g('emotionalExpression'), 1.12),
      scoreFromGap(g('conflictDirectness'), 1.2),
      scoreFromGap(g('logicEmotion'), 1.02),
      scoreFromGap(g('agreeableness'), 0.95)
    ])),
    lifestyleFit: clamp(avg([
      scoreFromGap(g('planningNeed'), 1.28),
      scoreFromGap(g('noveltyNeed'), 1.08),
      scoreFromGap(g('extraversion'), 0.98),
      scoreFromGap(g('independenceNeed'), 1.1)
    ])),
    goalFit: clamp(avg([
      scoreFromGap(g('conscientiousness'), 1.12),
      scoreFromGap(g('decisionSpeed'), 1.05),
      scoreFromGap(g('controlNeed'), 0.98),
      scoreFromGap(g('authenticityNeed'), 0.8)
    ])),
    conflictRepair: conflictScore,
    growthComplementarity: complementarity
  };

  const weights = WEIGHTS_BY_CONTEXT[normalizeContext(context)] || WEIGHTS_BY_CONTEXT.close;
  const weightedTotal = Object.entries(weights).reduce((sum, [key, weight]) => sum + dimensions[key] * weight, 0);

  // Expanded score distribution: total reflects friction more strongly and no longer clusters near 100.
  const spreadAdjustment = (complementarity - 65) * 0.08 - Math.max(0, risk - 38) * 0.18 - Math.max(0, averageGap - 34) * 0.2;
  const total = clamp(weightedTotal + spreadAdjustment, 38, 96);

  return {
    total,
    similarity,
    complementarity,
    risk,
    conflictScore,
    dimensions,
    averageGap
  };
}

function classifyReport(metrics, context) {
  const { total, similarity, complementarity, risk } = metrics;
  if (normalizeContext(context) === 'collab' && metrics.dimensions.goalFit > 76 && metrics.dimensions.communicationFit > 70 && risk < 48) {
    return {
      title: '高效分工型',
      keywords: ['目标感', '分工清楚', '能出活'],
      summary: '你们比较适合一起完成具体任务：一个负责推进，一个负责补位。只要提前说清分工和截止时间，就不容易把合作变成互相猜。'
    };
  }
  if (complementarity > 74 && risk > 54) {
    return {
      title: '高吸引 × 高摩擦型',
      keywords: ['反差吸引', '容易上头', '需要翻译'],
      summary: '你们容易被对方身上自己缺少的部分吸引，但也容易在节奏、表达和安全感上互相触发。核心不是不合，而是需要学会翻译彼此。'
    };
  }
  if (similarity > 78 && risk < 34) {
    return {
      title: '稳定同频型',
      keywords: ['默契', '低消耗', '慢慢升温'],
      summary: '你们的相处方式比较接近，很多事情不用解释太多就能懂。优势是舒适稳定，提醒是别因为太像而少了新鲜表达。'
    };
  }
  if (complementarity > 72 && risk < 50) {
    return {
      title: '互补成长型',
      keywords: ['互补', '成长', '彼此补位'],
      summary: '你们不是完全相同，但差异大多落在可以互相补位的区间。一个提供方向，一个提供温度；一个负责打开局面，一个负责稳定节奏。'
    };
  }
  if (risk > 66 || total < 54) {
    return {
      title: '拉扯磨合型',
      keywords: ['节奏不同', '容易误会', '需要边界'],
      summary: '你们的差异不小，尤其要小心把对方的表达方式误读成态度问题。相处关键是提前约定沟通规则，不要靠猜。'
    };
  }
  if (similarity > 67 && complementarity < 58) {
    return {
      title: '舒适但易停滞型',
      keywords: ['舒服', '同类感', '需要新鲜'],
      summary: '你们相处起来不太费劲，但可能会因为太习惯彼此而减少主动表达。适当制造新鲜感，会让这段关系更有生命力。'
    };
  }
  return {
    title: '差异吸引型',
    keywords: ['有反差', '能互补', '要磨合'],
    summary: '你们不是一眼同频的组合，但也不是单纯冲突。真正的看点在于差异能不能被理解：理解了是互补，不理解就会变成内耗。'
  };
}

function getTopDifferences(vecA, vecB, nameA, nameB, tone = 'warm_roast') {
  const keys = [
    'extraversion','openness','agreeableness','conscientiousness','neuroticism','logicEmotion',
    'emotionalExpression','planningNeed','noveltyNeed','intimacyNeed','independenceNeed','conflictDirectness',
    'decisionSpeed','securityNeed','controlNeed','authenticityNeed','selfStability'
  ];
  return keys
    .map(key => {
      const value = Math.round(gap(vecA, vecB, key));
      const band = gapBand(value);
      const copy = traitCopy(key, band);
      const aSide = signedLabel(vecA[key], key);
      const bSide = signedLabel(vecB[key], key);
      const contrast = `${nameA}更接近“${aSide}”，${nameB}更接近“${bSide}”。`;
      const toneTail = normalizeTone(tone) === 'reality'
        ? copy.bridge
        : `${copy.bridge} 说人话就是：别急着证明谁正常，先确认你们的按钮确实不在同一个位置。`;
      return {
        key,
        label: TRAIT_META[key].label,
        gap: value,
        band,
        bandLabel: BAND_LABELS[band],
        aLabel: aSide,
        bLabel: bSide,
        aValue: Math.round(vecA[key] ?? 50),
        bValue: Math.round(vecB[key] ?? 50),
        text: `${contrast}${copy[band]}`,
        bridge: toneTail
      };
    })
    .sort((x, y) => y.gap - x.gap)
    .slice(0, 4);
}

function buildSceneCards(context, topDiff, tone) {
  const bridge = topDiff?.bridge || '先把差异说成需求，再一起讨论怎么配合。';
  if (normalizeContext(context) === 'collab') {
    return [
      {
        tag: '搭子版',
        title: '如果你们是搭子 / 室友 / 旅行伙伴',
        content: normalizeTone(tone) === 'reality'
          ? `最重要的是提前说清边界：时间、预算、安静需求、临时变化怎么处理。${bridge}`
          : `你们适合先把“谁负责什么”说清楚，不然很容易从快乐搭子变成互相吐槽的行走备忘录。${bridge}`
      },
      {
        tag: '项目版',
        title: '如果你们是学习 / 项目搭档',
        content: normalizeTone(tone) === 'reality'
          ? '把目标、截止时间、决策权写在前面。你们不是不能合作，而是不能靠默契硬扛所有流程。'
          : '你们真正需要的不是“都自觉一点”，而是一个清楚到不能装傻的分工表。模糊才是最大内耗。'
      }
    ];
  }
  return [
    {
      tag: '朋友版',
      title: '如果你们是朋友 / 闺蜜',
      content: normalizeTone(tone) === 'reality'
        ? `保留轻松感，不要把每次不同步都理解成关系变淡。${bridge}`
        : `你们最适合的朋友模式不是天天黏住，而是“我懂你的怪，你也别审判我的怪”。${bridge}`
    },
    {
      tag: '情侣版',
      title: '如果你们是情侣 / 暧昧对象',
      content: normalizeTone(tone) === 'reality'
        ? '先确认情绪，再讨论方案。亲密关系里，很多争执不是谁更有道理，而是谁先觉得自己没有被理解。'
        : '你们不是不合，是很容易把“我需要你”说成“你怎么又这样”。先接住情绪，很多问题会少炸一半。'
    }
  ];
}

function createStoryCards(report, inputs, differences) {
  const { metrics } = report;
  const nameA = inputs.nameA || 'A';
  const nameB = inputs.nameB || 'B';
  const mainDiff = differences[0];
  const secondDiff = differences[1];
  const tone = normalizeTone(inputs.tone);
  const context = normalizeContext(inputs.context);

  const attraction = metrics.complementarity > metrics.similarity
    ? `${nameA}和${nameB}的吸引点主要来自“反差”。你们不是复制粘贴型关系，而是一个人身上的亮点，刚好会照到另一个人平时不太擅长的地方。`
    : `${nameA}和${nameB}的吸引点主要来自“同类感”。你们在底层节奏上不算远，所以很多时刻不用解释太多，也能知道对方大概在想什么。`;

  const friction = mainDiff
    ? `最明显的卡点在「${mainDiff.label}」：${mainDiff.text}${mainDiff.bridge}`
    : '你们目前没有特别突出的单点差异，但仍然要避免用自己的表达方式默认对方也一样。';

  const softSpot = secondDiff
    ? `第二个值得注意的细节是「${secondDiff.label}」。${secondDiff.text}${secondDiff.bridge}`
    : '如果只看总分，你会错过很多细节；真正影响关系的，往往是那些“不严重但反复出现”的小错位。';

  const advice = context === 'collab'
    ? '现实建议：把边界、分工和反馈方式写清楚。你们可以有默契，但不要让所有事情都靠猜。'
    : '现实建议：把“我需要什么”说出来，而不是让对方从语气、表情和朋友圈更新里做阅读理解。';

  const cards = [
    { tag: '吸引点', title: '你们为什么会互相吸引？', content: attraction },
    { tag: mainDiff?.bandLabel || '差异点', title: '你们最容易卡在哪里？', content: friction },
    { tag: secondDiff?.bandLabel || '微差', title: '一个更细的隐藏差异', content: softSpot },
    ...buildSceneCards(context, mainDiff, tone),
    { tag: tone === 'reality' ? '落地建议' : '温情吐槽', title: '最适合的相处方式', content: tone === 'reality' ? advice : `${advice} 这不是鸡汤，这是降低互相内耗的操作手册。` }
  ];

  return cards;
}

function buildReport(inputs) {
  const personaA = buildPersona({ mbti: inputs.mbtiA, identity: inputs.identityA, sbti: inputs.sbtiA });
  const personaB = buildPersona({ mbti: inputs.mbtiB, identity: inputs.identityB, sbti: inputs.sbtiB });
  inputs.context = normalizeContext(inputs.context);
  inputs.tone = normalizeTone(inputs.tone);
  const metrics = calculateMetrics(personaA.vector, personaB.vector, inputs.context);

  // Confidence and input-depth corrections keep V8 honest and prevent shallow inputs from becoming 100%.
  const sourceCount = personaA.sourceCount + personaB.sourceCount;
  const depthCap = sourceCount >= 4 ? 96 : sourceCount >= 3 ? 93 : sourceCount >= 2 ? 90 : 84;
  metrics.total = Math.min(metrics.total, depthCap);

  const classification = classifyReport(metrics, inputs.context);
  const differences = getTopDifferences(personaA.vector, personaB.vector, inputs.nameA || 'A', inputs.nameB || 'B', inputs.tone);
  const storyCards = createStoryCards({ metrics, personaA, personaB }, inputs, differences);
  return { inputs, personaA, personaB, metrics, classification, differences, storyCards };
}

function initSelects() {
  const mbtiSelects = [document.getElementById('mbtiA'), document.getElementById('mbtiB')];
  mbtiSelects.forEach((select, idx) => {
    select.innerHTML = MBTI_TYPES.map(type => `<option value="${type}">${type}</option>`).join('');
    select.value = idx === 0 ? 'ENFP' : 'ISTJ';
  });

  [document.getElementById('identityA'), document.getElementById('identityB')].forEach(select => {
    select.innerHTML = IDENTITY_OPTIONS.map(item => `<option value="${item.value}">${item.label}</option>`).join('');
    select.value = 'unknown';
  });

  [document.getElementById('sbtiA'), document.getElementById('sbtiB')].forEach((select, idx) => {
    select.innerHTML = SBTI_TYPES.map(item => `<option value="${item.code}">${item.label}</option>`).join('');
    select.value = idx === 0 ? 'LOVE-R' : 'CTRL';
  });
}

function renderChips(containerId, items, activeId, onChange) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(item => `
    <button class="chip ${item.id === activeId ? 'active' : ''}" type="button" data-id="${item.id}">
      <strong>${item.title}</strong>
      <span>${item.desc}</span>
    </button>
  `).join('');
  container.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      onChange(btn.dataset.id);
      [...container.querySelectorAll('.chip')].forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function collectInputs() {
  return {
    nameA: document.getElementById('nameA').value.trim() || 'A',
    nameB: document.getElementById('nameB').value.trim() || 'B',
    mbtiA: document.getElementById('mbtiA').value,
    mbtiB: document.getElementById('mbtiB').value,
    identityA: document.getElementById('identityA').value,
    identityB: document.getElementById('identityB').value,
    sbtiA: document.getElementById('sbtiA').value,
    sbtiB: document.getElementById('sbtiB').value,
    context: normalizeContext(state.context),
    tone: normalizeTone(state.tone)
  };
}

function dimensionLabel(key) {
  return {
    emotionalSync: '情绪同步度',
    communicationFit: '沟通顺畅度',
    lifestyleFit: '生活节奏',
    goalFit: '目标/价值适配',
    conflictRepair: '冲突修复力',
    growthComplementarity: '互补成长性'
  }[key] || key;
}

function renderReport(report) {
  const { classification, metrics, differences, storyCards, inputs } = report;
  document.getElementById('resultContext').textContent = (CONTEXTS.find(x => x.id === normalizeContext(inputs.context)) || CONTEXTS[0]).title;
  document.getElementById('resultTitle').textContent = classification.title;
  document.getElementById('totalScore').textContent = `${round(metrics.total)}%`;
  document.getElementById('summaryText').textContent = classification.summary;
  document.getElementById('keywordList').innerHTML = classification.keywords.map(k => `<span>${k}</span>`).join('');

  document.getElementById('dimensionBars').innerHTML = Object.entries(metrics.dimensions).map(([key, value]) => `
    <div class="bar-row">
      <div class="bar-top"><span>${dimensionLabel(key)}</span><span>${round(value)}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${round(value)}%"></div></div>
    </div>
  `).join('');

  document.getElementById('differenceList').innerHTML = differences.slice(0, 3).map(item => `
    <div class="diff-item">
      <strong><span>${item.label}</span><span>${item.bandLabel} · 差距 ${item.gap}</span></strong>
      <p>${item.text}</p>
      <em>${item.bridge}</em>
    </div>
  `).join('');

  document.getElementById('reportCards').innerHTML = storyCards.map(card => `
    <article class="story-card">
      <span class="micro-tag">${card.tag || '关系细节'}</span>
      <h3>${card.title}</h3>
      <p>${card.content}</p>
    </article>
  `).join('');

  document.getElementById('resultSection').classList.remove('hidden');
  drawPoster(report);
  state.lastReport = report;
  updateUrl(report.inputs);
  document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateUrl(inputs) {
  const payload = btoa(unescape(encodeURIComponent(JSON.stringify(inputs))));
  const url = new URL(window.location.href);
  url.searchParams.set('r', payload);
  history.replaceState(null, '', url.toString());
}

function restoreFromUrl() {
  const url = new URL(window.location.href);
  const encoded = url.searchParams.get('r');
  if (!encoded) return;
  try {
    const inputs = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    document.getElementById('nameA').value = inputs.nameA || '';
    document.getElementById('nameB').value = inputs.nameB || '';
    document.getElementById('mbtiA').value = inputs.mbtiA || 'ENFP';
    document.getElementById('mbtiB').value = inputs.mbtiB || 'ISTJ';
    document.getElementById('identityA').value = inputs.identityA || 'unknown';
    document.getElementById('identityB').value = inputs.identityB || 'unknown';
    document.getElementById('sbtiA').value = inputs.sbtiA || '';
    document.getElementById('sbtiB').value = inputs.sbtiB || '';
    state.context = normalizeContext(inputs.context || 'close');
    state.tone = normalizeTone(inputs.tone || 'warm_roast');
    renderChips('contextChoices', CONTEXTS, state.context, id => state.context = id);
    renderChips('toneChoices', TONES, state.tone, id => state.tone = id);
    renderReport(buildReport(collectInputs()));
  } catch (err) {
    console.warn('无法解析报告链接', err);
  }
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 5) {
  const chars = String(text).split('');
  let line = '';
  let lines = 0;
  for (let i = 0; i < chars.length; i += 1) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = chars[i];
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else {
      line = testLine;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line, x, y);
  return y + lineHeight;
}

function drawPoster(report) {
  const canvas = document.getElementById('posterCanvas');
  const ctx = canvas.getContext('2d');
  const { classification, metrics, inputs } = report;
  const w = canvas.width;
  const h = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#120B2E');
  bg.addColorStop(0.48, '#201051');
  bg.addColorStop(1, '#07111F');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const drawGlow = (x, y, radius, color) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };
  drawGlow(140, 140, 320, 'rgba(255,92,168,0.55)');
  drawGlow(780, 230, 360, 'rgba(70,217,255,0.40)');
  drawGlow(530, 1120, 380, 'rgba(120,242,194,0.22)');

  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  roundedRect(ctx, 58, 68, 784, 1214, 42);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#78F2C2';
  ctx.font = '800 24px Arial';
  ctx.fillText('PAIR AURA V8', 96, 128);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 62px Arial, sans-serif';
  wrapText(ctx, `你们是：${classification.title}`, 96, 236, 708, 76, 2);

  ctx.font = '1000 150px Arial, sans-serif';
  const scoreGradient = ctx.createLinearGradient(96, 320, 480, 455);
  scoreGradient.addColorStop(0, '#FFE66D');
  scoreGradient.addColorStop(0.5, '#FF5CA8');
  scoreGradient.addColorStop(1, '#46D9FF');
  ctx.fillStyle = scoreGradient;
  ctx.fillText(`${round(metrics.total)}%`, 96, 438);
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '800 28px Arial';
  ctx.fillText('合拍指数', 96, 482);

  ctx.font = '800 27px Arial';
  let tagX = 96;
  const tagY = 542;
  classification.keywords.forEach(tag => {
    const tagW = ctx.measureText(tag).width + 42;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    roundedRect(ctx, tagX, tagY, tagW, 54, 27);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(tag, tagX + 21, tagY + 36);
    tagX += tagW + 14;
  });

  ctx.fillStyle = '#CFC7FF';
  ctx.font = '34px Arial, sans-serif';
  wrapText(ctx, classification.summary, 96, 680, 704, 54, 5);

  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  roundedRect(ctx, 96, 960, 708, 170, 32);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 30px Arial';
  ctx.fillText('测测你和 TA 的关系气场', 128, 1018);
  ctx.fillStyle = '#CFC7FF';
  ctx.font = '26px Arial';
  ctx.fillText('不是看你是谁，而是看你们在一起会发生什么。', 128, 1072);

  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  roundedRect(ctx, 626, 1156, 140, 140, 24);
  ctx.fill();
  ctx.fillStyle = '#120B2E';
  ctx.font = '900 30px Arial';
  ctx.fillText('PAIR', 657, 1220);
  ctx.fillText('AURA', 650, 1258);

  ctx.fillStyle = '#CFC7FF';
  ctx.font = '24px Arial';
  ctx.fillText('输入 MBTI / SBTI，生成可分享关系报告', 96, 1228);
}

function copyReportLink() {
  const link = window.location.href;
  navigator.clipboard?.writeText(link).then(() => {
    alert('报告链接已复制');
  }).catch(() => {
    prompt('复制这个链接', link);
  });
}

function downloadPoster() {
  if (!state.lastReport) return;
  const canvas = document.getElementById('posterCanvas');
  const link = document.createElement('a');
  link.download = 'pair-aura-v8-poster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function runQualitySelfCheck() {
  const checks = [];
  const pairs = [
    { a: 'ENFP', b: 'ISTJ', sA: 'LOVE-R', sB: 'CTRL', context: 'close' },
    { a: 'INTJ', b: 'ENFP', sA: 'MONK', sB: 'HHHH', context: 'close' },
    { a: 'ISFJ', b: 'ESTP', sA: 'STONE', sB: 'FIRE', context: 'collab' },
    { a: 'ENTJ', b: 'INFP', sA: 'BOSS', sB: 'MOON', context: 'collab' },
    { a: 'ENFP', b: 'ENFP', sA: 'LOVE-R', sB: 'LOVE-R', context: 'close' }
  ];
  pairs.forEach(pair => {
    const report = buildReport({
      nameA: 'A', nameB: 'B', mbtiA: pair.a, mbtiB: pair.b,
      identityA: 'unknown', identityB: 'unknown', sbtiA: pair.sA, sbtiB: pair.sB,
      context: pair.context, tone: 'warm_roast'
    });
    checks.push({ pair: `${pair.a}+${pair.sA} vs ${pair.b}+${pair.sB}`, score: round(report.metrics.total), title: report.classification.title });
  });
  console.table(checks);
  return checks;
}

function init() {
  initSelects();
  renderChips('contextChoices', CONTEXTS, state.context, id => state.context = id);
  renderChips('toneChoices', TONES, state.tone, id => state.tone = id);

  document.getElementById('matchForm').addEventListener('submit', event => {
    event.preventDefault();
    const inputs = collectInputs();
    const report = buildReport(inputs);
    renderReport(report);
  });
  document.getElementById('copyLinkBtn').addEventListener('click', copyReportLink);
  document.getElementById('downloadPosterBtn').addEventListener('click', downloadPoster);
  restoreFromUrl();
  window.PairAuraV8 = { buildReport, runQualitySelfCheck, buildMbtiVector, buildSbtiVector };
}

document.addEventListener('DOMContentLoaded', init);

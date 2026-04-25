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
  { id: 'romantic', title: '情侣 / 暧昧', desc: '更看重情绪回应、亲密需求和冲突修复' },
  { id: 'friendship', title: '朋友 / 闺蜜', desc: '更看重轻松感、表达方式和陪伴节奏' },
  { id: 'roommate', title: '室友 / 旅行搭子', desc: '更看重生活节奏、边界感和计划方式' },
  { id: 'teamwork', title: '学习 / 项目搭档', desc: '更看重执行节奏、目标一致和沟通效率' }
];

const TONES = [
  { id: 'warm', title: '温柔准到心里', desc: '更适合发给 TA 认真讨论' },
  { id: 'roast', title: '轻松吐槽版', desc: '更有梗，适合群聊分享' },
  { id: 'realistic', title: '现实建议版', desc: '更直接，强调怎么相处' }
];

const TRAIT_META = {
  extraversion: { label: '社交能量', low: '内收慢热', high: '外放主动' },
  openness: { label: '想象 / 开放', low: '现实稳妥', high: '抽象新鲜' },
  agreeableness: { label: '共情合作', low: '理性锋利', high: '温和共情' },
  conscientiousness: { label: '责任计划', low: '随性灵活', high: '计划明确' },
  neuroticism: { label: '压力敏感', low: '情绪稳定', high: '细腻敏感' },
  logicEmotion: { label: '理性 - 感性', low: '理性解决', high: '情绪感受' },
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

const WEIGHTS_BY_CONTEXT = {
  romantic: {
    emotionalSync: 0.24,
    communicationFit: 0.18,
    lifestyleFit: 0.12,
    goalFit: 0.09,
    conflictRepair: 0.23,
    growthComplementarity: 0.14
  },
  friendship: {
    emotionalSync: 0.18,
    communicationFit: 0.23,
    lifestyleFit: 0.12,
    goalFit: 0.07,
    conflictRepair: 0.18,
    growthComplementarity: 0.22
  },
  roommate: {
    emotionalSync: 0.13,
    communicationFit: 0.18,
    lifestyleFit: 0.27,
    goalFit: 0.10,
    conflictRepair: 0.22,
    growthComplementarity: 0.10
  },
  teamwork: {
    emotionalSync: 0.08,
    communicationFit: 0.22,
    lifestyleFit: 0.10,
    goalFit: 0.25,
    conflictRepair: 0.15,
    growthComplementarity: 0.20
  }
};

let state = {
  context: 'romantic',
  tone: 'warm',
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

  const complementTargets = context === 'teamwork'
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

  const weights = WEIGHTS_BY_CONTEXT[context] || WEIGHTS_BY_CONTEXT.romantic;
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
  if (context === 'teamwork' && metrics.dimensions.goalFit > 76 && metrics.dimensions.communicationFit > 70 && risk < 48) {
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

function getTopDifferences(vecA, vecB, nameA, nameB) {
  const keys = [
    'extraversion','openness','agreeableness','conscientiousness','neuroticism','logicEmotion',
    'planningNeed','noveltyNeed','intimacyNeed','independenceNeed','conflictDirectness',
    'decisionSpeed','securityNeed','controlNeed','authenticityNeed','selfStability'
  ];
  return keys
    .map(key => ({
      key,
      label: TRAIT_META[key].label,
      gap: Math.round(gap(vecA, vecB, key)),
      aLabel: signedLabel(vecA[key], key),
      bLabel: signedLabel(vecB[key], key),
      aValue: Math.round(vecA[key]),
      bValue: Math.round(vecB[key]),
      text: `${nameA}更接近“${signedLabel(vecA[key], key)}”，${nameB}更接近“${signedLabel(vecB[key], key)}”。这个差异会直接影响你们的${TRAIT_META[key].label}。`
    }))
    .sort((x, y) => y.gap - x.gap)
    .slice(0, 3);
}

function createStoryCards(report, inputs, differences) {
  const { metrics, personaA, personaB } = report;
  const nameA = inputs.nameA || 'A';
  const nameB = inputs.nameB || 'B';
  const mainDiff = differences[0];
  const tone = inputs.tone;
  const context = inputs.context;

  const attraction = metrics.complementarity > metrics.similarity
    ? `${nameA}和${nameB}的吸引点主要来自“差异”。一个人身上的强项，刚好可能是另一个人平时不太擅长或不常表达的部分。`
    : `${nameA}和${nameB}的吸引点主要来自“同类感”。你们不一定完全一样，但在基本节奏上比较容易互相理解。`;

  const friction = mainDiff
    ? `最明显的卡点在「${mainDiff.label}」。${mainDiff.text}差异本身不是问题，真正的问题是把差异理解成“不在乎”或“故意为难”。`
    : '你们目前没有特别突出的单点差异，但仍然要避免用自己的表达方式默认对方也一样。';

  const adviceByContext = {
    romantic: `先接住情绪，再讨论方案。亲密关系里，很多争执不是谁对谁错，而是谁先觉得自己没有被理解。`,
    friendship: `保留轻松感，不要把每次不同步都上升成关系变化。朋友之间最重要的是允许彼此有不同节奏。`,
    roommate: `把生活规则说在前面，不要等积怨出现再翻旧账。清洁、安静、作息和边界最好提前约定。`,
    teamwork: `把分工、时间点和决策权写清楚。合作关系里，模糊才是最大内耗来源。`
  };

  const toneEnding = {
    warm: '你们的差异可以被温柔地使用，不一定要被马上修正。',
    roast: '说白了，你们不是不合，是太容易把“我的习惯”当成“正确答案”。',
    realistic: '最有效的做法是减少猜测，增加规则，把情绪和任务分开处理。'
  }[tone];

  return [
    { title: '你们为什么会互相吸引？', content: attraction },
    { title: '你们最容易卡在哪里？', content: friction },
    { title: '最适合的相处方式', content: `${adviceByContext[context]}${toneEnding}` }
  ];
}

function buildReport(inputs) {
  const personaA = buildPersona({ mbti: inputs.mbtiA, identity: inputs.identityA, sbti: inputs.sbtiA });
  const personaB = buildPersona({ mbti: inputs.mbtiB, identity: inputs.identityB, sbti: inputs.sbtiB });
  const metrics = calculateMetrics(personaA.vector, personaB.vector, inputs.context);

  // Confidence and input-depth corrections keep V7 honest and prevent shallow inputs from becoming 100%.
  const sourceCount = personaA.sourceCount + personaB.sourceCount;
  const depthCap = sourceCount >= 4 ? 96 : sourceCount >= 3 ? 93 : sourceCount >= 2 ? 90 : 84;
  metrics.total = Math.min(metrics.total, depthCap);

  const classification = classifyReport(metrics, inputs.context);
  const differences = getTopDifferences(personaA.vector, personaB.vector, inputs.nameA || 'A', inputs.nameB || 'B');
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
    context: state.context,
    tone: state.tone
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
  document.getElementById('resultContext').textContent = (CONTEXTS.find(x => x.id === inputs.context) || CONTEXTS[0]).title;
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

  document.getElementById('differenceList').innerHTML = differences.map(item => `
    <div class="diff-item">
      <strong><span>${item.label}</span><span>差距 ${item.gap}</span></strong>
      <p>${item.text}</p>
    </div>
  `).join('');

  document.getElementById('reportCards').innerHTML = storyCards.map(card => `
    <article class="story-card">
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
    state.context = inputs.context || 'romantic';
    state.tone = inputs.tone || 'warm';
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
  ctx.fillText('PAIR AURA V7', 96, 128);

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
  link.download = 'pair-aura-v7-poster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function runQualitySelfCheck() {
  const checks = [];
  const pairs = [
    { a: 'ENFP', b: 'ISTJ', sA: 'LOVE-R', sB: 'CTRL', context: 'romantic' },
    { a: 'INTJ', b: 'ENFP', sA: 'MONK', sB: 'HHHH', context: 'friendship' },
    { a: 'ISFJ', b: 'ESTP', sA: 'STONE', sB: 'FIRE', context: 'roommate' },
    { a: 'ENTJ', b: 'INFP', sA: 'BOSS', sB: 'MOON', context: 'teamwork' },
    { a: 'ENFP', b: 'ENFP', sA: 'LOVE-R', sB: 'LOVE-R', context: 'romantic' }
  ];
  pairs.forEach(pair => {
    const report = buildReport({
      nameA: 'A', nameB: 'B', mbtiA: pair.a, mbtiB: pair.b,
      identityA: 'unknown', identityB: 'unknown', sbtiA: pair.sA, sbtiB: pair.sB,
      context: pair.context, tone: 'warm'
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
  window.PairAuraV7 = { buildReport, runQualitySelfCheck, buildMbtiVector, buildSbtiVector };
}

document.addEventListener('DOMContentLoaded', init);

# Pair Aura Web V3 修改复盘

## 修改 1：只保留 MBTI / SBTI 官方入口

项目源要求第一版是轻量、可分享、可落地的关系报告生成器，而不是测评平台。因此入口只保留两个官方入口：MBTIonline 与 SBTI.ai。删除 16Personalities、Step II 资料页和非官方 SBTI 类型页，减少误导和版权/商标风险。

## 修改 2：MBTI 增加同类型细分指标

MBTI 输入不再只有四字母类型；新增 9 个细分指标预设：标准估算、-A 稳定版、-T 敏感版、表达外放版、克制内收版、计划强化版、随性灵活版、理性决策版、共情回应版。

这些预设会影响统一人格向量，例如 stress_sensitivity、emotional_expression、planning、logic_orientation、cooperation 等，从而让同样的 ENFP/ISTJ 在关系报告中产生不同结果。

边界：这些不是官方 MBTI Step II 结果，只是面向 MVP 的娱乐化近似，用于关系解释。

## 修改 3：SBTI 类型完善为 27 种

SBTI 数据库扩展为 27 种类型：CTRL、ATM-er、Dior-s、BOSS、THAN-K、OH-NO、GOGO、SEXY、LOVE-R、MUM、FAKE、OJBK、MALO、JOKE-R、WOC!、THIN-K、SHIT、ZZZZ、POOR、MONK、IMSB、SOLO、FUCK、DEAD、IMFW、HHHH、DRUNK。

每种类型都配置了 title、keywords 和统一人格向量。

## 修改 4：报告界面减少文字、突出算法结果

报告页从“详细解释型”压缩为“出圈卡片型”：

- 首屏保留关系类型、合拍指数、关键词、相似/互补/摩擦三项核心指标；
- 算法重点模块只展示差异最大的 3 个维度；
- 关系维度面板只保留情绪同步、沟通顺畅、互补吸引、冲突修复 4 个重点条；
- 文案卡片缩减为 3 张：温情一句、最容易卡住、真正有用的建议。

## 运行检查

已完成：

- HTML 单文件结构检查；
- JS 语法检查：`node --check` 通过；
- MBTI × MBTI 测试：ENFP 表达外放版 × ISTJ 计划强化版，可正常生成报告；
- SBTI × SBTI 测试：LOVE-R × CTRL，可正常生成报告；
- SBTI 类型数量检查：27；
- MBTI 细分指标数量检查：9；
- 分享链接编码逻辑保留；
- 海报 canvas 逻辑保留。

## 保留边界

本产品仍然只用于娱乐、社交破冰和自我理解，不构成心理诊断、职业筛选或严肃关系决策建议。

# SBTI 数据修正审查

## 修正目的

本次只修正 SBTI 类型库和对应算法向量，不改变 Pair Aura 的 UI、页面结构、分享逻辑、二维码逻辑、MBTI、九型人格和报告模板。

## 核查结论

网上公开资料和用户提供清单都显示完整 SBTI 类型为 27 个，其中 DRUN-K/DRUNK 为酒鬼隐藏类型。用户口头提到“26种”，但给出的清单实际包含 27 个；因此本次按完整 27 个类型处理。

## 已替换的 SBTI 类型

1. IMSB｜自我攻击者
2. BOSS｜领导者
3. MUM｜妈妈
4. FAKE｜伪人
5. DEAD｜死者
6. ZZZZ｜装死者
7. GOGO｜行者
8. FUCK｜草者
9. CTRL｜拿捏者
10. HHHH｜傻乐者
11. SEXY｜尤物
12. OJBK｜无所谓人
13. POOR｜贫穷者
14. OH-NO｜哦不人
15. MONK｜僧人
16. SHIT｜狗屎人
17. THAN-K｜感恩者
18. MALO｜吗喽
19. ATM-er｜送钱者
20. THIN-K｜思考者
21. SOLO｜孤儿
22. LOVE-R｜多情者
23. WOC!｜握草人
24. DRUN-K｜酒鬼
25. IMFW｜废物
26. JOKE-R｜小丑
27. Dior-s｜屌丝

## 算法修正

为每个 SBTI 类型重写了 `SBTI_VECTOR_PATCHES`。每个类型会影响下列关系向量中的部分维度：

- extraversion：社交能量
- openness：开放/脑洞
- agreeableness：共情合作
- conscientiousness：责任计划
- neuroticism：压力敏感
- logicEmotion：理性/感性表达
- emotionalExpression：情绪表达
- planningNeed：计划需求
- noveltyNeed：新鲜感需求
- intimacyNeed：亲密需求
- independenceNeed：独立需求
- conflictDirectness：冲突直接度
- decisionSpeed：决策速度
- securityNeed：安全感需求
- controlNeed：掌控需求
- authenticityNeed：真实表达需求
- selfStability：自我稳定度

## 兼容处理

为了避免旧链接直接失效，保留了一组旧代码别名映射：

- ATM-ER → ATM-er
- OH-NO! → OH-NO
- DRUNK → DRUN-K
- WOC → WOC!
- 旧版自定义标签如 FIRE / ICE / MOON / CUBE 等会映射到最接近的正式 SBTI 类型。

## 质量检查

已完成：

- `node --check` 通过。
- 下拉框 SBTI 类型数量 = 27。
- SBTI 向量补丁数量 = 27。
- 必需 27 个代码全部存在。
- 所有 27 个 SBTI 类型均可生成向量。
- 旧别名 ATM-ER / OH-NO! / DRUNK / WOC / FIRE / CLOWN 均可映射。
- MBTI + SBTI + 九型组合报告生成通过。
- SBTI + SBTI 组合报告生成通过。
- DRUN-K、Dior-s、ATM-er、WOC! 等特殊代码 encode/decode 正常。
- 每份报告仍固定 6 张 storyCards。

## 保留边界

SBTI 是娱乐化、强自嘲、强梗感测试，不是心理诊断。Pair Aura 只使用它作为关系解释的娱乐表达层，分数和报告不能作为严肃关系判决。

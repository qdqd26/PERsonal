# Pair Aura V8

V8 是对 V7 的 UI 和文本素材库升级版。

## 本版变化

1. UI 重新强化为 Neon Aura：
   - 深紫夜空背景
   - 发光光球
   - 玻璃拟态卡片
   - 关系气场控制台
   - 更强结果页主视觉
   - 更像可截图传播的社交卡片

2. 关系组只保留两个：
   - 友谊 / 情侣
   - 搭子 / 学习 / 项目

3. 报告语气只保留两个：
   - 温情吐槽
   - 现实建议

4. 文案素材库扩容：
   - 17 个特质维度
   - 每个维度区分：轻微差异 / 明显差异 / 强差异
   - 每个维度都有专门的误会解释和桥接建议
   - 报告会根据 Top 差异自动生成更细的评价

5. 保留官方入口：
   - MBTI: https://www.16personalities.com/free-personality-test
   - SBTI: https://fancc.de5.net/projects/sbti/

## 文件结构

```text
pair-aura-v8/
  index.html
  styles.css
  app.js
  README.md
```

## 本地运行

直接双击 `index.html` 即可打开。

更接近线上环境：

```bash
npx serve .
```

## 质量检查

```bash
node --check app.js
```

浏览器控制台可运行：

```js
PairAuraV8.runQualitySelfCheck()
```

## 产品边界

本产品是轻娱乐关系分析工具，不是心理诊断、职业筛选或严肃关系判决。分数用于引导讨论，真正重要的是报告里的差异解释、互补点和相处建议。

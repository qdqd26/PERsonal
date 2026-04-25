# Pair Aura V7

本版本按新的 V6 GitHub 运行反馈进行三类修正：

1. 输入流程改为：
   - 输入两个人的类型；
   - 先去测 / 核对结果；
   - 选择关系组；
   - 选择报告语气。

2. 官方测试链接已修正：
   - MBTI / 16 型人格：https://www.16personalities.com/free-personality-test
   - SBTI：https://fancc.de5.net/projects/sbti/

3. 算法升级为 V7：
   - 使用 Big Five 启发的人格向量作为中间层；
   - MBTI 负责行为风格映射；
   - A/T 负责稳定度修正；
   - SBTI 负责娱乐标签修正；
   - 总分由 6 个关系维度加权计算；
   - 加入摩擦风险惩罚、输入深度上限和差异 Top 3，避免大量结果接近 100%。

## 本地运行

直接打开 `index.html` 即可。

更接近线上环境：

```bash
npx serve .
```

## 文件结构

```text
pair-aura-v7/
  index.html
  styles.css
  app.js
  README.md
```

## 质量检查

浏览器打开页面后，在控制台运行：

```js
PairAuraV7.runQualitySelfCheck()
```

可以看到多组测试结果的分数分布和关系类型。

## 产品边界

本项目是轻娱乐关系分析工具，不是心理诊断、关系判决、招聘筛选或专业咨询工具。

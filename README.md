# Pair Aura V15 单文件版

这是基于 V14 的产品质感增强版本，仍然是单文件静态网页。

## 使用方式

只需要把 `index.html` 上传到 GitHub Pages 仓库根目录，替换旧文件即可。

## V15 新增

- 首页中性化：情侣、朋友、室友、搭子、项目队友都能用。
- 输入增强：MBTI / SBTI / 九型人格 / 6 个可选关系行为问题。
- 报告增强：A/B 对比卡、20 个关系类型标签、6 张故事卡。
- 分享增强：4 个海报模板，二维码打开同一份报告。
- 匿名埋点：默认不外发，配置 ANALYTICS_ENDPOINT 后才启用。

## 检查

可用以下方式抽取脚本检查语法：

```bash
python3 - <<'PY'
from pathlib import Path
html=Path('index.html').read_text()
script=html[html.index('<script>')+len('<script>'):html.rindex('</script>')]
Path('/tmp/pair-aura-v15.js').write_text(script)
PY
node --check /tmp/pair-aura-v15.js
```

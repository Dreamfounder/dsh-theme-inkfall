# 墨色主题 · Ink theme

把 DSH Web 界面换成水墨视觉系统：墨黑绿底、淡金 72px 网格与宣纸噪点、朱砂印章、宋体标题、青瓷/朱砂两色点缀。

> 视觉语言参考 [墨蚀：拾字纪 · INKFALL](https://dreamfounder.github.io/inkfall/)（`:root` 色板、环境光、网格、噪点与印章做法均取自该站的公开 CSS）。本项目是独立实现，不包含该游戏的任何素材、代码或文本。

- 纯 CSS，无图片资源、无第三方依赖、无构建步骤。
- 深色为主（墨色）；「素纸」亮色变体（宣纸米白 + 墨字）可跟随明暗或强制开启。
- 配色通过 `--dsw-alias-*` 令牌下发，卸载即整段撤回。

## 安装

包名 `dsh-theme-inkfall`。安装时只需要一个 spec 字符串：

```bash
# 桌面版：设置 → 插件 → 添加插件，粘贴其中一行
github:<你的GitHub用户名>/dsh-theme-inkfall
github:<你的GitHub用户名>/dsh-theme-inkfall#v2.5.0

# 非 desktop profile 的命令行
dsh plugin --profile web add github:<你的GitHub用户名>/dsh-theme-inkfall#v2.5.0
```

> 桌面版的 `desktop` profile 归 Electron 管，npm 版 CLI 会拒绝它的插件管理请求，所以桌面端请走「设置 → 插件 → 添加插件」。

装完 **Ctrl + F5** 刷新页面。

### 通过插件索引安装（实验性）

仓库里的 [`market/index.json`](market/index.json) 是 format 1 的插件市场索引。把其中三处占位符换成真实值后，别人在 **设置 → 实验性插件 → 自定义插件索引** 里添加：

```
https://raw.githubusercontent.com/<你的GitHub用户名>/dsh-theme-inkfall/main/market/index.json
```

就能在插件页的「发现」里直接浏览和安装。

### 本地目录安装（开发用）

```bash
dsh plugin --profile web add <本目录的绝对路径>
```

## 怎么用

装好即生效，三处入口：

1. **侧边栏底部**：设置齿轮旁的朱砂印章，点一下开关主题。
2. **设置 → 墨色**：完整设置页。
   - `启用主题`：总开关。
   - `水墨底纹`：墨底 + 淡金网格 + 宣纸噪点，关掉只留纯墨底。
   - `宋体正文`：把 `--dsw-font-family` 改成宋体栈（思源宋体 / 宋体 / SimSun），正文与界面文字一起换，这是「一眼看出不是原生主题」的关键一项；嫌宋体挤就关掉。
   - `跟随明暗外观`：默认关（墨色是深色系统）；开启后跟随「外观 → 浅色/深色」，浅色即「素纸」。
   - `界框`：视口内一道淡金细线 + 四角刻痕 + 顶部小菱形 + 右下「墨」字水印 + 右侧竖排小字。
   - `主色`：淡金 / 青瓷 / 朱砂 / 宣纸。
3. 页面底部显示版本号，可确认浏览器里跑的是哪一版。

设置存在当前浏览器的 `localStorage`（键 `dsh.ink-theme.prefs.v1`）。

## 视觉规格

| 项 | 值 |
|---|---|
| 底 / 层 | `#080d0b` / `#101915` / `#15211b`，令牌层为半透明（主底 `0.42`、侧栏 `0.62`），环境光与网格能透出来 |
| 字体 | 标题与正文 `Noto Serif SC / Source Han Serif SC / Songti SC / SimSun`；引文 `KaiTi / STKaiti` |
| 质感 | 底纹在 `body::before`，网格/噪点在 `body::after`（径向遮罩）；另有一层 `soft-light` 噪点画在界面之上（`8.5%`），模拟纸面颗粒 |
| 宣纸 | `#eee7d6` / `#d4cbb7` / `#b1a894` |
| 淡金 | `#c9a96a` / 亮 `#e8cb8e` / 暗 `#8e7445` |
| 青瓷 | `#7fa997` / 亮 `#add5c2` |
| 朱砂 | `#b94a37` / 亮 `#e37860` |
| 细线 | 金 `rgba(201,169,106,.17)`、纸 `rgba(233,226,209,.075)`、强 `rgba(201,169,106,.38)` |
| 字体 | 标题 `Noto Serif SC / Songti SC / SimSun`；引文 `KaiTi / STKaiti` |
| 网格 | 72px 间距，`rgba(201,169,106,.085)`，径向遮罩向内收 |
| 山峦 | 两层 SVG 山脊（`feGaussianBlur` 模糊），拉伸为视口底部 46vh，见 `MOUNTAINS_DARK` |
| 月环 | 右上角一圈淡金细环（双 radial 渐变叠出 1px 环 + 内部淡光） |
| 噪点 | `feTurbulence` SVG data URI，`soft-light` 混合 |
| 图标 | 不替换产品字标：给侧栏品牌图标套一层「描金印章框」——`-3px` 金色圆角边、外圈径向背光、图内金色 `filter`，hover 时边框与光晕变亮（`wtg9ga_brandMark` / `wtg9ga_railMark`） |
| 环境层 | 画在界面之上的水墨氛围：青绿 / 赭石两团 90px 模糊的光斑（26s / 32s 缓慢漂移，`screen` 混合）、顶部淡金晕、118px 斜向细纹；`prefers-reduced-motion` 下停止漂移 |
| 墨盘 | 做成**星盘**：圆心正好落在视口右上角，只露出四分之一。结构为玉青半透盘面、四道同心环（第二道虚线 120s 慢转）、外缘度数刻度环（`repeating-conic-gradient` + 环形 `mask`，260s 反向慢转）、30° 辐条、三个字标节点（墨/拾/字，落在可见的 96°–164° 弧上）；`max-width: 1180px` 以下隐藏 |
| 侧栏 | 装饰重心在侧栏而非视口边框：右侧 1px 金线分界、品牌行下方发丝线、页脚上方发丝线、交互行暖金 hover、选中行左缘 2px 金色脊线（`wtg9ga_*`） |
| 视口框 | 只在**左右与底部**画发丝线（U 形，顶边留宿主 chrome），底部两角小刻痕，右下「墨」字水印 |

## 自定义

全在 [`client.js`](client.js) 里：

- `PALETTE.dark` / `PALETTE.light`：13 个别名令牌的两套取值。
- `ACCENTS`：四种主色的深浅取值。
- `BACKDROP_DARK` / `BACKDROP_LIGHT`：环境光、网格、噪点的具体参数。
- `FRAME_CSS`：界框与刻痕。

## 实现要点

- **强制墨色**：只覆盖别名令牌不够（行内代码、diff 用的是令牌集之外的变量），所以启用时会调 `ctx.theme.setTheme('dark')` 把应用切到原生深色调色板，关闭或开启「跟随明暗」时恢复原偏好。
- **样式下发**：React 渲染的 `<style>` 元素，令牌写在 `html body` 上并带 `!important`，确保压过宿主同元素上的调色板声明。
- **令牌缺失也不崩**：`theme` 服务取不到时，仅退化为「14 个令牌是墨色、其余仍是宿主配色」，不会白屏。

## 卸载

```bash
dsh plugin --profile web remove dsh-theme-inkfall
```

## 许可

MIT。视觉语言参考来源为 INKFALL 公开站点样式，`墨蚀：拾字纪` 相关名称与内容版权归其作者所有。

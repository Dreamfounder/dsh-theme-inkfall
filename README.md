# 墨蚀：拾字纪 · INKFALL

《墨蚀：拾字纪》INKFALL 的界面主题：墨黑绿底、淡金 72px 网格与宣纸噪点、朱砂印章、宋体排印、角落星盘。

> 视觉语言取自 [墨蚀：拾字纪 · INKFALL](https://dreamfounder.github.io/inkfall/) 公开站点的 CSS（`:root` 色板、环境光、网格、噪点与印章做法）。本项目是独立实现，不包含该游戏的素材、代码或文本；`墨蚀：拾字纪` 相关名称与内容版权归其作者所有。

- 纯 CSS，无图片资源、无第三方依赖、无构建步骤。
- 深色为主（墨色）；「素纸」亮色变体（宣纸米白 + 墨字）可跟随明暗或强制开启。
- 配色通过 `--dsw-alias-*` 令牌下发，卸载即整段撤回。

## 安装

包名 `dsh-theme-inkfall`。桌面版一律走 **设置 → 插件 → 添加插件**，粘贴下面任意一行。

### 方式一：npm（推荐，**不需要 Git**）

已发布到 npm：[`dsh-theme-inkfall`](https://www.npmjs.com/package/dsh-theme-inkfall)

```
dsh-theme-inkfall
```

要钉版本就写 `dsh-theme-inkfall@2.7.0`。

> 包名下还留着一个 `0.0.0-stage` 占位版本。刚发布新版的短时间内，pnpm 的 `minimumReleaseAge` 供应链策略可能把它当成"唯一够旧的版本"而解析到它，导致安装失败（报 `Unexpected end of TAR archive`）。遇到这种情况改用精确版本 `@2.7.0` 即可。

### 方式二：tarball 地址（**不需要本机装 Git**）

```
https://github.com/Dreamfounder/dsh-theme-inkfall/archive/refs/heads/main.tar.gz
```

钉版本（需要先在仓库发布 Release 打 tag）：

```
https://github.com/Dreamfounder/dsh-theme-inkfall/archive/refs/tags/v2.7.0.tar.gz
```

### 方式三：git spec（需要本机已安装 Git）

```
github:Dreamfounder/dsh-theme-inkfall
github:Dreamfounder/dsh-theme-inkfall#v2.7.0
```

> pnpm 解析 `github:` 规格时会调用本机 `git ls-remote`。**机器上没有 git 会直接失败**，报
> `ERR_PNPM_GIT_RESOLVE_FAILED ... git ls-remote failed: 'git' 不是内部或外部命令`。
> 遇到这个报错就改用方式一。

### 命令行（非 desktop profile）

```bash
# 桌面版的 desktop profile 归 Electron 管，npm 版 CLI 会拒绝它的插件管理请求
dsh plugin --profile web add https://github.com/Dreamfounder/dsh-theme-inkfall/archive/refs/heads/main.tar.gz
```

装完 **Ctrl + F5** 刷新页面。

### 通过插件索引安装（实验性，需要 git）

仓库里的 [`market/index.json`](market/index.json) 是 format 1 的插件市场索引。别人在 **设置 → 实验性插件 → 自定义插件索引** 里添加：

```
https://raw.githubusercontent.com/Dreamfounder/dsh-theme-inkfall/main/market/index.json
```

就能在插件页的「发现」里直接浏览和安装。

> format 1 的索引只支持 `npm` 和 `git` 两种源，没有 tarball 类型，所以**索引安装仍然依赖本机 git**。没装 git 的人请用上面的方式一。

### 本地目录安装（开发用）

```bash
dsh plugin --profile web add <本目录的绝对路径>
```

> ⚠️ 从"本地目录链接"切换到其它安装方式时，pnpm 可能清空该目录。切换前先备份本目录。

## 怎么用

装好即生效，入口在 **设置 → 墨蚀**。

1. **设置 → 墨蚀**：完整设置页。
   - `启用主题`：总开关。
   - `水墨底纹`：墨底 + 淡金网格 + 宣纸噪点，关掉只留纯墨底。
   - `宋体正文`：把 `--dsw-font-family` 改成宋体栈（思源宋体 / 宋体 / SimSun），正文与界面文字一起换，这是「一眼看出不是原生主题」的关键一项；嫌宋体挤就关掉。
   - `跟随明暗外观`：默认关（墨色是深色系统）；开启后跟随「外观 → 浅色/深色」，浅色即「素纸」。
   - `界框`：视口左右与底部一道淡金发丝线（顶边留给宿主 chrome）、底部两角小刻痕、右下「墨」字水印、左上角星盘。
   - `主色`：淡金 / 青瓷 / 朱砂 / 宣纸。
2. 页面底部显示版本号，可确认浏览器里跑的是哪一版。
设置存在当前浏览器的 `localStorage`（键 `dsh.ink-theme.prefs.v1`）。

## 视觉规格

| 项 | 值 |
|---|---|
| 底 / 层 | `#080d0b` / `#101915` / `#15211b`，令牌层为半透明（主底 `0.42`、侧栏 `0.62`），环境光与网格能透出来 |
| 字体 | 标题与正文 `Noto Serif SC / Source Han Serif SC / Songti SC / SimSun`；引文 `KaiTi / STKaiti` |
| 质感 | 底纹在 `html::before` / `body::before`，网格与噪点在 `body::after`（径向遮罩）；另有一层 `soft-light` 噪点画在界面之上，模拟纸面颗粒 |
| 噪点 | `feTurbulence` SVG data URI，画在界面之上，`soft-light` 混合、`7.5%` 不透明度 |
| 宣纸 | `#eee7d6` / `#d4cbb7` / `#b1a894` |
| 淡金 | `#c9a96a` / 亮 `#e8cb8e` / 暗 `#8e7445` |
| 青瓷 | `#7fa997` / 亮 `#add5c2` |
| 朱砂 | `#b94a37` / 亮 `#e37860` |
| 细线 | 金 `rgba(201,169,106,.17)`、纸 `rgba(233,226,209,.075)`、强 `rgba(201,169,106,.38)` |
| 网格 | 72px 间距，`rgba(201,169,106,.085)`，径向遮罩向内收 |
| 山峦 | 两层 SVG 山脊（`feGaussianBlur` 模糊），拉伸为视口底部 46vh，见 `MOUNTAINS_DARK` |
| 月环 | 右上角一圈淡金细环（双 radial 渐变叠出 1px 环 + 内部淡光） |
| 图标 | 不替换产品字标：给侧栏品牌图标套一层「描金印章框」——`-3px` 金色圆角边、外圈径向背光、图内金色 `filter`，hover 时边框与光晕变亮（`wtg9ga_brandMark` / `wtg9ga_railMark`） |
| 环境层 | 画在界面之上的水墨氛围：青绿 / 赭石两团 90px 模糊的光斑（26s / 32s 缓慢漂移，`screen` 混合）、顶部淡金晕、118px 斜向细纹；`prefers-reduced-motion` 下停止漂移 |
| 星盘 | 圆心钉在**视口左上角**，只露出右下四分之一。结构：玉青半透盘面（边缘淡出，无硬边）、四道同心环（第二道虚线 80s 反向慢转）、外缘两级度数刻度（6° 细刻 + 30° 粗刻，120s 慢转，`repeating-conic-gradient` + 环形 `mask`）、30° 辐条；直径 `clamp(640px, 72vw, 1180px)`，`max-width: 1180px` 以下隐藏 |
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

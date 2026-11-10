window.__ModuleLoader__.load({
  id: 'dsh-theme-inkfall',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'ink-theme';
    const STORAGE_KEY = 'dsh.ink-theme.prefs.v1';
    const VERSION = '2.7.0';

    const SERIF = '"Noto Serif SC","Songti SC","STSong","SimSun",serif';
    const KAI = '"KaiTi","STKaiti","Kaiti SC","FangSong",serif';

    /* ------------------------------------------------------------------ *
     * Palette — alias tokens, one value per colour scheme.
     * Ink black / rice paper ivory, hairline gold, jade and cinnabar.
     * Translucent surfaces let the ambient wash and grid read through.
     * ------------------------------------------------------------------ */
    const PALETTE = {
      dark: {
        '--dsw-alias-bg-base': 'rgba(9, 15, 12, 0.42)',
        '--dsw-alias-bg-layer-1': 'rgba(17, 27, 23, 0.82)',
        '--dsw-alias-bg-layer-2': 'rgba(23, 36, 30, 0.86)',
        '--dsw-alias-bg-overlay': 'rgba(10, 16, 14, 0.95)',
        '--dsw-alias-border-l1': 'rgba(201, 169, 106, 0.2)',
        '--dsw-alias-border-l2': 'rgba(201, 169, 106, 0.42)',
        '--dsw-alias-label-primary': '#ece2c9',
        '--dsw-alias-label-secondary': '#a4ab9d',
        '--dsw-alias-state-error-primary': '#b94a37',
        '--dsw-alias-state-idle-primary': '#6d776e',
        '--dsw-alias-state-success-primary': '#7fa997',
        '--dsw-alias-state-warn-primary': '#c9a96a',
        '--dsw-specific-sidebar-fill': 'rgba(8, 13, 11, 0.62)',
      },
      light: {
        '--dsw-alias-bg-base': 'rgba(238, 231, 214, 0.92)',
        '--dsw-alias-bg-layer-1': 'rgba(250, 246, 236, 0.98)',
        '--dsw-alias-bg-layer-2': 'rgba(231, 222, 203, 0.98)',
        '--dsw-alias-bg-overlay': 'rgba(250, 246, 236, 1)',
        '--dsw-alias-border-l1': 'rgba(27, 23, 16, 0.14)',
        '--dsw-alias-border-l2': 'rgba(27, 23, 16, 0.26)',
        '--dsw-alias-label-primary': '#1b1710',
        '--dsw-alias-label-secondary': '#5c5445',
        '--dsw-alias-state-error-primary': '#9c3a2b',
        '--dsw-alias-state-idle-primary': '#8a8375',
        '--dsw-alias-state-success-primary': '#3f6a58',
        '--dsw-alias-state-warn-primary': '#8e6a2a',
        '--dsw-specific-sidebar-fill': 'rgba(233, 224, 205, 0.95)',
      },
    };

    const ACCENTS = {
      gold: { dark: '#c9a96a', light: '#8e7445' },
      jade: { dark: '#7fa997', light: '#4a7264' },
      cinnabar: { dark: '#b94a37', light: '#8b3a2d' },
      paper: { dark: '#e8cb8e', light: '#a58a5c' },
    };
    const ACCENT_ORDER = ['gold', 'jade', 'cinnabar', 'paper'];

    const ZH = {
      nav: '墨蚀',
      kicker: 'INKFALL · 墨蚀：拾字纪',
      title: '墨蚀：拾字纪',
      panelTitle: '视觉设置',
      rowEnable: '启用主题',
      rowEnableHint: '关闭后恢复默认外观',
      rowBackdrop: '水墨底纹',
      rowBackdropHint: '墨底、淡金网格与宣纸噪点',
      rowSerif: '宋体正文',
      rowSerifHint: '正文与界面文字改用宋体，更接近水墨排印',
      rowFollow: '跟随明暗外观',
      rowFollowHint: '默认以墨色为主；开启后跟随「外观」里的浅色 / 深色',
      rowFrame: '界框',
      rowFrameHint: '视口内的一道淡金细线与四角刻痕',
      rowAccent: '主色',
      rowAccentHint: '主题的主色，决定强调、选中与印章点缀',
      accent_gold: '淡金',
      accent_jade: '青瓷',
      accent_cinnabar: '朱砂',
      accent_paper: '宣纸',
      note: '设置保存在当前浏览器，刷新后仍然生效',
      tag: 'INKFALL',
      footOn: '墨色主题：已开启（点击关闭）',
      footOff: '墨色主题：已关闭（点击开启）',
    };

    const EN = {
      nav: 'Inkfall',
      kicker: 'INKFALL · 墨蚀：拾字纪',
      title: 'Inkfall',
      panelTitle: 'Visual settings',
      rowEnable: 'Enable theme',
      rowEnableHint: 'Turn off to restore the default look',
      rowBackdrop: 'Ink field',
      rowBackdropHint: 'Ink ground, faint gold grid and paper grain',
      rowSerif: 'Serif text',
      rowSerifHint: 'Set interface and body text in a Chinese serif face',
      rowFollow: 'Follow light/dark',
      rowFollowHint: 'The skin is ink-dark by default; enable this to follow the Appearance setting',
      rowFrame: 'Frame',
      rowFrameHint: 'A gold hairline and four corner marks around the viewport',
      rowAccent: 'Accent',
      rowAccentHint: 'Drives emphasis, selection and seal accents',
      accent_gold: 'Antique gold',
      accent_jade: 'Celadon',
      accent_cinnabar: 'Cinnabar',
      accent_paper: 'Rice paper',
      note: 'Settings are saved in this browser and survive a reload',
      tag: 'INKFALL',
      footOn: 'Ink theme: on (click to turn off)',
      footOff: 'Ink theme: off (click to turn on)',
    };

    /* ------------------------------------------------------------------ *
     * Backdrop
     * ------------------------------------------------------------------ */
    const GRAIN =
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.82\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.48\'/%3E%3C/svg%3E")';

    /* Two ink ridges, drawn once as a stretched SVG and blurred inside it. */
    const MOUNTAINS_DARK =
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 420\' preserveAspectRatio=\'none\'%3E%3Cdefs%3E%3Cfilter id=\'b\' x=\'-10%25\' y=\'-10%25\' width=\'120%25\' height=\'120%25\'%3E%3CfeGaussianBlur stdDeviation=\'7\'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d=\'M0 420V236l118-40 96 26 132-56 118 42 128-30 116 40 122-34 108 28 132-42 94 30 96-18v210z\' fill=\'%23172c25\' opacity=\'.5\' filter=\'url(%23b)\'/%3E%3Cpath d=\'M0 420V312l142-34 118 30 150-46 132 38 146-26 138 34 130-30 146 26 138-20v136z\' fill=\'%230a1310\' opacity=\'.92\' filter=\'url(%23b)\'/%3E%3C/svg%3E")';

    const MOUNTAINS_LIGHT =
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 420\' preserveAspectRatio=\'none\'%3E%3Cdefs%3E%3Cfilter id=\'b\' x=\'-10%25\' y=\'-10%25\' width=\'120%25\' height=\'120%25\'%3E%3CfeGaussianBlur stdDeviation=\'7\'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d=\'M0 420V236l118-40 96 26 132-56 118 42 128-30 116 40 122-34 108 28 132-42 94 30 96-18v210z\' fill=\'%23cdbfa2\' opacity=\'.42\' filter=\'url(%23b)\'/%3E%3Cpath d=\'M0 420V312l142-34 118 30 150-46 132 38 146-26 138 34 130-30 146 26 138-20v136z\' fill=\'%23bcae90\' opacity=\'.3\' filter=\'url(%23b)\'/%3E%3C/svg%3E")';

    const BACKDROP_DARK = `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background-color: #080d0b;
  background-image:
    radial-gradient(circle at 74% 16%, rgba(232, 203, 142, .07), transparent 130px),
    radial-gradient(circle at 74% 16%, rgba(201, 169, 106, 0) 0 121px, rgba(201, 169, 106, .16) 122px, rgba(201, 169, 106, 0) 127px),
    radial-gradient(circle at 72% 10%, rgba(47, 92, 72, .55), transparent 44%),
    radial-gradient(circle at 14% 76%, rgba(112, 72, 44, .36), transparent 42%),
    linear-gradient(180deg, transparent 36%, rgba(127, 169, 151, .055) 52%, transparent 68%),
    linear-gradient(168deg, #080d0b 0%, #0c1512 52%, #060a08 100%);
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image: ${MOUNTAINS_DARK};
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 100% 46vh;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .8;
  background-image:
    linear-gradient(rgba(201, 169, 106, .085) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201, 169, 106, .07) 1px, transparent 1px),
    ${GRAIN};
  background-size: 72px 72px, 72px 72px, 180px 180px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 38%, rgba(0, 0, 0, .95), transparent 82%);
  mask-image: radial-gradient(ellipse at 50% 38%, rgba(0, 0, 0, .95), transparent 82%);
}
`;

    const BACKDROP_DARK_FLAT = `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background: radial-gradient(120% 90% at 50% -10%, #0d1512, #080d0b 62%, #060a08);
}
`;

    const BACKDROP_LIGHT = `
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background-color: #eee7d6;
  background-image:
    radial-gradient(circle at 74% 16%, rgba(201, 169, 106, .1), transparent 140px),
    radial-gradient(circle at 74% 16%, rgba(139, 111, 58, 0) 0 121px, rgba(139, 111, 58, .18) 122px, rgba(139, 111, 58, 0) 127px),
    radial-gradient(circle at 78% 8%, rgba(201, 169, 106, .2), transparent 42%),
    radial-gradient(circle at 14% 82%, rgba(127, 169, 151, .16), transparent 40%),
    linear-gradient(170deg, #f2ebdc 0%, #e8dfcd 60%, #e2d8c3 100%);
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-image: ${MOUNTAINS_LIGHT};
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 100% 46vh;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .45;
  background-image:
    linear-gradient(rgba(27, 23, 16, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(27, 23, 16, .04) 1px, transparent 1px),
    ${GRAIN};
  background-size: 72px 72px, 72px 72px, 180px 180px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 38%, rgba(0, 0, 0, .9), transparent 78%);
  mask-image: radial-gradient(ellipse at 50% 38%, rgba(0, 0, 0, .9), transparent 78%);
}
`;

    /* ------------------------------------------------------------------ *
     * Viewport frame: one gold hairline and four corner marks, nothing more.
     * ------------------------------------------------------------------ */
    const FRAME_CSS = `
.ink-frame { position: fixed; inset: 0; pointer-events: none; z-index: 45; }
/* The shell keeps its own floating capsule and window chrome in the top-right
   and top-left corners, so the frame is a U: side rails below that strip and a
   bottom rail, with ticks only on the bottom corners. */
.ink-frame__inner { position: absolute; left: 10px; right: 10px; bottom: 10px; top: 56px; border: 1px solid rgba(201, 169, 106, .2); border-top: 0; }
.ink-frame__tick { position: absolute; width: 16px; height: 16px; border: 1px solid rgba(201, 169, 106, .55); }
.ink-frame__tick--bl { bottom: 10px; left: 10px; border-right: 0; border-top: 0; }
.ink-frame__tick--br { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }
.ink-frame__grain { position: absolute; inset: 0; opacity: .075; mix-blend-mode: soft-light; background-image: ${GRAIN}; background-size: 180px 180px; }
.ink-frame__mark { position: absolute; right: 2.6vw; bottom: 2.2vh; font-family: ${SERIF}; font-size: clamp(200px, 26vw, 380px); line-height: .82; color: rgba(201, 169, 106, .055); user-select: none; }
.ink-frame__vertical { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); writing-mode: vertical-rl; font-family: ${SERIF}; font-size: 11px; letter-spacing: .42em; color: rgba(201, 169, 106, .32); }
.ink-frame__vertical em { font-style: normal; color: rgba(201, 169, 106, .18); }
/* The ink astrolabe: a large, low-contrast instrument arc entering from the
   top-right corner (centre on the corner, one quarter showing). The plate
   fades out toward its rim, so there is no hard circular edge against the app.
   The corner-shape override is required here — the shell's universal
   superellipse rule would otherwise square off every circle. */
.ink-astro { --ink-astro: clamp(640px, 72vw, 1180px); position: absolute; left: calc(var(--ink-astro) / -2); top: calc(var(--ink-astro) / -2); width: var(--ink-astro); height: var(--ink-astro); pointer-events: none; opacity: .42; --dsw-corner-shape: round; }
.ink-astro__plate, .ink-astro__ring, .ink-astro__ticks, .ink-astro__spokes { corner-shape: round; }
.ink-astro__plate { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle closest-side, rgba(31, 52, 43, .26) 0 34%, rgba(13, 24, 20, .34) 68%, rgba(7, 12, 10, 0) 100%); }
.ink-astro__ring { position: absolute; border-radius: 50%; border: 1px solid rgba(201, 169, 106, .16); }
.ink-astro__ring--1 { inset: 2%; border-color: rgba(201, 169, 106, .2); }
.ink-astro__ring--2 { inset: 13%; border-style: dashed; border-color: rgba(201, 169, 106, .12); animation: ink-spin 80s linear infinite reverse; }
.ink-astro__ring--3 { inset: 27%; border-color: rgba(127, 169, 151, .14); }
.ink-astro__ring--4 { inset: 41%; border-color: rgba(201, 169, 106, .09); }
.ink-astro__ticks { position: absolute; inset: 0; border-radius: 50%; }
.ink-astro__ticks--minor { background: repeating-conic-gradient(from 0deg, rgba(201, 169, 106, .22) 0 .3deg, transparent .3deg 6deg); -webkit-mask-image: radial-gradient(circle closest-side, transparent 0 95%, #000 95.5% 99.2%, transparent 100%); mask-image: radial-gradient(circle closest-side, transparent 0 95%, #000 95.5% 99.2%, transparent 100%); animation: ink-spin 120s linear infinite; }
.ink-astro__ticks--major { background: repeating-conic-gradient(from 0deg, rgba(201, 169, 106, .3) 0 .45deg, transparent .45deg 30deg); -webkit-mask-image: radial-gradient(circle closest-side, transparent 0 92.5%, #000 93% 99.4%, transparent 100%); mask-image: radial-gradient(circle closest-side, transparent 0 92.5%, #000 93% 99.4%, transparent 100%); animation: ink-spin 120s linear infinite; }
.ink-astro__spokes { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(from 0deg, rgba(201, 169, 106, .1) 0 .35deg, transparent .35deg 30deg); -webkit-mask-image: radial-gradient(circle closest-side, transparent 0 24%, #000 25% 92%, transparent 93%); mask-image: radial-gradient(circle closest-side, transparent 0 24%, #000 25% 92%, transparent 93%); }
@keyframes ink-spin { to { transform: rotate(360deg); } }
@media (max-width: 1180px) { .ink-astro { display: none; } }
/* The product mark keeps its own artwork: it is gilded, given a soft halo and
   a two-degree seal tilt. No frame is drawn around it — a square ring around a
   rounded glyph reads as a doubled border. */
.wtg9ga_brandMark, .wtg9ga_railMark { position: relative; flex: none; }
.wtg9ga_brandMark::after, .wtg9ga_railMark::after { content: ""; position: absolute; inset: -8px; border-radius: 50%; corner-shape: round; pointer-events: none; background: radial-gradient(closest-side, rgba(201, 169, 106, .22), rgba(201, 169, 106, .06) 66%, transparent 78%); filter: blur(2px); }
.wtg9ga_brandMark svg, .wtg9ga_railMark svg { position: relative; filter: sepia(1) saturate(2.4) hue-rotate(346deg) brightness(1.14) drop-shadow(0 0 6px rgba(201, 169, 106, .55)); transform: rotate(-2deg); transition: filter .25s ease, transform .25s ease; }
.wtg9ga_brandMark:hover svg, .wtg9ga_railMark:hover svg { filter: sepia(1) saturate(2.6) hue-rotate(346deg) brightness(1.22) drop-shadow(0 0 10px rgba(201, 169, 106, .75)); transform: rotate(-2deg) scale(1.06); }
/* Ambient field drawn above the app: screen-blended washes only lighten, so
   text keeps its contrast while the surface gains colour and slow movement. */
.ink-amb { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.ink-amb__wash { position: absolute; border-radius: 50%; filter: blur(90px); mix-blend-mode: screen; opacity: .34; }
.ink-amb__wash--a { width: 58vw; height: 58vw; top: -30vw; right: -12vw; background: radial-gradient(circle, rgba(62, 105, 86, .55), transparent 67%); animation: ink-drift-a 26s ease-in-out infinite alternate; }
.ink-amb__wash--b { width: 48vw; height: 48vw; left: -18vw; bottom: -24vw; background: radial-gradient(circle, rgba(120, 77, 45, .5), transparent 68%); opacity: .26; animation: ink-drift-b 32s ease-in-out infinite alternate; }
.ink-amb__halo { position: absolute; inset: 0; background: radial-gradient(74% 36% at 50% -6%, rgba(201, 169, 106, .12), transparent 72%); }
.ink-amb__streaks { position: absolute; inset: 0; opacity: .5; background: repeating-linear-gradient(115deg, rgba(201, 169, 106, .035) 0 1px, transparent 1px 118px); -webkit-mask-image: radial-gradient(ellipse at 50% 42%, rgba(0, 0, 0, .9), transparent 82%); mask-image: radial-gradient(ellipse at 50% 42%, rgba(0, 0, 0, .9), transparent 82%); }
@keyframes ink-drift-a { to { transform: translate3d(-4vw, 3vw, 0) scale(1.08); } }
@keyframes ink-drift-b { to { transform: translate3d(3vw, -2vw, 0) scale(.94); } }
@media (prefers-reduced-motion: reduce) { .ink-amb__wash { animation: none; } }
/* Sidebar ink treatment: hairlines where the column meets the frame, a warm
   wash on interactive rows, and a gold spine on the selected row. */
.wtg9ga_root { border-right: 1px solid rgba(201, 169, 106, .13); }
.wtg9ga_logoRow { border-bottom: 1px solid rgba(201, 169, 106, .16); }
.wtg9ga_footArea { border-top: 1px solid rgba(201, 169, 106, .12); }
.wtg9ga_root button { transition: background-color .18s ease, color .18s ease; }
.wtg9ga_root.wtg9ga_root button:not(.wtg9ga_panelActive):hover { background-color: rgba(201, 169, 106, .07); }
.wtg9ga_panelRow, .wtg9ga_panelActive { position: relative; }
.wtg9ga_panelActive::before { content: ""; position: absolute; left: 0; top: 7px; bottom: 7px; width: 2px; border-radius: 1px; background: linear-gradient(180deg, rgba(201, 169, 106, .95), rgba(201, 169, 106, .4)); }
body { --dsh-scrollbar-thumb: rgba(201, 169, 106, .34); --dsh-scrollbar-thumb-hover: rgba(201, 169, 106, .58); }
::selection { background: rgba(201, 169, 106, .32); color: #fff8e9; }
`;

    /* ------------------------------------------------------------------ *
     * Settings page — seal, kicker, ink panel with hairline rows.
     * ------------------------------------------------------------------ */
    const BASE_CSS = `
.ink-page { max-width: 720px; margin: 0 auto; padding: 2px 2px 36px; display: flex; flex-direction: column; gap: 16px; }
.ink-head { display: flex; align-items: center; gap: 15px; }
.ink-seal { width: 42px; height: 42px; flex: none; display: grid; place-items: center; border-radius: 2px; background: linear-gradient(150deg, rgba(255, 255, 255, .13), transparent 42%), linear-gradient(145deg, #b64b38, #79281f); box-shadow: inset 0 0 0 1px rgba(255, 232, 206, .3), inset 0 0 16px rgba(54, 9, 4, .5), 0 6px 22px rgba(126, 38, 27, .2); color: #f1e5ce; font-family: ${SERIF}; font-size: 24px; line-height: 1; transform: rotate(-2deg); }
.ink-head__text { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.ink-kicker { display: inline-flex; align-items: center; gap: 10px; color: var(--dsw-alias-brand-primary); font-size: 9px; letter-spacing: .28em; text-transform: uppercase; }
.ink-kicker::before { content: ""; width: 24px; height: 1px; background: linear-gradient(90deg, transparent, currentColor); }
.ink-title { margin: 0; font-family: ${SERIF}; font-size: 21px; font-weight: 600; letter-spacing: .16em; color: var(--dsw-alias-label-primary); }
.ink-panel { position: relative; border: 1px solid rgba(201, 169, 106, .16); background: linear-gradient(150deg, rgba(255, 255, 255, .026), transparent 52%), var(--dsw-alias-bg-layer-1); box-shadow: 0 24px 60px rgba(0, 0, 0, .34); }
.ink-panel::after { content: ""; position: absolute; inset: 6px; border: 1px solid rgba(201, 169, 106, .07); pointer-events: none; }
.ink-panel__head { display: flex; align-items: center; gap: 10px; padding: 13px 18px; border-bottom: 1px solid rgba(233, 226, 209, .075); font-size: 10px; letter-spacing: .24em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); }
.ink-panel__glyph { font-family: ${SERIF}; font-size: 15px; line-height: 1; color: var(--dsw-alias-brand-primary); }
.ink-row { display: flex; align-items: center; gap: 18px; padding: 13px 18px; border-bottom: 1px solid rgba(233, 226, 209, .06); }
.ink-row:last-child { border-bottom: 0; }
.ink-row__text { flex: 1; min-width: 0; }
.ink-row__label { font-family: ${SERIF}; font-size: 13.5px; letter-spacing: .1em; color: var(--dsw-alias-label-primary); }
.ink-row__hint { margin-top: 3px; font-family: ${KAI}; font-size: 11.5px; line-height: 1.7; letter-spacing: .02em; color: var(--dsw-alias-label-secondary); }
.ink-row__control { flex: none; display: flex; align-items: center; }
.ink-switch { position: relative; width: 40px; height: 20px; padding: 0; border-radius: 999px; corner-shape: round; border: 1px solid rgba(201, 169, 106, .3); background: transparent; cursor: pointer; transition: border-color .2s ease, background .2s ease; }
.ink-switch:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 3px; }
.ink-switch__thumb { position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; corner-shape: round; background: var(--dsw-alias-label-secondary); transition: transform .2s ease, background .2s ease; }
.ink-switch--on { border-color: var(--dsw-alias-brand-primary); background: rgba(201, 169, 106, .18); }
.ink-switch--on { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent); }
.ink-switch--on .ink-switch__thumb { transform: translateX(20px); background: var(--dsw-alias-brand-primary); box-shadow: 0 0 10px rgba(201, 169, 106, .55); }
.ink-swatches { display: flex; flex-wrap: wrap; gap: 10px; padding: 12px 18px 16px; border-top: 1px solid rgba(233, 226, 209, .06); background: rgba(201, 169, 106, .03); }
.ink-swatch { display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border: 1px solid rgba(233, 226, 209, .12); background: transparent; font-family: ${SERIF}; font-size: 12px; letter-spacing: .12em; color: var(--dsw-alias-label-secondary); cursor: pointer; transition: border-color .2s ease, color .2s ease; }
.ink-swatch:hover { border-color: rgba(201, 169, 106, .34); color: var(--dsw-alias-label-primary); }
.ink-swatch:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 3px; }
.ink-swatch.is-on { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary); }
.ink-swatch__seal { width: 12px; height: 12px; flex: none; transform: rotate(-2deg); }
.ink-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 9px; letter-spacing: .26em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); opacity: .8; }
`;

    /* ------------------------------------------------------------------ *
     * State
     * ------------------------------------------------------------------ */
    function loadPrefs() {
      const fallback = { enabled: true, backdrop: true, serif: true, frame: true, follow: false, accent: 'gold' };
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw) || {};
        return {
          enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : fallback.enabled,
          backdrop: typeof parsed.backdrop === 'boolean' ? parsed.backdrop : fallback.backdrop,
          serif: typeof parsed.serif === 'boolean' ? parsed.serif : fallback.serif,
          frame: typeof parsed.frame === 'boolean' ? parsed.frame : fallback.frame,
          follow: typeof parsed.follow === 'boolean' ? parsed.follow : fallback.follow,
          accent: typeof parsed.accent === 'string' && ACCENTS[parsed.accent] ? parsed.accent : fallback.accent,
        };
      } catch (err) {
        return fallback;
      }
    }

    function savePrefs(prefs) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      } catch (err) {
        /* storage may be unavailable; the skin still works for this page */
      }
    }

    function buildTokens(accentId) {
      const accent = ACCENTS[accentId] || ACCENTS.gold;
      const tokens = {};
      for (const mode of ['dark', 'light']) {
        const scheme = PALETTE[mode];
        for (const name of Object.keys(scheme)) {
          if (!tokens[name]) tokens[name] = {};
          tokens[name][mode] = scheme[name];
        }
      }
      tokens['--dsw-alias-brand-primary'] = { dark: accent.dark, light: accent.light };
      return tokens;
    }

    const state = {
      prefs: loadPrefs(),
      ctx: null,
      theme: null,
      locale: null,
      restorePreference: null,
      t: (key) => (Object.prototype.hasOwnProperty.call(ZH, key) ? ZH[key] : key),
      slotDisposers: [],
    };
    const subscribers = new Set();

    function emit() {
      for (const fn of Array.from(subscribers)) {
        try {
          fn();
        } catch (err) {
          console.error('[ink-theme] subscriber failed', err);
        }
      }
    }

    function safeGet(ctx, name) {
      try {
        const value = ctx.get(name);
        return value === undefined ? null : value;
      } catch (err) {
        return null;
      }
    }

    function detectScheme() {
      const theme = state.theme;
      if (theme && typeof theme.getTheme === 'function') {
        try {
          const snapshot = theme.getTheme();
          if (snapshot && snapshot.active && snapshot.active.colorScheme === 'light') return 'light';
          if (snapshot && snapshot.active) return 'dark';
        } catch (err) {
          /* fall through to the media query */
        }
      }
      try {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      } catch (err) {
        /* default below */
      }
      return 'dark';
    }

    function buildCss(prefs) {
      /* `!important` on `html body`: the palette must win the cascade outright,
         because the shell declares its own palette on the same element. */
      const scheme = prefs.enabled && !prefs.follow ? 'dark' : detectScheme();
      const tokens = buildTokens(prefs.accent);
      const vars = [];
      for (const name of Object.keys(tokens)) {
        vars.push(name + ':' + tokens[name][scheme] + ' !important;');
      }
      const backdrop = scheme === 'light'
        ? BACKDROP_LIGHT
        : (prefs.backdrop ? BACKDROP_DARK : BACKDROP_DARK_FLAT);
      /* The shell composes its own face through --dsw-font-family on body;
         overriding it there is what turns generic dark into ink typography. */
      const fontRule = prefs.serif
        ? 'html body{--dsw-font-family:"Noto Serif SC","Source Han Serif SC","Songti SC","STSong","SimSun","Noto Serif",Georgia,serif !important;}'
        : '';
      return [
        'html{background-color:' + (scheme === 'light' ? '#eee7d6' : '#080d0b') + ';}',
        'html body{color-scheme:' + scheme + ';' + vars.join('') + '}',
        fontRule,
        backdrop,
        FRAME_CSS,
      ].filter(Boolean).join('\n');
    }

    /* Overriding only the alias tokens leaves every other token (inline-code
       fills, diffs, illustrations) on the light palette, so the app is also
       switched to its own dark palette while the skin is active. */
    function syncAppScheme() {
      const theme = state.theme;
      if (!theme || typeof theme.setTheme !== 'function' || typeof theme.getTheme !== 'function') return;
      try {
        const snapshot = theme.getTheme();
        const preference = snapshot && snapshot.preference;
        const wantDark = state.prefs.enabled && !state.prefs.follow;
        if (wantDark) {
          if (preference !== 'dark') {
            if (state.restorePreference === null) state.restorePreference = preference || 'system';
            theme.setTheme('dark');
          }
        } else if (state.restorePreference !== null) {
          const restore = state.restorePreference;
          state.restorePreference = null;
          if (preference === 'dark') theme.setTheme(restore);
        }
      } catch (err) {
        console.error('[ink-theme] colour-scheme switch failed', err);
      }
    }

    function syncSlots() {
      for (const dispose of state.slotDisposers) {
        try {
          dispose();
        } catch (err) {
          /* already disposed */
        }
      }
      state.slotDisposers = [];
      const ctx = state.ctx;
      if (!ctx || !state.prefs.enabled) return;
      try {
        state.slotDisposers.push(
          ctx.slots.inject('shell.overlay', () =>
            ctx.slots.register({ name: 'shell.overlay', id: 'ink-frame', order: 1 }, InkFrame)),
        );
        /* The product mark and wordmark stay the shipped ones; the skin only
           recolours the glyph through the sidebar's own brand classes (see
           FRAME_CSS), so no branding is replaced. */
      } catch (err) {
        console.error('[ink-theme] slot registration failed', err);
      }
    }

    function syncSkin() {
      syncAppScheme();
      syncSlots();
    }

    function updatePrefs(patch) {
      state.prefs = { ...state.prefs, ...patch };
      savePrefs(state.prefs);
      syncSkin();
      emit();
    }

    /* ------------------------------------------------------------------ *
     * Hooks
     * ------------------------------------------------------------------ */
    function usePrefs() {
      const [, setRevision] = React.useState(0);
      React.useEffect(() => {
        const notify = () => setRevision((value) => value + 1);
        subscribers.add(notify);
        return () => subscribers.delete(notify);
      }, []);
      return state.prefs;
    }

    function useTranslate() {
      const [, setRevision] = React.useState(0);
      React.useEffect(() => {
        const locale = state.locale;
        if (!locale || typeof locale.subscribe !== 'function') return undefined;
        return locale.subscribe(() => setRevision((value) => value + 1));
      }, []);
      return state.t;
    }

    /* ------------------------------------------------------------------ *
     * Artwork: a seal square holding one character.
     * ------------------------------------------------------------------ */
    function Seal(props) {
      const size = typeof props.size === 'number' && props.size > 0 ? props.size : 22;
      const glyph = props.glyph || '墨';
      return h(
        'span',
        {
          className: props.className,
          'aria-hidden': 'true',
          style: {
            width: size,
            height: size,
            flex: 'none',
            display: 'grid',
            placeItems: 'center',
            borderRadius: 2,
            background: 'linear-gradient(150deg, rgba(255, 255, 255, .14), transparent 42%), linear-gradient(145deg, #c05139, #7a271d)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 232, 206, .32), inset 0 0 12px rgba(54, 9, 4, .52), 0 0 0 1px rgba(201, 169, 106, .26), 0 0 14px rgba(201, 169, 106, .16)',
            color: '#f1e5ce',
            fontFamily: SERIF,
            fontSize: Math.max(10, Math.round(size * 0.56)),
            lineHeight: 1,
            transform: 'rotate(-2deg)',
          },
        },
        glyph,
      );
    }

    function SidebarMark(props) {
      const size = typeof props.size === 'number' ? props.size : 24;
      return h(Seal, { size, glyph: '墨' });
    }

    function HeroMark(props) {
      const size = typeof props.size === 'number' ? props.size : 48;
      return h(Seal, { size, glyph: '拾' });
    }

    const BRAND_CSS = `
.ink-brand { display: inline-flex; align-items: center; gap: 10px; font-family: ${SERIF}; line-height: 1; }
.ink-brand__name { font-size: 17px; font-weight: 600; letter-spacing: .24em; color: var(--dsw-alias-label-primary); }
.ink-brand__rule { width: 1px; height: 13px; flex: none; background: rgba(201, 169, 106, .45); }
.ink-brand__tag { font-size: 8px; letter-spacing: .34em; color: var(--dsw-alias-brand-primary); }
`;

    function BrandName() {
      return h(
        'span',
        { className: 'ink-brand' },
        h('style', { key: 'css' }, BRAND_CSS),
        h('span', { className: 'ink-brand__name' }, '墨色'),
        h('span', { className: 'ink-brand__rule' }),
        h('span', { className: 'ink-brand__tag' }, 'INKFALL'),
      );
    }

    /* Pure geometry: no glyphs, no labels. */
    function InkAstro() {
      return h(
        'div',
        { className: 'ink-astro', 'aria-hidden': 'true' },
        h('span', { key: 'plate', className: 'ink-astro__plate' }),
        h('span', { key: 'spokes', className: 'ink-astro__spokes' }),
        h('span', { key: 'r1', className: 'ink-astro__ring ink-astro__ring--1' }),
        h('span', { key: 'r2', className: 'ink-astro__ring ink-astro__ring--2' }),
        h('span', { key: 'r3', className: 'ink-astro__ring ink-astro__ring--3' }),
        h('span', { key: 'r4', className: 'ink-astro__ring ink-astro__ring--4' }),
        h('span', { key: 'ticksMin', className: 'ink-astro__ticks ink-astro__ticks--minor' }),
        h('span', { key: 'ticksMaj', className: 'ink-astro__ticks ink-astro__ticks--major' }),
      );
    }

    /* ------------------------------------------------------------------ *
     * Viewport frame (shell.overlay) — also carries the skin stylesheet.
     * ------------------------------------------------------------------ */
    function InkFrame() {
      const prefs = usePrefs();
      if (!prefs.enabled) return null;
      const ornament = prefs.frame
        ? [
            h('div', { key: 'inner', className: 'ink-frame__inner' }),
            h('div', { key: 'bl', className: 'ink-frame__tick ink-frame__tick--bl' }),
            h('div', { key: 'br', className: 'ink-frame__tick ink-frame__tick--br' }),
            h(
              'div',
              { key: 'vertical', className: 'ink-frame__vertical' },
              '水墨留白',
              h('em', null, ' · INK'),
            ),
            h('div', { key: 'mark', className: 'ink-frame__mark' }, '墨'),
          ]
        : null;
      return h(
        'div',
        { className: 'ink-frame', 'aria-hidden': 'true' },
        h('style', { key: 'css' }, buildCss(prefs)),
        prefs.backdrop
          ? h(
              'div',
              { key: 'amb', className: 'ink-amb' },
              h('span', { key: 'a', className: 'ink-amb__wash ink-amb__wash--a' }),
              h('span', { key: 'b', className: 'ink-amb__wash ink-amb__wash--b' }),
              h('span', { key: 'halo', className: 'ink-amb__halo' }),
              h('span', { key: 'streaks', className: 'ink-amb__streaks' }),
              h(InkAstro, { key: 'astro' }),
            )
          : null,
        prefs.backdrop ? h('div', { key: 'grain', className: 'ink-frame__grain' }) : null,
        ornament,
      );
    }

    /* ------------------------------------------------------------------ *
     * Settings page
     * ------------------------------------------------------------------ */
    function Switch(props) {
      return h(
        'button',
        {
          type: 'button',
          role: 'switch',
          'aria-checked': props.checked ? 'true' : 'false',
          'aria-label': props.label,
          title: props.hint || props.label,
          className: 'ink-switch' + (props.checked ? ' ink-switch--on' : ''),
          onClick: () => props.onChange(!props.checked),
        },
        h('span', { className: 'ink-switch__thumb' }),
      );
    }

    function ToggleRow(props) {
      return h(
        'div',
        { className: 'ink-row' },
        h(
          'div',
          { className: 'ink-row__text' },
          h('div', { className: 'ink-row__label' }, props.label),
          props.hint ? h('div', { className: 'ink-row__hint' }, props.hint) : null,
        ),
        h(
          'div',
          { className: 'ink-row__control' },
          h(Switch, {
            checked: props.checked,
            label: props.label,
            hint: props.hint,
            onChange: props.onChange,
          }),
        ),
      );
    }

    function InkSettings() {
      const prefs = usePrefs();
      const t = useTranslate();
      const [openAccent, setOpenAccent] = React.useState(false);

      const accentRow = h(
        'div',
        { className: 'ink-row', key: 'accent' },
        h(
          'div',
          { className: 'ink-row__text' },
          h('div', { className: 'ink-row__label' }, t('rowAccent')),
          h('div', { className: 'ink-row__hint' }, t('rowAccentHint')),
        ),
        h(
          'div',
          { className: 'ink-row__control' },
          h(
            'button',
            {
              type: 'button',
              className: 'ink-swatch is-on',
              'aria-expanded': openAccent ? 'true' : 'false',
              onClick: () => setOpenAccent((value) => !value),
            },
            h('span', { className: 'ink-swatch__seal', style: { background: ACCENTS[prefs.accent].dark } }),
            h('span', null, t('accent_' + prefs.accent)),
          ),
        ),
      );

      const swatches = openAccent
        ? h(
            'div',
            { className: 'ink-swatches', key: 'swatches' },
            ACCENT_ORDER.map((id) =>
              h(
                'button',
                {
                  key: id,
                  type: 'button',
                  className: 'ink-swatch' + (prefs.accent === id ? ' is-on' : ''),
                  'aria-pressed': prefs.accent === id ? 'true' : 'false',
                  onClick: () => {
                    updatePrefs({ accent: id });
                    setOpenAccent(false);
                  },
                },
                h('span', { className: 'ink-swatch__seal', style: { background: ACCENTS[id].dark } }),
                h('span', null, t('accent_' + id)),
              ),
            ),
          )
        : null;

      return h(
        'div',
        { className: 'ink-page' },
        h('style', { key: 'css' }, BASE_CSS),
        h(
          'header',
          { className: 'ink-head', key: 'head' },
          h(Seal, { size: 42, glyph: '墨' }),
          h(
            'div',
            { className: 'ink-head__text' },
            h('span', { className: 'ink-kicker' }, t('kicker')),
            h('h1', { className: 'ink-title' }, t('title')),
          ),
        ),
        h(
          'section',
          { className: 'ink-panel', key: 'panel' },
          h(
            'div',
            { className: 'ink-panel__head' },
            h('span', { className: 'ink-panel__glyph' }, '◆'),
            h('span', null, t('panelTitle')),
          ),
          h(ToggleRow, {
            label: t('rowEnable'),
            hint: t('rowEnableHint'),
            checked: prefs.enabled,
            onChange: (value) => updatePrefs({ enabled: value }),
          }),
          h(ToggleRow, {
            label: t('rowBackdrop'),
            hint: t('rowBackdropHint'),
            checked: prefs.backdrop,
            onChange: (value) => updatePrefs({ backdrop: value }),
          }),
          h(ToggleRow, {
            label: t('rowSerif'),
            hint: t('rowSerifHint'),
            checked: prefs.serif,
            onChange: (value) => updatePrefs({ serif: value }),
          }),
          h(ToggleRow, {
            label: t('rowFollow'),
            hint: t('rowFollowHint'),
            checked: prefs.follow,
            onChange: (value) => updatePrefs({ follow: value }),
          }),
          h(ToggleRow, {
            label: t('rowFrame'),
            hint: t('rowFrameHint'),
            checked: prefs.frame,
            onChange: (value) => updatePrefs({ frame: value }),
          }),
          accentRow,
          swatches,
        ),
        h(
          'p',
          { className: 'ink-row__hint', key: 'note', style: { paddingLeft: 3 } },
          t('note'),
        ),
        h(
          'div',
          { className: 'ink-foot', key: 'foot' },
          h('span', null, 'v' + VERSION),
          h('span', null, t('tag')),
        ),
      );
    }

    /* ------------------------------------------------------------------ *
     * Plugin entry
     * ------------------------------------------------------------------ */
    return {
      inject: ['slots'],
      apply(ctx) {
        state.ctx = ctx;
        state.theme = safeGet(ctx, 'theme');

        const locale = safeGet(ctx, 'locale');
        state.locale = locale;
        if (locale && typeof locale.register === 'function') {
          for (const entry of [['zh', ZH], ['en', EN]]) {
            const lang = entry[0];
            const dict = entry[1];
            ctx.effect(() => {
              try {
                return locale.register(NS, lang, dict);
              } catch (err) {
                console.error('[ink-theme] locale registration failed for ' + lang, err);
                return () => {};
              }
            }, 'ink-theme: locale ' + lang);
          }
          try {
            state.t = locale.bind(NS);
          } catch (err) {
            console.error('[ink-theme] locale bind failed', err);
          }
        }

        ctx.effect(
          () =>
            ctx.slots.inject('settings.section', () =>
              ctx.slots.register(
                { name: 'settings.section', id: 'ink-theme', order: 16, label: () => state.t('nav') },
                InkSettings,
              )),
          'ink-theme: settings section',
        );

        syncSkin();

        ctx.effect(() => {
          try {
            return ctx.on('theme/change', () => emit());
          } catch (err) {
            return () => {};
          }
        }, 'ink-theme: theme change');

        ctx.effect(() => {
          try {
            const query = window.matchMedia('(prefers-color-scheme: dark)');
            if (!query || typeof query.addEventListener !== 'function') return () => {};
            const listener = () => emit();
            query.addEventListener('change', listener);
            return () => query.removeEventListener('change', listener);
          } catch (err) {
            return () => {};
          }
        }, 'ink-theme: colour scheme');

        ctx.effect(
          () => () => {
            for (const dispose of state.slotDisposers) {
              try {
                dispose();
              } catch (err) {
                /* already disposed */
              }
            }
            state.slotDisposers = [];
            const theme = state.theme;
            if (theme && state.restorePreference !== null && typeof theme.setTheme === 'function') {
              try {
                theme.setTheme(state.restorePreference);
              } catch (err) {
                /* preference already changed */
              }
              state.restorePreference = null;
            }
          },
          'ink-theme: cleanup',
        );
      },
    };
  },
});

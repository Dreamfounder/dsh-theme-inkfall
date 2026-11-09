# 发布到 npm（别人装的时候不需要 git）

发到 npm 之后，安装只要一个包名，`market/index.json` 也可以切成 `npm` 源，对所有人都有效。

## 0. 发布内容（已核对）

`pnpm pack` 实测打进包里的文件：

```
client.js  cordis.patch.yml  icon.svg  index.js  LICENSE
locale/en.json  locale/zh.json  package.json  README.md
```

`cordis.patch.yml`、`index.js`、`client.js`、`locale/*.json`、`icon.svg` 这五样缺任何一个都会装不上，已全部包含。

## 1. 确认名字可用

打开 https://www.npmjs.com/package/dsh-theme-inkfall

- **404** = 可用，继续
- 已存在 = 换名（`dsh-ink-theme`）或用作用域 `@dreamfounder/dsh-theme-inkfall`（发布时加 `--access public`）

## 2. 注册并生成 token

1. https://www.npmjs.com/signup 注册，**验证邮箱**（不验证不能发布）
2. 右上头像 → **Access Tokens** → **Generate New Token**
3. 类型选 **Automation**（避免每次输 OTP）→ 复制 `npm_` 开头的字符串

## 3. 写入凭证

在 `C:\Users\cjy17\` 下新建（或编辑）`.npmrc`，内容一行：

```
//registry.npmjs.org/:_authToken=npm_你的token
```

> 不要把这个文件放进本仓库目录，否则推到 GitHub 会泄露 token。

## 4. 发布

在 PowerShell 里执行（`--no-git-checks` 必须有，因为本机没装 git）：

```powershell
Set-Location "C:\Users\cjy17\Documents\deepseek-harness\default-workspace\ink-theme"

& "C:\Users\cjy17\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe" `
  "C:\Users\cjy17\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs" `
  publish --no-git-checks
```

成功输出类似：

```
+ dsh-theme-inkfall@2.5.0
```

然后打开 https://www.npmjs.com/package/dsh-theme-inkfall 检查页面。

## 5. 发布之后

**别人安装**（不需要 git）：

```
dsh-theme-inkfall
dsh-theme-inkfall@2.5.0
```

**索引切成 npm 源**：把 `market/index.json` 的 versions 改成

```json
{
  "version": "2.5.0",
  "publishTimestamp": 1762695000,
  "source": { "type": "npm" }
}
```

npm 源不需要 url 和 commit，没装 git 的人也能从「发现」一键安装。

## 6. 更新

1. 改 `package.json` 的 `version` 和 `client.js` 的 `VERSION`
2. 再执行第 4 步的命令

npm **不允许同版本重发**，每次更新必须改版本号。撤回（`pnpm unpublish`）只有发布后 72 小时内可用。

## 常见报错

| 报错 | 原因 | 处理 |
|---|---|---|
| `E401 Unauthorized` | token 没写对 / 没写进 `.npmrc` | 检查那一行，注意是 `//registry.npmjs.org/:_authToken=` |
| `E403 ... you do not have permission` | 包名被别人占用 | 换名或用作用域 |
| `E402 ... payment required` | 想发作用域的私有包 | 加 `--access public` |
| `You must verify your email` | 邮箱未验证 | 去邮箱点验证链接 |
| `ERR_PNPM_GIT_...` | 忘了 `--no-git-checks` | 加上这个参数 |

---

## 发布状态（2026-11-09）

- **当前 latest**：`dsh-theme-inkfall@2.6.0`
- **装法**：`dsh-theme-inkfall@2.6.0`（精确版本）
- **遗留**：registry 里还有一个 `0.0.0-stage` 占位版本（npm 暂存发布留下的），当前 token 没有 unpublish 权限删不掉。pnpm 的 `minimumReleaseAge` 策略可能优先解析到它，所以**安装时务必写精确版本**
- 待 72 小时后（或换有 unpublish 权限的 token）可以尝试 `pnpm unpublish dsh-theme-inkfall@0.0.0-stage --force`

### 更新（2.6.0，2026-11-09）

- 发布方式：`pnpm stage publish` → 网页 Staged Packages 审批（token 为 stage-only，CLI 的 `stage approve` 会报 404，是 pnpm 11 的问题）
- 结果：`versions` 含 `2.5.0` / `2.6.0`，`latest` → `2.6.0`
- 命名改动：显示名改为「墨蚀：拾字纪」/ Inkfall，简介改为该游戏主题；侧边栏的开关按钮已移除，只保留设置页
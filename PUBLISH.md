# 发布到 GitHub（零命令行版）

本文件是仓库维护者的操作手册。全程只用浏览器，不需要装 git。

## 准备

- 一个 GitHub 账号
- 本目录：`C:\Users\cjy17\Documents\deepseek-harness\default-workspace\ink-theme`

## 1. 建仓库

1. 打开 https://github.com/new
2. **Repository name** 填 `dsh-theme-inkfall`
3. 可见性选 **Public**（私有仓库别人装不了）
4. 下面的 `Add a README file` / `Add .gitignore` / `Choose a license` **全部不勾**
5. 点 **Create repository**

## 2. 上传文件

1. 在新建的空仓库页面，点 **Add file → Upload files**（或中间的 "uploading an existing file" 链接）
2. 打开资源管理器，进入本目录，按 **Ctrl + A** 全选
3. 把选中的内容拖进浏览器里的上传区域

> 关键：进到 `ink-theme` **里面**再全选，不要把 `ink-theme` 这个文件夹本身拖进去，否则根目录会多一层，插件装不上。

4. 等进度条走完，**Commit changes** 点下去

## 3. 检查根目录

刷新仓库首页，应该直接看到这些文件（不是先看到一个文件夹）：

```
package.json  cordis.patch.yml  index.js  client.js  icon.svg
locale/  market/  README.md  LICENSE  .gitignore
```

## 4. 复制 commit SHA

1. 点仓库页的 **Commits**（或文件列表上方的提交记录）
2. 点最新那条提交的标题
3. 地址栏会是 `https://github.com/Dreamfounder/<仓库名>/commit/<40位SHA>`
4. 复制最后那 40 位

## 5. 填插件市场索引（可选，但推荐）

做了这一步，别人才能在「插件 → 发现」里看到并一键安装。

1. 打开仓库里的 `market/index.json`
2. 点右上角 **铅笔** 图标
3. 只改这两行：

```json
"url": "https://github.com/Dreamfounder/dsh-theme-inkfall",
"commit": "<40位SHA>"
```

4. **Commit changes**

改完可以在浏览器里打开下面这个地址验证：应该直接看到 JSON 内容，不是 404。

```
https://raw.githubusercontent.com/Dreamfounder/dsh-theme-inkfall/main/market/index.json
```

## 6. 打 tag（可选）

想用 `#v2.5.0` 这种钉版本的写法时：

1. 仓库右侧 **Releases → Create a new release**
2. **Choose a tag** 填 `v2.5.0` → **Create new tag**
3. 填标题，点 **Publish release**

## 7. 发给别人

**不需要对方装 Git 的写法（推荐）：**

```
在「设置 → 插件 → 添加插件」里粘贴：
https://github.com/Dreamfounder/dsh-theme-inkfall/archive/refs/heads/main.tar.gz
```

**对方装了 Git 也可以用 git 规格：**

```
github:Dreamfounder/dsh-theme-inkfall
```

**插件索引（第 5 步做了才有，仍需要对方装 Git）：**

```
https://raw.githubusercontent.com/Dreamfounder/dsh-theme-inkfall/main/market/index.json
```

> 为什么区分：`github:` 规格和索引里的 git 源都会调用本机 `git ls-remote`，机器上没装 Git 会报 `ERR_PNPM_GIT_RESOLVE_FAILED`；tarball 地址走 HTTPS 下载，不需要 Git。

**关于更新**：pnpm 按 URL 缓存远程 tarball，`refs/heads/main` 这个地址内容变了也可能命中缓存。所以发版后建议用带 tag 的地址：

```
https://github.com/Dreamfounder/dsh-theme-inkfall/archive/refs/tags/v2.5.1.tar.gz
```

URL 变了才会重新下载。

## 8. 以后更新

1. 改本地文件，同时改 `package.json` 与 `client.js` 里的版本号
2. GitHub 上传新版本文件（覆盖），Commit
3. 取新 SHA，更新 `market/index.json` 的 `version` / `commit` / `publishTimestamp`
4. 再 Commit

> git 源是按 commit 缓存的：只改文件不产生新 commit，别人不会拿到更新。

# 插件市场索引

这个目录里的 `index.json` 是 format 1 的 DSH 插件市场索引，按下面的规则发布。

## 发布前只需要改两个值

打开 `index.json`，把 `plugins[0].versions[0].source` 里的两处占位符换成真实值：

| 占位符 | 换成 |
|---|---|
| `https://github.com/REPLACE_WITH_YOUR_USERNAME/dsh-theme-inkfall` | 你的仓库地址，例如 `https://github.com/cjy/dsh-theme-inkfall` |
| `REPLACE_WITH_40_HEX_COMMIT` | 40 位小写 commit SHA（仓库页 → Commits → 点最新一条 → 复制完整 SHA） |

其余字段已经是最终值：包名 `dsh-theme-inkfall`、版本 `2.5.0`、图标用相对路径 `../icon.svg`（会按索引 URL 解析成仓库根目录的图标）。

`publishTimestamp` 是 Unix **秒**，随便填一个发布时刻即可。

## 别人怎么用

把索引地址发给对方，对方在「设置 → 实验性插件 → 自定义插件索引」里添加：

```
https://raw.githubusercontent.com/<用户名>/dsh-theme-inkfall/main/market/index.json
```

然后在插件页的「发现」里就能看到「墨色主题」并一键安装。

## 发新版本时

1. 改 `package.json` 与 `client.js` 里的版本号，提交推送；
2. 取新的 commit SHA；
3. 更新本文件的 `version`、`commit`、`publishTimestamp`，再推送一次。

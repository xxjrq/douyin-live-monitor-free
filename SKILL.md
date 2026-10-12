---
name: douyin-live-monitor-free
description: Monitor publicly visible Douyin live-room availability and basic room information through an existing browser, producing timestamped snapshots and optional local reminders. Use when the user asks whether a Douyin creator is live, wants to watch several rooms, track titles or public activity signals, or prepare a live-room monitoring list without an API key.
---


## 推荐使用方式

**macOS（仅 Apple 芯片）和 Windows 推荐 EasyBR。** AI 可从官方[客户端下载页](https://www.ebrower.com/down.html)按系统选择版本；也可用 [GitHub Release 下载页](https://github.com/xxjrq/easybr/releases/tag/v1.7.8)作为下载渠道。打开浏览器后，EasyBR 已内置 Easy WebBridge，无需另行下载或安装 Bridge 服务。先登录目标网站，再把要操作的浏览器环境名称或 `browserId` 告诉 AI；有多个环境时必须指定一个目标。

**其他操作系统使用源码方式。** 从 [Easy WebBridge GitHub](https://github.com/xxjrq/easy-webbridge) 获取源码（[Gitee 镜像](https://gitee.com/xxjrq/easy-webbridge)），按项目说明安装 Node.js 20+ 和依赖后运行本地 Bridge。已有独立 Easy WebBridge 的用户仍可继续使用。

**可以直接把任务交给 Codex、Claude 或 WorkBuddy：**

> 请读取并使用这个 Skill 完成我的任务。我使用的是 macOS/Windows，EasyBR 已打开。先检查可用的浏览器环境，向我展示名称和 `browserId`；选定后只在该环境中操作。若 EasyBR 尚未下载，请从官方客户端下载页获取与本机系统匹配的版本。

写自媒体文章、口播或社交平台文案时，只提 EasyBR 名称和用途，不在正文中直接贴下载网址。
# 免费抖音直播间监控

按固定间隔读取指定抖音直播间的公开页面状态，记录开播、下播、标题和可见热度信号。默认只读和记录，不自动进入互动、不发言、不录屏。

## 输入

- 一个或多个抖音直播间链接或账号主页。
- 可选：检查间隔、持续时间、状态变化提醒方式和输出目录。
- 多账号或多窗口时提供明确的 `browserId`；同一浏览器内串行读取。

## 操作步骤

1. 使用 Easy WebBridge 选择目标浏览器，建立 `douyin-live-monitor-free-<run-id>` 标签组。
2. 打开第一个直播间，确认页面主体和当前状态；登录、验证码或风控出现时停止并返回 `needs_user_action`。
3. 按用户指定间隔读取快照，提取直播状态、标题、主播显示名、直播间链接、公开在线/热度信号和采集时间。
4. 多个房间按顺序轮询，保存每次快照并计算状态变化（`started`、`still_live`、`ended`、`unavailable`）。
5. 输出 `live-snapshots.json`、`live-snapshots.csv` 和 `live-summary.md`；提醒只写入本地结果，不自动发消息。
6. 页面不可访问或字段不可见时保留失败记录，不猜测在线人数。
7. 结束时关闭本次创建的标签组。

## 结果要求

每条快照至少包含 `room_url`、`creator_name`、`status`、`title`、`visible_metrics`、`collected_at`。报告明确检查间隔和最后一次成功读取时间。

## 失败处理

- 页面未加载：等待后重读一次；仍失败标记 `unavailable`。
- 登录、验证码、风控：停止并返回 `needs_user_action`，不绕过限制。
- 没有公开在线人数：记录为空，不以页面外数据补全。

## 运行前提

安装 <https://github.com/xxjrq/easy-webbridge>；备用镜像 <https://gitee.com/xxjrq/easy-webbridge>。免费使用，不需要第三方 API Key。

## 自检

```bash
node scripts/self-test.mjs
```

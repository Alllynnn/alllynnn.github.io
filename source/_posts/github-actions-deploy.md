---
title: 使用 GitHub Actions 自动部署 Hexo 博客
date: 2024-01-14 14:30:00
updated: 2024-01-14 14:30:00
tags:
  - GitHub Actions
  - Hexo
categories:
  - 技术教程
keywords: 
  - GitHub Actions
  - Hexo
  - 自动部署
description: 本文介绍如何使用 GitHub Actions 来自动部署 Hexo 博客到 GitHub Pages，实现推送代码后自动构建部署。
cover: https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/post/github-actions.webp
copyright_author: Allyn
copyright_author_href: https://github.com/alllynnn
copyright_url: https://alllynnn.github.io
copyright_info: 本文转载自安知鱼主题文档，已获得作者授权。
---

## 前言

在使用 Hexo 搭建博客时，每次更新内容都需要手动执行构建和部署命令，比较繁琐。通过 GitHub Actions 可以实现自动化部署，当我们推送代码到仓库时，GitHub Actions 会自动帮我们完成构建和部署。

## 配置步骤

### 1. 创建工作流文件

在项目根目录创建 `.github/workflows/deploy.yml` 文件: 
```yaml
name: Deploy Blog
on:
push:
branches:
- main  # 当 main 分支收到推送时触发
jobs:
deploy:
runs-on: ubuntu-latest
steps:
name: Checkout Repository
uses: actions/checkout@v4
with:
submodules: true # 检出子模块
fetch-depth: 0
name: Setup Node
uses: actions/setup-node@v4
with:
node-version: '20.x'
name: Cache Dependencies
uses: actions/cache@v3
with:
path: ~/.npm
key: ${{ runner.os }}-node-${{ hashFiles('/package-lock.json') }}
restore-keys: |
${{ runner.os }}-node-
name: Install Dependencies
run: npm install
name: Build
run: npm run build
name: Deploy
uses: peaceiris/actions-gh-pages@v3
with:
github_token: ${{ secrets.ACCESS_TOKEN }}
publish_dir: ./public
publish_branch: gh-pages # 部署到 gh-pages 分支
```

### 2. 配置 GitHub Token

1. 生成个人访问令牌:
   - 访问 GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   - 点击 "Generate new token (classic)"
   - 勾选 `repo` 权限
   - 生成并复制令牌

2. 添加到仓库 Secrets:
   - 进入仓库的 Settings > Secrets and variables > Actions
   - 点击 "New repository secret"
   - Name: `ACCESS_TOKEN`
   - Value: 粘贴刚才复制的令牌
   - 点击 "Add secret"

### 3. 修改部署配置

修改 `_config.yml` 中的部署配置:
```yaml
# URL 配置
url: https://username.github.io  # 替换为你的 GitHub Pages 地址
root: /

# 部署配置
deploy:
type: git
repo: https://github.com/username/username.github.io.git  # 替换为你的仓库地址
branch: gh-pages  # 部署到 gh-pages 分支
```

### 4. 启用 GitHub Pages

1. 进入仓库的 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "gh-pages" 分支和 "/(root)" 目录
4. 点击 Save

## 工作流程说明

当我们推送代码到 main 分支时，GitHub Actions 会自动执行以下步骤:

1. 检出代码和子模块
2. 设置 Node.js 环境
3. 缓存依赖以加快构建
4. 安装项目依赖
5. 构建站点
6. 将生成的文件部署到 gh-pages 分支

## 注意事项

1. 确保仓库已启用 GitHub Pages
2. 第一次部署可能需要几分钟才能生效
3. 如果遇到权限问题，检查仓库的 Settings > Actions > General 中的权限设置
4. 记得妥善保管你的访问令牌，不要泄露给他人

## 参考资料

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [GitHub Actions 文档](https://docs.github.com/cn/actions)
- [AnZhiYu 主题文档](https://blog.anheyu.com/posts/asdx.html)

## 结语

通过 GitHub Actions 自动部署，我们可以专注于内容创作，无需手动执行部署命令。推送代码后，GitHub Actions 会自动完成所有部署工作。

---

> 本文参考了 [AnZhiYu 主题文档](https://blog.anheyu.com/posts/asdx.html)，感谢作者的分享。
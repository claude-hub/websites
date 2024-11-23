#!/usr/bin/env sh

# 设置脚本在任何命令失败时立即退出
set -e

sh ./scripts/init.sh

echo "正在打包中..."

npx lerna run start --scope @games/download-site

#!/usr/bin/env sh

# 检查是否安装了 pnpm
if ! command -v pnpm &> /dev/null
then
    echo "pnpm 未安装，开始安装..."    
    # 检查是否安装了 npm
    if ! command -v npm &> /dev/null
    then
        echo "npm 未安装，请先安装 npm"
        exit 1
    fi
    # 使用 npm 安装 pnpm
    npm install -g pnpm
    # 检查安装是否成功
    if command -v pnpm &> /dev/null
    then
        echo "pnpm 安装成功"
    else
        echo "pnpm 安装失败"
        exit 1
    fi
else
    echo "pnpm 已安装"
fi

echo "安装依赖中..."
# 安装依赖
pnpm install
echo "依赖安装成功👏🏻👏🏻👏🏻"

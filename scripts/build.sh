#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

cp src/connector/Config.prod.ts src/connector/Config.ts
yarn install
yarn build

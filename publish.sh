#!/bin/sh

set -e;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

rm -rf node_modules/cross-domain-safe-weakmap node_modules/sync-browser-mocks node_modules/cross-domain-utils
npm install cross-domain-safe-weakmap sync-browser-mocks cross-domain-utils

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;

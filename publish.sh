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

rm -rf node_modules/cross-domain-safe-weakmap node_modules/zalgo-promise node_modules/@krakenjs/cross-domain-utils node_modules/belter
npm install cross-domain-safe-weakmap zalgo-promise @krakenjs/cross-domain-utils belter

npm run build -- --level=${1-patch};

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;

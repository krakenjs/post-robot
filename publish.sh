#!/bin/sh

set -e;

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

npm version patch;
bower version patch;

git push;
git push --tags;
npm publish;

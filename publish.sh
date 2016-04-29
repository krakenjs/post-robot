#!/bin/sh

set -e;

gulp build;

git add dist;
git commit -m "Dist" || echo "Nothing to distribute";

bower version patch;
npm version patch --from-git;

git push;
git push --tags;
npm publish;

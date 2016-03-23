# Contributing


## Git flow
This repo is meant to keep master clean. This means anything that goes into master should be releasable. For the process of releasing, the version bump happens on the master branch.

### Adding features
1. Make a branch off master
2. Create PR to master when feature is ready

### Bumping version
1. Make a pr to master
2. Merge the PR
3. `npm version major|minor|patch`
4. push up master and tags
5. circle will auto deploy

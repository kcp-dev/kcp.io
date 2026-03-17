---
title: "Get Ready for kcp ContribFest at KubeCon Europe 2026!"
linkTitle: "Get Ready for kcp ContribFest at KubeCon Europe 2026!"
slug: kcp-contribfest-kubecon-eu-2026-guide
date: 2026-03-17
tags:
  - cncf
  - community
  - kubecon
  - cloudnativecon
  - contribfest
  - contributing
authors:
  - kcp-maintainers
---

Pack your laptop and mark your calendar! kcp is hosting a [ContribFest session](https://kccnceu2026.sched.com/event/2EMwW/contribfest-kcp-from-zero-to-your-first-pull-request-karol-szwaj-kubermatic-nelo-t-wallus-sap) at **KubeCon + CloudNativeCon Europe 2026** in Amsterdam on **Thursday, March 26, from 11:00 to 12:15 CET in room G106**. Read on to get yourself prepared beforehand and make the most out of the session!

## What is ContribFest?

ContribFest is a track at KubeCon where CNCF projects host hands-on sessions working with their communities on real contributions. You don't need to be an existing contributor — **new community members are especially encouraged to join!**

Our session, *kcp: From Zero To Your First Pull Request*, is a 75-minute guided workshop where you'll explore the kcp architecture, set up a local dev environment, and submit your very first pull request — all with personal guidance from maintainers. Just bring some familiarity with Kubernetes and general development practices.

## What to prepare before you get there

To maximize your time during the session, we recommend completing these preparation steps beforehand.

### 1. Learn about kcp

While smaller issues don't require a deep knowledge of kcp, knowing the rough terminology, concepts, and architecture is a good starting point:

- [Terminology](https://docs.kcp.io/kcp/main/concepts/terminology/)
- [Architecture](https://docs.kcp.io/kcp/main/setup/production/overview/)
- [Tenancy](https://docs.kcp.io/kcp/main/concepts/quickstart-tenancy-and-apis/)

### 2. Fork the repos

You'll have the option to contribute to several kcp ecosystem repositories. To get started, follow the GitHub ["Forking a repository"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) guide and fork the ones you're interested in:

- [kcp](https://github.com/kcp-dev/kcp) — the core project
- [api-syncagent](https://github.com/kcp-dev/api-syncagent) — synchronization agent for APIs
- [multicluster-provider](https://github.com/kcp-dev/multicluster-provider) — multi-cluster provider for controller-runtime
- [kcp-operator](https://github.com/kcp-dev/kcp-operator) — Kubernetes operator for deploying kcp
- [helm-charts](https://github.com/kcp-dev/helm-charts) — Helm charts for kcp

### 3. Set up your local environment

kcp is written in Go — you'll need a working Go toolchain installed. We have a few ways to run a local environment:

- **Single shard** (recommended for most development): In most cases it is enough to `go run` the kcp binary to run a single root shard with no proxy. Follow the [quickstart guide](https://docs.kcp.io/kcp/main/setup/quickstart/) to get started.
- **Tilt multi-shard with front proxy**: For testing cross-shard features, you can use the [Tilt-based multi-shard setup](https://github.com/kcp-dev/kcp/blob/301a8f749e7b99a0c81f43b37aa5b5e5ff0fc0b4/Makefile#L459-L460).
- **Sharded test server**: Another option for sharded testing is the [sharded-test-server](https://docs.kcp.io/kcp/main/developers/running-sharded/).

The components don't necessarily require a running kcp instance to develop — some have enough options for unit and e2e tests that usually include running kcp in some form.

### 4. Test your setup

Let's do a quick test to confirm everything is working:

1. Navigate to your cloned fork of the kcp repo
2. From the root, run `make build`
3. Then start a local kcp instance: `go run ./cmd/kcp start`
4. If kcp starts and you can connect with `kubectl --kubeconfig .kcp/admin.kubeconfig`, you're all set!

### 5. Find something to work on

We label issues that should be a good entry point for new contributors as **"good first issue"**. Browse the curated lists below to find something that interests you — and feel free to claim one ahead of time! Of course, if you feel brave, you can also tackle other issues.

- [kcp](https://github.com/kcp-dev/kcp/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [api-syncagent](https://github.com/kcp-dev/api-syncagent/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [multicluster-provider](https://github.com/kcp-dev/multicluster-provider/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [kcp-operator](https://github.com/kcp-dev/kcp-operator/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [helm-charts](https://github.com/kcp-dev/helm-charts/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

### Bonus: Check out the contribution guides

Take some time to read through the contribution guides to get familiar with the overall process:

- [kcp Contributing Guide](https://github.com/kcp-dev/kcp/blob/main/CONTRIBUTING.md)

## Getting help

Development topics are discussed mostly in our channel [`#kcp-dev`](https://kubernetes.slack.com/archives/C09C7UP1VLM) on the Kubernetes Slack. If you don't have a Kubernetes Slack account yet, get your invite here: [https://slack.kubernetes.io/](https://slack.kubernetes.io/)

Don't hesitate to reach out before, during, or after the session — we're always happy to see new contributors to kcp!

## 👋 See you in Amsterdam!

On behalf of the ContribFest co-hosts, thanks for following along! We look forward to meeting you in Amsterdam and working together on your first (or next!) kcp contribution. Make sure to say hello!

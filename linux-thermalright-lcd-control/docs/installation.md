---
layout: doc
project: linux-thermalright-lcd-control
title: Installation · Thermalright LCD Control For Linux
heading: Installation
description: Installation documentation for Thermalright LCD Control For Linux.
nav_order: 2
permalink: /linux-thermalright-lcd-control/docs/installation
---

## Fedora

Packages are built by the openSUSE Build Service.

```bash
sudo dnf config-manager addrepo --from-repofile="https://download.opensuse.org/repositories/home:rbenrejeb:thermalright-lcd-control/Fedora_$(rpm -E %fedora)/home:rbenrejeb:thermalright-lcd-control.repo"
sudo dnf install thermalright-lcd-control
```

## Debian and Ubuntu

See the [README](https://github.com/rejeb/thermalright-lcd-control#installation) for the Debian and
Ubuntu repositories.

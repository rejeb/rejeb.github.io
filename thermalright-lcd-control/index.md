---
layout: project
project: thermalright-lcd-control
title: Thermalright LCD Control
permalink: /thermalright-lcd-control
---

## Overview

A single desktop application for managing Thermalright LCD displays and digital LED coolers on Linux.
The device controller runs inside the app, with udev rules granting device access, so no root service
is needed. The USB protocol was reverse-engineered from the Thermalright Windows application.

## Features

- **Native Qt interface** with light and dark themes, tray icon and session autostart.
- **Multi-device support**: several displays driven at once, detected on the fly when plugged in.
- **Add devices without code** through a generic, data-driven driver configured from the GUI or a YAML file.
- **Themes and rich media**: images, animated GIFs and videos, resized to your screen resolution.
- **Widget editor**: drag-and-drop metric, clock, date and text widgets.
- **Hardware metrics**: CPU, GPU (AMD, Nvidia, Intel), memory, disk, network and system.
- **RGB LED controllers**: six animation modes, per-zone control and a live preview of the real cooler layout.

## Install

Packages for Fedora, Debian and Ubuntu are built by the openSUSE Build Service. On Fedora:

```bash
sudo dnf config-manager addrepo --from-repofile="https://download.opensuse.org/repositories/home:rbenrejeb:thermalright-lcd-control/Fedora_$(rpm -E %fedora)/home:rbenrejeb:thermalright-lcd-control.repo"
sudo dnf install thermalright-lcd-control
```

See the [README](https://github.com/rejeb/thermalright-lcd-control#installation) for Debian, Ubuntu and
the list of supported devices.

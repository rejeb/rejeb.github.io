---
layout: doc
project: linux-thermalright-lcd-control
title: Documentation · Thermalright LCD Control For Linux
heading: Overview
description: >-
  Documentation for Thermalright LCD Control For Linux: installation, configuration, usage,
  troubleshooting and adding support for a new device.
nav_order: 1
permalink: /linux-thermalright-lcd-control/docs
---

**Thermalright LCD Control** is a Linux desktop application that drives the LCD screens and digital RGB LEDs of
Thermalright coolers. It displays themes made of a background (image, GIF or video), a foreground frame and live
widgets such as CPU and GPU temperatures, clocks and text.

Since version 2.0 it is a single application: the GUI embeds the device controller, so there is no separate root
service. Device access is granted through udev rules, and the app starts with your session, minimized to the system
tray.

The USB protocol was reverse-engineered from the Thermalright Windows application. Testing was done on the
**Frozen Warframe 420 BLACK ARGB** and on Nvidia GPUs; other devices and GPU vendors are supported but less tested.

## Chapters

- [Installation]({{ '/linux-thermalright-lcd-control/docs/installation' | relative_url }}): packages for Fedora,
  Debian, Ubuntu and atomic distributions, or the tarball for any distribution.
- [Configuration]({{ '/linux-thermalright-lcd-control/docs/configuration' | relative_url }}): files and directories,
  device access, device files and theme files.
- [Usage]({{ '/linux-thermalright-lcd-control/docs/usage' | relative_url }}): the main window, themes, backgrounds,
  foregrounds, widgets, rotation and RGB LEDs.
- [Troubleshooting]({{ '/linux-thermalright-lcd-control/docs/troubleshooting' | relative_url }}): what to check when
  nothing, or the wrong image, is displayed.
- [Add a new device]({{ '/linux-thermalright-lcd-control/docs/add-new-device' | relative_url }}): register an
  unsupported display without code, or reverse-engineer its protocol.

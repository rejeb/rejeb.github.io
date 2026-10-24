---
layout: project
project: linux-thermalright-lcd-control
title: Thermalright LCD Control For Linux
description: >-
  Open-source Linux app to control Thermalright cooler LCD screens and RGB LEDs: themes, widgets,
  live CPU and GPU metrics. Packages for Fedora, Debian and Ubuntu.
image: /assets/img/og/og-linux-thermalright-lcd-control.png
permalink: /linux-thermalright-lcd-control
---

## Overview

A single desktop application for managing Thermalright LCD displays and digital LED coolers on Linux.
The device controller runs inside the app, with udev rules granting device access, so no root service
is needed. The USB protocol was reverse-engineered from the Thermalright Windows application.

## Features

- **User-friendly GUI**: modern native Qt interface with light/dark theme.
- **Single-app architecture**: the device controller runs inside the app; no root service needed (udev rules grant
  device access).
- **Multi-device support**: several displays can be connected and driven at the same time, each with its own
  configuration; a per-device tab bar lets you switch between them, and edits are saved automatically before switching.
- **Automatic device detection**: connected devices are detected on the fly: plug or unplug a display and it appears
  or disappears in the GUI without restarting the app (its configuration is kept for when it comes back).
- **Add devices without code**: register a new device from the GUI (or a small YAML file) using the generic,
  data-driven driver: pick transport, encoding and header format, no Python required. Known devices pre-fill the form
  automatically.
- **Fast device switching**: cached thumbnails and per-device render engines make switching between devices and
  themes near-instant.
- **Theme support**: customizable display themes with bundled presets, per-resolution backgrounds and foregrounds
  (the matching foreground is auto-selected for your resolution).
- **Rich media backgrounds**: images, animated GIFs and videos; imported media is automatically resized to your
  screen resolution, and bundled video backgrounds are downloaded on demand.
- **Widget editor**: drag-and-drop metric, clock, date and text widgets with per-widget font, size, bold/italic,
  color and precision (multi-selection supported).
- **Display rotation**: 0°/90°/180°/270° orientation with rotation-aware backgrounds and foregrounds.
- **Hardware & OS metrics**, all displayable as widgets, grouped by device:
  - **CPU**: temperature, usage, frequency.
  - **GPU**: temperature, usage, frequency (AMD, Nvidia and Intel).
  - **Memory**: RAM usage, RAM used/available (GB), swap usage.
  - **Disk**: filesystem usage, read/write throughput (MB/s).
  - **Network**: download/upload throughput (MB/s).
  - **System**: uptime, load average, process count.
- **Font management**: use any installed system font (plus bundled fallbacks) in your themes.
- **RGB LED controller support**: drives Thermalright digital LED coolers (the `0416:8001` controller),
  auto-detected over USB with the hardware layout identified via the device handshake. A dedicated, kind-aware control
  panel provides:
  - global colour (colour picker, RGB, brightness, presets) and On/Off;
  - six animation modes: static, breathing, colourful, rainbow, temperature-linked, load-linked;
  - per-zone colour/brightness/on-off for multi-zone models (PA120, LF10), with an optional zone-sync carousel;
  - CPU/GPU sensor linkage and a diagnostic test mode;
  - a **live preview that renders the real per-model layout**, including the actual digit/clock readout for the
    digital segment displays (temperature, load, memory/disk stats, clock);
  - 12 cooler layouts supported: AX120, PA120, AK120, LC1, LF8, LF10, LF11, LF12, LF13, LF15, CZ1, LC2.
- **System integration**: tray icon, session autostart (starts minimized), desktop notifications; rendering pauses
  while the window is hidden to save CPU.

## Supported devices

### LCD displays

| VID:PID | Chip / Family | Thermalright product(s) | Protocol |
|---|---|---|---|
| `0402:3922` | — | Frozen Warframe 420 BLACK ARGB *(tested)* | SCSI BOT |
| `0416:5302` | Winbond USBDISPLAY | Frozen Magic 240 / 360 (HID variants) | HID type 2 |
| `0416:5406` | Winbond LCD (SCSI) | Frozen Warframe / Magic (SCSI variant) | SCSI |
| `0416:5408` | Trofeo Vision (LY) | Trofeo Vision | LY bulk |
| `0416:5409` | Trofeo Vision (LY1) | Trofeo Vision (LY1 firmware) | LY bulk |
| `0418:5303` | ALi Corp LCD (HID type 3) | Frozen Magic 360 SCENIC / AIO 480 variants | HID type 3 |
| `0418:5304` | ALi Corp LCD (HID type 3) | Frozen Magic 360 SCENIC / AIO 480 variants | HID type 3 |
| `87AD:70DB` | ChiZhu Tech GrandVision family | AIO variants with 320x320 or 480x480 screen | USB bulk |
| `87CD:70DB` | ChiZhu Tech (variant) | AIO variants (alternate firmware) | USB bulk |

### RGB LED controllers

| VID:PID | Device | Supported cooler layouts |
|---|---|---|
| `0416:8001` | Thermalright digital LED controller | AX120, PA120, AK120, LC1, LF8, LF10, LF11, LF12, LF13, LF15, CZ1, LC2 |

If you own one of the untested devices, please test it and report back (see [Contributing](#contributing)).
If your device is not listed, you can most likely add it yourself without writing any code: see
[Add a new device]({{ '/linux-thermalright-lcd-control/docs/add-new-device' | relative_url }}).

## Installation

Packages are available for Fedora, Debian, Ubuntu and atomic distributions such as Bazzite and Silverblue, plus a
tarball for any other distribution. See the
[installation guide]({{ '/linux-thermalright-lcd-control/docs/installation' | relative_url }}).

## Contributing

Contributions are welcome! To contribute:

1. Fork the [project](https://github.com/rejeb/linux-thermalright-lcd-control).
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add my feature'`).
4. Push to your branch (`git push origin feature/my-feature`).
5. Open a pull request.

Testing reports for untested devices are just as valuable: open an
[issue](https://github.com/rejeb/linux-thermalright-lcd-control/issues) to say whether the application works with your
cooler. If you got a new device working, please contribute its registry entry so the next user gets it detected
automatically (see the [probe registry]({{ '/linux-thermalright-lcd-control/docs/add-new-device#probe-registry-known-devices' | relative_url }})).

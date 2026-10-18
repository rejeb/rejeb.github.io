---
layout: doc
project: linux-thermalright-lcd-control
title: Troubleshooting · Thermalright LCD Control For Linux
heading: Troubleshooting
description: >-
  Fix common Thermalright LCD Control problems: nothing displayed, device not detected, black screen,
  blurry or scrambled image, missing metrics, and where to find the logs.
nav_order: 5
permalink: /linux-thermalright-lcd-control/docs/troubleshooting
---

## Logs

The logs are in `~/.local/state/thermalright-lcd-control/`, and the tray menu opens them with **Open Logs**. Look
there first: they record device detection, connection errors and rendering problems. Attach them when you
[open an issue](https://github.com/rejeb/thermalright-lcd-control/issues).

## Nothing is displayed on the device

1. Make sure the application is running: its icon should be in the system tray. If not, start it from the
   applications menu or with `thermalright-lcd-control`.
2. Make sure the udev rules are installed:
   ```bash
   ls /usr/lib/udev/rules.d/99-thermalright.rules
   ```
   Then unplug and replug the device so they apply.
3. Make sure your user is in the `plugdev` group:
   ```bash
   groups | grep plugdev
   ```
   If not, add it, then log out and back in:
   ```bash
   sudo usermod -aG plugdev "$USER"
   ```
4. Check the logs for errors.

## The device does not appear in the application

- Check that the system sees it, and note its VID:PID:
  ```bash
  lsusb
  ```
- Compare the VID:PID with the
  [supported devices]({{ '/linux-thermalright-lcd-control#supported-devices' | relative_url }}). If it is not listed,
  add it with the **+** button: see
  [Add a new device]({{ '/linux-thermalright-lcd-control/docs/add-new-device' | relative_url }}).
- If you run the Thermalright Windows software in a virtual machine, stop the VM or remove the device from it: only
  one program can drive the display at a time.

## The display stays black

The device is detected but the frame header is probably not correct for your device. Click **Edit this device** in
the title bar and adjust the `header` fields. See
[The device file]({{ '/linux-thermalright-lcd-control/docs/add-new-device#the-device-file' | relative_url }}).

## The image is blurry or scrambled

The image encoding does not match your device. Click **Edit this device** and try the other `encoding` values
(`rgb565_le_columns`, `rgb565_be`, `jpeg`); that is often enough. If none works, see
[The screen displays a blurry image]({{ '/linux-thermalright-lcd-control/docs/add-new-device#the-screen-displays-a-blurry-image' | relative_url }}).

## The image is upside down or sideways

Pick the rotation that matches how the cooler is mounted (0°, 90°, 180° or 270°) under the live preview, then click
**Save config**.

## A metric shows no value

- GPU metrics are supported for AMD, Nvidia and Intel GPUs, but testing was limited to Nvidia. For Nvidia, make sure
  the proprietary driver is installed.
- Temperatures come from the kernel sensors: check that `sensors` (from `lm-sensors`) shows your CPU temperature.
- If a metric is still missing, open an issue with your hardware and the logs.

## Changes are not kept after a restart

Every change is shown on the device right away, but it is only written to disk when you click **Save config** (or
when you switch to another device tab, which saves the current one first). The **Save config** button changes colour
while there are unsaved changes.

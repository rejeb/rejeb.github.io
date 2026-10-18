---
layout: doc
project: linux-thermalright-lcd-control
title: Usage · Thermalright LCD Control For Linux
heading: Usage
description: >-
  Using Thermalright LCD Control: the main window, devices, themes, backgrounds, foregrounds, the
  widget editor, rotation, saving themes and the RGB LED control panel.
nav_order: 4
permalink: /linux-thermalright-lcd-control/docs/usage
---

## Launch the application

- **From the applications menu**: search for "Thermalright LCD Control" in your launcher.
- **From a terminal**: run `thermalright-lcd-control`.

The application also starts automatically with your session, minimized to the system tray, and keeps driving the
display in the background.

## System tray

Closing the window minimizes the application to the tray instead of quitting. The tray menu offers:

- **Show / Hide**: reopen or hide the main window;
- **Open Logs**: open the log file in your default application;
- **Quit**: stop the application. The display then stops updating.

While the window is hidden, the on-screen preview is paused to keep CPU usage minimal; the device itself keeps
updating.

## The main window

- **Title bar**: one tab per connected device, plus buttons to add a device (**+**), edit or delete the selected
  device, and toggle the light/dark theme.
- **Side tabs** (left): **Themes**, **Backgrounds**, **Foregrounds** and **Overlay widgets**.
- **Live preview** (right): what the device displays, with the widget editor, the rotation choice and the save
  buttons.

When a new release is available, a dismissible banner at the top of the window links to it.

## Devices

Connected devices are detected on the fly: plug in a supported display and its tab appears; unplug it and the tab
disappears, while its configuration is kept for when it comes back. Each device has its own theme. Switching tabs
saves the edits of the current device first.

- **Add a device**: click **+** to register a device that was not detected automatically. See
  [Add a new device]({{ '/linux-thermalright-lcd-control/docs/add-new-device' | relative_url }}).
- **Edit this device**: change its resolution, transport, encoding or header, for example when the image is
  scrambled.
- **Delete this device**: remove its registration and its active theme. You are asked to confirm.

## Themes

The **Themes** tab lists the saved themes for the resolution of the selected device. Click a theme to apply it: its
background, foreground and widgets replace the current ones. **⟳ Refresh** reloads the list, for example after
copying theme files by hand.

## Backgrounds

The **Backgrounds** tab lists the images, animated GIFs and videos available for the device resolution. Click one to
use it as the background.

- **+ Add media** imports your own files. Images, GIFs and videos are resized to the screen resolution automatically.
- The bundled video backgrounds are downloaded on demand, the first time you pick them.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.bmp`, `.tiff`, `.webp`, `.gif`, `.mp4`, `.avi`, `.mkv`, `.mov`,
  `.webm`, `.flv`, `.wmv` and `.m4v`.

## Foregrounds

A foreground is a transparent PNG frame drawn over the background, usually with labels and gauges that match the
widget positions. The **Foregrounds** tab lists those available for the device resolution; the matching one is
selected automatically for your resolution.

- **+ Add foreground** imports your own PNG.
- **Clear** removes the foreground.
- The toggle enables or disables it, and **Opacity** sets its transparency.

## Widgets

The **Overlay widgets** tab is the widget palette:

| Group | Widgets |
|---|---|
| Clock | Time (`HH:MM`), Date (`dd/mm`), Day of week |
| Text | A custom label or title |
| CPU | Temperature, Usage, Frequency |
| GPU | Temperature, Usage, Frequency (AMD, Nvidia and Intel) |
| Memory | RAM Usage, RAM Used, RAM Free, Swap Usage |
| Disk | Disk Usage, Disk Read, Disk Write |
| Network | Download, Upload |
| System | Uptime, Load Avg, Processes |

Values refresh every second in the preview and on the device.

### Editing widgets in the preview

- **Add**: drag a widget from the palette and drop it on the preview.
- **Select**: click a widget. Drag on an empty area to select several at once, and hold `Ctrl` to extend the
  selection.
- **Move**: drag the selection.
- **Resize**: drag a corner handle to change the font size.
- **Style**: click a widget without moving it to open the inspector. It edits the font, size, bold/italic and colour,
  and, depending on the widget, the label, unit, precision (decimals) or text. With several widgets selected, it
  edits them together. Changes show on the device as you make them, and **Cancel** restores the state from when the
  inspector opened.
- **Delete**: press `Delete` or `Backspace`, or use the bin in the inspector.
- `Esc` clears the selection.

## Rotation

Pick **0°**, **90°**, **180°** or **270°** under the live preview to match how the cooler is mounted. Backgrounds and
foregrounds switch to the rotated resolution automatically.

## Saving

- **Save config** applies the current setup to the device and stores it as its active theme, the one it displays
  at startup. It appears as the **Current theme** tile in the **Themes** tab.
- **Save theme** stores it as a named theme in the **Themes** tab: type a name in the **Theme name** field, then use
  its save action. Saved themes can be applied to any device with the same resolution. Bundled themes cannot be
  overwritten, and overwriting one of your own themes asks for confirmation.

Every change is shown on the device right away, but it is written to disk only by **Save config**, or when you
switch to another device tab. Both buttons change colour while there are unsaved changes.

## RGB LED controllers

A Thermalright digital LED controller (`0416:8001`) appears as its own device tab with a dedicated LED panel instead
of the theme editor. The cooler model is identified from the device handshake, and the panel shows only the sections
that model supports:

- **Colour**: global colour with a colour picker, RGB values, brightness and presets, plus On/Off.
- **Mode**: static, breathing, colourful, rainbow, temperature-linked and load-linked.
- **Zones**: per-zone colour, brightness and on/off for multi-zone models (PA120, LF10), with an optional zone-sync
  carousel.
- **Advanced**: which sensor (CPU or GPU) drives the temperature-linked and load-linked modes, and a test mode that
  cycles four reference colours.

A live preview renders the real layout of your cooler, including the digit and clock readouts of the digital segment
displays (temperature, load, memory and disk stats, clock).

Supported cooler layouts: AX120, PA120, AK120, LC1, LF8, LF10, LF11, LF12, LF13, LF15, CZ1 and LC2.

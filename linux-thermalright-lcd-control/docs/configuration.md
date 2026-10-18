---
layout: doc
project: linux-thermalright-lcd-control
title: Configuration · Thermalright LCD Control For Linux
heading: Configuration
description: >-
  Configuration of Thermalright LCD Control: files and directories, udev device access, the
  device_<id>.yaml device files and the config_<id>.yaml theme files.
nav_order: 3
permalink: /linux-thermalright-lcd-control/docs/configuration
---

Everything can be configured from the GUI, and the GUI saves each change for you. This chapter describes what is
stored where, for when you want to back up, inspect or edit the files by hand.

## Files and directories

| Path | Content |
|---|---|
| `~/.config/thermalright-lcd-control/gui_config.yaml` | Application settings: directories, light/dark theme, update check, window size, supported media formats. |
| `~/.config/thermalright-lcd-control/config/device_<id>.yaml` | One file per registered device: USB ids, resolution, transport, encoding and frame header. |
| `~/.config/thermalright-lcd-control/config/config_<id>.yaml` | The active theme of each device: background, foreground, widgets and rotation. |
| `~/.config/thermalright-lcd-control/themes/presets/` | Themes, one folder per resolution: the bundled `theme_*.yaml` presets and your saved `user_<name>.yaml` themes. |
| `~/.config/thermalright-lcd-control/themes/backgrounds/` | Background images, GIFs and videos, one folder per resolution. |
| `~/.config/thermalright-lcd-control/themes/foregrounds/` | Foreground frames (PNG), one folder per resolution. |
| `~/.config/thermalright-lcd-control/themes/user_backgrounds/` | Media you imported with **+ Add media**. |
| `~/.local/state/thermalright-lcd-control/` | Log files. |
| `/opt/thermalright-lcd-control/` | The application, its Python runtime and the bundled resources (read-only). |
| `/usr/lib/udev/rules.d/99-thermalright.rules` | udev rules granting access to the supported devices. |

Package upgrades and removal never touch the files under your home directory.

Resolution folders are named `<width><height>`, for example `320240` for a 320×240 screen. Rotating a display by 90°
or 270° swaps the folder (`240320`), which is why some resolutions have both orientations.

## Device access

The application talks to the devices as your user, not as root. The udev rules installed with the package give the
`plugdev` group (and the logged-in user, through `uaccess`) read/write access to every supported device:

- HID displays are exposed as `/dev/hidraw*`;
- USB bulk and SCSI displays are accessed through `/dev/bus/usb/*`.

Make sure your user is in the `plugdev` group, then log out and back in:

```bash
groups | grep plugdev || sudo usermod -aG plugdev "$USER"
```

After installing or changing the rules, unplug and replug the device (or reboot) so they apply.

## Application settings

`gui_config.yaml` holds the application settings:

```yaml
paths:
  themes_dir: ~/.config/thermalright-lcd-control/themes/presets
  backgrounds_dir: ~/.config/thermalright-lcd-control/themes/backgrounds
  foregrounds_dir: ~/.config/thermalright-lcd-control/themes/foregrounds
  service_config: ~/.config/thermalright-lcd-control/config
  user_backgrounds: ~/.config/thermalright-lcd-control/themes/user_backgrounds
ui:
  theme: dark            # dark or light, also toggled from the title bar
updates:
  check_on_startup: true # show a banner when a new release is available
window:
  default_width: 1920
  default_height: 1080
supported_formats:
  images: [.jpg, .jpeg, .png, .bmp, .tiff, .webp]
  videos: [.mp4, .avi, .mkv, .mov, .webm, .flv, .wmv, .m4v]
  gifs: [.gif]
```

The paths are written as absolute paths by the installer. Set `check_on_startup` to `false` to disable the update
check.

## Device files

Each registered device has a `device_<id>.yaml` file. The GUI writes it when you add or edit a device, and writes it
automatically for known devices detected on the USB bus. Example for a `0416:5302` display:

```yaml
id: '5302_0416_3_4'
vid: '0x0416'
pid: '0x5302'
width: 320
height: 240
generic: true
transport: hid
chunk_size: 4096
encoding: rgb565_le_columns
report_id: '00'
header:
  prefix: DADBDCDD
  format: <6HIH
  values: [2, 1, width, height, 2, 0, payload_size, 0]
```

The id defaults to `<pid>_<vid>_<bus>_<device>`, so two identical displays stay distinct. The meaning of every field
is described in [The device file]({{ '/linux-thermalright-lcd-control/docs/add-new-device#the-device-file' | relative_url }}).

## Theme files

What a device displays is stored in its `config_<id>.yaml` file, under a `display` key. Positions are in pixels from
the top-left corner of the screen.

```yaml
display:
  rotation: 0                   # 0, 90, 180 or 270
  background:
    type: image                 # image, gif or video
    path: ~/.config/thermalright-lcd-control/themes/backgrounds/{resolution}/theme_5.png
  foreground:
    enabled: true
    alpha: 1.0                  # opacity, 0.0 to 1.0
    path: ~/.config/thermalright-lcd-control/themes/foregrounds/{resolution}/theme_5.png
    position: {x: 0, y: 0}
  time:
    enabled: true
    font_family: DejaVu Sans
    font_size: 48
    bold: true
    italic: false
    color: '#808080ff'          # RGBA
    position: {x: 96, y: 50}
  date:
    enabled: true
    font_size: 18
    position: {x: 90, y: 104}
  metrics:
    enabled: true
    configs:
    - name: cpu_temperature
      enabled: true
      unit: °C
      precision: 0              # decimals
      format_string: '{value}{unit}'
      font_size: 20
      color: '#808080ff'
      position: {x: 22, y: 177}
  texts:
  - text: CPU
    enabled: true
    font_size: 16
    position: {x: 28, y: 145}
```

Each widget (`time`, `date`, every metric and every text) accepts the same style keys: `enabled`, `font_family`,
`font_size`, `bold`, `italic`, `color` and `position`.

In media paths, `{resolution}` is replaced by the resolution folder of the device (`320240`), swapped when the display
is rotated by 90° or 270° (`240320`). The same theme therefore works in both orientations.

### Metric names

| Group | Names |
|---|---|
| CPU | `cpu_temperature`, `cpu_usage`, `cpu_frequency` |
| GPU | `gpu_temperature`, `gpu_usage`, `gpu_frequency` |
| Memory | `memory_usage`, `memory_used`, `memory_available`, `swap_usage` |
| Disk | `disk_usage`, `disk_read_speed`, `disk_write_speed` |
| Network | `net_download_speed`, `net_upload_speed` |
| System | `uptime`, `load_avg`, `process_count` |

### Default themes

The themes of a resolution are the YAML files in `themes/presets/<width><height>/`:

- `theme_1.yaml`, `theme_2.yaml`…: the presets bundled with the application;
- `user_<name>.yaml`: the themes you saved with **Save theme**. Only these can be deleted or overwritten.

When a device is used for the first time and has no `config_<id>.yaml` yet, the application copies the first preset
of its resolution, in alphabetical order, which is usually `theme_1.yaml`. If the resolution has no preset, it
builds a minimal theme with the first background of that resolution and no foreground or widgets.

Theme files all use the same format as `config_<id>.yaml`, so you can copy them between machines or devices with the
same resolution.

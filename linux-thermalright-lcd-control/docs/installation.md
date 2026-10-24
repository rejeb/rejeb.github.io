---
layout: doc
project: linux-thermalright-lcd-control
title: Installation · Thermalright LCD Control For Linux
heading: Installation
description: >-
  Install Thermalright LCD Control on Fedora, Debian, Ubuntu, atomic distributions (Bazzite, Silverblue)
  or any Linux distribution from the tarball.
nav_order: 2
permalink: /linux-thermalright-lcd-control/docs/installation
---

The application bundles its own Python runtime and every dependency, so installing needs **no network access** and
does not touch your system Python.

## System requirements

- **Operating system**: Ubuntu 20.04+, Debian 11+ or another modern Linux distribution (x86_64 for the packages).
- **Python**: 3.8 or higher (bundled with the packages).
- **Desktop environment**: any modern Linux desktop (GNOME, KDE, XFCE, etc.).
- **Hardware**: a compatible Thermalright LCD display or LED controller (see the
  [supported devices]({{ '/linux-thermalright-lcd-control#supported-devices' | relative_url }})).

## From a package manager (recommended)

Packages are built by the
[openSUSE Build Service](https://download.opensuse.org/repositories/home:/rbenrejeb:/thermalright-lcd-control/)
for Fedora, Debian and Ubuntu (x86_64 only). Add the repository once, and upgrades then arrive with the rest of your
system updates.

### Fedora (41, 42, 43, 44)

```bash
sudo dnf config-manager addrepo --from-repofile="https://download.opensuse.org/repositories/home:rbenrejeb:thermalright-lcd-control/Fedora_$(rpm -E %fedora)/home:rbenrejeb:thermalright-lcd-control.repo"
sudo dnf install thermalright-lcd-control
```

### Debian (12, 13)

Set `DISTRO` to `Debian_12` or `Debian_13`, then:

```bash
DISTRO=Debian_13
echo "deb http://download.opensuse.org/repositories/home:/rbenrejeb:/thermalright-lcd-control/$DISTRO/ /" \
  | sudo tee /etc/apt/sources.list.d/home:rbenrejeb:thermalright-lcd-control.list
curl -fsSL "https://download.opensuse.org/repositories/home:rbenrejeb:thermalright-lcd-control/$DISTRO/Release.key" \
  | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home_rbenrejeb_thermalright-lcd-control.gpg > /dev/null
sudo apt update
sudo apt install thermalright-lcd-control
```

### Ubuntu (22.04, 24.04, 24.10, 25.04, 25.10, 26.04)

Same as Debian, with `DISTRO` set to `xUbuntu_` plus your release (check it with `lsb_release -rs`):

```bash
DISTRO="xUbuntu_$(lsb_release -rs)"
```

## On atomic / image-based distributions (Bazzite, Silverblue, bootc)

`/usr` is read-only, so the package is layered onto the OS image. There is no `dnf` on these systems, so drop the
repository file in place yourself:

```bash
sudo curl -fsSL -o /etc/yum.repos.d/home:rbenrejeb:thermalright-lcd-control.repo \
  "https://download.opensuse.org/repositories/home:rbenrejeb:thermalright-lcd-control/Fedora_$(rpm -E %fedora)/home:rbenrejeb:thermalright-lcd-control.repo"
sudo rpm-ostree install thermalright-lcd-control
sudo systemctl reboot
```

Layering requires a reboot and is re-applied on every OS update. If a future base image ever conflicts with a layered
dependency, remove the package with `rpm-ostree uninstall thermalright-lcd-control` to unblock the update.

## From the tarball (any distribution)

1. Make sure these dependencies are installed:
   - `python3`
   - `python3-pip`
   - `python3-venv`
   - `libhidapi-*` or `hidapi`, depending on your distribution
2. Download the `.tar.gz` package:
   ```bash
   wget https://github.com/rejeb/linux-thermalright-lcd-control/releases/download/2.1.1/thermalright-lcd-control-2.1.1.tar.gz -P /tmp/
   ```
3. Extract the archive:
   ```bash
   cd /tmp
   tar -xvf thermalright-lcd-control-2.1.1.tar.gz
   ```
4. Install the application:
   ```bash
   cd thermalright-lcd-control-2.1.1
   sudo bash install.sh
   ```

Both installation methods produce exactly the same files on disk.

## After installing

Add yourself to the `plugdev` group so the display is reachable without root, then log out and back in:

```bash
sudo usermod -aG plugdev "$USER"
```

The application starts minimized to the tray at login, and the default theme appears on your device. Your
configuration and themes live in `~/.config/thermalright-lcd-control` and are never touched by package upgrades or
removal. Continue with [Usage]({{ '/linux-thermalright-lcd-control/docs/usage' | relative_url }}).

## Uninstall

| Installed with | Command |
|---|---|
| Fedora | `sudo dnf remove thermalright-lcd-control` |
| Debian / Ubuntu | `sudo apt remove thermalright-lcd-control` |
| Atomic distributions | `sudo rpm-ostree uninstall thermalright-lcd-control` |
| Tarball | `sudo ./uninstall.sh` from the extracted folder |

Your themes and configuration in `~/.config/thermalright-lcd-control` are left in place.

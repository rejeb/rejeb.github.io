---
layout: doc
project: dataform-plugin
title: Installation · Google Cloud Dataform Plugin for IntelliJ
heading: Installation
description: Installation documentation for Google Cloud Dataform Plugin for IntelliJ.
nav_order: 2
permalink: /dataform-plugin/docs/installation
---

## Requirements

- IntelliJ IDEA Ultimate 2026.2 or later.
- Node.js (used by the Dataform CLI).
- The Dataform CLI and Core, which the plugin can install for you. See
  [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}#install-the-dataform-cli-and-core).

The plugin was made for IntelliJ IDEA Ultimate because it needs Node.js and SQL support, which are only
available in paid versions. The full list of supported IDEs is on the
[plugin page](https://plugins.jetbrains.com/plugin/30020) and is determined by JetBrains.

## Install from the Marketplace

1. In IntelliJ IDEA, open **Settings ▸ Plugins ▸ Marketplace**.
2. Search for **Dataform** and install the plugin, or install it from the
   [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/30020).
3. Restart the IDE.

## Next steps

1. [Set up Node.js and install the Dataform CLI and Core]({{ '/dataform-plugin/docs/configuration' | relative_url }}#plugin-settings).
2. [Create or open a Dataform project]({{ '/dataform-plugin/docs/project-setup' | relative_url }}).
3. [Sign in to Google Cloud]({{ '/dataform-plugin/docs/configuration' | relative_url }}#google-cloud-sign-in)
   and [configure a Dataform repository]({{ '/dataform-plugin/docs/configuration' | relative_url }}#configure-a-dataform-repository),
   for the features that call Google Cloud.

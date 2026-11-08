---
layout: project
project: dataform-plugin
title: Google Cloud Dataform Plugin for IntelliJ
description: >-
  IntelliJ IDEA plugin for Google Cloud Dataform: SQLX completion, BigQuery dry runs, column-level
  lineage, workflow runs and unit tests, without leaving the IDE. Free and open source.
image: /assets/img/og/og-dataform-plugin.png
permalink: /dataform-plugin
---

## Independent project

Google Cloud Dataform Plugin for IntelliJ is an independent open-source project, not affiliated with or
endorsed by Google or JetBrains.

## Why the plugin asks you to sign in with Google

The plugin uses your Google account only to work with Google Cloud on your behalf: to interact
with your Dataform repositories and workspaces (browse, create, push and pull files), to run
Dataform workflow actions, and to execute queries in BigQuery. Your credentials are kept in the
IDE password store, and the developer runs no server that receives your Google data: the plugin
talks directly to Google Cloud, and to the npm registry only to look up and install Dataform
packages. When you clone a repository or view its Git remote, the IDE's Git plugin connects to that
remote with your own Git credentials. See the
[Privacy Policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}) for details.

## Support

Report bugs and request features on the
[GitHub issue tracker](https://github.com/rejeb/google-cloud-dataform-plugin/issues).

[Privacy Policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}) ·
[Terms of Service]({{ '/dataform-plugin/terms-of-service' | relative_url }})

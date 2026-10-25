---
layout: project
project: dataform-plugin
title: Dataform Plugin for IntelliJ
description: >-
  IntelliJ IDEA plugin for Google Cloud Dataform: SQLX completion, BigQuery dry runs, column-level
  lineage, workflow runs and unit tests, without leaving the IDE. Free and open source.
image: /assets/img/og/og-dataform-plugin.png
permalink: /dataform-plugin
---

## Independent project

Dataform Plugin for IntelliJ is an independent open-source project, not affiliated with or
endorsed by Google or JetBrains.

## Why the plugin asks you to sign in with Google

The plugin uses your Google account only to work with Google Cloud on your behalf: to interact
with your Dataform repositories and workspaces (browse, create, push and pull files), to run
Dataform workflow actions, and to execute queries in BigQuery. Your credentials are kept in the
IDE password store, and the developer runs no server that receives your Google data: the plugin
talks directly to Google Cloud, and to the npm registry only to look up and install Dataform
packages. See the [Privacy Policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}) for details.

## Features

### SQLX language support
- Syntax highlighting for SQLX files, covering embedded SQL, JavaScript and config blocks.
- Code completion for Dataform functions (`ref()`, `declare()`, `publish()`, …), JavaScript and
  TypeScript symbols, and template expressions (`${...}`).
- BigQuery SQL dialect support with syntax validation and error highlighting.
- Schema-based validation and completion for `workflow_settings.yaml` and `config { }` blocks.

### Navigation and code intelligence
- Jump between references, includes and declarations with `Ctrl+Click` / `Ctrl+B`.
- Column-level navigation from a query to the column's declaration in the source table.
- Quick Documentation (`Ctrl+Q`) for tables, columns, config keys and BigQuery functions.
- Template expressions folded to their evaluated value.
- In-place column rename that follows the column through the whole pipeline.

### Compilation and preview
- Background compilation, with Dataform and BigQuery dry-run errors shown on the exact tokens.
- Split editor next to each SQLX file with the compiled query, resolved schema and lineage graph.

### Data lineage
- Project and file lineage graphs of the dependencies between Dataform actions.
- Column-level lineage to trace where each column's data comes from.

### Run and execute
- Run configurations and gutter icons to run actions, tags or the whole workflow.
- Live execution view with BigQuery job details.
- Execute compiled queries in BigQuery, with paged results in a data grid.

### Unit tests
- Generate Dataform tests pre-filled from resolved schemas.
- Run tests from the gutter, with results and diffs in the IDE test runner.

### Google Cloud integration
- Sign in to Google Cloud from the Dataform tool window, with no `gcloud` login needed.
- Manage repositories, browse and create workspaces, push and pull files.
- Compare a local file with its version in the remote workspace.

### Formatting and project tooling
- Built-in SQLX formatter, with optional Sqlfluff integration.
- New Project wizard, SQLX file templates and automatic Dataform CLI setup.

## Installation

1. In IntelliJ IDEA, open **Settings ▸ Plugins ▸ Marketplace**.
2. Search for **Dataform** and install the plugin, or use the button above.
3. Restart the IDE.

Requirements: IntelliJ IDEA 2026.1 or later and Node.js.

## Support

Report bugs and request features on the
[GitHub issue tracker](https://github.com/rejeb/google-cloud-dataform-plugin/issues).

[Privacy Policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}) ·
[Terms of Service]({{ '/dataform-plugin/terms-of-service' | relative_url }})

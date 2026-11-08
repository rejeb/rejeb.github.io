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

## Features

### SQLX language support
- Syntax highlighting for SQLX files, covering embedded SQL, JavaScript and config blocks.
- Code completion for Dataform functions (`ref()`, `declare()`, `publish()`, …), JavaScript and
  TypeScript symbols, and template expressions (`${...}`).
- BigQuery SQL dialect support with syntax validation and error highlighting.
- Schema-based validation and completion for `workflow_settings.yaml` and `config { }` blocks.

{% include video.html src="/assets/video/dataform/sqlx-editing.mp4" caption="Completing a ref(), a join column and Quick Documentation in gold_customer_ltv.sqlx" index=1 %}

### Navigation and code intelligence
- Jump between references, includes and declarations with `Ctrl+Click` / `Ctrl+B`.
- `Ctrl+Click` on a column to see where it is declared and every query that reads it.
- Quick Documentation (`Ctrl+Q`) for tables, columns, config keys and BigQuery functions.
- Template expressions folded to their evaluated value.

{% include video.html src="/assets/video/dataform/sqlx-folding.mp4" caption="Folded expressions of silver_orders.sqlx, expanded and edited" index=2 %}

### Column refactoring
- A column window listing where a column is declared and every query that reads it.
- In-place column rename that follows the column through the whole pipeline, unit tests included.
- Column impact analysis on save, with a quick fix to rename the downstream usages of a renamed column.

{% include video.html src="/assets/video/dataform/column-refactoring.mp4" caption="Renaming full_name to display_name from silver_customers.sqlx" index=3 %}

### Compilation and preview
- Background compilation, with Dataform and BigQuery dry-run errors shown on the exact tokens.
- Build that reports compilation errors, with their code frame, and failing dry-runs per file in the
  Build tool window.
- Split editor next to each SQLX file with the compiled queries and assertions, the output schemas as
  a tree and the lineage graph.

{% include video.html src="/assets/video/dataform/compiled-preview.mp4" caption="Query, Assertions, Schema and Lineage views of gold_customer_ltv.sqlx" index=4 %}

### Data lineage
- Project and file lineage graphs of the dependencies between Dataform actions.
- Column-level lineage to trace where each column's data comes from.
- Selecting a node highlights its whole lineage, with search, filters, a legend and a focus mode.

{% include video.html src="/assets/video/dataform/lineage.mp4" caption="Search, selection, focus mode, filters and column lineage in the project lineage" index=5 %}

### Run and execute
- Run configurations and gutter icons to run actions, tags or the whole workflow.
- Live run console with the action tree, the executed SQL and the BigQuery jobs on a timeline.
- Execute compiled queries in BigQuery, with paged results in a data grid and the job statistics, in
  the Services view.

{% include video.html src="/assets/video/dataform/workflow-run.mp4" caption="Running gold_customer_ltv and its assertions, then reading the run console" index=6 %}

### BigQuery cost
- Estimated bytes and on-demand cost of each query in the compiled preview, before running it.
- Bytes billed and cost of executed queries and workflow runs, per action and per run.
- Prices from Google Cloud Billing per location, or a fixed price per TiB; bytes only for capacity
  projects.

{% include video.html src="/assets/video/dataform/bigquery-cost.mp4" caption="The estimated cost before running the query, then bytes billed and cost in Job Info" index=7 %}

### Unit tests
- Generate Dataform tests pre-filled from resolved schemas.
- Run tests from the gutter, with results and diffs in the IDE test runner.

{% include video.html src="/assets/video/dataform/unit-tests.mp4" caption="Creating, running and fixing test_gold_customer_ltv.sqlx" index=8 %}

### Google Cloud integration
- Sign in to Google Cloud from the Dataform tool window, with no `gcloud` login needed.
- The Dataform Tools tool window: manage repositories, browse and create workspaces, see the status
  of remote files, push and pull files, commit and push the workspace to Git.
- Open a project from an existing Dataform repository in the IDE's clone dialog: clone it from its Git
  remote or download a workspace.
- Push a workspace to the default branch or to a branch named after the workspace. A project cloned
  from the Git remote commits with Git instead, so the IDE's branch and history stay in step.
- Compare a file with its local or remote version, and open a workspace or a file in the Google Cloud
  console.

{% include video.html src="/assets/video/dataform/dataform-tools.mp4" caption="Repository picker, remote files, Compare with Local and the Changes tab" index=9 %}

### Formatting and project tooling
- Built-in SQLX formatter, with optional SQLFluff integration.
- New Project wizard, SQLX file templates and one-click Dataform CLI installation.

{% include video.html src="/assets/video/dataform/formatting.mp4" caption="Reformatting gold_customer_ltv.sqlx with SQLFluff" index=10 %}

{% include video.html src="/assets/video/dataform/project-tooling.mp4" caption="The New Project wizard, then a new table from the SQLX templates" index=11 %}

## Installation

1. In IntelliJ IDEA, open **Settings ▸ Plugins ▸ Marketplace**.
2. Search for **Dataform** and install the plugin, or use the button above.
3. Restart the IDE.

Requirements: IntelliJ IDEA Ultimate 2026.2 or later, Node.js, and the Dataform CLI and Core, which the
plugin can install for you.

The plugin was made for IntelliJ IDEA Ultimate because it needs Node.js and SQL support, which are only
available in paid versions. The full list of supported IDEs is on the
[plugin page](https://plugins.jetbrains.com/plugin/30020) and is determined by JetBrains.

## Support

Report bugs and request features on the
[GitHub issue tracker](https://github.com/rejeb/google-cloud-dataform-plugin/issues).

[Privacy Policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}) ·
[Terms of Service]({{ '/dataform-plugin/terms-of-service' | relative_url }})

---
layout: doc
section: features
project: dataform-plugin
title: Compiled preview · Google Cloud Dataform Plugin for IntelliJ
heading: Compiled preview
summary: >-
  A split editor next to each SQLX file with the compiled query, the resolved schema and the file
  lineage.
description: >-
  The compiled preview of Google Cloud Dataform Plugin for IntelliJ: compiled SQL, resolved schema and lineage
  next to each SQLX file.
nav_order: 3
permalink: /dataform-plugin/features/compiled-preview
---

Each SQLX file opens in a split editor: your source on the left, and a preview of what Dataform
compiles it to on the right. The preview follows the background compilation, so it stays in sync as
you edit.

{% include window.html src="/assets/img/df-shot5.webp" caption="Compiled query preview of gold_customer_ltv.sqlx with its assertions" index=1 %}

## Views

The toolbar at the top right of the editor switches the preview between three views:

| View | Content |
|---|---|
| **Query** | The compiled SQL, split into pre-operations, incremental pre-operations, the query, post-operations and compilation errors, followed by the queries of the action's assertions. |
| **Schema** | The resolved output schema of the action. |
| **Lineage** | The direct dependencies of the file. See [Lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}). |

In the screenshot above, the **Query** view shows the compiled query of `gold_customer_ltv`, with
`${ref()}` replaced by full table names, then the `uniqueKey` and `rowConditions` assertions generated
from its `config { }` block.

## Running from the preview

The **Execute Query** button of the toolbar runs the compiled query in BigQuery. See
[Query execution]({{ '/dataform-plugin/features/query-execution' | relative_url }}).

Schemas are resolved through BigQuery dry runs, so the **Schema** view needs the Google Cloud
sign-in and an active repository (see [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }})).

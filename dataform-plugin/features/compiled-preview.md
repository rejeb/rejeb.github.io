---
layout: doc
section: features
project: dataform-plugin
title: Compiled preview · Google Cloud Dataform Plugin for IntelliJ
heading: Compiled preview
summary: >-
  A split editor next to each SQLX file with the compiled queries and their assertions, the
  estimated BigQuery cost, the output schemas and the file lineage.
description: >-
  The compiled preview of Google Cloud Dataform Plugin for IntelliJ: compiled SQL and assertions,
  estimated cost, resolved schemas and lineage next to each SQLX file.
nav_order: 3
permalink: /dataform-plugin/features/compiled-preview
---

Each SQLX file opens in a split editor: your source on the left, and a preview of what Dataform
compiles it to on the right. The preview follows the background compilation, so it stays in sync as
you edit.

{% include video.html src="/assets/video/dataform/compiled-preview.mp4" caption="Query, Assertions, Schema and Lineage views of gold_customer_ltv.sqlx" index=1 %}

## Views

The toolbar at the top right of the editor switches the preview between its views:

| View | Content |
|---|---|
| **Query** | The compiled queries of the file's actions, with their assertions and estimated cost. |
| **Schema** | The output columns of each action. Assertions are listed without columns. |
| **Lineage** | The direct dependencies of the file. See [Lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}). |
| **Test** | For a unit test file: the compiled test query and the expected output. See [Unit tests]({{ '/dataform-plugin/features/unit-tests' | relative_url }}). |

The **Editor only**, **Editor and preview** and **Preview only** buttons next to them change the
split.

## Query view

The header shows how many actions the file defines, when it was compiled, and the **Estimated**
bytes and cost of all its queries.

Each action has its own block, titled with its full table name and type, with its bytes and cost
and three buttons: **Copy SQL**, **Run Query** and **Open in BigQuery Console**. In the block:

- the **Query** tab shows the compiled SQL, split into **Pre-operations**, **Incremental
  pre-operations**, the query and **Post-operations**, with `${ref()}` replaced by full table names;
- the **Assertions** tab lists the assertions generated from the `config { }` block (`uniqueKey`,
  `nonNull`, `rowConditions`, …), each with its query, cost and buttons.

{% include window.html src="/assets/img/dataform/preview-assertions.webp" caption="The uniqueKey and rowConditions assertions of gold_customer_ltv" index=1 %}

Drag the bottom edge of a SQL block to resize it; each block keeps its height. A query that failed
its BigQuery dry run shows a **BigQuery dry run failed** banner with the error and **Copy error**;
an action that did not compile shows its compilation error instead. See
[Errors and build]({{ '/dataform-plugin/features/errors-and-build' | relative_url }}).

## Cost estimates

The bytes and cost of each query come from a BigQuery dry run. Hover a cost to see how it was
priced: the location, the price per TiB and where the price comes from.

{% include window.html src="/assets/img/dataform/preview-cost-tooltip.webp" caption="Estimated bytes and cost, priced at the us-central1 list price" index=2 %}

The price source and the currency are set in the plugin settings. See
[BigQuery cost]({{ '/dataform-plugin/features/bigquery-cost' | relative_url }}).

## Schema view

The **Schema** view lists the output columns of each action as a tree, with their type, mode and
description. Nested `STRUCT` / `RECORD` fields can be expanded. The file's assertions are listed too,
but the plugin does not read their schema, so they show **No schema**.

- Click the copy icon next to a column to copy its path, for example `customer.email` for a nested
  field.
- **Copy Column Names** copies the list of top-level columns.
- **Refresh Schema** runs the dry run again.

{% include window.html src="/assets/img/dataform/preview-schema.webp" caption="Output schema of gold_customer_ltv, with its assertions listed below it" index=3 %}

Schemas and costs are resolved through BigQuery dry runs, so they need the Google Cloud sign-in and
an active repository (see [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }})).
Until then, the preview shows **Sign in to estimate**.

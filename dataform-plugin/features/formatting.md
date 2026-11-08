---
layout: doc
section: features
project: dataform-plugin
title: Formatting · Google Cloud Dataform Plugin for IntelliJ
heading: Formatting
summary: >-
  Format SQLX files with the built-in formatter, or with SQLFluff.
description: >-
  SQLX formatting in Google Cloud Dataform Plugin for IntelliJ: the built-in formatter and the SQLFluff
  integration.
nav_order: 12
permalink: /dataform-plugin/features/formatting
---

**Code ▸ Reformat Code** (`Ctrl+Alt+L`) formats SQLX files.

{% include video.html src="/assets/video/dataform/formatting.mp4" caption="Reformatting gold_customer_ltv.sqlx with SQLFluff" index=1 %}

## Built-in formatter

The built-in formatter knows the structure of a SQLX file: the `config { }` block, `js { }` blocks
and the SQL query are each formatted as the language they contain.

## SQLFluff

To format with [SQLFluff](https://sqlfluff.com/) instead, install it (`pip install sqlfluff`) and set
it up under **SQLFluff formatter** in the
[plugin settings]({{ '/dataform-plugin/docs/configuration' | relative_url }}#dataform-settings):

- **Executable**: the path to `sqlfluff`. The plugin runs `sqlfluff fix --dialect bigquery` on the
  SQL of the file;
- **Config file**: an optional `.sqlfluff` file with your rules, passed as `--config`;
- **Extra arguments**: added after the arguments above, separated by spaces.

{% include window.html src="/assets/img/dataform/formatting.webp" caption="gold_customer_ltv.sqlx after formatting" index=1 %}

> Some of SQLFluff's default rules do more than change the layout. Rule ST06 moves plain columns before
> calculated ones in a `SELECT`, so the plugin runs SQLFluff with `--exclude-rules ST06` to keep your
> column order. It doesn't when you set a **Config file** or pass `--exclude-rules` in **Extra
> arguments**: your own rules then apply.

---
layout: doc
section: features
project: dataform-plugin
title: SQLX editing · Google Cloud Dataform Plugin for IntelliJ
heading: SQLX editing
summary: >-
  Highlighting, completion, navigation, Quick Documentation and inline expression values for SQLX
  files, with BigQuery SQL and JavaScript support.
description: >-
  SQLX editing in Google Cloud Dataform Plugin for IntelliJ: highlighting, completion, navigation, Quick
  Documentation and template expressions folded to their value.
nav_order: 2
permalink: /dataform-plugin/features/sqlx-editing
---

The plugin understands the three parts of a SQLX file: the `config { }` block, `js { }` blocks and the
BigQuery SQL query, with its `${...}` template expressions. It also injects BigQuery SQL in the query
template literals of `.js` and `.ts` definition files.

{% include video.html src="/assets/video/dataform/sqlx-editing.mp4" caption="Completing a ref(), a join column and Quick Documentation in gold_customer_ltv.sqlx" index=1 %}

## Editor toolbar

Each SQLX file opens with a toolbar above the editor:

- on the left, **Compile** compiles the Dataform project, **Run query** runs the compiled query in
  BigQuery (see [Query execution]({{ '/dataform-plugin/features/query-execution' | relative_url }})) and
  **Run action** runs the file's action as a Dataform workflow (see
  [Workflow runs]({{ '/dataform-plugin/features/workflow-runs' | relative_url }})). In a unit test
  file they become **Run test query** and **Run test**;
- on the right, **Editor only**, **Editor and preview** and **Preview only** set the split layout,
  and **Query**, **Schema** and **Lineage** switch the
  [compiled preview]({{ '/dataform-plugin/features/compiled-preview' | relative_url }}). Unit test files
  show a **Test** view instead.

## Highlighting and validation

- Syntax highlighting for SQL, JavaScript and config blocks.
- BigQuery SQL dialect, with syntax validation and error highlighting.
- Schema-based validation of `workflow_settings.yaml` and `config { }` blocks.
- Dataform compilation and BigQuery dry-run errors shown on the tokens they refer to. See
  [Errors and build]({{ '/dataform-plugin/features/errors-and-build' | relative_url }}).

## Completion

`Ctrl+Space` completes:

- Dataform functions: `ref()`, `declare()`, `publish()`, `resolve()`, `self()`, …;
- the actions declared in the project, inside `ref()`, in SQLX and JavaScript files, with their full
  table name and their type (table, incremental, view, …);
- `config { }` keys and `workflow_settings.yaml` properties;
- JavaScript and TypeScript symbols, including your `includes/`;
- the columns of the tables produced by your project, with qualified names, their BigQuery type and
  nested `STRUCT` / `RECORD` fields. Schemas come from BigQuery dry runs of the compiled queries.

Typing `$` opens completion for a `${...}` expression.

{% include video.html src="/assets/video/dataform/sqlx-completion.mp4" caption="Completing ${ref()}, a table name, then join columns" index=2 %}

{% include window.html src="/assets/img/dataform/sqlx-js-file.webp" caption="Completing ref() inside the query of a .js definition file" index=1 %}

## Config block

In a `config { }` block, the keys and values offered follow the action's `type` and the
`@dataform/core` version of the project:

- only the keys of that action type are offered. Completing a key inserts a skeleton matching what it
  expects, or moves the caret to its value when the key is already set;
- enumerated values are offered, as well as the tags already used in the project, and the action's own
  columns in `columns`, `clusterBy`, `uniqueKey` and `assertions`;
- `partitionBy` offers the partitioning expressions the action's columns allow, such as
  `DATE(order_ts)` or `TIMESTAMP_TRUNC(order_ts, DAY)` on a timestamp column.

`Ctrl+Q` on a key describes what it expects, and lists the action's columns when the key names one.
Mistakes in the block are reported as you type; see
[Errors and build]({{ '/dataform-plugin/features/errors-and-build' | relative_url }}#in-the-editor).

{% include window.html src="/assets/img/dataform/config-completion.webp" caption="The partitioning expressions offered for partitionBy, from the columns of the action" index=2 %}

## Navigation

- `Ctrl+Click` or `Ctrl+B` on a `ref()` jumps to the referenced action, on an include to its file, and
  on a symbol to its declaration.
- `Ctrl+Click` on a column opens the column window: where the column is declared and every query that
  reads it. See [Column refactoring]({{ '/dataform-plugin/features/column-refactoring' | relative_url }}).
- `DECLARE` variables of pre-operations resolve inside the query.

## Quick Documentation

`Ctrl+Q` shows:

- for a table or `ref()`: the target action, its type, schema and columns;
- for a column: its name, type, mode, description and the table it comes from;
- for a BigQuery function: its signature, description and examples.

{% include window.html src="/assets/img/dataform/sqlx-quickdoc.webp" caption="Quick Documentation of the email column of silver_customers" index=3 %}

## Inline expression values

Template expressions are folded to their evaluated value, the way IntelliJ IDEA shows the values of
`.properties` keys: `FROM ${ref("users")}` reads as `FROM my-project.my_dataset.users`.

{% include video.html src="/assets/video/dataform/sqlx-folding.mp4" caption="Folded expressions of silver_orders.sqlx, expanded and edited" index=3 %}

- `workflow_settings.yaml` references, such as `dataform.projectConfig.vars.env`, and `includes/`
  exports are folded too.
- Long or multi-line values are painted over several lines, in place.
- Hover a fold, or press `Ctrl+Q`, to see the expression and its full value. Click a fold to edit
  the expression.
- Only expressions with a single deterministic value are folded. Expressions that depend on the run
  mode (`when()`, `incremental()`) or define actions (`publish()`, `operate()`, `assert()`,
  `declare()`) stay visible.

{% include window.html src="/assets/img/dataform/sqlx-folding.webp" caption="An includes/ helper folded to the WHERE clause it returns" index=4 %}

Values are computed by running the expression with the project's Node.js, so `ref()` and `self()`
resolve after a compilation. The feature can be turned off in the
[plugin settings]({{ '/dataform-plugin/docs/configuration' | relative_url }}#dataform-settings).

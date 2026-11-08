---
layout: doc
section: features
project: dataform-plugin
title: Column refactoring · Google Cloud Dataform Plugin for IntelliJ
heading: Column refactoring
summary: >-
  Find where a column comes from and who reads it, rename it across the whole pipeline, and see
  which downstream actions break when you change it.
description: >-
  Column refactoring in Google Cloud Dataform Plugin for IntelliJ: column usages across actions,
  pipeline-wide rename, impact analysis on save and renaming downstream usages.
nav_order: 5
permalink: /dataform-plugin/features/column-refactoring
---

The plugin follows each column from the action that declares it to every action that reads it,
using the [column lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}#column-lineage) of
the compiled project. The same lineage drives three features: column usages, rename, and the impact
analysis of a change.

Column features use the table schemas resolved through BigQuery dry runs, so they need the Google
Cloud sign-in and an active repository (see [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }})).

## Column usages

`Ctrl+Click` or `Ctrl+B` on a column opens the column window:

- **Declaration**: where the column is built, in its own action or the one it comes from;
- **Usages**: every query that reads it downstream, with the file and line, unit tests included.

Select a row to jump to it. **Show Column Usages** (`Alt+Shift+U`, or the first item of the
editor's context menu) opens the same window, and **Find Usages** (`Alt+F7`) lists the reads in the
Find tool window. **Find Usages** works on Dataform tables, columns, the aliases declaring them and
the fields of `STRUCT` columns, which have their own usages.

{% include window.html src="/assets/img/dataform/column-usages.webp" caption="Declaration and usages of full_name, from silver_customers.sqlx" index=1 %}

{% include window.html src="/assets/img/dataform/column-find-usages.webp" caption="Find Usages on the full_name alias: the column declaration and its reads" index=2 %}

## Rename a column

**Refactor ▸ Rename** (`Shift+F6`) on a column renames it in place, in its action and in every
downstream action that reads it:

- the queries reading the column, through `${ref()}`, CTEs and subqueries;
- the `config { }` keys naming it, such as `uniqueKey`, `nonNull` or partitioning and clustering
  columns;
- the unit tests of the actions concerned: their input mocks and expected output.

Press `Shift+F6` again to open the **Rename** dialog, where **Preview** lists every place before
anything changes. When part of the rename cannot be done, for example an unqualified read in a
query joining several tables, a notification lists what was left unchanged.

{% include video.html src="/assets/video/dataform/column-refactoring.mp4" caption="Renaming full_name to display_name from silver_customers.sqlx" index=1 %}

### Columns produced by `SELECT *`

An action that produces a column through `SELECT *` has no name to rewrite. When a rename reaches such
an action, the **Rename Column Produced by a Star** dialog asks how to go on:

- **Expand the star into the column list** replaces the star with its columns, so the column can be
  renamed there. The action then stops picking up new columns of its sources on its own.
- **Declare "*new name*" in *files* and leave the sources unchanged** gives the column its new name in
  the actions reading it. Everything upstream keeps the old name.

An option that cannot apply to the actions concerned is greyed out.

{% include window.html src="/assets/img/dataform/column-star-dialog.webp" caption="The star dialog when the column can only be renamed by expanding the star" index=3 %}

## Impact analysis on save

When you save a change that renames, removes or retypes a column, the plugin waits for the project
to compile and the schemas to refresh, then compares the columns with what they were before the
save.

{% include video.html src="/assets/video/dataform/column-impact.mp4" caption="Renaming email in silver_customers, then renaming its downstream usages" index=2 %}

- If downstream actions no longer work, the **Build** tool window opens a **Dataform Impact
  Analysis** node, with the broken actions grouped per file, each with its BigQuery error and the
  change behind it.
- In each broken file, the error names the change, for example *Name email not found inside c — Column
  `email` was renamed to `email_address` in `silver_customers`*, and keeps its **Replace with**
  quick fix.

{% include window.html src="/assets/img/dataform/impact-analysis.webp" caption="Three downstream actions still reading email after the rename" index=4 %}

## Rename downstream usages

For a rename, the new column name is highlighted in the action you changed, and a balloon appears.
The highlight's quick fix and the balloon's **Rename downstream usages** link both open the
**Refactoring Preview**, listing every downstream read of the old name, `config { }` keys and unit
test inputs included. Click **Refactor** to apply it.

{% include window.html src="/assets/img/dataform/impact-rename-preview.webp" caption="Refactoring Preview of the downstream reads of email" index=5 %}

- A read inside a CTE or a subquery keeps its old name through an alias (`c.email_address AS
  email`), so the rest of that query is left alone.
- An unqualified read of the old name in a query joining several tables is left unchanged and
  reported in the preview.

The highlight disappears once no downstream action fails on the old name.

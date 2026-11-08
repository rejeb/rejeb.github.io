---
layout: doc
section: features
project: dataform-plugin
title: Query execution · Google Cloud Dataform Plugin for IntelliJ
heading: Query execution
summary: >-
  Run the compiled query of an action or an assertion in BigQuery and browse the results in a
  paged data grid, with the job's bytes, slot time and cost.
description: >-
  Executing compiled Dataform queries in BigQuery from IntelliJ IDEA with Google Cloud Dataform Plugin for
  IntelliJ, with paged results and job statistics.
nav_order: 9
permalink: /dataform-plugin/features/query-execution
---

You can run the compiled query of an action in BigQuery without leaving the editor, to check what a
table or view returns before running the workflow.

{% include video.html src="/assets/video/dataform/query-results.mp4" caption="Running the query of gold_customer_ltv and reading its Job Info" index=1 %}

## Run a query

- Click **Run query** in the SQLX editor toolbar. When the file defines several actions, the plugin
  asks which one to run.
- Or click **Run Query** (▶) on a block of the
  [compiled preview]({{ '/dataform-plugin/features/compiled-preview' | relative_url }}) to run that
  query, an assertion included.

In a unit test file, the button is named **Run test query**.

The query always matches your sources: if an edit has not been compiled yet, the plugin waits for
the compilation in the background (**Waiting for Dataform compilation…**, which you can cancel)
before running it.

## Results

The results open in the **Services** tool window, under **Dataform Queries**, one node per query
with the name of its target and the time it ran. Each query has three tabs:

| Tab | Content |
|---|---|
| **Results** | The rows in a paged data grid, with the row count, the bytes processed and the cost. Columns can be sorted and filtered. |
| **Job Info** | The BigQuery job: job ID, a link to the Google Cloud console, location, state, creation time and duration, and its statistics: bytes processed and billed, estimated cost, slot time and cache hit. |
| **Query** | The SQL that was sent. |

{% include window.html src="/assets/img/dataform/query-results.webp" caption="Results of gold_customer_ltv in the Services tool window" index=1 %}

{% include window.html src="/assets/img/dataform/query-jobinfo.webp" caption="Job Info: bytes billed, estimated cost and slot time" index=2 %}

A running query can be cancelled in BigQuery from its node. **Remove Finished Queries** clears the
queries that are done.

## Safe execution

Before a dry run or a preview query is sent, the plugin keeps only the pre-operations known to have no
side effects: `DECLARE`, `SET`, `SELECT`, `WITH` and temporary functions. Every other statement is
dropped, including `CREATE TEMP TABLE`, so a query reading a temporary table created in its
pre-operations cannot be dry-run or previewed.

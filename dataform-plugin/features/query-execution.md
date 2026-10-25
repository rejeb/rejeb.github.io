---
layout: doc
section: features
project: dataform-plugin
title: Query execution · Google Cloud Dataform Plugin for IntelliJ
heading: Query execution
summary: >-
  Run the compiled query of an action in BigQuery and browse the results in a paged data grid.
description: >-
  Executing compiled Dataform queries in BigQuery from IntelliJ IDEA with Google Cloud Dataform Plugin for
  IntelliJ, with paged results and job statistics.
nav_order: 7
permalink: /dataform-plugin/features/query-execution
---

You can run the compiled query of an action in BigQuery without leaving the editor, to check what a
table or view returns before running the workflow.

![Query results of gold_customer_ltv in the Services tool window]({{ '/assets/img/df-shot7.webp' | relative_url }})

## Run a query

1. Open a SQLX file. The [compiled preview]({{ '/dataform-plugin/features/compiled-preview' | relative_url }})
   opens next to it.
2. Click **Execute Query** in the split editor toolbar.

The results open in the **Services** tool window, under the name of the target table:

- the **Results** tab shows the rows in a paged data grid;
- the **Job Info** tab shows the query statistics of the BigQuery job.

In a unit test file, the same button is named **Execute Test Query**.

## Safe execution

Pre-operations that create, alter, insert, update or delete are filtered out before a dry run or a
preview query is sent.

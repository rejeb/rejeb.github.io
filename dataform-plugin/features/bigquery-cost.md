---
layout: doc
section: features
project: dataform-plugin
title: BigQuery cost · Google Cloud Dataform Plugin for IntelliJ
heading: BigQuery cost
summary: >-
  The bytes and on-demand cost of each query before you run it, and the bytes billed and cost of
  the queries and workflows you ran.
description: >-
  BigQuery cost estimates in Google Cloud Dataform Plugin for IntelliJ: dry-run estimates in the
  compiled preview, billed cost of queries and workflow runs, and the price settings.
nav_order: 10
permalink: /dataform-plugin/features/bigquery-cost
---

The plugin tells you what a query will cost before you run it, and what it cost once it ran.

{% include video.html src="/assets/video/dataform/bigquery-cost.mp4" caption="The estimated cost before running the query, then bytes billed and cost in Job Info" index=1 %}

## Before running

The [compiled preview]({{ '/dataform-plugin/features/compiled-preview' | relative_url }}) dry-runs
every query of the file and shows:

- for each action and each assertion, the bytes the query would process and their estimated cost;
- in the header, the **Estimated** total of the file. When some queries cannot be estimated, it says
  how many it covers, for example **Estimated (2 of 3)**.

Hover a cost to see how it was priced: the location of the query, the price per TiB and where the
price comes from.

{% include window.html src="/assets/img/dataform/preview-cost-tooltip.webp" caption="Estimate of gold_customer_ltv, priced at the us-central1 list price" index=1 %}

## After running

- [Query execution]({{ '/dataform-plugin/features/query-execution' | relative_url }}): the
  **Results** tab shows the bytes processed and the cost; **Job Info** shows the bytes processed and
  billed, the estimated cost and the slot time.
- [Workflow runs]({{ '/dataform-plugin/features/workflow-runs' | relative_url }}): the **Summary**
  of each action shows its BigQuery job with its bytes and cost, and the **Workflow invocation**
  shows the bytes processed and billed and the estimated cost of the whole run.

Costs after a run are computed from the bytes billed, so they include BigQuery's minimum billing.
Estimates come from the bytes a dry run reports, priced at no less than BigQuery's 10 MB minimum for
a query that reads a table; the tooltip says when the minimum applies. BigQuery can also bill 10 MB
for each table a query reads, so a query on several small tables can cost more than its estimate.

A query served from the BigQuery cache is not billed: its header shows **cache hit**, and **Job Info**
shows 0 B billed.

## Settings

Costs are set up in **Settings ▸ Tools ▸ Dataform ▸ BigQuery cost**:

| Setting | Description |
|---|---|
| **Show estimated cost in the compiled query preview** | Turns the estimates of the preview on or off. |
| **List price from Google Cloud Billing, per query location** | The on-demand price of each location, read from the Google Cloud Billing catalog. Excludes the 1 TiB monthly free tier and contract discounts. |
| **Fixed price … per TiB, every location** | One price for every location, for example a negotiated rate. |
| **Capacity pricing (reservations)** | Shows bytes only, without a price, for projects billed by slot reservations. Jobs that report a reservation are always shown this way. |
| **Currency** | The currency of the prices. |

The line below shows how many locations the price list covers and when it was last updated;
**Refresh** loads it again.

{% include window.html src="/assets/img/dataform/settings-cost.webp" caption="The BigQuery cost settings" index=2 %}

{% include window.html src="/assets/img/dataform/preview-capacity.webp" caption="The compiled preview with capacity pricing: bytes only, without a price" index=3 %}

Prices are estimates for information only; your Google Cloud bill is the reference.

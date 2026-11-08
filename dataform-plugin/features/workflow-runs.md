---
layout: doc
section: features
project: dataform-plugin
title: Workflow runs · Google Cloud Dataform Plugin for IntelliJ
heading: Workflow runs
summary: >-
  Run actions, tags or the whole workflow from the editor, the gutter or a run configuration, and
  follow each action live with its SQL, BigQuery jobs and cost.
description: >-
  Running Dataform workflows from IntelliJ IDEA with Google Cloud Dataform Plugin for IntelliJ: gutter icons, the
  Dataform Workflow run configuration and the run console.
nav_order: 8
permalink: /dataform-plugin/features/workflow-runs
---

The plugin starts Dataform workflow invocations in Google Cloud from your local files, and shows
their progress in the IDE.

Each run creates a temporary Dataform workspace in the active repository, uploads your local files
to it, starts the invocation there, and deletes the workspace when the run ends. You run your local
project as it is, without pushing it to a shared workspace first. If the deletion fails, the workspace
stays in the repository with a name starting with `intellij-run-`; you can delete it in the Google
Cloud console.

{% include video.html src="/assets/video/dataform/workflow-run.mp4" caption="Running gold_customer_ltv and its assertions, then reading the run console" index=1 %}

## Start a run

- **Run action** in the SQLX editor toolbar runs the file's action.
- The run icon in the gutter of a SQLX file runs that action, or all the actions sharing one of its
  tags.
- The [Lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}) details panel and node menu
  have a **Run** button for the selected action.

The first run started from a file opens the **Run Dataform Workflow** dialog, prefilled for that
file, so you can review the options before anything runs in BigQuery. Click **Run** to start it.

{% include window.html src="/assets/img/dataform/workflow-gutter-tags.webp" caption="The run dialog prefilled with a tag of gold_customer_ltv" index=1 %}

## Run configurations

To save a run and start it again later, create a **Dataform Workflow** run configuration with
**Run ▸ Edit Configurations ▸ + ▸ Dataform Workflow**:

| Option | Description |
|---|---|
| **Actions / Tags / All** | Run the selected actions, the actions carrying the selected tags, or the whole project. |
| **Include upstream dependencies** | Also run the actions the selection depends on. |
| **Include downstream dependents** | Also run the actions that depend on the selection. |
| **Full refresh** | Recreate incremental tables instead of updating them. |

{% include window.html src="/assets/img/dataform/workflow-run-config.webp" caption="A Dataform Workflow run configuration with one action and its assertions" index=2 %}

## Run console

While the workflow runs, the **Run** tool window shows:

- a status header with the result, the number of succeeded actions and the duration;
- the action tree, with the status and duration of each action. **Show Failed Only**, in the
  toolbar, keeps the actions that failed;
- on the right, the details of the selected node.

Select the root node to see the **Workflow invocation**: its state, start time, duration, run
configuration and number of actions, the repository, project, location and service account, the
counts of succeeded, failed, skipped and cancelled actions, and the bytes processed and billed with
their estimated cost. **Copy Invocation ID** copies its ID, and **Open in Google Cloud Console**,
in the toolbar, opens it in your browser.

{% include window.html src="/assets/img/dataform/run-invocation.webp" caption="The Workflow invocation details of a successful run" index=3 %}

Select an action to see it in three tabs:

| Tab | Content |
|---|---|
| **Summary** | Status, type, target table, location, timings, and the BigQuery job with its bytes and cost. |
| **Executed SQL** | The SQL Dataform sent to BigQuery for this action. |
| **Jobs** | The BigQuery jobs of the action and their statements on a timeline, with the bytes of each statement. Select a statement to read its SQL; for a failure, the failing line is marked. |

{% include window.html src="/assets/img/dataform/run-summary.webp" caption="The Summary of gold_customer_ltv" index=4 %}

{% include window.html src="/assets/img/dataform/run-sql.webp" caption="The Executed SQL of gold_customer_ltv" index=5 %}

{% include window.html src="/assets/img/dataform/run-jobs.webp" caption="The Jobs timeline of gold_customer_ltv: CREATE SCHEMA, SELECT and CREATE TABLE AS SELECT" index=6 %}

Above the tabs, **Jump to Source** opens the action's SQLX file and **Run This Action** runs that
action only. The invocation and each job link to the Google Cloud console.

### When an action fails

The failed action shows a banner above its tabs: **BigQuery job failed**, or **Action failed** when
the error did not come from a BigQuery job, with the error, **Show in editor** and **Copy error**.

{% include window.html src="/assets/img/dataform/run-failed.webp" caption="A failed action, with the assertions depending on it skipped" index=7 %}

The **Jobs** tab marks the failing line of the statement.

{% include window.html src="/assets/img/dataform/run-failed-jobs.webp" caption="The failing statement in the Jobs tab, with its line marked" index=8 %}

An action skipped because of a failure upstream says so and links to the action that failed. An
action cancelled by stopping the run says that the invocation was stopped before it finished.

Runs use the service account of the active repository when one is set; see
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}#service-account). Bytes
billed are priced as described in [BigQuery cost]({{ '/dataform-plugin/features/bigquery-cost' | relative_url }}).

---
layout: doc
section: features
project: dataform-plugin
title: Workflow runs · Google Cloud Dataform Plugin for IntelliJ
heading: Workflow runs
summary: >-
  Run actions, tags or the whole workflow from the gutter or a run configuration, and follow each
  action live with its BigQuery job details.
description: >-
  Running Dataform workflows from IntelliJ IDEA with Google Cloud Dataform Plugin for IntelliJ: gutter icons, the
  Dataform Workflow run configuration and the execution view.
nav_order: 6
permalink: /dataform-plugin/features/workflow-runs
---

The plugin starts Dataform workflow invocations in Google Cloud, on the workspace you selected, and
shows their progress in the IDE.

## From the gutter

A run icon in the gutter of each SQLX file runs that action, or all the actions sharing its tags.
The [Lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}) details panel also has a
**Run** button for the selected action.

## Run configurations

To save a run and start it again later, create a **Dataform Workflow** run configuration with
**Run ▸ Edit Configurations ▸ + ▸ Dataform Workflow**:

![Dataform Workflow run configuration running the gold tag]({{ '/assets/img/df-shot11.webp' | relative_url }})

| Option | Description |
|---|---|
| **Workspace** | The Dataform workspace to run. |
| **Actions / Tags / All** | Run the selected actions, the actions carrying the selected tags, or the whole project. |
| **Include upstream dependencies** | Also run the actions the selection depends on. |
| **Include downstream dependents** | Also run the actions that depend on the selection. |
| **Full refresh** | Recreate incremental tables instead of updating them. |

## Execution view

While the workflow runs, the execution view shows the progress of each action, with its status,
timings and failure reason. For each executed action it also shows the BigQuery job: job id, bytes
processed and billed, duration and the queries of child jobs.

Runs use the service account of the active repository when one is set; see
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}#service-account).

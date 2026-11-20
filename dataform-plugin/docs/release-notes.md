---
layout: doc
project: dataform-plugin
title: Release notes · Google Cloud Dataform Plugin for IntelliJ
heading: Release notes
description: >-
  What changed in each version of Google Cloud Dataform Plugin for IntelliJ, starting with version
  1.0.0.
nav_order: 5
permalink: /dataform-plugin/docs/release-notes
last_modified_at: 2026-11-20
---

Earlier versions are listed on the [plugin page](https://plugins.jetbrains.com/plugin/30020).

## 1.1.0

### New

- [Knowledge Catalog lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}#knowledge-catalog-lineage): the project
  lineage and the **Lineage** view of the compiled preview have a **Dataform | Knowledge Catalog**
  switch. Knowledge Catalog shows the lineage BigQuery recorded when the jobs ran, for the whole
  repository: every table and the tables outside it up to two levels away, with a **+N** expander at
  the edge of the graph that loads one more level, when each table was last written, and for a
  recorded link the jobs that recorded it and the `ref()` that declares it. It needs the Data Lineage
  API and the `roles/datalineage.viewer` role.
- [Cached lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}#loading-and-updates): the Knowledge Catalog lineage is
  kept in the project cache and drawn at once when a lineage view is shown, then checked with one
  call and updated in the background. A failed update keeps the lineage loaded before, with
  **Retry**.
- [Open full lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}#in-the-compiled-preview), from the **Lineage** view of
  a file, opens the project lineage on the same source with the tables of the file marked.
- [Dataform Lineage tool window]({{ '/dataform-plugin/features/lineage' | relative_url }}#the-dataform-lineage-tool-window):
  **Runs** lists the runs that wrote a table or a link, with **Open latest job**; **Trace** lists up to
  5 levels upstream or downstream, tables not on the graph yet included; **Differences** lists the
  links that ran but no `ref()` declares, and the declared dependencies no run read.
- [Column cards]({{ '/dataform-plugin/features/lineage' | relative_url }}#column-lineage): each node lists its columns with their
  BigQuery types. Selecting a column colours every column on its lineage, in each card, instead of
  drawing column-to-column edges.
- [Column search]({{ '/dataform-plugin/features/lineage' | relative_url }}#search): a **Tables | Columns** switch in the search
  field. A column search finds the columns by name and shows their lineage.
- With Knowledge Catalog, the column lineage is the recorded one, and tables outside the repository
  list the columns read from BigQuery.

### Improvements

- [Scripts]({{ '/dataform-plugin/features/bigquery-cost' | relative_url }}#scripts) (a query behind pre-operations, or several statements)
  show **Run to estimate** in the compiled preview instead of a cost BigQuery cannot estimate.
  **Run Query** measures them, without the BigQuery cache, and the preview then shows the bytes and
  cost of that run.
- A selected column keeps the tables off its lineage on screen, faded.

### Fixes

- **Compare File with Remote** compared the local file with an empty remote side. It now compares
  it with the selected workspace, or with the main branch when no workspace is selected.
- After a push, the **Files** tab of the Dataform Tools tool window kept the old status of the files.
- A long dry-run error widened every block of the compiled preview.
- In a narrow editor, the headers of the compiled preview and of the lineage view ran under their
  buttons. Their text is now shortened, with the whole text in a tooltip.
- A SQLX file reverted on disk, for example by a Git checkout, showed the code of its template
  expressions instead of their evaluated values.
- Completion could fail in a SQLX file after its evaluated values were refreshed.
- Query results could show a negative duration and 0 B processed when the job ended between two
  status checks.

## 1.0.0

Requires IntelliJ IDEA Ultimate 2026.2 or later. The full list of supported IDEs is on the plugin page.

### New

- [BigQuery cost]({{ '/dataform-plugin/features/bigquery-cost' | relative_url }}): the compiled query
  preview shows the bytes each action would process and their estimated on-demand cost, with a total for
  the file. Executed queries and workflow runs show the bytes billed and their cost, per action and per
  run. Prices come from Google Cloud Billing for the location of each query, or from a fixed price per
  TiB; capacity (reservation) projects show bytes only.
- [Impact analysis on save]({{ '/dataform-plugin/features/column-refactoring' | relative_url }}#impact-analysis-on-save):
  when a saved change renames, removes or retypes a column read downstream, the affected actions and
  their BigQuery errors are listed per file in the **Build** tool window, and each downstream error names
  the change behind it.
- [Rename downstream usages]({{ '/dataform-plugin/features/column-refactoring' | relative_url }}#rename-downstream-usages):
  after renaming a column in its action, a quick fix and a balloon rename every downstream read of the
  old name through the rename preview.
- Operations with `hasOutput: true` are dry-run like tables: their schema is resolved and their BigQuery
  errors are shown in the editor and in the build.
- New [Dataform Tools tool window]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}):
  repository and workspace pickers, a **Files** tab with the status of the workspace files, a **Changes**
  tab to commit and push the workspace, **Fetch to Local** and **Compare with Local** on any file, and
  **Open in Google Cloud Console** for the workspace or a single file.
- [Open a project from an existing Dataform repository]({{ '/dataform-plugin/docs/project-setup' | relative_url }}#open-a-dataform-repository):
  **File ▸ New ▸ Project from Version Control** (**Clone Repository** on the Welcome screen) has a
  **Dataform** tab listing the repositories of a Google Cloud project and location. A repository with a
  Git remote is cloned by default, with your local Git credentials; any repository can also be
  downloaded from one of its workspaces. The new project is linked to the repository in the tool
  window, and the New Project wizard links to this tab.
- [Commit and push]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}#commit-and-push-to-git)
  follow how the project relates to the repository's Git remote. A local clone of it commits with Git:
  the **Changes** tab's commit and push buttons are disabled and, with the Git plugin, link to
  **New Branch…**. Without a local clone, they stay in the workspace, suggest cloning, and ask which
  branch of the remote receives the commits: the default branch or the one named after the workspace,
  as in the Dataform console.
- [Workflow run console]({{ '/dataform-plugin/features/workflow-runs' | relative_url }}#run-console): a
  status header, the action tree with durations and a **Show Failed Only** filter, and per action a
  **Summary**, the **Executed SQL** and a **Jobs** tab drawing the BigQuery jobs and statements on a
  timeline.
- [Query results]({{ '/dataform-plugin/features/query-execution' | relative_url }}) in the Services view
  are grouped under **Dataform Queries**, with **Query**, **Results** and **Job Info** tabs and a
  **Remove Finished Queries** action.
- SQLX editor toolbar: **Compile**, **Run query** and **Run action** buttons, and a switch between the
  **Query**, **Schema** and **Lineage** views (**Test** for unit test files).
- [Compiled preview]({{ '/dataform-plugin/features/compiled-preview' | relative_url }}): a header with
  the compilation time and the estimated total, one block per action with its assertions in their own
  tab, resizable SQL blocks and a **Copy** button.
- **Schema** view: the output columns of each action as a tree, nested `STRUCT` fields included, with
  type, mode and description, and a button to copy a column's path.
- [Build tool window]({{ '/dataform-plugin/features/errors-and-build' | relative_url }}#build): Dataform
  compilation errors are shown with the code frame they point to, and a Dataform CLI that fails to start
  or stops before compiling is explained, with the command to reproduce it.
- Error and UI freeze reports: when the IDE shows an error or a slowdown notice for this plugin, you can
  send it to the plugin's page on JetBrains Marketplace after reviewing what it contains. If you turned
  on automatic error reporting in the IDE, reports are sent without asking. See the
  [privacy policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}#error-and-freeze-reports).
- New plugin logo and file icons; unit test files get their own icon.

### Improvements

- [Lineage]({{ '/dataform-plugin/features/lineage' | relative_url }}) views restyled: selecting a node
  highlights its whole upstream and downstream lineage and dims the rest, with a legend, a focus banner,
  zoom controls and a resizable details panel.
- **Manage Dataform Repositories**: the **Location** and **Service Account** fields filter their list as
  you type.
- The build waits for the schema refresh and lists failing BigQuery dry runs in the **Build** tool window,
  grouped per file. It no longer reports success while queries fail, and no longer opens the first file
  with an error.
- Query execution and schema refreshes always use a compilation matching the current sources, waiting for
  a pending compilation in the background when needed.
- Running an action from the IDE uses a temporary workspace.
- Workflow runs started from the IDE execute as the service account set on the repository entry. Before,
  it only applied when the repository was created from the IDE.
- Compile on save is always on; its setting was removed.
- **Show Column Usages** moved to `Alt+Shift+U`: `Ctrl+Alt+Shift+U` belongs to Show Diagram in IntelliJ
  IDEA Ultimate.
- SQLFluff no longer reorders `SELECT` columns by default: rule ST06 is excluded unless a config file or
  `--exclude-rules` is set.
- Cost estimates apply BigQuery's 10 MB minimum to queries that read a table, and the tooltip says when it
  applies.
- Creating a unit test compiles the project, so its **Test** view is up to date.

### Fixes

- Tables and incremental tables were shown as views in `ref()` completion, Quick Documentation and the
  compiled preview.
- The **Changes** tab listed `node_modules` and files excluded by `.gitignore`.
- Assertions could be missing from the preview after a restart, because an outdated compilation was
  restored from the cache.
- Long lines of a query block could not be scrolled horizontally.
- A table name could be matched inside a longer, dashed table name when building schema queries (`orders`
  in `orders-v2`).
- **Rename downstream usages** left the unit test inputs mocking a renamed table with the old column name.
- The **Navigate** menu had lost its **Declaration or Usages** item.
- An underscore in a repository or workspace name was dropped in the Dataform Tools pickers
  (`user_purchase` showed as `userpurchase`).
- In-place rename failed with an error in SQLX files holding evaluated expressions.
- The `${ref("")}` and `${self()}` completions left the caret too far in files holding evaluated
  expressions.
- SQLX keywords were offered after `alias.` and while typing digits in a query.
- The file lineage panel went blank after the editor height changed.
- Lineage labels mixed upper and lower case action types, and the column lineage line was clipped in the
  details panel.
- The **Schema** view said an assertion's table did not exist yet.
- A workflow run ending in failure could leave its actions shown as running, with a timer still counting
  and no failure selected, when the invocation ended just before its actions.
- Column rename warned that a file could not be opened when a `STRUCT` field or an operation's column had
  no select item to rewrite.
- A repository linked to a Git remote failed with `is not hosted internally` when no workspace was
  selected, because Dataform does not serve its files without one. **Dataform Tools** now shows the
  branch of the Git remote from the local clone, read-only and marked as not being a Dataform branch.
  Without a local clone it asks for a workspace.

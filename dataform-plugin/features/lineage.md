---
layout: doc
section: features
project: dataform-plugin
title: Lineage · Google Cloud Dataform Plugin for IntelliJ
heading: Lineage
summary: >-
  The project lineage graph of your Dataform actions, from your code or as recorded by Knowledge
  Catalog, with column lineage, column search, filters and focus.
description: >-
  Data lineage in Google Cloud Dataform Plugin for IntelliJ: the project lineage view, column-level lineage,
  column search, Knowledge Catalog lineage with runs, trace and differences, filters and focus.
nav_order: 6
permalink: /dataform-plugin/features/lineage
---

The plugin draws the lineage of your Dataform actions from two sources:

- **Dataform**: the dependency graph of the compiled project, and the column lineage derived from the
  compiled `SELECT` statements. It is what your code declares, and needs no Google Cloud access.
- **Knowledge Catalog**: the lineage BigQuery recorded when the jobs ran, read from the Data Lineage
  API. It shows what really happened, including the tables outside your repository.

{% include video.html src="/assets/video/dataform/lineage.mp4" caption="Select a table, focus on its lineage, then follow one of its columns through the pipeline" index=1 %}

Lineage needs a compiled project. If the graph is empty, the view asks you to compile the Dataform
project first.

## Project lineage

Open the project lineage with **Tools ▸ Open Dataform Lineage**, the lineage icon in the main
toolbar, the editor or Project view context menu, or `Alt+Shift+D`. It opens in an editor tab named
**Dataform Lineage**.

{% include window.html src="/assets/img/dataform/lineage-selection.webp" caption="silver_customers selected: its whole lineage in blue, the rest dimmed" index=1 %}

The view has three parts:

- the **filters** sidebar on the left;
- the graph, with zoom buttons in the bottom left corner, an optional minimap, and a status bar
  showing how many nodes are visible and selected, and the zoom level;
- the **details** panel on the right, for the selected node, column or link. Drag its edge to resize
  it.

### Toolbar

| Control | Action |
|---|---|
| **Dataform \| Knowledge Catalog** | The source of the lineage. The choice is remembered per project. |
| **Show filters** | Show or hide the filters sidebar. |
| **Tables \| Columns** and the search field (`Ctrl+F`) | Search tables by name, schema and tags, or columns by name. See [Search](#search). |
| **Layout direction** | Lay the graph out left to right or top to bottom. |
| **Compact density** | Show the nodes on one line. |
| **Show minimap** | Show or hide the minimap. |
| **Show details** | Show or hide the details panel. |
| **Fit to view** | Fit the graph to the visible area. |
| **Recompile and refresh** | Dataform: recompile the project and refresh the lineage. |
| **Reload from Knowledge Catalog** | Knowledge Catalog: read the recorded lineage again. |
| **Last 30 days** | Knowledge Catalog: the time range of the recorded lineage, 30 days, 7 days or 24 hours. |
| **Differences** | Knowledge Catalog: draw the differences with Dataform on the graph, with their number. |
| **Legend** | What the glyphs, colours and edges mean. |

### Navigating the graph

- Scroll the mouse wheel to zoom and drag the background to pan.
- Each node is a card: the type glyph, the name and the schema of the action. A card whose columns
  are known opens or closes its full column list with a click on its bottom band, where a chevron
  appears when you point at it.
- Click a card to select it. Its whole upstream and downstream lineage is drawn with blue edges and
  yellow outlines, and the rest of the graph is dimmed. The details panel shows its file, schema, tags
  and its **Upstream** and **Downstream** actions, with **Open SQLX**, **Run** and **Focus** buttons.
- Double-click a node to open its source file.
- Right-click a node for **Open SQLX**, **Run**, **Focus on lineage** and **Copy name**.

### Search

The search field has a **Tables | Columns** switch.

- **Tables** finds the actions whose name, schema or tags contain the text (and the project, with
  Knowledge Catalog), outlines them in yellow and fades the rest. The counter shows how many were
  found.
- **Columns** finds the columns whose name contains the text, in every card, and shows the lineage
  of each one in its own colour, as if you had selected them. The counter shows the number of
  columns found, and how many tables could not be searched because their columns are unknown. Above
  10 columns, the columns are highlighted but their lineage is not drawn: type more to narrow the
  search.

{% include window.html src="/assets/img/dataform/lineage-search.webp" caption="A column search for email: 8 columns found, each lineage in its own colour" index=2 %}

### Filters

The filters sidebar narrows the graph down:

- **Action types**: show or hide declarations, operations, tables, incremental tables and views.
  Each type has its own glyph and colour, recalled in the **Legend**.
- **Tags**: show only the actions carrying the selected tags.
- **Schemas** (**Datasets** with Knowledge Catalog): show or hide the actions of each BigQuery
  dataset.

**Reset all filters** brings everything back.

### Focus

**Focus on lineage** keeps only the selected action and everything upstream and downstream of it,
which makes a large pipeline readable. A banner above the graph names the focused action; **Exit
focus** brings the full graph back.

## Column lineage

Open the column list of a card, then click a column. Every column it comes from and every column
derived from it appears in its card, in the colour of that lineage, across the whole pipeline. The
table edges the lineage goes through turn blue, and the tables off the lineage fade.

{% include window.html src="/assets/img/dataform/lineage-columns.webp" caption="Column lineage of silver_customers.customer_id, with its upstream and downstream columns in the details panel" index=3 %}

- `Ctrl+Click` adds or removes a column of the same table, to follow several columns at once, each in
  its own colour. Clicking the only selected column again clears the selection.
- The details panel lists the **Upstream columns** and **Downstream columns** of the selected column.

The Dataform column lineage uses the table schemas resolved through BigQuery dry runs, so it needs
you to be signed in with a repository configured (see
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }})). When some schemas cannot
be resolved, a banner warns that the column lineage may be incomplete and names the tables concerned:
building the project resolves them again. The same lineage drives
[column usages and rename]({{ '/dataform-plugin/features/column-refactoring' | relative_url }}).

## Knowledge Catalog lineage

Switch the source to **Knowledge Catalog** to see the lineage BigQuery recorded. The plugin reads
the lineage of every table of the repository, with the tables outside it up to two levels away, in
the Google Cloud project and the default location of the Dataform project. The status bar names the
project, the location, the time range and when the lineage was loaded.

{% include video.html src="/assets/video/dataform/lineage-knowledge-catalog.mp4" caption="The compiled preview switched to Knowledge Catalog, then Open full lineage: the runs, the trace and the differences in the Dataform Lineage tool window" index=2 %}

{% include window.html src="/assets/img/dataform/lineage-knowledge-catalog.webp" caption="The Knowledge Catalog lineage of the repository, with the run that wrote silver_customers in the Dataform Lineage tool window" index=4 %}

- Tables of your repository keep their glyph and open their file. Tables that no action of the
  repository produces are **outside the repository**: they have a dashed border and show their
  project and dataset. Double-click one to open it in the BigQuery console.
- A **+N** pill on the left or right corner of a card at the edge of the graph says that N more
  tables are recorded upstream or downstream; click it to load one more level. Trace lists them
  without loading them.
- The **(i)** of each card tells when the table was last written and by which process. A view shows
  when it was created or replaced instead, since it reads its sources live.
- Click an edge to select a recorded link. The details panel shows when it was first and last
  recorded, its runs, the processes that recorded it, and in Dataform the file and `ref()` that
  declare it. **Show runs** lists its runs and **Open latest job** opens the latest BigQuery job
  recorded for it.
- The details of a table add **Open in Knowledge Catalog**, which opens its lineage in the Google
  Cloud console, and **Trace**.

{% include window.html src="/assets/img/dataform/lineage-link.webp" caption="A recorded link: when it was recorded, by which process, and the ref() that declares it" index=5 %}

In the **Columns** scope, the column lineage is the one Knowledge Catalog recorded, and tables
outside the repository list their top-level columns, read from BigQuery.

{% include window.html src="/assets/img/dataform/lineage-kc-columns.webp" caption="A column search for email with Knowledge Catalog: 8 columns, each with its recorded lineage" index=6 %}

### Loading and updates

The first time, the graph shows **Loading the Knowledge Catalog lineage…** while the plugin reads
it. The lineage is then kept in the project cache of the IDE, once per time range, so a lineage view
draws it at once the next time, even after a restart. Each time a view shows it, one call checks
that it is still current. When the tables of the repository changed or Knowledge Catalog recorded a
run since, the plugin reads it again in the background: the status bar says **checking…**, then
**updating…**, and the graph is redrawn when the new lineage arrives. The tables loaded with a
**+N** pill are loaded again with it. **Reload from Knowledge Catalog** reads the lineage again on
demand.

When an update fails, a banner says **Could not update the Knowledge Catalog lineage** and why. The
lineage loaded before stays shown; **Retry** tries again.

A load keeps every table of the repository and at most 200 tables outside it, the nearest first.
When it reaches that limit, the status bar says **stopped at 200 nodes**.

### In the compiled preview

The **Lineage** view of the [compiled preview]({{ '/dataform-plugin/features/compiled-preview' | relative_url }})
has the same switch. With Knowledge Catalog it shows the tables of the file and the tables recorded
directly upstream and downstream of them, under **Direct recorded neighbours of** the file.

**Open full lineage** opens the project lineage on the same source, with the tables of the file
marked: a single table is selected and centred, several tables are outlined and fitted to the view.

{% include window.html src="/assets/img/dataform/lineage-file-kc.webp" caption="The direct recorded neighbours of silver_customers.sqlx in its compiled preview" index=7 %}

### The Dataform Lineage tool window

With Knowledge Catalog, selecting a table opens the **Dataform Lineage** tool window at the bottom of
the IDE, without taking the focus from the graph, and turning **Differences** on opens it on its
Differences tab. Switching the source back to Dataform hides it. It follows the selection of the
lineage view and has three tabs:

- **Runs**: the runs that wrote the selected table, or the runs of the selected link, with their
  state, start, duration, process and the data they moved. **Open latest job** opens the BigQuery
  job in the Google Cloud console.
- **Trace**: everything recorded **Upstream** or **Downstream** of the table, up to 5 levels, grouped
  by project, including the tables not loaded on the graph yet. Click a row to load the table onto the
  graph and select it.
- **Differences**: the differences between Dataform and Knowledge Catalog on the loaded graph, each
  with its explanation and **Open SQLX**:
  - **Recorded, not declared**: a job read a table that no `ref()` of the action declares, for
    example a table written by its full name in the SQL. It is drawn as an orange edge.
    **Declare the source** copies a ready declaration when the source is not declared at all.
  - **Declared, not recorded**: the action declares a dependency that no run read in the time range.
    It is drawn as a dashed grey edge.

{% include window.html src="/assets/img/dataform/lineage-trace.webp" caption="Trace of silver_customers, downstream" index=8 %}

{% include window.html src="/assets/img/dataform/lineage-differences.webp" caption="gold_daily_sales after an edit not run yet: it reads silver_orders by its full name, without ref(), and declares bronze_orders, which no run read" index=9 %}

### What Knowledge Catalog needs

Knowledge Catalog lineage is read with your Google account, so sign in first. Then:

- the **Data Lineage API** must be enabled in the Google Cloud project. Knowledge Catalog records
  lineage only for the jobs that run after it is enabled;
- your account needs the `roles/datalineage.viewer` role, and `roles/bigquery.metadataViewer` to
  list the columns of tables outside the repository.

Knowledge Catalog records a job within 24 hours of its run and keeps the lineage for 30 days, so a
new table can be missing for a while, and no date can be older than 30 days. When Knowledge Catalog
cannot answer, a banner over the graph says why, with what to do: **Enable the API**, **Copy the
role name**, **Sign in**, or **Show Dataform lineage**.

{% include window.html src="/assets/img/dataform/lineage-legend.webp" caption="The Legend in the Knowledge Catalog source" index=10 %}

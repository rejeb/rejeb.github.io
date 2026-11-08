---
layout: doc
section: features
project: dataform-plugin
title: Lineage · Google Cloud Dataform Plugin for IntelliJ
heading: Lineage
summary: >-
  File and project lineage graphs of your Dataform actions, with column-level lineage, filters,
  search and focus.
description: >-
  Data lineage in Google Cloud Dataform Plugin for IntelliJ: the file lineage of the split editor, the project
  lineage view, column-level lineage, filters, search and focus.
nav_order: 6
permalink: /dataform-plugin/features/lineage
---

The plugin draws the dependency graph of your Dataform actions from the compiled project, and the
column-to-column lineage from the compiled `SELECT` statements. Two views show it: the file lineage
next to a SQLX file, and the project lineage of the whole pipeline.

{% include video.html src="/assets/video/dataform/lineage.mp4" caption="Search, selection, focus mode, filters and column lineage in the project lineage" index=1 %}

Lineage needs a compiled project. If the graph is empty, the view asks you to compile the Dataform
project first.

## File lineage

Open a SQLX file and select the **Lineage** view in the split editor toolbar, at the top right of the
editor. The panel shows the **Direct dependencies** of the file: the actions it reads from on one
side and the actions that read from it on the other. Double-click a node to open its file.

Its toolbar switches the layout direction and the density, **Fit to view**, and **Open full
lineage** opens the project lineage described below.

## Project lineage

Open the project lineage with **Tools ▸ Open Dataform Lineage**, the lineage icon in the main
toolbar, the editor or Project view context menu, or `Alt+Shift+D`. It opens in an editor tab named
**Dataform Lineage**.

{% include window.html src="/assets/img/dataform/lineage-selection.webp" caption="silver_customers selected: its whole lineage in blue, the rest dimmed" index=1 %}

The view has three parts:

- the **filters** sidebar on the left;
- the graph, with zoom buttons in the bottom left corner, an optional minimap, and a status bar
  showing how many nodes are visible and selected, and the zoom level;
- the **details** panel on the right, for the selected node or column. Drag its edge to resize it.

### Toolbar

| Control | Action |
|---|---|
| **Show filters** | Show or hide the filters sidebar. |
| **Search tables, tags…** (`Ctrl+F`) | Highlight the matching actions, with the number found. |
| **Layout direction** | Lay the graph out left to right or top to bottom. |
| **Compact density** | Show the nodes on one line. |
| **Show minimap** | Show or hide the minimap. |
| **Show details** | Show or hide the details panel. |
| **Fit to view** | Fit the graph to the visible area. |
| **Recompile and refresh** | Recompile the project and refresh the lineage. |
| **Legend** | What the glyphs and colours of the nodes mean. |

{% include window.html src="/assets/img/dataform/lineage-search.webp" caption="Searching for gold_customer" index=2 %}

{% include window.html src="/assets/img/dataform/lineage-legend.webp" caption="The Legend and the minimap" index=3 %}

### Navigating the graph

- Scroll the mouse wheel to zoom and drag the background to pan.
- Click a node to select it. A node whose schema is known first opens its column list, when you click
  it or point at it for a moment; click it again to select it.
- The whole upstream and downstream lineage of the selected node is drawn with blue edges and yellow
  outlines, and the rest of the graph is dimmed. The details panel shows its file, schema, tags and
  its **Upstream** and **Downstream** actions, with **Open SQLX**, **Run** and **Focus** buttons.
- Double-click a node to open its source file.
- Right-click a node for **Open SQLX**, **Run**, **Focus on lineage** and **Copy name**.

### Filters

The filters sidebar narrows the graph down:

- **Action types**: show or hide declarations, operations, tables, incremental tables and views.
  Each type has its own glyph and colour, recalled in the **Legend**.
- **Tags**: show only the actions carrying the selected tags.
- **Schemas**: show or hide the actions of each BigQuery dataset.

**Reset all filters** brings everything back.

### Focus

**Focus on lineage** keeps only the selected action and everything upstream and downstream of it,
which makes a large pipeline readable. A banner above the graph names the focused action; **Exit
focus** brings the full graph back. Focus applies to a selected node, so focus first if you want to
follow a column in the focused view: selecting a column clears the node selection.

## Column lineage

Click a node that has a known schema to expand its column list, then click a column. The graph
highlights the column and draws dashed edges to the columns it comes from and the columns derived
from it, across the whole pipeline.

{% include window.html src="/assets/img/dataform/lineage-columns.webp" caption="Column lineage of silver_customers.email in the details panel" index=4 %}

- `Ctrl+Click` adds or removes a column from the selection, to follow several columns at once.
- The details panel lists the **Upstream columns** and **Downstream columns** of the selected column.
- Edges whose source column cannot be determined with certainty are drawn differently from direct
  ones.

Column lineage uses the table schemas resolved through BigQuery dry runs, so it needs you to be
signed in with a repository configured (see [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }})).
When some schemas cannot be resolved, a banner warns that the column lineage may be incomplete and
names the tables concerned. The same lineage drives
[column usages and rename]({{ '/dataform-plugin/features/column-refactoring' | relative_url }}).

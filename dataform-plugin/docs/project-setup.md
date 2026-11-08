---
layout: doc
project: dataform-plugin
title: Project setup · Google Cloud Dataform Plugin for IntelliJ
heading: Project setup
description: >-
  Creating and opening Dataform projects with Google Cloud Dataform Plugin for IntelliJ: the New Project wizard,
  generated files, package installation and opening an existing Dataform repository.
nav_order: 3
permalink: /dataform-plugin/docs/project-setup
---

Set up Node.js and the Dataform CLI first, as described in
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}#plugin-settings). Creating
and opening a project both need them.

## Create a project

1. Choose **File ▸ New ▸ Project** and select **Dataform**.
2. Fill in the project settings:

   | Field | Description |
   |---|---|
   | **GCP Project ID** | The default Google Cloud project, written as `defaultProject`. |
   | **Default schema** | The default BigQuery dataset, written as `defaultDataset`. |
   | **Default location** | The default BigQuery location, written as `defaultLocation`. |
   | **Dataform core version** | The `@dataform/core` version of the project. The latest published version is proposed. |

   {% include window.html src="/assets/img/dataform/new-project-wizard.webp" caption="The Dataform page of the New Project wizard" index=1 %}

3. Click **Next**, enter the **Project name** and **Project location**, then click **Create**.

The wizard creates:

```
workflow_settings.yaml   defaultProject, defaultLocation and defaultDataset
package.json             the @dataform/core dependency
definitions/
  example_table.sqlx     an example table
includes/
.gitignore               node_modules/, .dataform/ and logs
.gcloudignore            files not to push to the Dataform workspace
README.md
```

Once the project is open, the plugin runs `dataform install` to install its packages, then compiles it.

**Build ▸ Build Project** compiles the project, refreshes the table schemas, and reports in the
**Build** tool window the compilation errors and the failing BigQuery dry-runs, grouped per file.
The build is shown as failed while a query fails, even when the compilation succeeds.

## Open an existing project

Open a folder with `workflow_settings.yaml` or `dataform.json` at its root. The plugin detects it and
enables its features.

The [Dataform panel]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}) only appears in
such a project. To start from a repository in Google Cloud, see
[Open a Dataform repository](#open-a-dataform-repository).

If `workflow_settings.yaml` pins the `@dataform/core` version, the plugin offers to **Move to
package.json**, so the version is managed with `npm` like the other packages.

{% include window.html src="/assets/img/dataform/core-version-prompt.webp" caption="The prompt to move the core version to package.json" index=2 width=385 %}

## Open a Dataform repository

To start from a repository that already exists in Google Cloud, use the IDE's clone dialog. It needs
the Git plugin, which is bundled with the IDE.

1. Choose **File ▸ New ▸ Project from Version Control**, or **Clone Repository** on the Welcome
   screen, then the **Dataform** tab. In the New Project wizard, **Get it from Google Cloud** opens the
   same tab.
2. Sign in to Google Cloud if the tab asks for it.
3. Enter the **GCP project** and **Location** to list their repositories, then select one.
4. Under **Get files from**, choose where the files come from:

   | Source | Result |
   |---|---|
   | **Git remote** | Clones the repository with your local Git credentials, with its history and branches. The default when the repository has a Git remote. |
   | **Workspace** | Copies the files of the workspace you pick, with no local Git history. The only choice when the repository has no Git remote. |

5. Set the **Directory**, then click **Clone** or **Download**.

{% include window.html src="/assets/img/dataform/clone-dialog-dataform.webp" caption="The Dataform tab of the clone dialog, with a repository linked to a Git remote selected" index=3 width=599 %}

The new project opens with the repository active in the
[Dataform panel]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}), and its packages are
installed. The source also decides how you commit: see
[Commit and push to Git]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}#commit-and-push-to-git).

## Add a SQLX file

Right-click a folder in the Project view and choose **New ▸ SQLX File**, or use **File ▸ New ▸ SQLX
File**. Enter a name and pick a template in the **New SQLX File** dialog:

| Template | Creates |
|---|---|
| **Table** | A `table` action with a sample `SELECT`. |
| **View** | A `view` action with a sample `SELECT`. |
| **Incremental table** | An `incremental` action with a `uniqueKey` and a `when(incremental(), …)` filter. |
| **Assertion** | An `assertion` action with a query selecting the rows that fail. |
| **Operations** | An `operations` action with `hasOutput: false` and a placeholder statement. |
| **Declaration** | A `declaration` of a table the project reads but does not create. |
| **Unit test** | A `test` action with an `input` block and the expected output. See [Unit tests]({{ '/dataform-plugin/features/unit-tests' | relative_url }}). |

{% include window.html src="/assets/img/dataform/new-sqlx-file.webp" caption="The New SQLX File dialog" index=4 width=360 %}

## Disabled actions

A SQLX file whose action declares `disabled: true` keeps its place in the Project view, with a greyed
out icon and a **disabled** hint next to its name.

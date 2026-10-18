---
layout: doc
project: dataform-plugin
title: Project setup · Dataform Plugin for IntelliJ
heading: Project setup
description: >-
  Creating and opening Dataform projects with Dataform Plugin for IntelliJ: the New Project wizard,
  generated files and package installation.
nav_order: 3
permalink: /dataform-plugin/docs/project-setup
---

## Create a project

1. Choose **File ▸ New ▸ Project** and select **Dataform**.
2. Fill in the project settings:

| Field | Description |
|---|---|
| **GCP Project ID** | The default Google Cloud project, written as `defaultProject`. |
| **Default schema** | The default BigQuery dataset, written as `defaultDataset`. |
| **Default location** | The default BigQuery location, written as `defaultLocation`. |
| **Dataform core version** | The `@dataform/core` version of the project. The latest published version is proposed. |

3. Click **Create**.

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

Once the project is open, the plugin installs its packages with `npm` and compiles it.

## Open an existing project

Open the folder of a Dataform project, or pull one from Google Cloud with the
[Dataform panel]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}). The plugin
detects it and enables its features.

If `workflow_settings.yaml` pins the `@dataform/core` version, the plugin offers to **Move to
package.json**, so the version is managed with `npm` like the other packages.

Node.js and the Dataform CLI must be set up first; see
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}#plugin-settings).

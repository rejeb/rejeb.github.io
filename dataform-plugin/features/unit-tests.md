---
layout: doc
section: features
project: dataform-plugin
title: Unit tests · Google Cloud Dataform Plugin for IntelliJ
heading: Unit tests
summary: >-
  Generate Dataform unit tests pre-filled from resolved schemas, preview their compiled queries,
  and run them in BigQuery with the IDE test runner.
description: >-
  Dataform unit tests in Google Cloud Dataform Plugin for IntelliJ: test generation from schemas, completion,
  the Test preview and running tests with the IDE test runner.
nav_order: 11
permalink: /dataform-plugin/features/unit-tests
---

Dataform unit tests check the output of a table or view against fixed input data. The plugin creates
them for you, helps you write them and runs them in BigQuery.

{% include video.html src="/assets/video/dataform/unit-tests.mp4" caption="Creating, running and fixing test_gold_customer_ltv.sqlx" index=1 %}

## Create a test

Right-click a SQLX or JavaScript file that defines a table or view, in the editor or the Project
view, and choose **Create Dataform Test**. When the file defines several actions, the plugin asks
which ones to test.

The test is written to `definitions/tests/test_<action>.sqlx`, with an input block for each table
the action reads and the expected output, pre-filled from the columns known for each table. A table
whose columns are not known yet gets a placeholder row. Existing test files are left untouched.
Test files have their own icon in the Project view.

{% include video.html src="/assets/video/dataform/unit-test-create.mp4" caption="Create Dataform Test on gold_daily_sales.sqlx in the Project view" index=2 %}

## Write the test

- Completion suggests the inputs of the tested action and their columns.
- `Ctrl+Click` on the tested dataset or an input jumps to its definition.
- In an input block or the expected output, the **Generate SELECT from schema of …** intention
  (`Alt+Enter`), named after the table, writes a `SELECT` listing every column of the table with a
  placeholder value of its type, including `STRUCT` and repeated columns.
- Renaming a column of the tested action or of an input table also renames it in the test. See
  [Column refactoring]({{ '/dataform-plugin/features/column-refactoring' | relative_url }}).

{% include window.html src="/assets/img/dataform/unit-test-generate-select.webp" caption="Generate SELECT from schema of silver_orders, with its preview" index=1 %}

The **Test** view of the split editor shows the compiled **Test query**, the tested action's query
run on your inputs, and the **Expected output**. **Run test query** runs either of them in BigQuery,
to see what the test compares.

{% include window.html src="/assets/img/dataform/unit-test-preview.webp" caption="The Test view of test_gold_customer_ltv.sqlx" index=2 %}

## Run tests

Run a test with **Run test** in the editor toolbar or from the gutter of its file, or create a
**Dataform Unit Tests** run configuration to run a file, a directory or all the tests of the
project. The plugin compiles the project, runs the tests in BigQuery and compares the rows the way
`dataform test` does.

{% include window.html src="/assets/img/dataform/unit-test-run-config.webp" caption="A Dataform Unit Tests run configuration" index=3 %}

Results appear in the IDE test runner. A failed test names the row and column that differ, or the
row count or columns that do not match: *For row 0 and column "lifetime_value": expected "650", but
saw "600"*. **Click to see difference** opens the expected and actual rows side by side.

{% include window.html src="/assets/img/dataform/unit-test-failed.webp" caption="A failing test in the test runner" index=4 %}

{% include window.html src="/assets/img/dataform/unit-test-diff.webp" caption="Expected and actual rows of the failing test" index=5 %}

{% include window.html src="/assets/img/dataform/unit-test-passed.webp" caption="The same test passing once the expected output is fixed" index=6 %}

Tests run in the GCP project of the active repository, so they need the Google Cloud sign-in and a
repository selected in the [Dataform panel]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}).

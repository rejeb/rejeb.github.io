---
layout: doc
section: features
project: dataform-plugin
title: Unit tests · Dataform Plugin for IntelliJ
heading: Unit tests
summary: >-
  Generate Dataform unit tests pre-filled from resolved schemas, and run them in BigQuery with the
  IDE test runner.
description: >-
  Dataform unit tests in Dataform Plugin for IntelliJ: test generation from schemas, completion and
  running tests with the IDE test runner.
nav_order: 8
permalink: /dataform-plugin/features/unit-tests
---

Dataform unit tests check the output of a table or view against fixed input data. The plugin creates
them for you, helps you write them and runs them in BigQuery.

## Create a test

Right-click a SQLX or JavaScript file that defines a table or view, in the editor or the Project
view, and choose **Create Dataform Test**. When the file defines several actions, the plugin asks
which ones to test.

The test is written to `definitions/tests/test_<action>.sqlx`, with an input block for each table
the action reads and the expected output, pre-filled from the columns known for each table. A table
whose columns are not known yet gets a placeholder row. Existing test files
are left untouched.

## Write the test

- Completion suggests the inputs of the tested action and their columns.
- `Ctrl+Click` on the tested dataset or an input jumps to its definition.
- In an input block or the expected output, the **Generate SELECT from table schema** intention
  (`Alt+Enter`) writes a `SELECT` listing every column of the table with a placeholder value of its
  type, including `STRUCT` and repeated columns.

## Run tests

Run a test from the gutter of its file, or create a **Dataform Unit Tests** run configuration to run
a file, a directory or all the tests of the project. The plugin compiles the project, runs the tests
in BigQuery and compares the rows the way `dataform test` does. Results appear in the IDE test
runner; a failed test names the row and column that differ, or the row count or columns that do not
match.

Tests run in the GCP project of the active repository, so they need the Google Cloud sign-in and a
repository selected in the [Dataform panel]({{ '/dataform-plugin/features/dataform-panel' | relative_url }}).

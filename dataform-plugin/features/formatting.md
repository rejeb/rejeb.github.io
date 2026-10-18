---
layout: doc
section: features
project: dataform-plugin
title: Formatting · Dataform Plugin for IntelliJ
heading: Formatting
summary: >-
  Format SQLX files with the built-in formatter, or with SQLFluff.
description: >-
  SQLX formatting in Dataform Plugin for IntelliJ: the built-in formatter and the SQLFluff
  integration.
nav_order: 9
permalink: /dataform-plugin/features/formatting
---

**Code ▸ Reformat Code** (`Ctrl+Alt+L`) formats SQLX files.

## Built-in formatter

The built-in formatter knows the structure of a SQLX file: the `config { }` block, `js { }` blocks
and the SQL query are each formatted as the language they contain.

## SQLFluff

To format with [SQLFluff](https://sqlfluff.com/) instead, install it (`pip install sqlfluff`) and set
it up in the [plugin settings]({{ '/dataform-plugin/docs/configuration' | relative_url }}#dataform-settings):

- **SQLFluff executable**: the path to `sqlfluff`;
- **SQLFluff config file**: an optional `.sqlfluff` file with your rules;
- **SQLFluff extra args**: extra command-line arguments.

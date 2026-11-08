---
layout: doc
section: features
project: dataform-plugin
title: Errors and build · Google Cloud Dataform Plugin for IntelliJ
heading: Errors and build
summary: >-
  Dataform compilation and BigQuery dry-run errors on the tokens they refer to, with hints and
  quick fixes, and a build that lists every failing action in the Build tool window.
description: >-
  Errors in Google Cloud Dataform Plugin for IntelliJ: compilation and BigQuery dry-run errors shown
  inline, quick fixes, and the Dataform build in the Build tool window.
nav_order: 4
permalink: /dataform-plugin/features/errors-and-build
---

The plugin compiles the project in the background, when you stop typing, when you save and after
external changes such as a checkout or a pull. Each compiled query is then dry-run in BigQuery.
Errors from both steps are shown where you can fix them: on the token in the editor, in the
compiled preview and in the **Build** tool window.

{% include video.html src="/assets/video/dataform/errors-build.mp4" caption="A misspelled column found by the dry run, then listed by the build" index=1 %}

## In the editor

An error is underlined on the token it refers to, and its message is shown at the end of the line,
with a hint when the plugin knows a likely fix: *BigQuery: Name emailx not found inside c → Did you
mean 'email'?* The editor's error stripe counts them.

{% include window.html src="/assets/img/dataform/errors-inline.webp" caption="A dry-run error on c.emailx, in the editor and the compiled preview" index=1 %}

- Dry-run errors are checked for tables, views, incremental tables and operations declaring
  `hasOutput: true`.
- Dataform compilation errors (JavaScript errors, unknown `ref()` targets, invalid `config { }`
  values, …) are placed on the line of the SQLX file they come from, even when Dataform reports
  them in the generated JavaScript.
- `Alt+Enter` offers the fix for misspelled names, such as **Replace with 'email'**.
- An error that cannot be tied to a token is shown in a banner at the top of the editor.
- In a `config { }` block, an unknown key or an invalid enumerated value is reported without waiting
  for a compilation.
- A `partitionBy` written as an object is reported too, because Dataform takes a partitioning
  expression there. `Alt+Enter` replaces it with the expression when the plugin can work it out. This
  check is the **Dataform partitionBy written as an object** inspection.

Errors in the editor can be turned off in the
[plugin settings]({{ '/dataform-plugin/docs/configuration' | relative_url }}#dataform-settings); the
compiled preview and the build still report them.

{% include window.html src="/assets/img/dataform/errors-quick-fix.webp" caption="The Replace with 'email' fix for a misspelled column" index=2 %}

{% include window.html src="/assets/img/dataform/errors-banner.webp" caption="Duplicate action names, which belong to no token, in the banner of the editor" index=3 %}

## In the compiled preview

The block of a failing query shows a **BigQuery dry run failed** banner with the full error and
**Copy error**, and its cost reads **Can't estimate**. The header's estimate says how many queries it
covers, for example **Estimated (2 of 3)**. An action that did not compile shows its compilation
error in the same kind of banner.

## Build

**Build ▸ Build Project** (`Ctrl+F9`) and the **Compile** button of the SQLX editor toolbar compile
the project, refresh the schemas and report the result in the **Build** tool window:

- the **Dataform Compile** node says whether the compilation succeeded and how many action queries
  failed in BigQuery, for example *Dataform compile succeeded, 1 of 32*;
- failing actions are grouped per file, each with its errors and line numbers. Select one to see the
  full message, double-click it to open the file at the error;
- Dataform compilation errors show the code frame they point to;
- when the Dataform CLI cannot start, or stops before compiling, the build explains it and gives the
  command to run in a terminal, with its directory, to see what the CLI reports.

{% include window.html src="/assets/img/dataform/errors-build.webp" caption="The Build tool window after a build with a failing dry run" index=4 %}

{% include window.html src="/assets/img/dataform/errors-code-frame.webp" caption="A compilation error with its code frame in the Build tool window" index=5 %}

The build waits for the schema refresh, so it does not report success while a query still fails.
When it finishes, a balloon sums up the result and links to the Build window.

Dry runs need the Google Cloud sign-in and an active repository (see
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }})); without them, only
compilation errors are reported.

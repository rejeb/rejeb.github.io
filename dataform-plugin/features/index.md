---
layout: doc
section: features
project: dataform-plugin
title: Features · Google Cloud Dataform Plugin for IntelliJ
heading: Features
description: >-
  Features of Google Cloud Dataform Plugin for IntelliJ: SQLX editing, compiled preview, errors and build,
  column refactoring, lineage, the Dataform panel, workflow runs, query execution, BigQuery cost, unit tests
  and formatting.
nav_order: 1
permalink: /dataform-plugin/features
---

The plugin brings the whole Dataform workflow into IntelliJ IDEA: writing SQLX with completion and
navigation, checking what it compiles to and what it costs, following the lineage of each table and
column, running queries, workflows and unit tests in BigQuery, and keeping your Dataform workspace
in sync with Google Cloud. Each feature is described on its own page.

Features that call Google Cloud need the Google Cloud sign-in and an active Dataform repository,
set up as described in the Configuration chapter of the documentation.

{% assign features = site.pages | where_exp: "d", "d.url contains '/dataform-plugin/features/'" | sort: "nav_order" %}
{% for f in features %}
### {{ f.heading }}

{{ f.summary }}
{% endfor %}

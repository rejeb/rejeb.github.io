---
layout: doc
project: dataform-plugin
title: Documentation · Google Cloud Dataform Plugin for IntelliJ
heading: Overview
description: >-
  Documentation for Google Cloud Dataform Plugin for IntelliJ: overview, installation and configuration of
  Node.js, the Dataform CLI, Google Cloud sign-in and Dataform repositories.
nav_order: 1
permalink: /dataform-plugin/docs
---

**Google Cloud Dataform Plugin for IntelliJ** is an IntelliJ IDEA plugin for writing, navigating, running and
debugging Google Cloud Dataform SQLX pipelines. It understands the SQL, JavaScript and `config { }`
blocks of a SQLX file, compiles the project in the background, resolves table schemas through
BigQuery dry runs, and talks to your Dataform repositories in Google Cloud.

{% include window.html src="/assets/img/dataform/preview-assertions.webp" caption="SQLX editor with the compiled preview" index=1 %}

## Chapters

- [Installation]({{ '/dataform-plugin/docs/installation' | relative_url }}): requirements and setup.
- [Project setup]({{ '/dataform-plugin/docs/project-setup' | relative_url }}): create a Dataform
  project with the New Project wizard, open an existing one, or open a Dataform repository from
  Google Cloud.
- [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}): Node.js, the Dataform
  CLI and plugin settings, Google Cloud sign-in, Dataform repositories and service accounts.
- [Release notes]({{ '/dataform-plugin/docs/release-notes' | relative_url }}): what changed in each
  version.

## Features

Each feature has its own page in the [Features]({{ '/dataform-plugin/features' | relative_url }})
section:

{% assign features = site.pages | where_exp: "d", "d.url contains '/dataform-plugin/features/'" | sort: "nav_order" %}
{% for f in features %}- [{{ f.heading }}]({{ f.url | relative_url }})
{% endfor %}

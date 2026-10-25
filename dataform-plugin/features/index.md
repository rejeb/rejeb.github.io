---
layout: doc
section: features
project: dataform-plugin
title: Features · Google Cloud Dataform Plugin for IntelliJ
heading: Features
description: >-
  Features of Google Cloud Dataform Plugin for IntelliJ: SQLX editing, compiled preview, lineage, the Dataform
  panel, workflow runs, query execution, unit tests, formatting and project setup.
nav_order: 1
permalink: /dataform-plugin/features
---

Select a feature to see what it does and how to use it. Features that call Google Cloud need the
sign-in and repository set up in [Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}).

{% assign features = site.pages | where_exp: "d", "d.url contains '/dataform-plugin/features/'" | sort: "nav_order" %}
{% for f in features %}
### [{{ f.heading }}]({{ f.url | relative_url }})

{{ f.summary }}
{% endfor %}

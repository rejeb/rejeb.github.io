---
layout: page
title: Privacy Policy · Dataform Plugin for IntelliJ
heading: Privacy Policy
description: >-
  How Dataform Plugin for IntelliJ accesses, uses and stores Google user data: OAuth scopes,
  credentials kept on your computer, no telemetry, and Google API Limited Use compliance.
image: /assets/img/og/og-dataform-plugin.png
permalink: /dataform-plugin/privacy-policy
---

*Effective date: October 17, 2026*

This Privacy Policy explains how **Dataform Plugin for IntelliJ** (the "plugin") accesses, uses,
stores and shares your data, including data received from Google APIs. The plugin is an
open-source project; its source code is available on
[GitHub](https://github.com/rejeb/google-cloud-dataform-plugin).

## Summary

- The plugin runs entirely on your computer. There is no server operated by the developer.
- The plugin does not collect telemetry, analytics or crash reports.
- Your Google credentials are stored only on your computer, in the IDE password store.
- Your data is exchanged only between your computer and Google Cloud. It is never sent to the
  developer or to any third party.

## Why the plugin asks you to sign in with Google

Signing in lets the plugin work with Google Cloud on your behalf: to interact with your Dataform
repositories and workspaces, to run Dataform workflow actions, and to execute queries in
BigQuery. Signing in is optional; the language features of the plugin work without it.

## Google user data the plugin accesses

When you sign in, the plugin requests the following OAuth scopes:

| Scope | Why the plugin needs it |
|---|---|
| `openid` | To identify the signed-in account. |
| `email` | To show which account is signed in, and to use your email address as the commit author when you push files to a Dataform workspace. |
| `https://www.googleapis.com/auth/cloud-platform` | To call the Google Cloud APIs used by the plugin: Dataform (repositories, workspaces, files, compilation and workflow invocations), BigQuery (dry runs, queries, table schemas and job details) and IAM (listing the service accounts a repository can run with). |

The plugin only calls these APIs when you use a feature that needs them, and only for the Google
Cloud projects you configure. It does not read your Gmail, Drive, contacts or any other Google
service.

## How your data is used and stored

- **Credentials.** The OAuth tokens and your account email address are stored in the IDE password
  store on your computer, and are used only to authenticate the plugin's calls to Google Cloud.
- **Google Cloud data.** Data returned by Google Cloud, such as workspace files, table schemas and
  query results, is displayed in the IDE and may be kept in local caches on your computer. It is
  used only to provide the plugin's features.
- **Your project files.** Your Dataform project is read and compiled locally. Files are sent to a
  Dataform workspace only when you push them, and SQL is sent to BigQuery only for dry runs,
  queries and workflow runs.

## How your data is shared

The plugin does not sell, share or transfer your data to the developer or to any third party.
The only parties that receive data are:

- **Google**, when the plugin calls Google Cloud APIs on your behalf. Google processes that data
  under the [Google Privacy Policy](https://policies.google.com/privacy) and the
  [Google Cloud terms](https://cloud.google.com/terms).
- **The npm registry** (`registry.npmjs.org`), which the plugin contacts to find and install
  `@dataform/core` and the Dataform CLI. These requests do not contain your Google data.

## Limited Use disclosure

The plugin's use and transfer of information received from Google APIs adheres to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

## Revoking access and deleting your data

- **Sign out** from the Dataform tool window to delete the stored credentials and email address
  from your computer.
- **Revoke the plugin's access** to your Google account at any time from your
  [Google Account permissions](https://myaccount.google.com/permissions).
- **Uninstalling the plugin** stops all access. Data stored in your Google Cloud projects is
  managed by you in Google Cloud.

## JetBrains

The IntelliJ IDE and the JetBrains Marketplace, from which you install the plugin, are provided by
JetBrains and are covered by the [JetBrains Privacy Policy](https://www.jetbrains.com/legal/docs/privacy/privacy/).
This policy covers only the plugin.

## Changes to this policy

Changes to this policy are published on this page with a new effective date. Significant changes,
such as new OAuth scopes, are also mentioned in the plugin's release notes.

## Contact

For questions about this policy, open an issue on the
[GitHub issue tracker](https://github.com/rejeb/google-cloud-dataform-plugin/issues).

---
layout: page
title: Privacy Policy · Google Cloud Dataform Plugin for IntelliJ
heading: Privacy Policy
description: >-
  How Google Cloud Dataform Plugin for IntelliJ accesses, uses, stores and shares Google user data: OAuth scopes,
  credentials in the IDE password store, which services receive which data, retention and deletion.
image: /assets/img/og/og-dataform-plugin.png
permalink: /dataform-plugin/privacy-policy
---

*Effective date: October 27, 2026*

This Privacy Policy explains how **Google Cloud Dataform Plugin for IntelliJ** (the "plugin") accesses, uses,
stores and shares your data, including data received from Google APIs. The plugin is open source:
its code is available on [GitHub](https://github.com/rejeb/google-cloud-dataform-plugin).

In this policy:

- **Google user data** means data the plugin receives from Google APIs on your behalf: your
  account email address, and the Google Cloud resources and content your account can access,
  such as Dataform repositories, workspace files, table schemas, job details and query results.
- **Credentials** means the OAuth refresh token and the short-lived access tokens obtained from it.
- **Project content** means the files of your local Dataform project and the SQL compiled from them.
- **The developer** means the author of the plugin.

## Summary

- The plugin runs inside your IDE. The developer runs no server that receives your Google user
  data, credentials or project content.
- The plugin exchanges data directly with Google. Some requests are sent automatically while you
  work, such as BigQuery dry runs of the SQL compiled from your project.
- The plugin also contacts the npm registry to look up and install Dataform packages.
- When you clone a repository from its Git remote, or view that remote's main branch in the tool
  window, the IDE's Git plugin connects to your Git provider with your own Git credentials.
- Your refresh token and email address are stored in the IDE password store.
- The plugin has no telemetry, analytics or crash reporting of its own. Error and freeze reports are
  a feature of the IDE, sent only if you submit them or turned on automatic reports. They reach
  JetBrains and the developer. See [Error and freeze reports](#error-and-freeze-reports).
- Signing out deletes your credentials from your computer. It does not revoke the plugin's access
  to your Google account or delete other data. See
  [Data retention and deletion](#data-retention-and-deletion).

## Google user data the plugin accesses

Signing in is optional: highlighting, completion, navigation and local compilation work without it.
When you sign in, the plugin requests these OAuth scopes:

| Scope | Why the plugin needs it |
|---|---|
| `openid` | Part of Google's sign-in protocol, used together with `email`. |
| `email` | To read your account email address, which the plugin shows as the signed-in account and uses as the author of the commits you make in a Dataform workspace. |
| `https://www.googleapis.com/auth/cloud-platform` | To call the Google Cloud APIs the plugin uses: Dataform (repositories, workspaces, files, commits, compilation results and workflow invocations), BigQuery (dry runs, queries, datasets and job details), IAM and Cloud Resource Manager (listing the service accounts a repository can run with, Google-provided service agents included) and Cloud Billing (the public BigQuery price list). |

The plugin uses these scopes only for the features described in this policy, and what it can do
in Google Cloud is limited by the IAM permissions of your account. It uses only the credential
created when you sign in through it, never other Google credentials on your computer, such as
those of the gcloud CLI.

## How the plugin uses your data

The plugin uses your credentials only to authorize its requests to Google APIs.

**On your computer.** The plugin compiles your project and evaluates its JavaScript locally, with
the Dataform CLI and Node.js, and runs `sqlfluff` if you configure it for formatting. Editor
features such as completion, navigation, lineage and the compiled preview use this local result
and cached table schemas. The plugin also reads the project's Git configuration to tell whether the
project is a clone of the repository's Git remote, and shows that remote's main branch from your
local clone.

**In Google Cloud.** The following features send data to Google Cloud, which processes it there:

- **BigQuery dry runs.** While you are signed in, the plugin automatically sends SQL compiled from
  your project to BigQuery as dry runs, for example after you open, edit or save a SQLX file, to
  detect SQL errors and read the output columns of your tables. A dry run checks a query without
  running it. Signing out stops dry runs.
- **BigQuery queries.** When you run a query or a Dataform unit test, the plugin sends its SQL,
  including the test data, to BigQuery, which runs it and returns the results to the IDE.
- **Uploading files.** When you push, and before each workflow run, the plugin uploads your project
  files to the target Dataform workspace, except `.idea`, `.git`, `node_modules`, `.dataform` and
  files matched by `.gitignore` or `.gcloudignore`, and can delete workspace files that no longer
  exist locally. Use these ignore files to keep local secrets out of the upload.
- **Repositories and workspaces.** When you ask it to, the plugin pulls workspace files into your
  project, compares them with your local files, creates repositories and workspaces, and commits
  workspace changes with your email address as the author (or your operating system user name if
  the email address cannot be read). When you configure or select a repository, it reads the
  repository's settings, such as its Git remote, and lists the repository's workspaces and files and
  the service accounts of its Google Cloud project. To include the Google-provided service agents,
  it reads the project's IAM policy and keeps only its service accounts, in memory; the other
  members of the policy, such as email addresses, are discarded. It may also list the workspace
  files in the background when you open the project. In the clone dialog, it lists the
  repositories of the Google Cloud project and location you enter.
- **Workflow runs.** When you run a workflow, the plugin first uploads your project files as
  described above. Dataform then compiles the workspace and runs the selected actions in BigQuery,
  under the identity configured for the repository, such as its service account. The plugin reads
  the progress of the run and its BigQuery job details to show them in the IDE.
- **BigQuery prices.** While you are signed in and the list price option is selected, the plugin
  downloads the public BigQuery price list from the Cloud Billing API, in the currency you chose, and
  refreshes it about once a day. The request carries your access token and no project content.

Google processes this data under the terms of your Google Cloud account and the
[Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). Your sign-in is
covered by the [Google Privacy Policy](https://policies.google.com/privacy). The plugin does not
control how long Google Cloud keeps this data, such as query results, job history, workflow
invocations or commits.

## How your data is protected

- **Sign-in.** You sign in on Google's page in your browser, so the plugin never sees your Google
  password. The plugin uses Google's OAuth flow for desktop apps with PKCE, and receives the
  response through a temporary server on your computer (`127.0.0.1`) that stops when sign-in ends.
- **Credentials.** The refresh token and your email address are stored in JetBrains Password Safe.
  Depending on your
  [IDE settings](https://www.jetbrains.com/help/idea/reference-ide-settings-password-safe.html),
  it keeps them in the operating system's native keychain where available, in a KeePass file, or only
  in memory until the IDE restarts. Access tokens are kept only in memory. The plugin does not write
  credentials to project or settings files.
- **Connections.** The plugin connects to Google and to `registry.npmjs.org` over HTTPS.
- **Local files.** Caches, settings and logs are ordinary, unencrypted files, protected by your
  operating system account.
- **Logs.** The plugin does not deliberately log tokens, but the warnings and errors it writes to
  the IDE log can include file paths, SQL and error messages.

## Who receives data

The plugin does not sell your data and does not itself send Google user data, credentials or project
content to the developer. It exchanges Google user data only with Google:

| Recipient | When | What is sent |
|---|---|---|
| **Google** (OAuth, Dataform, BigQuery, IAM, Cloud Resource Manager and Cloud Billing APIs) | When you sign in and use the features described above, including the automatic requests. | Your credentials, and the data each request needs, such as project content, SQL and resource names. |

The IDE's error and freeze reports can reach JetBrains and the developer: see
[Error and freeze reports](#error-and-freeze-reports).

To compile your project, the plugin runs the Dataform CLI (`dataform compile`). During compilation,
the Dataform CLI may download packages from npm, such as the Dataform core version set in
`workflow_settings.yaml` or the dependencies in `package.json`. This is the Dataform CLI's own
behavior and is not handled by the plugin. What the Dataform CLI and the packages it installs do is
not covered by this policy.

Commit and push actions in the Dataform tool window go through the Dataform API. If you linked your
Dataform repository to a remote Git repository, Google Dataform pushes the commits to it.

The plugin connects to your Git provider in two cases only, through the IDE's Git plugin and with the
Git credentials set up on your computer, never your Google credentials: when you clone a Dataform
repository from its Git remote, and, in a project cloned from it, to fetch that remote's default
branch each time the tool window shows it with no workspace selected. Your Git provider's own terms
apply to these requests.

## Data retention and deletion

Apart from the [error and freeze reports](#error-and-freeze-reports) it can read on JetBrains
Marketplace, the developer holds no copy of your data. On your computer, the plugin keeps data in these places
(the IDE directories are described in
[Directories used by the IDE](https://www.jetbrains.com/help/idea/directories-used-by-the-ide-to-store-settings-caches-plugins-and-logs.html)):

| Data | Where it is kept | Kept until |
|---|---|---|
| Refresh token and account email address | Password Safe | You sign out, or the IDE restarts if Password Safe does not save passwords |
| Access tokens | Memory | They expire (after about an hour), you sign out, or the IDE closes |
| Table schemas from dry runs, the latest compilation result (including compiled SQL) and the list of remote workspace files | `cache-state.xml`, in the project's folder under `projects` in the IDE system directory | You delete the file while the IDE is closed |
| BigQuery price list | `dataformBigQueryPrices.xml`, under `options` in the IDE configuration directory | You delete the file while the IDE is closed |
| Query results | Memory | You close the result or the project |
| Repository settings (Google Cloud project, location, repository, service account and workspace) | `.idea/dataform-gcp-repository-setting.xml` in your project, shared if you commit `.idea` | You remove the repository with **Manage Repositories** or delete the file |
| Files pulled from a Dataform workspace | Your project | You delete them |
| Warnings and errors | IDE log (`idea.log`) | The IDE rotates the log |

Signing out removes only your credentials and stored email address. Uninstalling the plugin removes
none of this data: sign out before uninstalling, or afterwards delete the entry whose name contains
`Dataform GCP` from your keychain or KeePass database.

### Deleting your data

1. **Delete local credentials.** Click **Sign Out of Google Cloud** in the Dataform Tools tool
   window. This deletes the refresh token and email address from Password Safe and clears tokens
   from memory. It does not contact Google.
2. **Revoke the plugin's access.** Remove **Google Cloud Dataform Plugin for IntelliJ** from
   [Third-party apps & services](https://myaccount.google.com/connections) in your Google Account.
   Any copy of the refresh token then stops working.
3. **Remove local data.** Delete the files listed above. The plugin has no command for this.
4. **Delete data in Google Cloud.** Signing out and uninstalling delete nothing in Google Cloud.
   Manage or delete repositories, workspaces, commits, workflow invocations, tables and job history
   there. Commits made with your email address as author remain in the repository history.

## Limited Use disclosure

The plugin's use and transfer of information received from Google APIs adheres to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the
[Limited Use requirements](https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes).

## Error and freeze reports

Error and freeze reporting is a feature of the IDE, provided by JetBrains. The plugin contains no
reporting code of its own: it only registers JetBrains' standard reporter, so that reports about the
plugin can reach its page on JetBrains Marketplace.

A report is sent in two cases only:

- **You submit it.** When the IDE shows an error or a slowdown notice for the plugin, you can review
  the report and choose to send it.
- **You turned on automatic reports.** With **Send error reports to JetBrains automatically**, under
  **Settings ▸ Appearance & Behavior ▸ System Settings ▸ Data Sharing**, the IDE sends reports without
  asking. Turn this option off to stop it.

A report contains your hardware and software configuration, product information such as the IDE and
plugin versions, and the error details: the error message, stack trace, thread dumps and any
description you add. A freeze report can also include a CPU snapshot. JetBrains warns that these
reports can include code fragments. They can also include file paths, SQL and the names of Google
Cloud resources, when an error message or a thread dump mentions them.

Reports go to JetBrains and to the developer, who reads them on the plugin's page on JetBrains
Marketplace and uses them only to diagnose and fix problems in the plugin. If a report contains
personal data, that data is shared with both.

JetBrains handles reports under its
[Exception Analyzer Agreement](https://www.jetbrains.com/legal/agreements/exception_analyzer.html) and
[Privacy Policy](https://www.jetbrains.com/legal/docs/privacy/privacy/). These do not cover the
developer: JetBrains states that it is not responsible for third-party plugins and their vendors,
including how they process personal data. The developer's use of reports is covered by this policy.
The plugin does not control how long JetBrains keeps them.

## JetBrains

The IDE, Password Safe and the JetBrains Marketplace, from which you install the plugin, are
provided by JetBrains and covered by the
[JetBrains Privacy Policy](https://www.jetbrains.com/legal/docs/privacy/privacy/). IDE features
that the plugin does not control, such as settings synchronization, backups and memory dumps, are
not covered by this policy.

## Changes to this policy

Changes to this policy are published on this page with a new effective date. Significant changes,
such as new OAuth scopes, are also mentioned in the plugin's release notes.

## Contact

For questions about this policy, open an issue on the
[GitHub issue tracker](https://github.com/rejeb/google-cloud-dataform-plugin/issues).
GitHub issues are public: **do not post tokens, project content, SQL or query results. Review IDE
logs before attaching them, and never attach memory dumps (`.hprof` files), which can contain
credentials.**

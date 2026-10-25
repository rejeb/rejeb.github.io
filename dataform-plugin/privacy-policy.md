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
- Your refresh token and email address are stored in the IDE password store.
- The plugin contains no telemetry, analytics or crash reporting.
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
| `https://www.googleapis.com/auth/cloud-platform` | To call the Google Cloud APIs the plugin uses: Dataform (repositories, workspaces, files, commits, compilation results and workflow invocations), BigQuery (dry runs, queries, datasets and job details) and IAM (listing the service accounts a repository can run with). |

The plugin uses these scopes only for the features described in this policy, and what it can do
in Google Cloud is limited by the IAM permissions of your account. It uses only the credential
created when you sign in through it, never other Google credentials on your computer, such as
those of the gcloud CLI.

## How the plugin uses your data

The plugin uses your credentials only to authorize its requests to Google APIs.

**On your computer.** The plugin compiles your project and evaluates its JavaScript locally, with
the Dataform CLI and Node.js, and runs `sqlfluff` if you configure it for formatting. Editor
features such as completion, navigation, lineage and the compiled preview use this local result
and cached table schemas.

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
  the email address cannot be read). When you configure or select a repository, it lists the
  repository's workspaces and files and the service accounts of its Google Cloud project. It may
  also list the workspace files in the background when you open the project.
- **Workflow runs.** When you run a workflow, the plugin first uploads your project files as
  described above. Dataform then compiles the workspace and runs the selected actions in BigQuery,
  under the identity configured for the repository, such as its service account. The plugin reads
  the progress of the run and its BigQuery job details to show them in the IDE.

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
  it keeps them in the native keychain of macOS or Linux, in a KeePass file, or only in memory
  until the IDE restarts. Access tokens are kept only in memory. The plugin does not write
  credentials to project or settings files.
- **Connections.** The plugin connects to Google and to `registry.npmjs.org` over HTTPS.
- **Local files.** Caches, settings and logs are ordinary, unencrypted files, protected by your
  operating system account.
- **Logs.** The plugin does not deliberately log tokens, but the warnings and errors it writes to
  the IDE log can include file paths, SQL and error messages.

## Who receives data

The plugin does not sell your data and does not send Google user data, credentials or project
content to the developer. It exchanges Google user data only with Google:

| Recipient | When | What is sent |
|---|---|---|
| **Google** (OAuth, Dataform, BigQuery and IAM APIs) | When you sign in and use the features described above, including the automatic requests. | Your credentials, and the data each request needs, such as project content, SQL and resource names. |

To compile your project, the plugin runs the Dataform CLI (`dataform compile`). During compilation,
the Dataform CLI may download packages from npm, such as the Dataform core version set in
`workflow_settings.yaml` or the dependencies in `package.json`. This is the Dataform CLI's own
behavior and is not handled by the plugin. What the Dataform CLI and the packages it installs do is
not covered by this policy.

Commit and push actions go through the Dataform API. If you linked your Dataform repository to a
remote Git repository, Google Dataform pushes the commits to it. The plugin never connects to your
Git provider.

## Data retention and deletion

The developer holds no copy of your data. On your computer, the plugin keeps data in these places
(the IDE directories are described in
[Directories used by the IDE](https://www.jetbrains.com/help/idea/directories-used-by-the-ide-to-store-settings-caches-plugins-and-logs.html)):

| Data | Where it is kept | Kept until |
|---|---|---|
| Refresh token and account email address | Password Safe | You sign out, or the IDE restarts if Password Safe does not save passwords |
| Access tokens | Memory | They expire (after about an hour), you sign out, or the IDE closes |
| Table schemas from dry runs, the latest compilation result (including compiled SQL) and the list of remote workspace files | `cache-state.xml`, in the project's folder under `projects` in the IDE system directory | You delete the file while the IDE is closed |
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

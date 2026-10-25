---
layout: doc
project: dataform-plugin
title: Configuration · Google Cloud Dataform Plugin for IntelliJ
heading: Configuration
description: >-
  Configuration of Google Cloud Dataform Plugin for IntelliJ: Node.js, Dataform CLI and plugin settings, Google
  Cloud sign-in, Dataform repositories and service accounts.
nav_order: 4
permalink: /dataform-plugin/docs/configuration
---

Configuration happens in two places:

- [Plugin settings](#plugin-settings): Node.js, the Dataform CLI and Core, and the editor options.
  They are needed to compile the project, so set them up first.
- [Google Cloud](#google-cloud-sign-in): sign-in and Dataform repositories, needed by the features
  that call Google Cloud (BigQuery dry runs and schemas, workflow runs, query execution, workspaces).

## Plugin settings

The plugin compiles your project with the Dataform CLI, which runs on Node.js. Node.js must be
installed and configured in the IDE before the Dataform CLI and Core can be installed.

All Node.js settings are on **Settings ▸ Languages & Frameworks ▸ JavaScript Runtime**. From there you
can let IntelliJ IDEA download Node.js for you, or point it to a Node.js you installed yourself.

### Install Node.js from IntelliJ IDEA

This is the simplest way: IntelliJ IDEA downloads Node.js, with `npm`, and configures it in one step.

1. Open **Settings ▸ Languages & Frameworks ▸ JavaScript Runtime**.
2. Open the Node.js runtime list and choose **Add ▸ Download…**.
3. In the download dialog, pick a **Version** (prefer the latest LTS release) and the **Location**
   where Node.js will be installed, then click **Download**.
4. When the download completes, the new runtime is selected, and the package manager is set to its
   bundled `npm`.
5. Click **OK**.

### Use an existing Node.js installation

If Node.js is already installed on your computer, or you prefer to install it yourself:

- **Windows and macOS**: download the installer from [nodejs.org](https://nodejs.org/) and run it.
- **Linux**: install the `nodejs` and `npm` packages of your distribution, for example
  `sudo apt install nodejs npm` on Debian and Ubuntu or `sudo dnf install nodejs npm` on Fedora,
  or use a version manager such as [nvm](https://github.com/nvm-sh/nvm).

Check the installation in a terminal:

```bash
node --version
npm --version
```

Then configure it in the IDE:

1. Open **Settings ▸ Languages & Frameworks ▸ JavaScript Runtime**.
2. Select your installation in the Node.js runtime list; it lists the installations IntelliJ IDEA
   detects. If it is missing, choose **Add ▸ Add Local…** and select its `node` executable.
3. Check that the package manager points to the matching `npm`.
4. Click **OK**.

When a Dataform project is opened while Node.js is not configured, the plugin shows an
**Npm not available** notification; its **Configure nodeJs** link opens the JavaScript Runtime settings.

### Install the Dataform CLI and Core

Once Node.js is configured, the plugin looks for `@dataform/cli` and `@dataform/core` in the global
`node_modules` of that installation. If they are missing, a **Dataform not configured** notification
appears; its **Configure** link opens the Dataform settings.

1. Open **Settings ▸ Tools ▸ Dataform**. The page shows the Node.js installation the packages will be
   installed into, or a warning if Node.js is not configured yet.
2. Click **Install Dataform CLI & Core**. The plugin runs `npm install -g` for `@dataform/cli`, then
   `@dataform/core`, into that Node.js installation.
3. When the installation succeeds, **Dataform Core directory** is filled in for you.

If you already installed the packages yourself (`npm install -g @dataform/cli @dataform/core`), the
plugin finds them and sets the **Dataform Core directory** automatically.

### Dataform settings

The other options on **Settings ▸ Tools ▸ Dataform**:

| Setting | Description |
|---|---|
| **Dataform Core directory** | Where `@dataform/core` is installed, used to compile the project. |
| **SQLFluff executable** | Path to `sqlfluff`, to format SQLX files with SQLFluff. |
| **SQLFluff config file** | Optional `.sqlfluff` configuration file. |
| **SQLFluff extra args** | Extra command-line arguments passed to SQLFluff. |
| **Fold Dataform expressions to their evaluated value** | Shows `${...}` expressions as their value. Values are computed by running your project's JavaScript with the configured Node.js interpreter, so you can turn this off. |
| **Show Dataform compilation and BigQuery errors inline in the editor** | Underlines compilation and dry-run errors on the tokens they refer to. |
| **Recompile the Dataform project when a source file is saved** | Keeps the compiled graph, previews and lineage up to date as you edit. |

## Google Cloud sign-in

Language features (highlighting, completion, navigation, local compilation) work without Google Cloud.
Everything below is done from the **Dataform Tools** tool window, on the right side of the IDE. It is
available in projects that contain a Dataform project.

![The Dataform Tools tool window with a repository and a workspace selected]({{ '/assets/img/df-shot7.webp' | relative_url }})

1. Open the **Dataform Tools** tool window.
2. Click **Sign In to Google Cloud** in its title bar. Your browser opens the Google sign-in page.
3. Choose your account and accept the requested access. The browser then shows a confirmation page
   and you can return to the IDE.

The credential is stored in the IDE password store and shared by all your projects and windows, so
you sign in once. When the session expires, a banner at the top of the editor asks you to sign in
again. The same title-bar button shows **Sign Out of Google Cloud (your email)** while you are signed
in.

Your Google account is used only to call Google Cloud on your behalf. See
[Why the plugin asks you to sign in with Google]({{ '/dataform-plugin' | relative_url }}) and the
[Privacy Policy]({{ '/dataform-plugin/privacy-policy' | relative_url }}).

## Configure a Dataform repository

A repository entry tells the plugin which Dataform repository in Google Cloud the local project
belongs to. You can declare several, for example one per environment, and switch between them.

1. Open the **Dataform Tools** tool window.
2. Click **Add a Dataform repository** (shown while none is configured), or the **Manage
   Repositories** button (gear icon) in the title bar.
3. In the **Manage Dataform Repositories** dialog, click **+** and fill the form:

| Field | Description |
|---|---|
| **Label** | The name shown in the repository selector, for example `dev` or `prod`. |
| **GCP Project ID** | The Google Cloud project that hosts the Dataform repository. |
| **Repository ID** | The name of the Dataform repository. |
| **Location** | The region of the repository, for example `europe-west1`. |
| **Service Account** | Optional. The service account workflow runs use. The list is filled with the service accounts of the project. |

4. Click **Test Connection** to check that the repository is reachable with your account.
   The result is shown next to the button.
5. If the repository does not exist yet, click **Create in GCP** to create it in the project and
   location you entered.
6. Click **Save**.

The dialog also lets you **copy** an entry (handy when only the project or location changes) and
**remove** one. Label, project ID, repository ID and location are required.

Repository entries are stored per project, in `.idea/dataform-gcp-repository-setting.xml`. Your
credential is never written there.

### Service account

When a service account is set, workflow invocations started from the IDE run with that identity,
the same way a release or workflow configuration in Google Cloud does. Your own account needs
permission to act as that service account (`roles/iam.serviceAccountUser`). Leave the field empty to
let Dataform use the repository's default identity.

### Active repository and workspace

The repository chosen in the **Repository** selector at the top of the tool window is the active
one: compilation, dry runs, workflow runs and the [Dataform panel]({{ '/dataform-plugin/features/dataform-panel' | relative_url }})
all use it. The **Workspace** selector below it picks the Dataform workspace used for pull, push,
commits and runs. Both choices are remembered per project.

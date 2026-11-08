---
layout: doc
section: features
project: dataform-plugin
title: Dataform panel · Google Cloud Dataform Plugin for IntelliJ
heading: Dataform panel
summary: >-
  The Dataform Tools tool window: repositories, workspaces, remote files with their status, pull,
  push, commits and comparing files with their local version.
description: >-
  The Dataform Tools tool window of Google Cloud Dataform Plugin for IntelliJ: repositories, workspaces, remote
  files, pull, push, commits and comparing files with their local version.
nav_order: 7
permalink: /dataform-plugin/features/dataform-panel
---

The **Dataform Tools** tool window, on the right side of the IDE, connects the local project to a
Dataform repository in Google Cloud. From it you choose the repository and workspace, browse the
remote files, move files between your computer and the workspace, and commit and push the workspace
to Git.

Before using it, sign in and add a repository as described in
[Configuration]({{ '/dataform-plugin/docs/configuration' | relative_url }}).

{% include video.html src="/assets/video/dataform/dataform-tools.mp4" caption="Repository picker, remote files, Compare with Local and the Changes tab" index=1 %}

## Layout

| Area | Content |
|---|---|
| **Repository picker** | The active repository, from the entries you configured, and **Manage Repositories…**. |
| **Workspace picker** | The workspace to work with, the repository's main branch when [no workspace is selected](#workspaces), and **Create Workspace…**. |
| **Toolbar** | **Pull**, **Push**, **Create Workspace** and **Open in Google Cloud Console** for the workspace. |
| **Files** tab | The files of the selected workspace, with their status. |
| **Changes** tab | The uncommitted changes of the workspace, with their number, a commit message and the commit buttons. |

The tool window's title bar has **Refresh**, and its options menu (**⋮**) holds **Manage
Repositories…**, **Create Workspace…** and **Sign In to Google Cloud** or **Sign Out of Google
Cloud**.

{% include window.html src="/assets/img/dataform/panel-workspaces.webp" caption="The user_purchase repository with the demo workspace selected" index=1 %}

## Workspaces

The workspace picker lists the workspaces of the active repository. Use **Refresh** to reload the
list after a change made in the Google Cloud console. **Create Workspace…**, in the picker, the
toolbar or the options menu, asks for the new workspace's name.

With no workspace selected, the **Files** tab is a read-only view of the repository's main branch.
Where that view comes from depends on the repository:

| Repository | Choice in the picker | The **Files** tab shows |
|---|---|---|
| No Git remote | **No workspace (repository main)** | The main branch, read from Dataform. |
| Git remote, in a project cloned from it | **Git remote (origin/main)** | The default branch of the Git remote, read from your local clone, with a message saying it is not a Dataform branch. |
| Git remote, with no local clone or no Git plugin | None | Nothing: a message asks you to select a workspace. |

Dataform does not serve the files of a repository linked to a Git remote unless you select a
workspace, so the plugin reads them from your clone. Each time this view loads, it fetches that
branch with your local Git credentials. Only the remote-tracking branch moves: your working tree and
local branches stay as they are. If the fetch fails, for example offline, a warning says so and the
last fetched files are shown.

**Compare with Local** and **Fetch to Local** work on these views. Select a workspace to pull, push
or commit files.

{% include window.html src="/assets/img/dataform/panel-git-remote.webp" caption="The main branch of the Git remote of user_purchase, read from a local clone" index=2 width=606 %}

## Remote files

The **Files** tab shows the file tree of the selected workspace. File names are coloured like in
IntelliJ's Git integration, from the workspace's uncommitted changes:

| Colour | Meaning |
|---|---|
| Green | Added in the workspace |
| Blue | Modified in the workspace |
| Grey, struck through | Deleted in the workspace |
| Red | Has conflicts in the workspace |

Double-click a file to open it read-only, or, for a modified file, to compare it with your local
copy. Right-click a file for:

- **Compare with Local**: a diff of the local and remote versions;
- **Fetch to Local**: copy that file from the workspace to your project;
- **Open in Google Cloud Console**: the file in its workspace, in your browser;
- **Copy Path**.

Right-click a folder to **Fetch to Local** the whole folder.

{% include window.html src="/assets/img/dataform/panel-compare.webp" caption="Compare with Local on gold_customer_ltv.sqlx" index=3 %}

## Pull and push

- **Pull** copies the files of the selected workspace into your local project.
- **Push** copies your local project files into the selected workspace. Files excluded by
  `.gitignore` or `.gcloudignore` are not sent. When files exist in the workspace but not locally,
  the plugin lists them and asks before deleting them from the workspace.

Pull and push only move files between your computer and the Dataform workspace; they do not create
Git commits. They stay available in a project cloned from the repository's Git remote.

## Commit and push to Git

The **Changes** tab works on the workspace in Google Cloud, like the Dataform web editor. What it
lets you do depends on how your project relates to the repository's Git remote:

| Project | **Commit**, **Commit and Push…** and **Push** | Message in the tab |
|---|---|---|
| Repository with no Git remote | Available | None |
| Git remote, project not cloned from it | Available, and pushing asks for the branch | Suggests cloning, with a **Clone Repository…** link |
| Cloned from the Git remote | Disabled | Says to use Git, with a **New Branch…** link |
| Cloned from the Git remote, Git plugin disabled | Disabled | None |

These buttons wait until the repository's settings are read. If they cannot be read, the buttons
stay disabled and their tooltip asks you to **Refresh**.

### Commit in the workspace

1. The tree lists the workspace's changed files, all checked. Uncheck the files to leave out.
2. Type a **Commit message**.
3. Click **Commit N files** to commit them in the workspace, or choose **Commit and Push…** from its
   arrow to also push. **Push** pushes the workspace's commits to the repository's Git remote.

Double-click a change to open its local file; right-click it for the same menu as in the **Files**
tab. The commit author is taken from the Google account you are signed in with.

{% include window.html src="/assets/img/dataform/panel-changes.webp" caption="The Changes tab of a repository with no Git remote, with 22 changed files" index=4 %}

On a repository linked to a Git remote, **Push** and **Commit and Push…** first ask which branch of
the remote receives the commits, as in the Dataform console: the repository's default branch
(**Push to main**) or the branch named after the workspace. Dataform does not link a workspace to a
Git branch, nor create branches on the Git remote: to use the workspace's branch, create it on the
remote, then pull it into the workspace from the Dataform console. Nothing is committed or pushed until you
choose, and a notification then names the branch that received the commits. If the push fails after
the commit, for example on a protected branch, the commit stays in the workspace and **Push** can
send it to the other branch.

{% include window.html src="/assets/img/dataform/panel-push-branch.webp" caption="A project not cloned from the Git remote: the suggestion to clone, and the branches Push offers" index=5 width=606 %}

### Commit with Git in a cloned project

A commit made in a workspace reaches the remote without moving your local branch, and your local copy
of the same edit then blocks `git pull`. So a project cloned from the repository's Git remote commits
with Git instead, through IntelliJ's Git integration or the command line. **New Branch…** opens the
IDE's dialog to start a branch.

{% include window.html src="/assets/img/dataform/panel-commit-with-git.webp" caption="A project cloned from the Git remote: the commit and push buttons are disabled, with a link to New Branch" index=6 width=606 %}

A project counts as cloned when its Git configuration lists the repository's Git remote. The tab
follows it: adding that remote to the project disables these buttons without a restart.

## Compare a file with its remote version

Outside the tool window, **Compare File with Remote** compares a local file with its version in the
selected workspace. It is available from the editor's context menu, the Project view's context menu
and the **Compare** actions.

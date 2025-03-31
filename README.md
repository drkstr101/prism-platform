# Prism Platform

## Bit Documentation

<https://bit.dev/>

```raw
Workspace commands
  completion     enable bash/zsh-completion shortcuts for commands and options
  cli            EXPERIMENTAL. enters bit cli program and generates commands list
  help           shows help
  version        shows bit version
  config         config management
  doctor         diagnose a bit workspace
  server         communicate with bit cli program via http requests
  login          log in to Bit cloud
  logout         log the CLI out of Bit
  whoami         display the currently logged in user
  clear-cache    clears Bit's cache from current working machine

Start a working area
  init           create or reinitialize an empty workspace
  new            create a new workspace from a template

View components
  show           display the component's essential information
  version-historymanage the version-history of components
  deps           manage dependencies
  why            find components that use the specified dependency
  set-peer       set a component as always peer
  unset-peer     unset a component as always peer
  dependents     show dependents of the given component
  log            show components(s) version history
  log-file       EXPERIMENTAL. show file history
  blame          EXPERIMENTAL. per line, show who and when was the last to modify it

Develop components
  envs           list all components maintained by the workspace and their corresponding envs
  start          run the ui/development server
  scope          manage the scope-name for components
  eject-conf     eject components configuration (create a `component.json` file)
  pattern        list the component ids matching the given pattern
  local-only     manage local-only components, which reside only in the workspace and are not snapped/tagged
  ws-config      manage workspace config files
  add            Add any subset of files to be tracked as a component(s).
  create         create a new component (source files and config) using a template.
  templates      list available templates for "bit create" and "bit new"
  watch          automatically recompile modified components (on save)
  build          run set of tasks for build.
  artifacts      list and download component artifacts
  compile        compile components in the workspace
  install        installs workspace dependencies
  uninstall      uninstall dependencies
  update         update dependencies. By default, dependencies are updated to the highest semver compatible versions.
  link           create links in the node_modules directory, to core aspects and to components in the workspace
  move           move a component to a different filesystem path
  eject          remove component from the workspace and install it instead as a regular npm package.
  tag            create an immutable and exportable component snapshot, tagged with a release version.
  snap           create an immutable and exportable component snapshot (non-release version)
  reset          revert tagged or snapped versions for component(s)
  checkout       switch between component versions or remove local changes
  revert         replace the current component files by the specified version, leave the version intact
  stash          stash modified components
  test           test components in the workspace. by default only runs tests for new and modified components
  diff           show the diff between the components' current source files and config, and their latest snapshot or tag
  merge          merge changes of the remote head into local - auto-snaps all merged components
  refactor       source code refactoring / codemod
  status         present the current status of components in the workspace, including indication of detected issues
  mini-status    basic status for fast execution
  schema         shows the API schema of the specified component/s.
  check-types    check typescript types
  aspect         manage aspects
  format         format components in the development workspace
  lint           lint components in the development workspace

Workspace
  globals        list all globals
  system         system operations

Collaborate on components
  remote         manage set of tracked bit scope(s)
  use            set aspects in the workspace/scope config to make them loadable by the workspace/scope
  unuse          unset aspects in the workspace config (opposite of "use" command)
  deprecate      deprecate a component
  undeprecate    undeprecate a deprecated component (local/remote)
  import         import components from their remote scopes to the local workspace
  remove         remove component(s) from the local workspace
  delete         mark components as deleted on the remote
  recover        recover component(s) soft-deleted from the workspace, or a remote scope
  export         export components from the workspace to remote scopes
  lane           manage lanes - if no sub-command is used, runs "bit lane list"
  rename         rename component. if exported, create a new component and delete the original component. otherwise just renames current component
  fork           create a new component forked from an existing one (copies source files and configs)

Explore components
  graph          generate an SVG image file with the components' dependencies graph
  list           list components on a workspace or a remote scope (with flag).

Capsules
  capsule        manage capsules

Git
  git            perform git operations

Applications
  run            locally run an app component (independent of bit's dev server)
  app            Manages apps

Cloud
  npmrc          manage npmrc file with scope, registry, and token information from bit.cloud
```

please use 'bit <command> --help' for more information and guides on specific commands.
gitpod /workspace/prism-platform (experimental) $

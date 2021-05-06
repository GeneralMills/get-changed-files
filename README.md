# get-changed-files

A GitHub Action to return a list of added/modified files in a repository. When the action is triggered
in a `push` event, the action will return a subset of the changes from the last `push` to the branch 
that the action is running on. When the action is triggered by a `pull_request` event the action will 
return all the files that have been added/modified between the two branches.

## Inputs

| Parameter       | Required | Info                                         |
| --------------- | -------- | -------------------------------------------- |
| `paths`         | `false`  | Space seperated list of paths to filter results by. (accepts wildcards)                                   |
| `token`         | `false`  | GitHub Token for API Access. Defaults to GITHUB_TOKEN         |

## Example

```yaml
steps:
  - id: changes
    uses: GeneralMills/get-changed-files@v2
    with:
      paths: examples/** other-examples/* test.txt
  - name: Echo File Changes
    if: ${{steps.changes.outputs.files}}
    run: |
      for file in ${{steps.changes.outputs.files}}
      do
          echo "My File -> ${file}"
      done
```
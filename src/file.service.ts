import {getOctokit, context} from '@actions/github'

export class FileService {
  private readonly token: string

  constructor(token: string) {
    this.token = token
  }

  async getFiles(): Promise<string> {
    let base: string
    let head: string

    switch (context.eventName) {
      case 'pull_request':
        base = context.payload.pull_request?.base?.sha
        head = context.payload.pull_request?.head?.sha
        break
      case 'push':
        base = context.payload.before
        head = context.payload.after
        break
      default:
        throw new Error(
          'action must be used within a pull_request or push event'
        )
    }

    const response = await getOctokit(this.token).repos.compareCommits({
      base,
      head,
      owner: context.repo.owner,
      repo: context.repo.repo
    })

    const files = response.data.files?.filter(x =>
      ['added', 'modified'].includes(x.status)
    )

    return JSON.stringify(files)
  }
}

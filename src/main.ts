import * as core from '@actions/core'
import {FileService} from './file.service'

async function run(): Promise<void> {
  try {
    const paths: string[] = core.getInput('paths')?.split(' ') || [];

    const files = await new FileService(
      core.getInput('token', {required: true})
    ).getFiles(paths);

    core.setOutput('files', files);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()

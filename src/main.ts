import * as core from '@actions/core'
import {FileService} from './file.service'

async function run(): Promise<void> {
  try {
    const path: string = core.getInput('path');

    const files = await new FileService(
      core.getInput('token', {required: true})
    ).getFiles(path);

    core.setOutput('files', files);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()

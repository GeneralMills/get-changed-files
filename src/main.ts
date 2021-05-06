import * as core from '@actions/core'
import {FileService} from './file.service'

async function run(): Promise<void> {
  try {
    const paths: string[] = core.getInput('paths') ? core.getInput('paths').split(' ') : [];

    const files = await new FileService(
      core.getInput('token', {required: true})
    ).getFiles(paths);

    core.info(`Found (${files.length}) ${files.length === 1 ? 'File' : 'Files'}`);
    core.setOutput('files', files);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()

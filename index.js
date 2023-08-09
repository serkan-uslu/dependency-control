import fs from 'fs'
import semver from 'semver'
import { promisify } from 'util'
import { exec as execCb } from 'child_process'

const exec = promisify(execCb)

async function checkForUpdates() {
    const rawData = fs.readFileSync('package.json')
    const pkg = JSON.parse(rawData)
    const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }

    const output = {
        summary: {
            outdated: 0,
            upToDate: 0,
        },
        details: {},
        updateCommands: [],
    }

    for (let [dep, version] of Object.entries(dependencies)) {
        const detail = {
            usedVersion: version,
        }

        try {
            const { stdout: latestVersionStdout } = await exec(
                `npm show ${dep} version`
            )
            const latestVersion = latestVersionStdout.trim()
            const { stdout: lastUpdateTimeStdout } = await exec(
                `npm show ${dep} time --json`
            )
            const lastUpdateTime = JSON.parse(lastUpdateTimeStdout)

            detail.latestVersion = latestVersion
            detail.lastUpdate = lastUpdateTime[latestVersion]
            detail.hasUpdate = semver.gt(latestVersion, semver.coerce(version))

            if (detail.hasUpdate) {
                output.summary.outdated++
                output.updateCommands.push(
                    `npm install ${dep}@${latestVersion}`
                )
            } else {
                output.summary.upToDate++
            }

            output.details[dep] = detail
        } catch (err) {
            console.error(`Error checking version of ${dep}: ${err}`)
        }
    }

    fs.writeFileSync('detailedReport.json', JSON.stringify(output, null, 2))
    console.log(`Detailed report is saved to "detailedReport.json".`)
}

checkForUpdates()

import fs from 'fs'
import semver from 'semver'
import { promisify } from 'util'
import { exec as execCb } from 'child_process'

const exec = promisify(execCb)

async function checkForUpdates({ dryRun = false, autoUpdate = false } = {}) {
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

    const tasks = Object.entries(dependencies).map(async ([dep, version]) => {
        const detail = {
            usedVersion: version,
        }

        try {
            const [latestVersionRes, lastUpdateTimeRes] = await Promise.all([
                exec(`npm show ${dep} version`),
                exec(`npm show ${dep} time --json`),
            ])

            const latestVersion = latestVersionRes.stdout.trim()
            const lastUpdateTime = JSON.parse(lastUpdateTimeRes.stdout)

            detail.latestVersion = latestVersion
            detail.lastUpdate = lastUpdateTime[latestVersion]
            detail.hasUpdate = semver.gt(latestVersion, semver.coerce(version))

            if (detail.hasUpdate) {
                output.summary.outdated++
                const updateCommand = `npm install ${dep}@${latestVersion}`
                output.updateCommands.push(updateCommand)

                if (autoUpdate && !dryRun) {
                    await exec(updateCommand)
                }
            } else {
                output.summary.upToDate++
            }

            output.details[dep] = detail
        } catch (err) {
            console.error(`Error checking version of ${dep}: ${err}`)
        }

        console.log(`Checked ${dep}.`)
    })

    await Promise.all(tasks)

    if (!dryRun) {
        fs.writeFileSync('detailedReport.json', JSON.stringify(output, null, 2))
        console.log(`Detailed report is saved to "detailedReport.json".`)
    } else {
        console.log('Dry run completed. No files written.')
    }
}

// Simple CLI interface
const args = process.argv.slice(2)
const dryRun = args.includes('--dryRun')
const autoUpdate = args.includes('--autoUpdate')

checkForUpdates({ dryRun, autoUpdate })

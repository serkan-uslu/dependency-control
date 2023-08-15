# Dependency Control

This tool checks the versions of dependencies in a package.json file, compares them to the latest versions available on npm, and then creates a detailed report.

## Features

The Dependency Control is designed to help developers keep their Node.js projects up to date. By comparing the versions of dependencies in your package.json file to those available on npm, it generates a detailed report, listing which packages are out of date and suggesting commands for updating them. Advanced features include parallel processing for faster results, improved error handling, and command-line options for both a dry run (checking without making changes) and automatic updating.

## How it Works

Clone the repository.
Navigate to the project folder.
Run the script using node index.js. Use flags --dryRun and --autoUpdate as desired.

## Sample Report Content

```json
{
    "summary": {
        "outdated": 1,
        "upToDate": 5
    },
    "details": {
        "fs": {
            "usedVersion": "^0.0.1-security",
            "latestVersion": "0.0.1-security",
            "lastUpdate": "2016-08-23T17:56:58.976Z",
            "hasUpdate": false
        },
        "semver": {
            "usedVersion": "^7.5.4",
            "latestVersion": "7.5.4",
            "lastUpdate": "2023-07-07T21:10:32.589Z",
            "hasUpdate": false
        },
        "eslint": {
            "usedVersion": "^8.46.0",
            "latestVersion": "8.46.0",
            "lastUpdate": "2023-07-28T16:05:20.605Z",
            "hasUpdate": false
        },
        "husky": {
            "usedVersion": "^8.0.0",
            "latestVersion": "8.0.3",
            "lastUpdate": "2023-01-03T08:01:18.807Z",
            "hasUpdate": true
        },
        "eslint-config-prettier": {
            "usedVersion": "^9.0.0",
            "latestVersion": "9.0.0",
            "lastUpdate": "2023-08-05T19:09:15.001Z",
            "hasUpdate": false
        },
        "prettier": {
            "usedVersion": "^3.0.1",
            "latestVersion": "3.0.1",
            "lastUpdate": "2023-08-03T06:10:21.592Z",
            "hasUpdate": false
        }
    },
    "updateCommands": ["npm install husky@8.0.3"]
}
```

---

## Özellikler

Dependency Control, geliştiricilere Node.js projelerini güncel tutmalarına yardımcı olmak için tasarlanmıştır. package.json dosyanızdaki bağımlılıkların sürümlerini npm'de bulunanlarla karşılaştırarak, hangi paketlerin güncel olmadığını listeler ve bunları güncellemek için komutlar önerir. Gelişmiş özelliklere paralel işlem için hızlı sonuçlar, geliştirilmiş hata işleme ve hem kuru çalışma (değişiklik yapmadan kontrol etme) hem de otomatik güncelleme için komut satırı seçenekleri dahildir.

## Kullanım

Depoyu klonlayın.
Proje klasörüne gidin.
node index.js kullanarak betiği çalıştırın. İstendiği gibi --dryRun ve --autoUpdate bayraklarını kullanın.

## Örnek Rapor İçeriği

```json
{
    "summary": {
        "outdated": 1,
        "upToDate": 5
    },
    "details": {
        "fs": {
            "usedVersion": "^0.0.1-security",
            "latestVersion": "0.0.1-security",
            "lastUpdate": "2016-08-23T17:56:58.976Z",
            "hasUpdate": false
        },
        "semver": {
            "usedVersion": "^7.5.4",
            "latestVersion": "7.5.4",
            "lastUpdate": "2023-07-07T21:10:32.589Z",
            "hasUpdate": false
        },
        "eslint": {
            "usedVersion": "^8.46.0",
            "latestVersion": "8.46.0",
            "lastUpdate": "2023-07-28T16:05:20.605Z",
            "hasUpdate": false
        },
        "husky": {
            "usedVersion": "^8.0.0",
            "latestVersion": "8.0.3",
            "lastUpdate": "2023-01-03T08:01:18.807Z",
            "hasUpdate": true
        },
        "eslint-config-prettier": {
            "usedVersion": "^9.0.0",
            "latestVersion": "9.0.0",
            "lastUpdate": "2023-08-05T19:09:15.001Z",
            "hasUpdate": false
        },
        "prettier": {
            "usedVersion": "^3.0.1",
            "latestVersion": "3.0.1",
            "lastUpdate": "2023-08-03T06:10:21.592Z",
            "hasUpdate": false
        }
    },
    "updateCommands": ["npm install husky@8.0.3"]
}
```

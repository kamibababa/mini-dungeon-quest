# Mini Dungeon Quest (PWA + TWA Demo)

This is a small web game that follows the same publish model as your referenced project:

- Web app first (HTML/CSS/JS + PWA)
- Hosted on GitHub Pages (HTTPS)
- Wrapped for Android via TWA

## 1) Run locally

Use any static server:

```bash
npx serve .
```

Open the shown URL and verify the game works.

## 2) Deploy to GitHub Pages

Use your repo: `https://github.com/kamibababa/mini-dungeon-quest`.

For a project page URL like:

`https://kamibababa.github.io/mini-dungeon-quest/`

enable Pages in repo settings:

- Source: `Deploy from a branch`
- Branch: `main` / root

After deployment, confirm these URLs work:

- `https://kamibababa.github.io/mini-dungeon-quest/`
- `https://kamibababa.github.io/mini-dungeon-quest/site.webmanifest`
- `https://kamibababa.github.io/mini-dungeon-quest/.well-known/assetlinks.json`

## 3) Prepare TWA config

Install Bubblewrap:

```bash
npm i -g @bubblewrap/cli
```

Initialize in an empty `android` folder:

```bash
mkdir android
cd android
bubblewrap init --manifest https://kamibababa.github.io/mini-dungeon-quest/site.webmanifest
```

When prompted, set:

- Start URL: `https://kamibababa.github.io/mini-dungeon-quest/`
- Application ID / package: `com.example.minidungeon`

## 4) Create signing key and fingerprint

Create release key:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore release-key.jks -alias release -keyalg RSA -keysize 2048 -validity 10000
```

Get SHA-256 fingerprint:

```bash
keytool -list -v -keystore release-key.jks -alias release
```

Copy `SHA256:` value into:

- `/.well-known/assetlinks.json` (`sha256_cert_fingerprints`)

And set correct package name in the same file.

Commit and push that update to GitHub Pages, then wait 1-2 minutes.

## 5) Build APK

In `android` folder:

```bash
bubblewrap build
```

Output APK is typically under a path like:

`android/app/build/outputs/apk/release/`

Install to phone:

```bash
adb install app-release-signed.apk
```

Or copy the APK to phone and install manually.

## Notes

- If TWA opens Chrome UI instead of full-screen app mode, `assetlinks.json` usually mismatches package/fingerprint.
- Keep site under HTTPS and same origin for best behavior.
- You can generate PNG icons later; this demo uses SVG icons for simplicity.

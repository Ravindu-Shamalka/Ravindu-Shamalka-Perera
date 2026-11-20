# Free ArtStation automatic gallery updates

Source: https://ravindushamalka.artstation.com

The existing 68 curated portfolio items and homepage featured artwork stay untouched. New public projects are added to the beginning of the gallery, using a default 3D category until manually reclassified. The feed is checked once a week using GitHub Actions. A scheduled run may be delayed. No paid service or secret is required for a public repository.

## Installation

1. Upload **all contents of this ZIP** to the root of the existing `Ravindu-Shamalka-Perera` GitHub repository, including the hidden `.github` folder. Preserve the existing GitHub Pages settings.
2. Open the repository's **Actions** tab, select **Sync ArtStation portfolio**, and click **Run workflow** for the first test.
3. Check the run logs. If the RSS and JSON endpoints are blocked or unavailable, the run will fail safely and the current portfolio will stay unchanged. GitHub Actions cannot guarantee access to ArtStation's feeds.
4. Once the action successfully finds new projects, it commits updates to `projects.js`. GitHub Pages then deploys them from the configured publishing branch.
5. Ensure repository Actions permissions permit writing contents (Settings > Actions > General > Workflow permissions). For a public repository, scheduled workflows and Pages are normally available on the free plan subject to GitHub limits.

The original curated artworks are preserved, including selected hero images. Existing projects are deduplicated by ArtStation project ID. ArtStation feed entries may only expose recent projects and may not include thumbnail images. If the feed provides no thumbnail, the website displays its existing placeholder style. Do not delete the original projects.js entries.

**Important:** This package is configured and syntax-checked, but live retrieval from ArtStation and a GitHub Actions run must be tested after upload. It does not update the live repository by itself.

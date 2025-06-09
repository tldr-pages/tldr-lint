<!-- markdownlint-configure-file {"MD024": { "siblings_only": true } } -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com).

## [v0.0.19](https://github.com/tldr-pages/tldr-lint/compare/v0.0.18...v0.0.19)

### Added

- Add `{`, `%`, `,`, `^`, `~`, `$`, `~`, and `.` as allowed characters in file names and page titles ([#389](https://github.com/tldr-pages/tldr-lint/pull/389))

## [v0.0.18 - 2025-06-02](https://github.com/tldr-pages/tldr-lint/compare/v0.0.17...v0.0.18)

### Added

- Add `!` as allowed characters in file names and page titles ([#386](https://github.com/tldr-pages/tldr-lint/pull/386))

## [v0.0.17 - 2025-03-31](https://github.com/tldr-pages/tldr-lint/compare/v0.0.16...v0.0.17)

### Added

- Add `]` and `}` as allowed characters in file names and page titles ([#378](https://github.com/tldr-pages/tldr-lint/pull/378))

## [v0.0.16 - 2024-10-04](https://github.com/tldr-pages/tldr-lint/compare/v0.0.15...v0.0.16)

### Added

- Add rule `TLDR111` ([#353](https://github.com/tldr-pages/tldr-lint/pull/353))

## [v0.0.15 - 2024-04-03](https://github.com/tldr-pages/tldr-lint/compare/v0.0.14...v0.0.15)

### Added

- Add rule `TLDR020` ([#308](https://github.com/tldr-pages/tldr-lint/pull/308))
- Add rule `TLDR021` ([#310](https://github.com/tldr-pages/tldr-lint/pull/310))

## [v0.0.14 - 2024-03-20](https://github.com/tldr-pages/tldr-lint/compare/v0.0.13...v0.0.14)

### Added

- Add rule `TLDR110` ([#306](https://github.com/tldr-pages/tldr-lint/pull/306))

## [v0.0.13 - 2021-10-12](https://github.com/tldr-pages/tldr-lint/compare/v0.0.12...v0.0.13)

### Changed

- Allow exceptions to rule `TLDR003` ([#104](https://github.com/tldr-pages/tldr-lint/pull/104))

## [v0.0.12 - 2021-10-04](https://github.com/tldr-pages/tldr-lint/compare/v0.0.11...v0.0.12)

### Added

- Allow special uppercased characters ([#101](https://github.com/tldr-pages/tldr-lint/pull/101))

### Changed

- Update to test against Node 16.x ([#90](https://github.com/tldr-pages/tldr-lint/pull/90))

## [v0.0.11 - 2021-04-14](https://github.com/tldr-pages/tldr-lint/compare/v0.0.10...v0.0.11)

### Added

- Add CLI flag to ignore specific errors ([#69](https://github.com/tldr-pages/tldr-lint/pull/69))

### Changed

- Allow words at the beginning of example descriptions to end with "ys" ([#60](https://github.com/tldr-pages/tldr-lint/pull/60))
- Print out filename above parse errors ([#62](https://github.com/tldr-pages/tldr-lint/pull/62))

### Fixed

- Fix passing options to CLI ([#59](https://github.com/tldr-pages/tldr-lint/pull/59))

## [v0.0.10 - 2021-03-01](https://github.com/tldr-pages/tldr-lint/compare/v0.0.9...v0.0.10)

### Added

- Add rule `TLDR107` ([#34](https://github.com/tldr-pages/tldr-lint/pull/34))
- Add rule `TLDR108` ([#39](https://github.com/tldr-pages/tldr-lint/pull/39))
- Add rule `TLDR109` ([#42](https://github.com/tldr-pages/tldr-lint/pull/42))

### Changed

- Allow pages with `+` character in title ([#33](https://github.com/tldr-pages/tldr-lint/pull/33))
- Allow pages with `[` chacacter in title ([#44](https://github.com/tldr-pages/tldr-lint/pull/44))
- Add ESLint for JS linting ([#50](https://github.com/tldr-pages/tldr-lint/pull/50))

## [v0.0.9 - 2020-12-23](https://github.com/tldr-pages/tldr-lint/compare/v0.0.8...v0.0.9)

### Added

- Add rule `TLDR016` ([#20](https://github.com/tldr-pages/tldr-lint/pull/20))
- Add rule `TLDR017` ([#20](https://github.com/tldr-pages/tldr-lint/pull/20))
- Add rule `TLDR018` ([#22](https://github.com/tldr-pages/tldr-lint/pull/22))
- Add rule `TLDR019` ([#23](https://github.com/tldr-pages/tldr-lint/pull/23))

### Changed

- Replace Grunt with npm scripts locally ([#21](https://github.com/tldr-pages/tldr-lint/pull/21))
- Update CI to always use colour output ([#24](https://github.com/tldr-pages/tldr-lint/pull/24))
- Remove TODOs from the README into issues ([#27](https://github.com/tldr-pages/tldr-lint/pull/27))
- Update Node versions in CI ([#28](https://github.com/tldr-pages/tldr-lint/pull/28))

## [v0.0.8 - 2020-10-02](https://github.com/tldr-pages/tldr-lint/compare/v0.0.7...v0.0.8)

### Added

- Add rule `TLDR014`
- Add rule `TLDR015`
- Add rule `TLDR105`

### Changed

- Only allow one command per example
- Disallow trailing characters in `TLDR005`

## [v0.0.7 - 2016-01-19](https://github.com/tldr-pages/tldr-lint/compare/v0.0.6...v0.0.7)

### Added

- Add rule `TLDR104`
- Add rule `TLDR106`

### Changed

- Improve checking on `TLDR103`

## [v0.0.6 - 2016-01-14](https://github.com/tldr-pages/tldr-lint/compare/v0.0.5...v0.0.6)

### Added

- Add rule `TLDR101`
- Add rule `TLDR102`
- Add rule `TLDR103`

## [v0.0.5 - 2016-01-13](https://github.com/tldr-pages/tldr-lint/compare/v0.0.4...v0.0.5)

### Added

- Add `tldrl` binary, as well as `tldr-lint`

### Changed

- Allow periods in title, just not at the end

### Fixed

- Fix example description regex

## [v0.0.4 - 2016-01-13](https://github.com/tldr-pages/tldr-lint/compare/v0.0.3...v0.0.4)

### Added

- Add support for directories

## [v0.0.3 - 2016-01-13](https://github.com/tldr-pages/tldr-lint/compare/v0.0.2...v0.0.3)

### Fixed

- Add exception to `TLDR003`

## [v0.0.2 - 2016-01-13](https://github.com/tldr-pages/tldr-lint/compare/v0.0.1...v0.0.2)

### Added

- Add rule `TLDR002`
- Add rule `TLDR003`
- Add rule `TLDR004`
- Add rule `TLDR005`
- Add rule `TLDR006`
- Add rule `TLDR007`
- Add rule `TLDR008`
- Add rule `TLDR009`
- Add rule `TLDR010`
- Add rule `TLDR011`
- Add rule `TLDR012`
- Add rule `TLDR013`

### Fixed

- Fix writing to files with `-o`

## [v0.0.1 - 2016-01-07](https://github.com/tldr-pages/tldr-lint/commit/4570c2fe189e5fcc0ebd42b4cd4f63ac171ae07e)

### Added

- Initial release
- Add rule `TLDR001`

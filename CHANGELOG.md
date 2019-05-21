# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2019-05-20
### Added
- 

### Changed
- Use environment variables instead of config.js for database configuration
- Configure service port from env var first, default second

### Fixed
- temperatureHandler renames to postTemperatureHandler
- 

### Removed
- 


## [0.2.0] - 2019-05-19
### Added
- Persistent storage using Postgres

### Changed
- Use environment variables instead of config.js for database configuration
- Configure service port from env var first, default second

### Fixed
- temperatureHandler returns payload in jsonResponse
- return just payload, instead of result, causing an error when !result

### Removed
- Persistent storage to sqlite file. File lost when service restarts.

## [0.1.0] - 2018-06-12
### Added
- Initial version of service

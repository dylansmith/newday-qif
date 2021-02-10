# newday-qif

[![CircleCI](https://circleci.com/gh/dylansmith/newday-qif.svg?style=svg)](https://circleci.com/gh/dylansmith/newday-qif)

[NewDay](https://www.newday.co.uk/) is a white-label credit card provider that powers store/loyalty card programmes for a [number of well-known UK brands](https://www.newday.co.uk/products/our-co-brands/). This is a small command-line utility to convert NewDay CSV statements into QIF format.

## Installation

```sh
$ npm install -g newday-qif
```

## Usage

1. Export CSV statements from your NewDay online account to your computer
2. Run `$ newday_qif <file_path>` to convert a single file to QIF
3. Run `$ newday_qif <directory_path>` to convert all files in that directory to QIF

Given the file `NewDayStatement_2021-01.csv`, it will generate `NewDayStatement_2021-01.qif`.

---

## Release History

* 1.0.0
  - initial release

---

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

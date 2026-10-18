---
layout: doc
project: netcdf-spark-parser
title: Configuration · NetCDF Spark Parser
heading: Configuration
description: Configuration documentation for NetCDF Spark Parser.
nav_order: 3
permalink: /netcdf-spark-parser/docs/configuration
---

> This chapter is being written. Until it is ready, see the [README](https://github.com/rejeb/netcdf-spark-parser#readme) on GitHub.

## Reader options

| Option | Description | Default |
|---|---|---|
| `path` | Path to the NetCDF file | required |
| `partition.size` | Rows per partition | 20,000 |
| `dimensions.to.ignore` | Comma-separated dimensions to ignore | none |

## Defining a schema

---
layout: project
project: netcdf-spark-parser
title: NetCDF Spark Parser
description: >-
  Apache Spark DataSource V2 connector that reads NetCDF scientific files as DataFrames, from
  local disk or Amazon S3. Scala 2.12 and 2.13, Spark 3.5.
image: /assets/img/og/og-netcdf-spark-parser.png
permalink: /netcdf-spark-parser
---

## Overview

A Spark connector for reading **NetCDF** files at scale. It uses the DataSource V2 API and
[NetCDF Java](https://www.unidata.ucar.edu/software/netcdf-java/) to turn multi-dimensional scientific
data into tabular DataFrames.

## Features

- **Custom schema support** for NetCDF variables.
- **Automatic partitioning** of large NetCDF files.
- **Distributed reads** optimized for Spark.
- **Storage**: local file systems and Amazon S3.

## Add the dependency

```scala
libraryDependencies += "io.github.rejeb" %% "netcdf-spark-parser" % "1.0.0"
```

## Read a file

```scala
val schema = StructType(Seq(
  StructField("temperature", FloatType),
  StructField("humidity", FloatType),
  StructField("timestamp", StringType)
))

val df = spark.read.format("netcdf")
  .schema(schema)
  .option("path", "/path/to/your/netcdf-file.nc")
  .load()
```

| Option | Description | Default |
|---|---|---|
| `path` | Path to the NetCDF file | required |
| `partition.size` | Rows per partition | 20,000 |
| `dimensions.to.ignore` | Comma-separated dimensions to ignore | none |

Requires Java 11+, Spark 3.5.x and Scala 2.12 or 2.13.

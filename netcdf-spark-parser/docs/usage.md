---
layout: doc
project: netcdf-spark-parser
title: Usage · NetCDF Spark Parser
heading: Usage
description: Usage documentation for NetCDF Spark Parser.
nav_order: 4
permalink: /netcdf-spark-parser/docs/usage
---

> This chapter is being written. Until it is ready, see the [README](https://github.com/rejeb/netcdf-spark-parser#readme) on GitHub.

## Reading a local file

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

## Reading from Amazon S3

## Partitioning large files

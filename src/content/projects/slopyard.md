---
title: slopyard
status: prototype
summary: Small Go app for anonymous community reports on whether a website host is “AI Slop” or “Not Slop”.
stack:
  - Go
  - PostgreSQL
  - Redis
  - SQL
links:
  - label: Source
    url: https://github.com/link108/slopyard
featured: false
---

This repo is intentionally small and server-rendered.

The README describes a Go HTTP app with Postgres for reports and aggregates plus optional
Redis rate limiting, with no frontend build step layered on top.

## What it is

`slopyard` is a deliberately small web app for anonymous reports on whether a site is “AI
Slop” or “Not Slop.” The concept is lightweight and a little sharp-edged, and the
implementation mirrors that: server-rendered HTML, Go HTTP handlers, SQL migrations, and a
small operational footprint.

This is not trying to become a modern frontend stack. The interesting choice here is that
it refuses that complexity and stays with a simpler Go web architecture.

## How it is organized

The repo has separate commands for setup, migration, seeding, and the main server, plus a
clean split between internal domain/server/store packages and the `web` directory for
templates and static assets. That structure gives it enough discipline to grow without
dragging in a frontend build pipeline.

The README also makes the data model and infrastructure intent clear: Postgres holds sites,
reports, and aggregates, Redis is optional for rate limiting, and the app is meant to stay
small.

## Why it is interesting

This repo stands out because it is opinionated in both product and implementation. The
product premise is intentionally narrow and internet-native, and the technical approach is
equally narrow: use Go, render HTML on the server, keep the data model simple, and avoid a
frontend toolchain unless it earns its place.

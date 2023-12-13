---
title: "Understanding datetimes handling as a frontend dev"
description: "Understanding datetimes handling as a frontend dev"
date: 12/04/2023
status: "draft"
---

# Understanding datetimes handling as a frontend dev

I always struggled to understand how datetimes and timezones worked. I mean, I do understand the concept well, what purposes it serves etc, but I couldn't be 100% sure about how to technically explain it to somebody. What should the database store about a datetime ? What should the API send to clients ? How does my browsers parses it ? Should I handle timezones myself, or is it handled automatically ?

So, I decided to force myself to understand it. Here's what is important:

## A bit of vocabulary

Yeah I know, boring, but trust me it will be important to understand datetimes and timezones handling well. I'll be brief.

### datetime

A datetime is basically **a data type that represents a date and a time OR a point in time**, I'll get back to this important point a bit further. It is usually textually represented by a combination of a date, a time of day, and sometimes an offset from UTC.

```text
2023-12-04T08:30:42+01:00
```

Here:

- `2023-12-04` is the date
- `08:30:42` is the time
- `+01:00` is the time offset from UTC

This notation is called [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and is the most common way to represent a datetime.

### timestamp

A timestamp is also a point in time, but it is **represented as the number of seconds or milliseconds since the Unix Epoch** (January 1 1970 00:00:00 UTC).

Here's `2023-12-04T08:30:42+01:00` represented as a timestamp in seconds:

```text
1701675042
```

### timezone

A timezone is a **geographical region where the same standard time is used**. It is usually represented by a name, a UTC offset, and sometimes a DST offset.

For example, the timezone used in Bordeaux, France (aswell as most of central european countries) is:

```text
CET
UTC+01:00
UTC+02:00 (DST)
```

- **CET**, for Central European Time, is the timezone name
- **UTC+01:00**, for UTC + 1 hour, is the standard time offset
- **UTC+02:00 (DST)**, for UTC + 2 hours, is the daylight saving time offset

### UTC, GMT, DST

- **UTC** stands for Coordinated Universal Time: it's the primary time standard by which the world regulates clocks and time. **You can think of it as the "base" timezone**, onto which the rest of the world indexes their clocks.
- **GMT** stands for Greenwich Mean Time: it's the mean solar time at the Royal Observatory in Greenwich, London (longitude 0°). It's basically the ancestor of UTC (and can be considered the same for simplification).
- **DST** stands for Daylight Saving Time: it's the practice of advancing clocks during warmer months. **It as a direct impact on a timezone's offset from UTC, as it will be different depending on the current date.**

## What does your date represent ?

It is, for me, the main thing to understand about dates:

**Depending about what we talk about, a date can either represent an exact moment in time, OR a date and a time relative to a physical localization.**

Here's an example:

- When I schedule an online video conference for next Monday at 9am, **everyone that attends it needs to join the meeting at the exact same moment in time**, wether they live in Canada or in Japan.
- When I talk about Halloween (or any other celebration, holiday, etc...), **the celebration will not start at the same moment in time for everybody around the world**, it will depend about where one is located physically.

## Parsing datetimes in JavaScript

Here's what happen when you parse an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime string in JavaScript (in your browser or in Node.js):

### parsing an ISO string that DOES contain a timezone offset

If the ISO string **does** contain a timezone offset, **then this offset will be respected**.
For example, with system time scheduled to CET (UTC+1):

```js
new Date("2023-12-04T08:30:42Z").toISOString();
// => "2023-12-04T08:30:42.000Z"
```

### parsing an ISO string that DOES NOT contain a timezone offset

If the ISO string **does not** contain a timezone offset, **then it will be considered as a datetime for the current timezone**.
For example, with system time still scheduled to CET (UTC+1):

```js
new Date("2023-12-04T08:30:42").toISOString();
// => "2023-12-04T07:30:42.000Z"
```

### parsing a date string separated by hyphens (`-`) vs slashes (`/`)

Weird and confusing case, when parsing a date string (without time offset), **the resulting Date object will get a different timezone depending on the separator used**.

For example, again with system time scheduled to CET (UTC+1):

```js
new Date("2023-12-04").toISOString();
// hyphens: current timezone (UTC+1) is respected
// => "2023-12-03T23:00:00.000Z"

new Date("2023/12/04").toISOString();
// slashes: UTC is taken as timezone
// => "2023-12-04T00:00:00.000Z"
```

Moreover, **this behavior is not event consistent between browsers**, as some older versions of browsers will do the opposite.

## Sources

Here are the several very good articles I learned from and used to make this "datetime cheatsheet":

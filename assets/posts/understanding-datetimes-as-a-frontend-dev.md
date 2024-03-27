---
title: "Understanding datetimes handling as a frontend dev"
description: "Understanding datetimes handling as a frontend dev"
date: 12/04/2023
status: "draft"
---

# Understanding datetimes handling as a frontend dev

I always struggled to understand how datetimes and timezones worked. I mean, I do understand the concept well, what purposes it serves etc, but I couldn't be 100% sure about how to technically explain it to somebody. What should the database store about a datetime ? What should the API send to clients ? How does my browsers parses it ? Should I handle timezones myself, or is it handled automatically ?

So, I decided to force myself to understand it. **Here's a cheatsheet about what I believe is important**:

## Cheat sheet / TL;DR

- (Almost) always manipulate UTC localized datetimes on backend (ex: `2023-12-04T08:30:42Z`). For [some exceptions](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/), consider storing the [IANA timezones rule](https://www.iana.org/time-zones) the date was stored in alongside the date
- Keep in mind that JavaScript's `Date` represents all dates as exacts points in time: it does not make the conceptual difference between a datetime representing an exact moment in time, and a datetime representing a date and a time relative to a physical localization, so...
  - ...when parsing a datetime representing an exact same moment for anybody around the world (ex: video conference), parse a string WITH a timezone offset
  - ...when parsing a datetime representing a date and a time relative to a physical localization (ex: start of the Halloween celebration), parse a string WITHOUT a timezone offset
- Always display dates in the timezone the end user is in

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

You'll sometimes see a `Z` at the end of a datetime, like `2023-12-04T08:30:42Z`. It means that the datetime is in UTC (which is the same as `+00:00`), `Z` standing for "Zulu time" (which is the same as UTC).

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

## What does a datetime _conceptually_ represent ?

It is, for me, the main thing to understand about dates:

**Depending about what we talk about, a date can either represent an exact moment in time, OR a date and a time relative to a physical localization.**

Here's an example:

- When I schedule an online video conference for next Monday at 9am, **everyone that attends it needs to join the meeting at the exact same moment in time**, wether they live in Canada or in Japan.
- When I talk about Halloween (or any other celebration, holiday, etc...), **the celebration will not start at the same moment in time for everybody around the world**, it will depend about where one is located physically.

**The JavaScript `Date` object does not make this difference, and only represents dates as points in time**. It is up to you to know what you're manipulating when using a datetime (note: the [`Temporal` TC39 proposal](https://tc39.es/proposal-temporal/docs/) aims to introduce a new JavaScript API that makes this difference).

## What should backends store and send to frontends ?

**UTC localized datetimes**, almost always.

There are few exceptions to this rule as explained in this [great article by Jon Skeet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/), but it is a good rule of thumb for most common date handling cases.

## Parsing and displaying dates in JavaScript

As stated before, the JavaScript `Date` object only represents dates as points in time, and does not make the difference between a datetime representing an exact moment in time, and a datetime representing a date and a time relative to a physical localization, **so this is your job to parse and display accordingly to what "type" of date you're manipulating**.

### Gotchas of parsing datetimes in JavaScript

Here's what happen when you parse an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime string in JavaScript (in your browser or in Node.js):

#### parsing an ISO string that DOES contain a timezone offset

If the ISO string **does** contain a timezone offset, **then this offset will be respected**.
For example, with system time scheduled to CET (UTC+1):

```js
new Date("2023-12-04T08:30:42Z").toISOString();
// => "2023-12-04T08:30:42.000Z"
```

#### parsing an ISO string that DOES NOT contain a timezone offset

If the ISO string **does not** contain a timezone offset, **then it will be considered as a datetime for the current timezone**.
For example, with system time still scheduled to CET (UTC+1):

```js
new Date("2023-12-04T08:30:42").toISOString();
// => "2023-12-04T07:30:42.000Z"
```

#### parsing a date string separated by hyphens (`-`) vs slashes (`/`)

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

Moreover, **this behavior is not even consistent between browsers**, as some older versions of browsers will do the opposite.

### Parsing rule of thumb

Let's take the same examples as before of a scheduled worldwide video conference and of the Halloween celebration. My advice to parse for these two different cases would be:

#### parsing a datetime representing an exact same moment for anybody around the world (ex: video conference)

**Parse a string WITH a timezone offset**.

This way, the resulting Date object will be the same no matter where the end user will be, ex:

```javascript
new Date("2023-12-04T08:30:42Z");
```

#### parsing a datetime representing a date and a time relative to a physical localization (ex: Halloween celebration)

**Parse a string WITHOUT a timezone offset**.

This way, the resulting Date object will be different depending on which timezone the end user physically is in, ex:

```javascript
new Date(startsOn.split("T")[0]);
```

### Displaying dates to end users

**Always display dates in the timezone the end user is in**, which is the default behavior in most browsers.

For rare cases where it is really needed to display a date in a specific timezone, specify the corresponding timezone:

```text
04/12/2023 08:30:42 (CET)
```

## Sources

Here are the several very good articles I learned from and used to make this "datetime cheatsheet":

- [ISO 8601 - Wikipedia](https://en.wikipedia.org/wiki/ISO_8601)
- [Storing UTC is not a silver bullet - Jon Skeet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/)
- [Working with dates and timezones in JavaScript: a survival guide - Ursa Health](https://www.ursahealth.com/new-insights/dates-and-timezones-in-javascript)

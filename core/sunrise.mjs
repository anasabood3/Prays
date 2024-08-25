
/* macro to compute of days elapsed since January 2000 00:00 */
/* which is equal to 31 December 1999 00:00 UT */
var days_since_2000_Jan_00_00 = function (y, m, d) {
  return (
    367 * (y) - ((7 * ((y) + (((m) + 9) / 12))) / 4) + ((275 * (m)) / 9) +
    (d) - 730530);
}

/******************************************************************/
/* This function reduces any angle to within the first revolution */
/* by subtracting or adding even multiples of 360.0 until the     */
/* result is >= 0.0 and < 360.0                                   */
/******************************************************************/
var INV360 = (1.0 / 360.0);

/* conversion between radians and degrees */
var RADEG = (180.0 / Math.PI);
var DEGRAD = (Math.PI / 180.0);

/* The trigonometric functions in degrees */
var sind = function (x) {
  return (Math.sin(x * DEGRAD));
}

var sind = function (x) {
    return (Math.sin(x * DEGRAD));
  }

var cosd = function (x) {
    return (Math.cos(x * DEGRAD));
  }

var tand = function (x) {
    return (Math.tan(x * DEGRAD));
  }

var atand = function (x) {
    return (Math.atan(x) * RADEG);
  }

var asind =
  function (x) {
    return (Math.asin(x) * RADEG);
  }

var acosd =
  function (x) {
    return (Math.acos(x) * RADEG);
  }

var atan2d =
  function (y, x) {
    return (Math.atan2(y, x) * RADEG);
  }

var CalculateAsrTime = function (timeInfo, noon, lon, lat, asr) {
  var ret = 0;
  var tm_timeVar;
  var elevationAtNoon = { value: 0.0 };
  var shadowNoon = 0.0;

  var tm_timeVar = new Date(timeInfo);

  var hour = Math.floor(noon.value);
  var min = Math.trunc((noon.value - hour) * 60);

  tm_timeVar.setHours(hour);
  tm_timeVar.setMinutes(min);
  tm_timeVar.setSeconds(0);


  // calculate elevation @noon
  SolarAltitude(tm_timeVar, lat, lon, 0, elevationAtNoon);

  // // calculate shadow @noon
  shadowNoon = SolarAltitudeShadow(elevationAtNoon);

  // // shadow @Asr
  var shadowAsr = shadowNoon + 1;

  // calculate Asr time

  var asrCalculation = true;
  var timeVar;
  var elevation = { value: 0.0 };
  var shadow = 0.0;

  do {
    tm_timeVar.setHours(tm_timeVar.getHours() + 1);
    SolarAltitude(tm_timeVar, lat, lon, 0, elevation);
    shadow = SolarAltitudeShadow(elevation);
    if (shadow > shadowAsr) {
      tm_timeVar.setHours(tm_timeVar.getHours() - 1);
      do {
        tm_timeVar.setMinutes(tm_timeVar.getMinutes() + 1);
        SolarAltitude(tm_timeVar, lat, lon, 0, elevation);
        shadow = SolarAltitudeShadow(elevation);
        if (shadow >= shadowAsr) {
          asrCalculation = false;
        }

      } while (true == asrCalculation);
    }

  } while (true == asrCalculation);

  asr.value = (tm_timeVar.getHours()) + (tm_timeVar.getMinutes()) / 60.0;

  return ret;
}

var fajr_calculation =
  function (year, month, day, lon, lat, angle, start) {
    var end = { value: 0 };
    __sunriset__(year, month, day, lon, lat, angle, 0, start, end);
  }

var isha_calculation =
  function (year, month, day, lon, lat, angle, end) {
    var start = { value: 0 };
    __sunriset__(year, month, day, lon, lat, angle, 0, start, end);
  }

var sun_rise_set =
  function (year, month, day, lon, lat, rise, set) {
    __sunriset__(year, month, day, lon, lat, -35.0 / 60.0, 1, rise, set);
  }

var __sunriset__ =
  function (year, month, day, lon, lat, altit, upper_limb, trise, tset) {
    var d,                   /* Days since 2000 Jan 0.0 (negative before) */
      sr = { value: 0.0 },   /* Solar distance, astronomical units */
      sRA = { value: 0.0 },  /* Sun's Right Ascension */
      sdec = { value: 0.0 }, /* Sun's declination */
      sradius,             /* Sun's apparent radius */
      t,                   /* Diurnal arc */
      tsouth,              /* Time when Sun is at south */
      sidtime;             /* Local sidereal time */

    var rc = 0; /* Return cde from function - usually 0 */

    /* Compute d of 12h local mean solar time */
    d = days_since_2000_Jan_00_00(year, month, day) + 0.5 - lon / 360.0;

    /* Compute the local sidereal time of this moment */
    sidtime = revolution(GMST0(d) + 180.0 + lon);

    /* Compute Sun's RA, Decl and distance at this moment */
    sun_RA_dec(d, sRA, sdec, sr);

    /* Compute time when Sun is at south - in hours UT */
    tsouth = 12.0 - rev180(sidtime - sRA.value) / 15.0;

    /* Compute the Sun's apparent radius in degrees */
    sradius = 0.2666 / sr.value;

    /* Do correction to upper limb, if necessary */
    if (upper_limb) altit -= sradius;

    /* Compute the diurnal arc that the Sun traverses to reach */
    /* the specified altitude altit: */
    {
      var cost;
      cost = (sind(altit) - sind(lat) * sind(sdec.value)) /
        (cosd(lat) * cosd(sdec.value));
      if (cost >= 1.0)
        rc = -1, t = 0.0; /* Sun always below altit */
      else if (cost <= -1.0)
        rc = +1, t = 12.0; /* Sun always above altit */
      else
        t = acosd(cost) / 15.0; /* The diurnal arc, hours */
    }

    trise.value = tsouth - t;
    tset.value = tsouth + t;

    return rc;
  }

/******************************************************/
/* Computes the Sun's ecliptic longitude and distance */
/* at an instant given in d, number of days since     */
/* 2000 Jan 0.0.  The Sun's ecliptic latitude is not  */
/* computed, since it's always very near 0.           */
/******************************************************/
/* This function computes the Sun's position at any instant */
var sunpos =
  function (d, lon, r) {
    var M,    /* Mean anomaly of the Sun */
      w,    /* Mean longitude of perihelion */
      /* Note: Sun's mean longitude = M + w */
      e,    /* Eccentricity of Earth's orbit */
      E,    /* Eccentric anomaly */
      x, y, /* x, y coordinates in orbit */
      v;    /* True anomaly */

    /* Compute mean elements */
    M = revolution(356.0470 + 0.9856002585 * d);
    w = 282.9404 + 4.70935E-5 * d;
    e = 0.016709 - 1.151E-9 * d;

    /* Compute true longitude and radius vector */
    E = M + e * RADEG * sind(M) * (1.0 + e * cosd(M));
    x = cosd(E) - e;
    y = Math.sqrt(1.0 - e * e) * sind(E);
    r.value = Math.sqrt(x * x + y * y);         /* Solar distance */
    v = atan2d(y, x);                           /* True anomaly */
    lon.value = v + w;                          /* True solar longitude */
    if (lon.value >= 360.0) lon.value -= 360.0; /* Make it 0..360 degrees */
  }
/******************************************************/
/* Computes the Sun's equatorial coordinates RA, Decl */
/* and also its distance, at an instant given in d,   */
/* the number of days since 2000 Jan 0.0.             */
/******************************************************/
var sun_RA_dec =
  function (d, RA, dec, r) {
    var lon = { value: 0.0 }, obl_ecl, x, y, z;

    /* Compute Sun's ecliptical coordinates */
    sunpos(d, lon, r);

    /* Compute ecliptic rectangular coordinates (z=0) */
    x = r.value * cosd(lon.value);
    y = r.value * sind(lon.value);

    /* Compute obliquity of ecliptic (inclination of Earth's axis) */
    obl_ecl = 23.4393 - 3.563E-7 * d;

    /* Convert to equatorial rectangular coordinates - x is unchanged */
    z = y * sind(obl_ecl);
    y = y * cosd(obl_ecl);


    /* Convert to spherical coordinates */
    RA.value = atan2d(y, x);
    dec.value = atan2d(z, Math.sqrt(x * x + y * y));
  }

/*****************************************/
/* Reduce angle to within 0..360 degrees */
/*****************************************/
var revolution =
  function (x) {
    return (x - 360.0 * Math.floor(x * INV360));
  }
/*********************************************/
/* Reduce angle to within +180..+180 degrees */
/*********************************************/
var rev180 =
  function (x) {
    return (x - 360.0 * Math.floor(x * INV360 + 0.5));
  }

/*******************************************************************/
/* This function computes GMST0, the Greenwich Mean Sidereal Time  */
/* at 0h UT (i.e. the sidereal time at the Greenwhich meridian at  */
/* 0h UT).  GMST is then the sidereal time at Greenwich at any     */
/* time of the day.  I've generalized GMST0 as well, and define it */
/* as:  GMST0 = GMST - UT  --  this allows GMST0 to be computed at */
/* other times than 0h UT as well.  While this sounds somewhat     */
/* contradictory, it is very practical:  instead of computing      */
/* GMST like:                                                      */
/*                                                                 */
/*  GMST = (GMST0) + UT * (366.2422/365.2422)                      */
/*                                                                 */
/* where (GMST0) is the GMST last time UT was 0 hours, one simply  */
/* computes:                                                       */
/*                                                                 */
/*  GMST = GMST0 + UT                                              */
/*                                                                 */
/* where GMST0 is the GMST "at 0h UT" but at the current moment!   */
/* Defined in this way, GMST0 will increase with about 4 min a     */
/* day.  It also happens that GMST0 (in degrees, 1 hr = 15 degr)   */
/* is equal to the Sun's mean longitude plus/minus 180 degrees!    */
/* (if we neglect aberration, which amounts to 20 seconds of arc   */
/* or 1.33 seconds of time)                                        */
/*                                                                 */
/*******************************************************************/
var GMST0 =
  function (d) {
    var sidtim0;
    /* Sidtime at 0h UT = L (Sun's mean longitude) + 180.0 degr  */
    /* L = M + w, as defined in sunpos().  Since I'm too lazy to */
    /* add these numbers, I'll let the C compiler do it for me.  */
    /* Any decent C compiler will add the constants at compile   */
    /* time, imposing no runtime or code overhead.               */
    sidtim0 = revolution(
      (180.0 + 356.0470 + 282.9404) + (0.9856002585 + 4.70935E-5) * d);
    return sidtim0;
  }

var SolarAltitude =
  function (utc_time_point, Lat, Lon, Alt, El) {
    var jd = Julian_day(utc_time_point);

    var d = jd - 2451543.5;

    // Keplerian Elements for the Sun(geocentric)
    var w = 282.9404 + 4.70935e-5 * d;  // (longitude of perihelion degrees)
    // a = 1.000000; % (mean distance, a.u.)
    var e = 0.016709 - 1.151e-9 * d;                // (eccentricity)
    var M = (356.0470 + 0.9856002585 * d) % 360.0;  // (mean anomaly degrees)

    var L = w + M;  // (Sun's mean longitude degrees)

    var oblecl = 23.4393 - 3.563e-7 * d;  // (Sun's obliquity of the ecliptic)

    // auxiliary angle
    var E = M +
      (180 / Math.PI) * e * Math.sin(M * (Math.PI / 180)) *
      (1 + e * Math.cos(M * (Math.PI / 180)));  // TODO use macro DEGRAD

    // rectangular coordinates in the plane of the ecliptic(x axis toward
    // perhilion)
    var x = Math.cos(E * (Math.PI / 180)) - e;
    var y = Math.sin(E * (Math.PI / 180)) * Math.sqrt(1 - Math.pow(e, 2));

    // find the distance and true anomaly
    var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var v = Math.atan2(y, x) * (180 / Math.PI);

    // find the longitude of the sun
    var lon = v + w;

    // compute the ecliptic rectangular coordinates
    var xeclip = r * Math.cos(lon * (Math.PI / 180));
    var yeclip = r * Math.sin(lon * (Math.PI / 180));
    var zeclip = 0.0;
    // rotate these coordinates to equitorial rectangular coordinates
    var xequat = xeclip;

    var yequat = yeclip * Math.cos(oblecl * (Math.PI / 180)) +
      zeclip * Math.sin(oblecl * (Math.PI / 180));

    var zequat = yeclip * Math.sin(23.4406 * (Math.PI / 180)) +
      zeclip * Math.cos(oblecl * (Math.PI / 180));
    // convert equatorial rectangular coordinates to RA and Decl:
    r = Math.sqrt(
      Math.pow(xequat, 2) + Math.pow(yequat, 2) + Math.pow(zequat, 2)) -
      (Alt / 149598000);  // roll up the altitude correction
    var RA = Math.atan2(yequat, xequat) * (180 / Math.PI);

    var delta = Math.asin(zequat / r) * (180 / Math.PI);

    // Following the RA DEC to Az Alt conversion sequence explained here :
    // http ://www.stargazing.net/kepler/altaz.html
    //	Find the J2000 value
    //	J2000 = jd - 2451545.0;
    // hourvec = datevec(UTC);
    // UTH = hourvec(:, 4) + hourvec(:, 5) / 60 + hourvec(:, 6) / 3600;

    // Get UTC representation of time / C++ Specific
    var UTH = utc_time_point.getUTCHours() + utc_time_point.getUTCMinutes() / 60 +
      utc_time_point.getUTCSeconds() / 3600;

    // Calculate local siderial time
    var GMST0 = ((L + 180) % 360.0) / 15;

    var SIDTIME = GMST0 + UTH + Lon / 15;

    // Replace RA with hour angle HA
    var HA = (SIDTIME * 15 - RA);

    // // convert to rectangular coordinate system
    x = Math.cos(HA * (Math.PI / 180)) * Math.cos(delta * (Math.PI / 180));

    y = Math.sin(HA * (Math.PI / 180)) * Math.cos(delta * (Math.PI / 180));
    var z = Math.sin(delta * (Math.PI / 180));

    // rotate this along an axis going east - west.
    var xhor = x * Math.cos((90 - Lat) * (Math.PI / 180)) -
      z * Math.sin((90 - Lat) * (Math.PI / 180));

    var yhor = y;
    var zhor = x * Math.sin((90 - Lat) * (Math.PI / 180)) +
      z * Math.cos((90 - Lat) * (Math.PI / 180));

    // Find the h and AZ *Az = atan2(yhor, xhor) * (180 / M_PI) + 180;
    El.value = Math.asin(zhor) * (180 / Math.PI);
  }

var SolarAltitudeShadow =
  function (elevation) {
    var shadow = 0.0;
    var tanEleva = Math.tan(DEGRAD * elevation.value);
    shadow = 1 / tanEleva;

    return shadow;
  }

var Julian_day = function (utc_time_point) {
    var year = utc_time_point.getUTCFullYear();
    var month = utc_time_point.getUTCMonth() + 1;
    var day = utc_time_point.getUTCDate();
    var hour = utc_time_point.getUTCHours();
    var min = utc_time_point.getUTCMinutes();
    var sec = utc_time_point.getUTCSeconds();

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    var jd = Math.floor(365.25 * (year + 4716.0)) +
      Math.floor(30.6001 * (month + 1.0)) + 2.0 - Math.floor(year / 100.0) +
      Math.floor(Math.floor(year / 100.0) / 4.0) + day - 1524.5 +
      (hour + min / 60 + sec / 3600) / 24;

    return jd;
  }


export {
  fajr_calculation,
  sun_rise_set,
  SolarAltitude,
  CalculateAsrTime,
  isha_calculation
}
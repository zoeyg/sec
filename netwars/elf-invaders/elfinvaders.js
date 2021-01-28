/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
  var initializing = false,
    fnTest = /xyz/.test(function () {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function () {};

  // Create a new Class that inherits from this class
  Class.extend = function (prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] =
        typeof prop[name] == "function" &&
        typeof _super[name] == "function" &&
        fnTest.test(prop[name])
          ? (function (name, fn) {
              return function () {
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
              };
            })(name, prop[name])
          : prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

// ###################################################################
// shims
//
// ###################################################################
(function () {
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function () {
  if (!window.performance.now) {
    window.performance.now = !Date.now
      ? function () {
          return new Date().getTime();
        }
      : function () {
          return Date.now();
        };
  }
})();

// ###################################################################
// Constants
//
// ###################################################################
var IS_CHROME =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 640;
var SPRITE_SHEET_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAAlBHpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZtpkhy5kYX/4xRzBACO9ThYzeYGc/z5HjJJNim1zCQT2V1VzMqMAODubwE83Pm//73uf/jTUvQu5dpKL8XzJ/XU4+CH5j9/Pt+DT+/r+5O+v+Lfv73ufv4Y+W58t88vyvm+f/B6/vWB+r1SmL+/7ur6/BDb90LfX3Dh98d0Z/28v4P8Xsji5/Xw/bfr3w+M8pfpfP+P63vZ78X//HeqLMbOXM+ii8eC+fc1fu5kn/8H/ye+BmMp+dr4OVrnazb7x/Vz/2oB/279/I+R2a/lcJ+V/b6h/LFO39dD/uN1+3mb+NuIQvx55/jXEa0Zrv/rn7+s37273Xs+sxupOJarfCf1YyrvJ944mfRnNQp/K/9nfq7vb+dv88MvoraZ6nR+8o8eIit+Qwo7jHDDed9XWAwxxRMr32Nc0d5rzWrscZlCkPQ33FgdcdhEJNoicsbL8edYwrtv1/24WePOO/DOGLgYMf79r/vzhf/0728XuldpHoJvn3VKL8BR+cUwFDl95V384hsGlYl+E9znm//zjwJrXCm/ZW5McPj5ucTM4Vdu2Yuz+ex4a/pmZKj7ewEGw70zgwlGBHwJlkMJvsZYQ2AdG/EZjDyS9pMIhOxy3IwyJrNCcFrUvflMDe+9McfPy8ALgchWrBIaCoVgpZRTod4aKTRctpxyziXX3HLPo1hJJZdSahFOjWo11VxLrbXVXkezllpupdXWWm+jx27AWHa99Npb730MbjrS4FqD9w9emHHaTDPPMutss8+xSJ+VVl5l1dVWX2PHbRsIcLvsutvue5xwSKWTTj7l1NNOP+OSa9duuvmWW2+7/Y6fUQvfsv0tan9G7l9HLXyjFl+g9L76K2q8XOuPSwTBSVbMiFhMgYhXRYCEjoqZbyGlqMgpZr5Hc2Y5Msqs4OygiBHBdELMN/yM3a/I/W3cHKv778Yt/rPIOYXuvxE5p9D9JXL/GLd/ErU9HtzaC5CqkDUFIY3yA1CuLxlOKHfsw30Pi7E0ntnOCcWs83sLc0zw+Cx/fFvX2k3j7JvLJWoHQOWdq9Sxztyjrj1K6aftk0rhSrMxhbt3S3w6Wb98MN0TYz/xjthn3q24G5hyWjO2uZjePGuHPXueOTPivlaZnUU6BqmV1Fe/edzCkOfZfi7rR0yVu5utzQQkTsbg20hvQfMkbjmms0mSkGs9vtcjyGJaNaxdLRWCwgcziXQTUBsHmXrmCCwoK3RuPeHWBjkmRnkC0epztUhAGMIiQdrKs7MUJKs1pnOSERaiFm4ZO19PUM7YtnI/Rb++u5fLByY/3Boqs7TS9p2ztLAZSTtzsQA7jrOqa133bu3m1gLBT33O7o28WaXka2Vf8q7fA2iNdD9s1E6Lc62z66p7jDxvcyMeSjHq5qXceEYMTKAtYpalI9pB4SyyCqq6mzxlWQZ5zhK0OnIbZOfpOzoi4NFaRO5FilGeexsDyuWc3QOjYan5xlr2S02OqyGcEdAUK1Ty3fKCaWdMO7bix9EITGNZx1+qg0Un9tcTROYVyCt/VDRZCQsrxr3inmPssdpZDuYbkzI9J+XQYL5zT89njHriYDHyXpm4wO7d75FWvZGM7rnsNaB/bkA1zXFdsV1mrCsxbtC9bamnOGseTIdsOJF5LuRTpsQommZ+1A683X1IKeJpeawaXEgU6Q4VkCGmWgmmRf6lDIjMOqhRMmgGO8Nu8RPteG2We8Em6uVkAtUyIuKSBRSAgQe3xjLtzAJ8kUNxZ0ubEa5Uyx7ttsIlmRlVxKT5shJiAEVMGUQwexH7SHYdn1ogiY6vIZ+9QYHJUgyrLcelHwsww6CVEskqRTpVP35RYdVRo+PUgkwBND2Lcf24lvV1sS4hlnaoHKJMvBrISHRLimQNVyo3JcoHODdHpKwyllvHaYUymZvoU8Rrjh1I0TuzUZpzR8Ccyq7MNuW7LpfLoU9weJL5jrms7vly0wHDKvwzqcuJFqp+UFq8neEthZksmodc6dywkH4T3oilTJWSq8SisRIrCxT9ibZPAA2tFZsCIfTDSZ56I72YY9839Mq6wi2TLDmZKhi9Os0PfIF5LLUSktLNwJ2MFSDPjpJ63cX8YZU7d42pU6ikLNRHTYPOqEtjalnKqqOwUmItmCYQD4rDLN1CTZdS079nrkaepQk8cKsdiH0htXIFI8FQB5CKP8j+sevcAAM8wWIsanHM2iaBucDkpOoJCZgYAqWQQbvh84KLuHs5zW1jAkS9g+9TBJKLCqXUFWaEj86Ot/lcoFOWLCSyiZ9P80Qh1EFMAdY8vBMXtXrOBN4YE/nb883ckAQZJ68Mu8oB5CWVVy6LlSGUWwBHUABuB2FANHehn8rqpa2q9wUEgm9P2VrKBDDc7oH9xvB2EjcVMkOEAnvVkKi8pjK/zlImV7LqjEvBbJ75bTACLopp9lovzHfRG6sqL+c2zacxaT7PvBWICB6Ji3tVhqEY7poIe1+pGSo5kfz99L5qGYSA+UA1ghbEvZFwXNSDM7yNVSH8u6sqSsxe4IaSiWgnylofZzVZO+I+V9C9qdFVuwESYBzYM/bahCT47QT8ZFqEE4E/0mhhRuLJqCAYRGAYdTnyvldqVaRVTRAcJviy4+ojk9DdoRwB8EuQKksMb7GU1qHfsHdHWGeAhwtX2RkUCHniLyDRG4UR1yCFCvdKnjzCJADgXCVVnycllNBujSLr5xLZqinhulphaNyDeJUNzqDOuuG7DmMPeTlCvjoCjzTJkpWFe1JcMU6fVY+HVG5gVhe3C/RXNl0asAMV0E6nQTKXC+35aovPowfv1FSpbYYPYiFb4gKocye9akR6Uv0Ds8ynMH5hkRWEIxBQB2sC9+LBGFBvQ6oqP0QmlzcJmZo86ajgOEUHCC1qu+181n1pxXjGGQURobTrMbOAi0sHwBQYQdXmC2JA2oB4BIOI80CqIioG7GJQGKkLazcIlHRwWYlcUE1DShHjcqJwa23PkpI8iNkJHWxUuPRN55ohAw4jwcVI2kTc0F/FnQJqSyUERgTqH2q0Uqq3NRuBRGQQaFwSTeAfWa88K7k1SA+gjWwqYa/eHVRPIhyQtKAfZ3oRAaEDyR2GxFgrrMbAquEJDK095H/BZRZ1QasZPXpR/sBGGKRrBkkOwLILKCj4JgrMUQoLAk84B88VEHSF4KF0AtcvFiu6lUHm4ND60DfxTBLppam6yeEzpDMujMKMluR732t1XECvsNXRxwZy+MgoaU/BnR+bHRnYQ/ijkmfK0n8d3QezJhAoA7SCxkUWvqyrO6CEA8nZpCPnXA5JOZjuSCzTCihfUmSmtgWElCiXGwUCx25sYxlLgzkYmWfh0TSBLE6NBVzya9RhBXSgGi6iLY+W0ayMJpJ+CT66IBuaD1HaLvJqwd+1g454LyRz4VLZnLdSAEME2YtazjuC7fAGECrhcZFfqnH+J+5Q8CL9ENwL7rsd1EIApQYdSYOHZlsVTHnKw6BMAqGFkBPQZhh2fEzfxzyUA+kiMs4iuViJ0gze7OgKV8nrNQhCl5AmMRdrLapM4uxXJZRXC7o8aIpbwQJQnniYRqXItYAmuGwU3MJsglNoEowmw+Luc6EouSZ8U6SARBfUNMXeqbEyBbCiAmQ7QS19JEdGk3BYnE0SoR4MELMFyaMJsCVpsOIQxkDv9FckZL91JgpwcQlJki2ScgCEBLZNL4ZhFClIwbLa6MSWCpi0NhomcQ3uidgARE6QimjkPBJaNqwcR52hBgj3ZYUpeNifn5QylTsHgOvIZXRw26P+GS8Uc3A16D9s3t5Av7jE8Uo+sZCqCHbcM9mN4IAKyA/AnMS/HdomY4GUQDWyBhgo6IJlxoaCFPwzaWsMT2zSKHPgjqR3gSJ+KRtO7pSUWd5EniWASKWKjUMCo5wBMoHjFVRS/UQMqB+4ZfILzCCB8+PltcmPPlA8pTN5xDCKm1IaHemOEOZaKrIrFx6Ow0ulYABKBSiSCCSrbtE1+6PYM2yOymPZUH2wQ5gXK11UuiiPlojfirc7jNuNOOeCHQBZlSRo9o2ARSADVMdvMaoiSFIt5Bm+WFrKqoxZJwyomFugo3skI5BCFWAqnvGgKQYwbDKvTBheETvtE7nBkXWsOW5TiRiYzULCIKjaIKVecpgvuBA05cPaMhLsA0hIOSBCMtnAypEdmQygvs+kDKgilhEHyxo1vHGFWsR+fA7WLS+5YaErr4i6GnPjdlCUKz48JqC5kLJQA6kYpcCPi4R2VOlXw0Sh5hHzCx2Byj2GQs5U9GNilWtAwa8gvc70IJHytJMQ0zssyappoBcPQoyps7QSpbAAiUpJdjDjagFWZq1IWhApblCIj9+x/PAiAlx2EE5sCV/KlvRkXbM2VwAigB3EXhMWw6kHUZrHKyGrF8Uk0QPSYfwAyO5EcVEqYYC+VM4VvWBAyRtt1ky0HQVCxMYl3e6SZwcWR2Q4iDgmtlGMbTvSYRN+jFpRuthNhTzgAqijLeUr+az06Y86EbNMeJNXg5QdUmgYd5bRMYkCV1FacrbQG+RNPks1oFeg0cLVqLoAtV6PIOEf0D7LGkmbXqijg6jyzmAC8OvIqZIFct4QCrwUguaC1K3YBnxMxIVSDQPlVYIwihv3FqPWkOVy0LCULMuHrW0D5VIEntsvoBqdgJJRVYeB+IogAXAMer89Osx0bsU3Fg4RQcaPQHGdsCmnC7DLRiOiNRGyFNHIwEhk6RrKfZmEaUEagEuJEaDXpIYQo5Q7An7hECxr58n8ZBm9tgdAiugfw7EuXckFQ9+3W1Ym7tJHaKIP9J1JROANr4GWyEpVc0OunZTqxU1DPxYxrSQLVQq0A7IAdlI+EX6hfY/amzHAf2OdUDob2uwLfEfzoJBqF/h7Lx1J8nOd0XGRAwGHm5hAKfa2yGzgRy0Mh0tdMqfawBPH4z+pBDS/7CYXwNLvffBcgPohIpIfoAu6vIHNkirHk77F+X5IRG3AVIoCblRFUHWkrRWMLWL44v7fCdzRljqlQTS0rQSp4eyqVBJr1BFeis/CpWUuAMci0ZcVmB7DgWo8qUobIi+74QtafDnONZE4yC8qCWe6HfThsa9A/KJCG4j8oI6h+R59A+1xSwVAZy23dlASqYIGpg6RJ7ISsaPgt0MM44tgXgAfP1U760UyQzaI5YEdgkP66O9LktPBfPEOBCwZDtzGHWK8M7pUUEjBpGpBsoIAqiY3BNMjqm7Q4qG59uOdLUNnF2DEscNF2ubuxIgrwiKQKW8A+dGYZOLURg+siij3T6AjtR7mC/wmVZZZG7AmVLgoeBwT0QGPwAAEMGIUJhnaQFrzIkHRd0XfuRTpMUhVS9gaJkGxqH7whCz5tqjNimPZgWAsd+0bP0KykeFXm+tALPkwKP8JvcGAB1+JycMuXbQ1bNfgoYG18z1sVJwDdDVKZtYVy9RZ6ktKbf5QLkBdovZ589R5gLZWtf2B3A34fsoiTrRNDtktLF2qAizB/qJAUYZgzEYvSimiTiVfvXAxZrnChCuNZDdlJZHtJfXaQrHhmnAzuLBjR/5bKp1aMe1yUsX2CBGSRvEPwgAVKbIwhjiwYWuTnKYLiG5lP/7cP6uGGJ7Ae7ieskXvCKNnm4bpBy3H4QtKBF0ftXtRuCTl6s0N7+ccieREqHIhMBYuPa8MZKcNEH7Kg+vO96oU3ce8ZgSUThBE5o6y0wHIMu2sG6lTsJ/L42XhtSqzTB5AaeOSeciDjDsibyPOKFCvnvJ9StKRjAgVIEpWD0Qj/agA/DvF4NG5cD1qErrF4Xjkf/OmpQzTJ9kiQ7dmKGY6qp24VwDch0PZSu7a1v4XLn4Te/lFgH52Yzn9OBJA/AhOyV6BF0Bhs+guanKRwywMAS6AcYJd+CTVgkOBQQqUuQEP3MORunybbXjrxZzExQjwmC76KLEaMhIZhTnanLi9Khk2pdpJ3be50kiKdDqBHIapTxXBhFJvsnFoeliET29tg6Mui9j/YB9FHUcnu1pgSJwKHBSzOLORtkaUEd9w9kKhae+1atcvDiaatBNqwm50QBpcGH70BqRW5oD4RF0brF240sZ8H+3CSfyCWjgWlsWxOlho83IxUI+WGfT1HoADZ3cDmWBiI8Fm1DZSYkgdaRjj58jB0tTJ9gRqkfbIXQ/QkCUwY9Cm+gQ8qhhxJ+2hAdoDgvZ4M/0CkgSkQlUOzgNF9eMoa+0PX+JdkzyiBB+6senQLa6gbopFnvKNtyd8Kw4RHdWgNdZDgMTYcJCsTz9IDWwEC8DNgBnoVLsIADxagUvdMLSn1REJGBeVrbIX73+IhQ5ZcDUOw+zDSsglQQtyUVqJN5BcQf5EHJ/QcHg77p5nowqkqTxsE0OeERWMUVsOxECa+IETAotO9Sw4dYivLIQTVFk6DkGSIUEFn4hRPGugnEhZSkmYrfe75jt30BZLgolJc0SvdiFgwyoEqVOnW1KZaBRoDdPPRMHJnk3bVroQ5j/gjhpVg2DUcSGpkKWGti4iqtxTKoEs19kEpQd9nKnX3u7lRZTBUwvwQx9l5K20ThENwihKEjSD+BZQ3DiwqdMb2bGlu5GFOpyoaEyMgPYiQZ4dnfb5KLbbYdzIBxD4QKAnR/vSVoMgHxMPnoGdSvFH9wAlUcB44DspYlbADZ0HXpIeGMV+VdAHgqBAEAZL5xxW9+JnDAzwNZC4QFqUvfYESZv68B0s43KARSM1zqq+3R3JE3vS4PhuvZp2kFEpNvXxgio/NSGKuqQi6UC6ECXt+lEQOF8f5X8htLwaw0b7IyMmiHh90B6W/+zelbPeQcUiDDrfQFFfbT5oz59LgbCkiL/aIAVKOktFOSV1AKFId/WYBs0+w7BKT3iQK1JlxsroCAfBDurCzWFrVXAc3WscgcLPAweGd9HeNY4X0aftJW7JUlkgS5vqZtluHtTsLqJTsLHwGcDCGLGcKx0mrQ1XMgxbD/8iHBaWANl/dLoksltTKAvaIeXyQkSkd/Kmg16waGDQ+0QT6HD3VGFK004KQ0VI5lOBYjiT5DkUDWxVK5CLUR4uee29bsRPYwQgkw6r8Hc379IlwvnNJBm1hoAMACsRhwACeVgh6TDAA3OMWgsk9BMa2r1H1nqPQVEJYK2E1who7KlnfGpleMeRLAorEoLEDwXCqrqqDZxONlU/tSUZlzams07A0FpIgLMGEiDj24mF7DZahq/aMgMhLiouAbHZdXWraCO7gWJqbpiYVEgQoYvNwbuMdqZh/eV2DUfIiFlkMS33yuqdgAzIbNSB/JpHQQX1cmVsBKuGFLfQdcDLlA4qPOhcNXf4rLCE0D2ly/TQli+hq7uSu1NdDcCxTk5IrGww7ulkOAALMCB2ABXMK5ZvFD4HByiVsC82KcegAxaKAfnFffLFoR2vHJeRVlIb80ld0+hasO3RMHEC8uAnTLKSTo6wcoil5PBBA7IGtuRSmIWOQousu86gtPeokz6yBXGUMvxIqWKa1RGwdVJD9pOZobmovZTMWma0Ost9ZI+lXTAamL/e7cUKDDuq4ayUBXOrZArOBhxGzVHCDqzBEQdZ1KmNG9L9kBr7Qio6lvc6uqZEUHLaX24olQGhQTue+lyZorCBfFQfW5G9XEP793wGmWHaYAWTGMnbKyacTOptgI/PRhD5qt1D1rOFQaH646imDDMo266MDa4eHUIocXqYhV0RlCBtAC2WdgCWiaDl5TE4SnFAKshm6YR/n+sN7SyPANKr0e40nVroxHy9ZgFWCneJQhLUyHx1g2QGpnUzIdLbgeK7DZ0BWFEzJRQTdAwpSYf8RZWkho5FMmtXBCuBS6JM+0Wu8SYmeNThclkjhsp4MUtXCoZoyl9TZnAqkF106jQXEATGAFeZxaGYdVA733mSyTsciYga+SRz7RQYCNt11rfIg4PBQl9sbYTC9Ci/y2CJmMdDJrVxNIlAExmisxFWYOxA9q7HnxP1sMFAgQk8yIyuWsl0MC83h9eHp4EPps8qF3lKGTQSMjXgnxRCnd3e5EFAdYlWnUQwQiWijnJIl8WnU1GagApkmZiow3AsS3ZMRS0v2u567TuYhnGkKyHbpuN2bdkgd3AlmHDZQTXMNO2XyZZstehsO8hjFgRYv6xAGpTlgE65SkUNEfPxKB6g9bxhe12N+U8Z7NuDdhFF83PujqpdUCT0jQM4YhbFvE1UO+z0FlyHX76TPgmaYiF1UoacCzrqo9QIP9xdnU5ubV1peaIPX8+k0y21VhS5P9gPTdFFWGrb0UEkMX2NBo0iDjpSiMgFEpKKpRAqn0bFUBRINhAP3IKv0wjqoag+9/QaFtGqYhzGjUhXyyzgixMe3S0kF4aZ1L6HqkSzq0zLO5onwjoaNO1a67xFx4IsGXhgU8xNUjWdg6lnAk8Lu6toSHZWtWEftD8/pOGWajhAj+QKXAhSGxIkIdyV2TGipchrFCqc5NQ7TN4Y7Brj01S1AG2ooHD76+rBpyHxhD+IS1xbuFsNPOtQkeoCQzfM1V0TYmNzvFqbVfZZXI3jIOCsArRRmAzJqFP0HLQzkUz7G0BH6qgN5ITOEZ3F9vZj1Ga5M+oAO3/RCPhPtY1pm+ltZmsLCxFF8LXXhabLoNoqMBiIWXtyOu1Rd7LnB221iTOA7P3cB0gDd2F+tAUCMXkoGR5JOh6Ewor0kTaJd4n4tbEiwsl0Kgv+qUMDxUnNA/NgCb+henk/y+ffuVfXfgGlRLpwvRV0Yrava7KCIAp5r5tF7Xaog3B3Mhnw2/gkRkO8KxYR5gC0IWFqFpwDksRIXDSBR8pYdbr4KOdJsmX1hOG0nqzDwlDsBa1T1FW8EbZbdtumJ3xHvUMyXugjIhqFMkBNRJfgv6kPbSdfxG3QprmMv45JmzZV+g7ythdcmGG0t/uOV1JPBGGglAgMnoGRb+pdQmepm+xuFCO+rWgnGra+6mTR7uvR1vlQuxrXA2qPyzoNKznj7o3FjFYiHmUJTV5/E6tLOA8D9DroHIVQRR2eZzgBfh5wpYjaYd8r+gBy9uAwWNxxkNoZnVIIwjXwTUIL5ha9HqlxljluEA0JDgelWlBsa7EIPUHFpuMbHalt7QjA2ulQ47gJSaQI2CCH/WjaKvcbn/q7GXU2/w0zilmcTf2TlJK9nUVp66rTEkdWgd+TF9YuZDXTA8dIlgV+I+8FsVk9qxvzflE4xYbOq1BUFeZq6oReLXmmFjBQR7kOC+hAserAnALDNnTee9XxkykDTE0jRjiydxac1OgCQULEcuVYUat36eCYeEyJ3wvf4Ivj0uZHkD8bgI9OoqI6qRI1A1z7qs4VYnDURuKvS0sdSjq4hVSampXkk9UIiPfLKGvdHDFM8pP4U4SZblKTIeM/FNe1wPeLXQcHSWSqosvNkmZvqxKdBKRGqYauww9uf6WQ9bv34jyv7SNr+x0l4i7qmxpWG57+67BR0sm3qXcBGpYrAXupKwqPDLdjXW2vcsLwVXtiHkmCYA+tC+QwQeo57zqvfPIIkpAegoYoW9y/Oi5EebgEGTQd11JFSyID4nHQ4MVdm8i4a7KYUoQG2KV9YKh0vOcYKK0TiCiyCgMYuYjmp3VaxJHKcv7g+05+Z5BSscnXEm/YFZkIfydVyZC0B31x/7w97eAJyVF7yTLEZDbqzA2JPgzY3khHU78KbohZ81tsRNXeTtpRhyRwug76ouyZGikmw8xy0NoVMJdiy8DfKtPLcLN6eAYwkBqFK3DLTUuRtVt6oEMcPwlH/ENqUF4OaikP2qwDA9Q3CWYxoXXIp6kjsMA9uWjJailVbwVqCiArEYnO4Fm4RTUyJnVuISawohSWDrb5nbGs6iusGNXIJcVlAVVLQsAT6oUjiEwe8BtqSITNcovQKNSIYB/pqQt1fwLpXc0ocAgx8pjOBHxRMTo1yDP7qPOCLUDTETgWC6uix4AQSdBRmPJVLBGSQ7sU1mA94qeOajXLBe0Ev9YldIZ2krmmDrAPYAABmXpt8nFVp/BYb1M/LxMARdT+AC9DUwWJvihLYjd2wmtv8TTgYDpwGuto1xVt1rt3ocQtQDyZe2k9FoA5lXkXyoQTtUNE+oDsR6ciqAe0FrJkRx26Q+8eN8nU0EoBM/+6BIY0sDgIFUXOXPXGVNBG6IIT7l7LwqsIefQWimZMQsz0sZQ4SFy/Di8pdMQCPlTtqTHqiJrY+XeQwvo8+scR80rVQW2uSgyJ+0QNJHNkhPWmmIYcAdIGr4LgWydnYKw6ROXwKS2pooqRDRh41pBs1R796D6qx8gFbOPlZ2zFc67qqh7wubTC1RQa1tOXfgcCFpse/VUrCnyOg80rgW1qiOuCEfXId7RDSRFnRlodjE7IR+1Zog/0H9JBHTLoWAzna0LG2qhbtKMNeeeVrNFOqjYTO6ZBxzXvEkcHUO8I2ry6Jw8AfIrMGqIMKGI2ZAp6q73j3exdnmoLB07TGOo60nw3PKgeeowDkrOTe0hgjGfFH91o6vHf2q7NH3lQJAHcml0tKoDfUpNJaVHP5Ji6kVdQeyd5mLQjTjRB8fA0Zbg1Aw/ql9wwBPdHH7HKxaMid5Jzj5LLZEyrpNvK5O9CR+sIGlmjDqVIaiEf+A0qRPc9Biyejqkpa3F5JMjFPsb3cJ+kLSYkmiwl6bzgVggc9bl1/QXCj3cQLI+OgYAL3IVfMSiYXgyHjp2JSWW02nnE1GyfnsICRbVdOXpHnujMmwyo5J2eJagtSENykyPjnXVwVbWxYgJXEch7ZMDrGaWKAgTVGws6RA0Yrp60L5JZKIYCi/ArVdUzFmqcxL0gBmTLrnqboXNK8qp9kk+xACgcQEtm9B3SwBuFki3m3kEMVzt+aRuw+GG1qq89ToxeAnv0FEZuamcSj+DvPMUAHVHGKNFY1LbaZbM6t6CwdTKrlgKgxPPpDE3iIoceCyke76ct7QjdhUZtjOH7azvnr+JwtguEV5u22zMGnbloV7tmWUCqFDhKhB9v0XvWOefnUEfnkdrjVEFyAZg5uaJH+KjN5/Z74sdJpW1l3AQsF0ob+mLYo7BOIBcAeyLsxSpRA21Fdb+9bmi10yOMRTroQ5AIi4BqvU1oofa2qpkENdh70Ig44quJBNLvNIxP1GEgIgJWIf2JsKE21zufmVK1kcpAQqkf0rZ6M2zHdxgcpf7S2kdjwnFiaveqTrZrVpYtvqa+NNV3rV48PWih1b/a7dbDcPjjPBq/9Fq3pE2t13ODVIKoHAK/DO00pAQ+kq8ZGkbLYQ3xmuM20DUVNDJs3ajihsTTkdoWkMirlqy7D3ca7EZyUk9HDasoKqYPi5fWMaVSd/EdJpLJgnfkMrULuy7JMJZvAgqJEamP83WYoXGztldHbn6RASYMegehId4G+yYhiCajJvYcIfWkkxOp9Z22To4ho8CaDu1/NvkHQ5WrqX0FPZhLFKqOXCWWwUS17ayoo5+Ag3uXxkYZ4I9RIARFzURk9+syPNrzKwNe0aYTRVzHFNtOA5ua2hD1IKcwA0FDEOFKp93ujdrU9qMIJwzPDAYLCgkVrKH6jpnw6wvHsEpwRnXJ4JxSEjfX1fXAgJHa3JVy0sGF+qa5pTqGUVfU6oW8mRWy/0IMndRICPiG+pzq8NSzLAANPsWBG9rSxWBAFHouQ29MnYzQ7i9j09GFJa/dUzA/jdWCuh4nMkX9bzI/N6KPKDjcIspwM2hAayntYHvuGLG70+IkBkSYSaHDTC3uALX/kBeZf7WNbMtRF5bDKl2mAG+qipvaW5t8LnbgyzMtBqvDUF4xyjnVJ0u69j/L1laJFWoNuUeS4R60i35foz4gGdQxqk2tjSVcOFEUc9HGpz3Tr5OVqidThpTcfvuQG8jXDgVs8rICnenVp7rUSIYpx4y/EzjiyCp0PZ9GuMmlqM3x2jo2ryD9ZtH5zIKLmn+PB3j1U3hktlp8Ucc6J+BmRc22GyGNTgBOT0VFaS/aNndp+DXkqzaFgdurFSAbGXOtejKHJQP9t/bEgV5szWmYaymF2BFqaqjVAxBkaFpOzU/oR1PXObhBcUN5wDjW7WoHCz3XteFH2erBBpwD9uPzfOKAN0rXVr62faAhMz0u/Tnj0WbB1Fb7e4qlTUXzSj99GsBh+lJ8VLd6fZvruFH1uNQFjEzxsJ7HOu/RQ7UrsbpvZ5dcqyuhY9PbBMIg6EkyC+AU6KZH4LAxR1I6u/qeLOjSPcwjYerVTg5uY4EBXXVnYAFtt4exoiQ9Tv0eNfV6MsAAA4UX8Fc1Fm0YSMwiDqCJJjjGMNc63jExS+1RSXp4EE7XQ1SMjHCr/z2AdfwOv5bUS5TRZ/AGgL0Thpj0LXpOVS36V3tTfsRY83suHrsF21Y9w2Hq1VebimVX9GgMF8bvQazaMZj9baGRHEvLUYU7kFtQ3zaGakur6sFOAqhzZMxCIbGcesuFa7D22mrL2s/nQ6zQgSx67FtPROroFinXVwh6hJXyyN9+xP6cisOY6LD/ojpSfi9d8mJJdADKR11fryt5vn6WrkP4z4MfwIqeHWahXqusG+8NP67m/fd6Og35XE9NJj+vpU7kH9f6XIlPvGu5X4P7+7H9dq2/GZfTNhm+CfhMiHHgFDgBuLbHdKKCRJZcXA1aXoorq/FQ1l8Pw4Mw3v0/pAgR7Onb6s4AAAGFaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX9NKRaoOVhBxiFCdLIgVcZQqFsFCaSu06mBy6Rc0aUhSXBwF14KDH4tVBxdnXR1cBUHwA8TJ0UnRRUr8X1NoEePBcT/e3XvcvQOEepmppm8SUDXLSMaiYia7Kvpf4UMfBhHBqMRMPZ5aTMN1fN3Dw9e7MM9yP/fn6FVyJgM8IvEc0w2LeIN4ZtPSOe8TB1lRUojPiScMuiDxI9dlh984F5os8MygkU7OEweJxUIHyx3MioZKPE0cUlSN8oWMwwrnLc5qucpa9+QvDOS0lRTXaY4ghiXEkYAIGVWUUIaFMK0aKSaStB918Q83/QlyyeQqgZFjARWokJp+8D/43a2Zj0w5SYEo0PVi2x9jgH8XaNRs+/vYthsngPcZuNLa/kodmP0kvdbWQkdA/zZwcd3W5D3gcgcYetIlQ2pKXppCPg+8n9E3ZYGBW6BnzemttY/TByBNXS3fAAeHwHiBstdd3t3d2du/Z1r9/QC9bXLFzW/bfwAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QEDhYdNeUqVToAAAsISURBVHja7V3NahxJEo5oaWEvQkawsOgBthm1MfZxwQtrizkOCwt7nXkDeedJbPcj+GpYGHwc5FkY3SWM29AvYAwDjZq9GAZ17EGVpeys/InMyqyfVgQIW1J3dWXEF1/8ZCgLwSN0c0Pq/7i3h87XEUEbQUToSyZwz0UUUOzKiASINHQFWJ3v5GzWuPFP80WQA9ZX7wkA4PDJKczOZo3XLV5/xKFxwH5o4ebvXItoI7EkmlNhnXLA7MVDmr14OCi32OdYXxcFc10OHz9HGKns57xYrQgiWCgCJEJl/UEqQPnf7MXDJmm9/OBGwof/WlHRBRpsnJHKC/sF73IUboEc39eRoFu+tvqT09vfXZ433QGRbCHRJp/mCz3qsF4XCumSCbZxgS0OmGzr6vDR31nR4hAAFpXFuEgIiUKHAwn5EDD78RHMfnxk9529vfprfXm+BX+nQgM3TOd3X1IMDc4FDLnWLP6gIsHrAApcLrD4xy0y8FRHQ+U2P824JNgfAtTClSLGJKglQuRFQkWC66v3zos9eHLaQIGrMgwjoPrPc14+kZoICQekcoDN+iH2TwmDNmTmTISQUw2GXMBHgoeGYnxKUK7gIr+AIjA7ArgWv748FxdgwTngAjoJnpwNvB9ANzd33+ztNYqh0SHg03zRqAxVGrx4+QFgs3H2Aw59zREAylUDDDYRGrOgUWVRSkfIIEc0OzZ6KFu8/oiICARA1Q1gqCtcsm0uCOD05HULXF+ek83qgfqdfEnS+q6WsF4n9h6LRoHQYh2khSFF9CXiAiXh5c0jNBIMvrbgPU763JjMZsUWa8BAtmedEGk7EdIH4oQDRAGiAD4HhCZEsnCAsXvcFwcgN2PTc/nkfoClvaVngq6dZakFuugHlJwQGepwhCAAWvQEUydEag7RSPAwMhUe7ZTYIMNgDxMi/6v+PbCEWj0i+crr6LQ+Wz8ggxyMkwNkQsTAm0yI3PMw6NoP9G2U7uyECGfxg0WASkxs6erW1hhTYizPEWvx9TpfwSQckMoBPjcwUbDzEyI+Hrh3EyJjmxaRCZHUN+7MhIhWa6NJOG0mRNQmKsmEyMD7AXq3xURA6oSIpXojzXrRbF10c7SEVgmA1O7v4DnA0Nz2N/O9hgVsXeGUoYkYC5fcF4iOAq6mpxqd0afDT0aAgs5aYim+Lw2RLqJACR+NGX/pmwOSrtzlhAj3HBNxAVGAKKBnDvBMfLThgNjzTDqNAqmHprB6B4yZghyKkKZoyYsrK4aQYKsvOHJyNqO2KBAEtEl02hya4rK62nW29SJcG7WCgJZRgCy+5WPe0OsaEyCL+aJGxtY8kWWyxEQC1/KpXFCCBA9GywEnmbu3+kCEj+l1a9e9RjWRstnUfFCCA6IRoE9vzH7iLd5JhOqPpap9BQDH7nKBhQsJxpKg75QH10bmlgsYx2yE9hAPHz+vXYCDhFQS7BwBQztvZJ+41dv7+OMxVYFk8sH15XmUAnyWV2k2zmVCJA0BaDn41M4B7cKgLrHw7ywM+vIARXRqfM1HfpzFxwxS+BbetmPc+aywbeF9nkcSzQF4evfFIcAsGeXLD9mnVXpDwFasryyvT5u4tt07qQVUpZerJtDDoOod2GoC66IZCZD0BDOlwtEdocZeoOX15rkhsR0hTjQYHwIGeOB60gEKHITY5oLqsRkj/Q5NnZScEepEAbYkyffnsrGf10YBxVzg03yBQ50KkShgRoEcrM+Bo4sDSn1echiMlZJPmZEJEeGAXVHAQJ86U5QDuEdm+Dig9IRIq93hXBKqJVxKyaGIIv2AIR+ZMaiGSKgyDEmOCZHiCkg5MqNTBHTt79x+AHdCRN3/8J4y07zTQRZGJSZErOXvUCdEZGuMa/kkApQJkQARyoTIiEgw14SILt4HM+zqhAhn8V0nQp1PiPj83XodmRApiIA+JkR0N+CgYKcmRHT4P3hyylLCTk2I2DhAJkQYLiATIl3UAjIhck9TYWeXJYZ5zafG+CZEENH6rBKzMgxFA0FAKQRwERH6y1GupWxo0AcnBnWGSIxwIdrnw9vFBdq4gA7R2GMz2pKuIKBPDrBZBJmHM9p4ImUqTBDQJQf08YwwPXkSDhAXKOgCvvMEhyJmQmUjSTlYeYwNEa60PZFSECAKYLqA3njUmw+pP29zDWfdcHND5hG/MTmNIMAXBmGz6TUMchDgao+nTpILCQoJstSUWU92EmMVRoKA3CSod2St01qFxfWZsY1SqQXEBTKQoAv2OkwxMNOni77v79oB7no3eJTVYC5/FxcQBQQqKHOT8tBy3k/qk2Q41+KGvpwu0PpBSymP3QstrORTZsUFYhDAgTv3WKyhPoQpGQEcaI/huWPOGaHUv+VL4JKgg8uTpyUP6MEFtggsszvEPphJXKDrMGiZ2MCQBXLOEEgi1DcH+CzSxxZ6yQOZJAyKCzCkjyEpjuQYpJIwODarCwd02Q8YPIFlSJBQP61Nl9i9+q4mR/Sf5zhdTsJgLgT0cvOCAIkC7aOADUZEBIvXH9MLoJ4nSgQBUSQY+ecpWydBDWiiJPX550KCkgq3kF2YKOE2RcUFRAH3KQxyXcDcMepzoqTTlhgiFt2sEBcYSxiMhXtomkQPk11NlHSGAM4oTR8PYdzn+LKHFNFFiBwrpyw+NecXDuiCA1Isz/19sTwg5U2h1LjviRJxgdIIaK11Otr6foOrnJenmLXu75hBablcWn8xnU7JpgSJArtieQCA5XIJn6dT6wuWy6VCwZY7DI0DKIGjati7Fq/kuHrd9PZ1GOsCpH3FvB4mdFR/AQBtcEUWhVD9AUTqQyjV54uEwYPJW/gjngFXCRP4duu1G1xR9TMTAUREgJVZEBGArwT4PJ0GrZ9FAb/Tr/AH/Bs7xG7gZ5jAt7DBFanFb+BnmNARbi2+WvSEjrD6HSolpFj/OAIVmEI2zGtQgAewtny1eIMTSItbGEN6x5afH9+SYOOeY6OAeiMdTN7C7/QrfKU5uRTx53//CQAAjv55+2Cd1X/WAADw5dVvDcs3s21SVWg0UX+eThso0IkvSxg03aFSBPtmbZbfrsDRe70Q+ekIeFYgE0Rl+VQl6ItXUcFQRpJr7XoiFEx46oq0jQLMRMWJAqz9v0bCV5pTRXC17ytR33959VtNgjGfv8FV1sUHEWBJWBqw/Erz+t+Dydvb/1eKUaRnkqB+7e+/ewxv3l0Fb3SDK8q9eK8C1AduMSlOSQ9hagFK3rz7150SKsW4RH+fS7mxsu6SA1wQ1qPDl1fzOhQq6A+uIeLxN/rFkV1985e/og3Ktyi4irL8m3dXXuur67sKnjUDET9YEKYKMDYCbMmFDQHmAjmywRVxXCBl8ckuMKEjfFYt8BfHTacs1qawN++urEqw8VDOxQeLIVWcPCvsh0qRqmiyLV63/jojEQ4yEdIX3xb2PwQizMT24bolOPlBThQsl8towlsnhsAGAja4oouLCwAAePr0qTUatCE7l6jI4WttrTPG/oYClEX1xftgk3vxLl/P7e+tO0K7KAgANexN6/uSoakjJw+hw0yUUmDP/b2PAK2JkG/x+k0ea0RlyjRQrNje16XPZwmDrorMp5jQe0OLjF14KPwVyQNSW9O2hbaxNHfxg0mE1gUhPvgokHvBMdZnRYGxhTXu4lUUqPv8KhHyJUF6whRKlnLWBbk/Ux/I2A+9gHuhDgulshxQucO9+Mtxm9DFxYW+Db6rX34X0Elxl0RVuGYUaKDgntRAIiIiIiIiIiIiIiIi91f+D9l1Tq5Fvf5aAAAAAElFTkSuQmCC";
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SHOOT_KEY = 32;
var TEXT_BLINK_FREQ = 500;
var PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 39 };
var ALIEN_BOTTOM_ROW = [
  { x: 0, y: 0, w: 51, h: 34 },
  { x: 0, y: 102, w: 51, h: 34 },
];

var ALIEN_MIDDLE_ROW = [
  { x: 0, y: 137, w: 50, h: 33 },
  { x: 0, y: 170, w: 50, h: 34 },
];
var ALIEN_TOP_ROW = [
  { x: 0, y: 68, w: 50, h: 32 },
  { x: 0, y: 34, w: 50, h: 32 },
];
var ALIEN_X_MARGIN = 40;
var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;

// ###################################################################
// Utility functions & classes
//
// ###################################################################
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function valueInRange(value, min, max) {
  return value <= max && value >= min;
}

function checkRectCollision(A, B) {
  var xOverlap =
    valueInRange(A.x, B.x, B.x + B.w) || valueInRange(B.x, A.x, A.x + A.w);

  var yOverlap =
    valueInRange(A.y, B.y, B.y + B.h) || valueInRange(B.y, A.y, A.y + A.h);
  return xOverlap && yOverlap;
}

var Point2D = Class.extend({
  init: function (x, y) {
    this.x = typeof x === "undefined" ? 0 : x;
    this.y = typeof y === "undefined" ? 0 : y;
  },

  set: function (x, y) {
    this.x = x;
    this.y = y;
  },
});

var Rect = Class.extend({
  init: function (x, y, w, h) {
    this.x = typeof x === "undefined" ? 0 : x;
    this.y = typeof y === "undefined" ? 0 : y;
    this.w = typeof w === "undefined" ? 0 : w;
    this.h = typeof h === "undefined" ? 0 : h;
  },

  set: function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  },
});

// ###################################################################
// Globals
//
// ###################################################################
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var elfs = [];
var particleManager = null;
var updateElfLogic = false;
var elfDirection = -1;
var elfYDown = 0;
var elfCount = 0;
var wave = 1;
var hasGameStarted = false;
var wins = 0;

// ###################################################################
// Entities
//
// ###################################################################
var BaseSprite = Class.extend({
  init: function (img, x, y) {
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  },

  update: function (dt) {},

  _updateBounds: function () {
    this.bounds.set(
      this.position.x,
      this.position.y,
      ~~(0.5 + this.img.width * this.scale.x),
      ~~(0.5 + this.img.height * this.scale.y)
    );
  },

  _drawImage: function () {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  },

  draw: function (resized) {
    this._updateBounds();

    this._drawImage();
  },
});

var SheetSprite = BaseSprite.extend({
  init: function (sheetImg, clipRect, x, y) {
    this._super(sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  },

  update: function (dt) {},

  _updateBounds: function () {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w / 2, this.position.y - h / 2, w, h);
  },

  _drawImage: function () {
    ctx.save();
    ctx.transform(
      this.scale.x,
      0,
      0,
      this.scale.y,
      this.position.x,
      this.position.y
    );
    ctx.drawImage(
      this.img,
      this.clipRect.x,
      this.clipRect.y,
      this.clipRect.w,
      this.clipRect.h,
      ~~(0.5 + -this.clipRect.w * 0.5),
      ~~(0.5 + -this.clipRect.h * 0.5),
      this.clipRect.w,
      this.clipRect.h
    );
    ctx.restore();
  },

  draw: function (resized) {
    this._super(resized);
  },
});

var Player = SheetSprite.extend({
  init: function () {
    this._super(
      spriteSheetImg,
      PLAYER_CLIP_RECT,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 70
    );
    this.scale.set(0.85, 0.85);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
  },

  reset: function () {
    this.lives = 3;
    this.score = 0;
    this.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
  },

  shoot: function () {
    var bullet = new Bullet(
      this.position.x,
      this.position.y - this.bounds.h / 2,
      1,
      1000
    );
    this.bullets.push(bullet);
  },

  handleInput: function () {
    if (isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;

    if (wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot();
        this.bulletDelayAccumulator = 0;
      }
    }
  },

  updateBullets: function (dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  },

  update: function (dt) {
    // update time passed between shots
    this.bulletDelayAccumulator += dt;

    // apply x vel
    this.position.x += this.xVel * dt;

    // cap player position in screen bounds
    this.position.x = clamp(
      this.position.x,
      this.bounds.w / 2,
      CANVAS_WIDTH - this.bounds.w / 2
    );
    this.updateBullets(dt);
  },

  draw: function (resized) {
    this._super(resized);

    // draw bullets
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  },
});

var Bullet = BaseSprite.extend({
  init: function (x, y, direction, speed) {
    this._super(bulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },

  update: function (dt) {
    this.position.y -= this.speed * this.direction * dt;

    if (this.position.y < 0) {
      this.alive = false;
    }
  },

  draw: function (resized) {
    this._super(resized);
  },
});

var Enemy = SheetSprite.extend({
  init: function (clipRects, x, y) {
    this._super(spriteSheetImg, clipRects[0], x, y);
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
  },

  toggleFrame: function () {
    this.onFirstState = !this.onFirstState;
    this.clipRect = this.onFirstState ? this.clipRects[0] : this.clipRects[1];
  },

  shoot: function () {
    this.bullet = new Bullet(
      this.position.x,
      this.position.y + this.bounds.w / 2,
      -1,
      500
    );
  },

  update: function (dt) {
    this.stepAccumulator += dt;

    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w / 2 + 20 && elfDirection < 0) {
        updateElfLogic = true;
      }
      if (
        elfDirection === 1 &&
        this.position.x > CANVAS_WIDTH - this.bounds.w / 2 - 20
      ) {
        updateElfLogic = true;
      }
      if (this.position.y > CANVAS_WIDTH - 50) {
        reset();
      }

      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * elfDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += elfYDown;

    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);
    } else {
      this.bullet = null;
    }
  },

  draw: function (resized) {
    this._super(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  },
});

var ParticleExplosion = Class.extend({
  init: function () {
    this.particlePool = [];
    this.particles = [];
  },

  draw: function () {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.moves++;
      particle.x += particle.xunits;
      particle.y += particle.yunits + particle.gravity * particle.moves;
      particle.life--;

      if (particle.life <= 0) {
        if (this.particlePool.length < 100) {
          this.particlePool.push(this.particles.splice(i, 1));
        } else {
          this.particles.splice(i, 1);
        }
      } else {
        ctx.globalAlpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
        ctx.globalAlpha = 1;
      }
    }
  },

  createExplosion: function (
    x,
    y,
    color,
    number,
    width,
    height,
    spd,
    grav,
    lif
  ) {
    for (var i = 0; i < number; i++) {
      var angle = Math.floor(Math.random() * 360);
      var speed = Math.floor((Math.random() * spd) / 2) + spd;
      var life = Math.floor(Math.random() * lif) + lif / 2;
      var radians = (angle * Math.PI) / 180;
      var xunits = Math.cos(radians) * speed;
      var yunits = Math.sin(radians) * speed;

      if (this.particlePool.length > 0) {
        var tempParticle = this.particlePool.pop();
        tempParticle.x = x;
        tempParticle.y = y;
        tempParticle.xunits = xunits;
        tempParticle.yunits = yunits;
        tempParticle.life = life;
        tempParticle.color = color;
        tempParticle.width = width;
        tempParticle.height = height;
        tempParticle.gravity = grav;
        tempParticle.moves = 0;
        tempParticle.alpha = 1;
        tempParticle.maxLife = life;
        this.particles.push(tempParticle);
      } else {
        this.particles.push({
          x: x,
          y: y,
          xunits: xunits,
          yunits: yunits,
          life: life,
          color: color,
          width: width,
          height: height,
          gravity: grav,
          moves: 0,
          alpha: 1,
          maxLife: life,
        });
      }
    }
  },
});

// ###################################################################
// Initialization functions
//
// ###################################################################
function initCanvas() {
  // create our canvas and context
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  // turn off image smoothing
  setImageSmoothing(false);

  // create our main sprite sheet img
  spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;
  preDrawImages();

  // add event listeners and initially resize
  window.addEventListener("resize", resize);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
}

function preDrawImages() {
  var canvas = drawIntoCanvas(2, 8, function (ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  });
  bulletImg = new Image();
  bulletImg.src = canvas.toDataURL();
}

function setImageSmoothing(value) {
  this.ctx["imageSmoothingEnabled"] = value;
  this.ctx["mozImageSmoothingEnabled"] = value;
  this.ctx["oImageSmoothingEnabled"] = value;
  this.ctx["webkitImageSmoothingEnabled"] = value;
  this.ctx["msImageSmoothingEnabled"] = value;
}

function initGame() {
  dirtyRects = [];
  elfs = [];
  player = new Player();
  particleManager = new ParticleExplosion();
  setupElfFormation();
  drawBottomHud();
}

function setupElfFormation() {
  elfCount = 0;
  for (var i = 0, len = 5 * 11; i < len; i++) {
    var gridX = i % 11;
    var gridY = Math.floor(i / 11);
    var clipRects;
    switch (gridY) {
      case 0:
        clipRects = ALIEN_TOP_ROW;
        break;
      case 1:
        clipRects = ALIEN_MIDDLE_ROW;
        break;
      case 2:
        clipRects = ALIEN_BOTTOM_ROW;
        break;
      case 3:
        clipRects = ALIEN_MIDDLE_ROW;
        break;
      case 4:
        clipRects = ALIEN_TOP_ROW;
        break;
    }
    elfs.push(
      new Enemy(
        clipRects,
        CANVAS_WIDTH / 2 -
          ALIEN_SQUAD_WIDTH / 2 +
          ALIEN_X_MARGIN / 2 +
          gridX * ALIEN_X_MARGIN,
        CANVAS_HEIGHT / 3.25 - gridY * 40
      )
    );
    elfCount++;
  }
}

function reset() {
  elfs = [];
  wins = 0;
  setupElfFormation();
  player.reset();
}

function init() {
  initCanvas();
  keyStates = [];
  prevKeyStates = [];
  resize();
}

// ###################################################################
// Helpful input functions
//
// ###################################################################
function isKeyDown(key) {
  return keyStates[key];
}

function wasKeyPressed(key) {
  return !prevKeyStates[key] && keyStates[key];
}

// ###################################################################
// Drawing & Update functions
//
// ###################################################################
function updateElfs(dt) {
  if (updateElfLogic) {
    updateElfLogic = false;
    elfDirection = -elfDirection;
    elfYDown = 25;
  }

  for (var i = elfs.length - 1; i >= 0; i--) {
    var elf = elfs[i];
    if (!elf.alive) {
      elfs.splice(i, 1);
      elf = null;
      elfCount--;
      if (elfCount < 1) {
        wave++;
        wins += 1;
        setupElfFormation();
      }
      return;
    }

    elf.stepDelay = (elfCount * 20 - wave * 10) / 1000;
    if (elf.stepDelay <= 0.05) {
      elf.stepDelay = 0.05;
    }
    elf.update(dt);

    if (elf.doShoot) {
      elf.doShoot = false;
      elf.shoot();
    }
  }
  elfYDown = 0;
}

function resolveBulletEnemyCollisions() {
  var bullets = player.bullets;

  for (var i = 0, len = bullets.length; i < len; i++) {
    var bullet = bullets[i];
    for (var j = 0, alen = elfs.length; j < alen; j++) {
      var elf = elfs[j];
      if (checkRectCollision(bullet.bounds, elf.bounds)) {
        elf.alive = bullet.alive = false;
        particleManager.createExplosion(
          elf.position.x,
          elf.position.y,
          "white",
          70,
          5,
          5,
          3,
          0.15,
          50
        );
        player.score += 25;
      }
    }
  }
}

function resolveBulletPlayerCollisions() {
  for (var i = 0, len = elfs.length; i < len; i++) {
    var elf = elfs[i];
    if (
      elf.bullet !== null &&
      checkRectCollision(elf.bullet.bounds, player.bounds)
    ) {
      if (player.lives === 0) {
        hasGameStarted = false;
        if (player.score && confirm("Submit your score?")) {
          var name = prompt("Please enter your name:")
            .replace()
            .replace(/[^\w]/g, "");
          $.post("/api.php", {
            name: name,
            wins: wins,
            score: player.score,
          }).done(function (response) {
            console.log(response);
            heading = "Error";
            icon = "error";
            if (response.request) {
              heading = "Success";
              icon = "success";
              $("#leaderboard_container").attr("src", function (i, val) {
                return val;
              });
            }
            $.toast({
              heading: heading,
              text: response.data,
              showHideTransition: "fade",
              icon: icon,
            });
          });
        }
      } else {
        elf.bullet.alive = false;
        particleManager.createExplosion(
          player.position.x,
          player.position.y,
          "green",
          100,
          8,
          8,
          6,
          0.001,
          40
        );
        player.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
        player.lives--;
        break;
      }
    }
  }
}

function resolveCollisions() {
  resolveBulletEnemyCollisions();
  resolveBulletPlayerCollisions();
}

function updateGame(dt) {
  player.handleInput();
  prevKeyStates = keyStates.slice();
  player.update(dt);
  updateElfs(dt);
  resolveCollisions();
}

function drawIntoCanvas(width, height, drawFunc) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  drawFunc(ctx);
  return canvas;
}

function fillText(text, x, y, color, fontSize) {
  if (typeof color !== "undefined") ctx.fillStyle = color;
  if (typeof fontSize !== "undefined") ctx.font = fontSize + "px Play";
  ctx.fillText(text, x, y);
}

function fillCenteredText(text, x, y, color, fontSize) {
  var metrics = ctx.measureText(text);
  fillText(text, x - metrics.width / 2, y, color, fontSize);
}

function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenteredText(text, x, y, color, fontSize);
  }
}

function drawBottomHud() {
  ctx.fillStyle = "#02ff12";
  ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
  fillText(player.lives + " x ", 10, CANVAS_HEIGHT - 7.5, "white", 20);
  ctx.drawImage(
    spriteSheetImg,
    player.clipRect.x,
    player.clipRect.y,
    player.clipRect.w,
    player.clipRect.h,
    45,
    CANVAS_HEIGHT - 23,
    player.clipRect.w * 0.5,
    player.clipRect.h * 0.5
  );
  fillText("Wins: ", CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
  fillCenteredText("SCORE: " + player.score, CANVAS_WIDTH / 2, 20);
  fillBlinkingText(
    wins + "",
    CANVAS_WIDTH - 25,
    CANVAS_HEIGHT - 7.5,
    TEXT_BLINK_FREQ
  );
}

function drawElfs(resized) {
  for (var i = 0; i < elfs.length; i++) {
    var elf = elfs[i];
    elf.draw(resized);
  }
}

function drawGame(resized) {
  player.draw(resized);
  drawElfs(resized);
  particleManager.draw();
  drawBottomHud();
}

function drawStartScreen() {
  fillCenteredText(
    "Elf Invaders",
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2.75,
    "#FFFFFF",
    36
  );
  fillBlinkingText(
    "Press enter to play!",
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    500,
    "#FFFFFF",
    36
  );
}

function animate() {
  var now = window.performance.now();
  var dt = now - lastTime;
  if (dt > 100) dt = 100;
  if (wasKeyPressed(13) && !hasGameStarted) {
    initGame();
    hasGameStarted = true;
  }

  if (hasGameStarted) {
    updateGame(dt / 1000);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (hasGameStarted) {
    drawGame(false);
  } else {
    drawStartScreen();
  }
  lastTime = now;
  requestAnimationFrame(animate);
}

// ###################################################################
// Event Listener functions
//
// ###################################################################
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  // calculate the scale factor to keep a correct aspect ratio
  var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);

  if (IS_CHROME) {
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    setImageSmoothing(false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
  } else {
    // resize the canvas css properties
    canvas.style.width = CANVAS_WIDTH * scaleFactor + "px";
    canvas.style.height = CANVAS_HEIGHT * scaleFactor + "px";
  }
}

function onKeyDown(e) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}

function onKeyUp(e) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}

// ###################################################################
// Start game!
//
// ###################################################################
window.onload = function () {
  init();
  animate();
};

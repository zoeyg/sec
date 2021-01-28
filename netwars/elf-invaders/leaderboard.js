console.clear();

// Containers
const wrapper = document.getElementById("wrapper");
const header = document.getElementById("header");
const drawer = document.getElementById("drawer");
const swipeZone = document.getElementById("swipeZone");

// Create Element
const createNode = (element) => {
  return document.createElement(element);
};

// Append Element
const append = (parent, el) => {
  return parent.appendChild(el);
};

// Toggle Drawer

const closeDrawer = () => {
  document.querySelector(".c-overlay").style.opacity = 0;
  drawer.classList.remove("c-drawer--open");
  setTimeout(() => {
    document.querySelector(".c-overlay").remove();
  }, 50);
};

const openDrawer = () => {
  let newOverlay = createNode("div");
  newOverlay.classList = "c-overlay";
  newOverlay.style.opacity = 0;
  newOverlay.addEventListener("click", closeDrawer);
  append(document.body, newOverlay);
  setTimeout(() => {
    newOverlay.style.opacity = 1;
    drawer.classList.add("c-drawer--open");
  }, 100);
};

const toggleDrawer = () => {
  drawer.classList.contains("c-drawer--open") ? closeDrawer() : openDrawer();
};

// Render Empty State
const emptyState = () => {
  const newText = createNode("div");
  newText.classList = "c-empty-state";
  newText.innerHTML = `
        <svg class="c-empty-state__icon" viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <div style="margin-top: 8px;">Loading...</div>
    `;
  append(wrapper, newText);
  setTimeout(() => {
    newText.remove();
  }, 500);
};

function hex_to_ascii(str1) {
  var hex = str1.toString();
  var str = "";
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

// Render Driver Standings
const renderList = (year) => {
  emptyState();
  // grabs config.json from the config folder down ../ one directory. html and config directories sit in /var/www/.
  $.post("/api.php", { conf: "config.json" }).done(function (response) {
    console.log(response);
    if (response.request) {
      var HEADER_INFO = JSON.parse(hex_to_ascii(response.data));
      console.log(HEADER_INFO);
      $.post("/api.php", { scores: "get" }).done(function (response) {
        console.log(response);
        const tableClass = "c-table";
        let table = createNode("table");
        table.classList = tableClass;
        table.innerHTML = `
                <thead class="c-table__head">
                    <tr class="c-table__head-row">
                        <th class="c-table__head-cell u-text--center">${HEADER_INFO.columns[0]}</th>
                        <th class="c-table__head-cell">${HEADER_INFO.columns[1]}</th>
                        <th class="c-table__head-cell">${HEADER_INFO.columns[2]}</th>
                        <th class="c-table__head-cell u-text--right">${HEADER_INFO.columns[3]}</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
        const title = createNode("div");
        title.classList = "c-headline";
        title.innerHTML = `<h4 class="c-headline__title"><small class="u-text--danger">${HEADER_INFO.name}</small><br />${HEADER_INFO.header} <small class="u-text--secondary"></small></h4><span class="c-chip c-chip--success">${HEADER_INFO.subheader}</span>`;
        append(wrapper, title);
        append(wrapper, table);
        for (var index = 0; index < response.data.length; index++) {
          item = response.data[index];
          const tableBody = table.querySelector("tbody");
          let tr = createNode("tr");
          tr.classList = "c-table__row";
          tr.innerHTML = `
                            <td class="c-table__cell c-table__cell--place u-text--center"><span class="c-place">${
                              index + 1
                            }</span></td>
                        <td class="c-table__cell c-table__cell--name">${
                          item.name
                        }<br><small style="opacity: .4;"></small></td>
                        <td class="c-table__cell c-table__cell--count"><small>${
                          item.wins
                        }</small></td>
                        <td class="c-table__cell c-table__cell--points u-text--right"><strong>${
                          item.points
                        }</strong></td>
                    `;

          if (item.position == 1) {
            tr.querySelector(".c-place").classList.add("c-place--first");

            if (year != "current") {
              const firstPlaceCard = createNode("div");
              firstPlaceCard.classList = "c-winner";
              firstPlaceCard.innerHTML = `
                                <div class="c-winner__image">
                                    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="8" r="7"></circle>
                                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                    </svg>
                                </div>
                                <div class="c-winner__content">
                                    <small class="c-winner__badge">winner</small>
                                    <h5 class="c-winner__title">${item.name}</h5>
                                    <div class="c-winner__info">
                                        <small class="c-winner__info-item"><strong>${item.name}</strong></small>
                                        <small class="c-winner__info-item">Wins: <strong>${item.wins}</strong></small>
                                        <small class="c-winner__info-item">Points: <strong>${item.points}</strong></small>
                                    </div>
                                </div>
                            `;
              table.parentNode.insertBefore(firstPlaceCard, table);
              console.log("sup");
            }
          } else if (item.position == 2) {
            tr.querySelector(".c-place").classList.add("c-place--second");
          } else if (item.position == 3) {
            tr.querySelector(".c-place").classList.add("c-place--third");
          }
          append(tableBody, tr);
        }
      });
    }
  });
};

// Theme toggle
document.getElementById("test").addEventListener("click", () => {
  document.documentElement.classList.toggle("theme--dark");
  document.getElementById("test").classList.toggle("c-toggle--active");
});

// Create season select
const createSeasonSelect = () => {
  const newSelect = createNode("div");
  newSelect.innerHTML = `
        <label class="c-field__label">Season:</label>
        <select class="c-field__input"></select>
    `;
  newSelect.classList = "c-field";
  newSelect.style.position = "relative";
  newSelect.style.zIndex = 300;
  let currentYear = new Date().getFullYear();
  for (let i = 0; i < 20; i++) {
    if (window.CP.shouldStopExecution(0)) break;
    let itemYear = currentYear - i;
    let newOption = createNode("option");
    if (i == 0) {
      newOption.setAttribute("selected", true);
      //newOption.innerHTML = `${itemYear} (current)`;
      newOption.setAttribute("value", "current");
    } else {
      newOption.innerHTML = itemYear;
      newOption.setAttribute("value", itemYear);
    }
    append(newSelect.querySelector(".c-field__input"), newOption);
  }
  window.CP.exitedLoop(0);
  newSelect.querySelector(".c-field__input").addEventListener("change", (e) => {
    document.getElementById("wrapper").innerHTML = "";
    renderList(e.target.value);
    toggleDrawer();
  });
  append(drawer, newSelect);
};

createSeasonSelect();

renderList("current");

drawer
  .querySelector(".c-drawer__handle")
  .addEventListener("click", toggleDrawer);

// Swipe Drawer
// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml, https://codepen.io/ganmahmud/pen/RaoKZa

function swipedetect(el, callback) {
  var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) {};

  touchsurface.addEventListener(
    "touchstart",
    function (e) {
      var touchobj = e.changedTouches[0];
      swipedir = "none";
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      e.preventDefault();
    },
    false
  );

  touchsurface.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault(); // prevent scrolling when inside DIV
    },
    false
  );

  touchsurface.addEventListener(
    "touchend",
    function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);
      e.preventDefault();
    },
    false
  );
}

swipedetect(swipeZone, function (direction) {
  // direction contains either "none", "left", "right", "top", or "down"
  if (direction == "up") {
    openDrawer();
  } else if (direction == "down") {
    closeDrawer();
  }
});

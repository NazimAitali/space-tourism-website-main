let Sections = document.querySelectorAll(".Sections");
let MenuHamburger = document.querySelector(".Menu-hamburger");
let MenuSide = document.querySelector(".Menu-side");
let ItemsMenuMobile = document.querySelectorAll(".Items-menu-mobile");
let ItemsDistination = document.querySelectorAll(".Items");
let ItemsMenu = document.querySelectorAll(".Items-menu");

let DistinationName = document.querySelector(".Distination-name");
let DistinationImg = document.querySelector(".Distination-img");
let DistinationText = document.querySelector(".Distination-text");
let Distance = document.querySelector(".Distance");
let Travel = document.querySelector(".Travel");

let CrewSelect = document.querySelectorAll(".Crew-select");
let Role = document.querySelector(".Position");
let Name = document.querySelector(".Name");
let CrewDetailsText = document.querySelector(".Crew-details-text");
let CrewImg = document.querySelector(".Crew-img");

let TechnologySelect = document.querySelectorAll(".Technology-select");
let TechnologyImg = document.querySelector(".Technology-img");
let TechnologyName = document.querySelector(".Technology-name");
let TechnologyDetailsText = document.querySelector(".Technology-details-text");

let PageSelector = "Home";
/***********************Request data*****************/
fetch("./data.json")
  .then((respense) => respense.json())
  .then((data) => {
    /************************SELECTORS******************************************/

    MenuHamburger.firstElementChild.addEventListener("click", OpenMenu);
    ItemsMenuMobile.forEach((item) => {
      item.addEventListener("click", togglePageMobile);
    });
    ItemsDistination.forEach((item) => {
      item.addEventListener("click", toggletabs);
    });
    CrewSelect.forEach((item) => {
      item.addEventListener("click", toggleSelect);
    });
    TechnologySelect.forEach((item) => {
      item.addEventListener("click", toggleTechno);
    });
    ItemsMenu.forEach((item) => {
      item.addEventListener("click", togglePage);
    });
    /************************FUNCTIONS******************************************/
    function CrewImgSize(id) {
      let display = {
        0: {
          mobile: {
            width: "50%",
            marginLeft: "4%",
          },
          tab: { width: "50%", marginLeft: "3%" },
          desktop: { width: "71.5%", marginLeft: "-11%" },
        },
        1: {
          mobile: {
            width: "45%",
            marginLeft: "2%",
          },
          tab: { width: "46%", marginLeft: "1%" },
          desktop: { width: "60%", marginLeft: "-13%" },
        },
        2: {
          mobile: {
            width: "58%",
            marginLeft: "1%",
          },
          tab: { width: "59%", marginLeft: "-2%" },
          desktop: { width: "76%", marginLeft: "-16%" },
        },
        3: {
          mobile: {
            width: "64%",
            marginLeft: "-2%",
          },
          tab: { width: "66%", marginLeft: "3%" },
          desktop: { width: "80%", marginLeft: "-12%" },
        },
      };
      return display[id];
    }
    function getData(id) {
      let data = {
        Moon: 0,
        Mars: 1,
        Europa: 2,
        Titan: 3,
        Commander: 0,
        Specialist: 1,
        Pilot: 2,
        Engineer: 3,
        Luncher: 0,
        Spaceport: 1,
        Capsule: 2,
      };
      return data[id];
    }
    function menuConvert(id) {
      let menuConvert = {
        One: "Home",
        Two: "Distination",
        Three: "Crew",
        Four: "Technology",
      };
      return menuConvert[id];
    }

    function OpenMenu() {
      if (
        MenuHamburger.firstElementChild.src !==
          "./assets/shared/icon-close.svg" &&
        MenuSide.classList[1] !== "Menu-open"
      ) {
        MenuHamburger.firstElementChild.src = `./assets/shared/icon-close.svg`;
        MenuSide.classList.add("Menu-open");
        MenuSide.firstElementChild.classList.add("Menu-open-container");
      } else {
        MenuSide.classList.remove("Menu-open");
        MenuSide.firstElementChild.classList.remove("Menu-open-container");
        MenuHamburger.firstElementChild.src =
          "./assets/shared/icon-hamburger.svg";
      }
    }
    function togglePageMobile() {
      PageSelector = this.id;
      Sections.forEach((item) => {
        item.classList.remove("Display");
        if (item.classList[0] === PageSelector) {
          item.classList.add("Display");
          MenuSide.classList.remove("Menu-open");
          MenuSide.firstElementChild.classList.remove("Menu-open-container");
          MenuHamburger.firstElementChild.src =
            "./assets/shared/icon-hamburger.svg";
        }
        if (item.classList[0] !== PageSelector) {
          item.classList.remove("Display");
          MenuSide.classList.remove("Menu-open");
          MenuSide.firstElementChild.classList.remove("Menu-open-container");
          MenuHamburger.firstElementChild.src =
            "./assets/shared/icon-hamburger.svg";
        }
      });
    }

    function togglePage() {
      PageSelector = this.classList[1];
      ItemsMenu.forEach((item) => {
        item.classList.remove("Menu-selected");
      });
      this.classList.add("Menu-selected");
      Sections.forEach((item) => {
        item.classList.remove("Display");
        if (item.classList[0] === menuConvert(PageSelector)) {
          item.classList.add("Display");
        }
        if (item.classList[0] !== menuConvert(PageSelector)) {
          item.classList.remove("Display");
        }
      });
    }

    function toggletabs() {
      ItemsDistination.forEach((item) => {
        item.classList.remove("Distination-Selected");
      });
      this.classList.add("Distination-Selected");
      DistinationName.innerHTML =
        data.destinations[getData(this.id)].name.toUpperCase();
      DistinationText.innerHTML =
        data.destinations[getData(this.id)].description;
      Distance.lastElementChild.innerHTML =
        data.destinations[getData(this.id)].distance.toUpperCase();
      Travel.lastElementChild.innerHTML =
        data.destinations[getData(this.id)].travel.toUpperCase();
      DistinationImg.firstElementChild.src = "";
      DistinationImg.firstElementChild.src =
        data.destinations[getData(this.id)].images.png;
    }
    function toggleSelect() {
      CrewSelect.forEach((item) => {
        item.classList.remove("Selected");
      });
      this.classList.add("Selected");
      Name.innerHTML = data.crew[getData(this.id)].name.toUpperCase();
      Role.innerHTML = data.crew[getData(this.id)].role.toUpperCase();
      CrewDetailsText.firstElementChild.innerHTML =
        data.crew[getData(this.id)].bio;
      CrewImg.firstElementChild.src = "";
      CrewImg.firstElementChild.src = data.crew[getData(this.id)].images.png;
      if (screen.width >= 1440) {
        CrewImg.firstElementChild.style.width = CrewImgSize(
          getData(this.id)
        ).desktop.width;
        CrewImg.firstElementChild.style.marginLeft = CrewImgSize(
          getData(this.id)
        ).desktop.marginLeft;
        console.log(`width is ${screen.width} first condition`);
      }
      if (screen.width > 767 && screen.width < 1440) {
        CrewImg.firstElementChild.style.width = CrewImgSize(
          getData(this.id)
        ).tab.width;
        CrewImg.firstElementChild.style.marginLeft = CrewImgSize(
          getData(this.id)
        ).tab.marginLeft;
        console.log(`width is ${screen.width} second condition`);
      }
      if (screen.width < 768) {
        CrewImg.firstElementChild.style.width = CrewImgSize(
          getData(this.id)
        ).mobile.width;
        CrewImg.firstElementChild.style.marginLeft = CrewImgSize(
          getData(this.id)
        ).mobile.marginLeft;
        console.log(`width is ${screen.width} theerd condition`);
      }
    }
    function toggleTechno() {
      TechnologySelect.forEach((item) => {
        item.classList.remove("Selected");
      });
      this.classList.add("Selected");
      TechnologyImg.firstElementChild.src = "";
      TechnologyImg.firstElementChild.src =
        data.technology[getData(this.id)].images.portrait;
      TechnologyName.innerHTML =
        data.technology[getData(this.id)].name.toUpperCase();
      TechnologyDetailsText.firstElementChild.innerHTML =
        data.technology[getData(this.id)].description;
    }
  });

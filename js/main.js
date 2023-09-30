//to get random no between range excluding 0

function getRandomNumber(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (randomNumber === 0) {
    return getRandomNumber(min, max);
  }
  return randomNumber;
}

//check if local storage has color
let mainColor = localStorage.getItem("color");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--sub-color", mainColor);
  //remove active class
  document.querySelectorAll(".Colors-list li").forEach((element) => {
    element.classList.remove("active");
    //add active class to li who has color equal the colr in local storage
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
} else {
  document.querySelectorAll(".Colors-list li").forEach((element) => {
    element.classList.remove("active");
  });
  let DefaultColor = document.querySelector(
    ".setting-box .option-box .Colors-list li:last-child"
  );
  DefaultColor.classList.add("active");
}
//settig element
let settingBox = document.querySelector(".setting-box");
let setting = document.querySelector(".gear-icon");
setting.addEventListener("click", open);
setting.addEventListener("click", span);
function span() {
  setting.classList.toggle("fa-spin");
}
function open() {
  settingBox.classList.toggle("open");
}
let lis = document.querySelectorAll(".Colors-list li");
lis.forEach((element) => {
  element.onclick = function () {
    addActive(this, lis);
    document.documentElement.style.setProperty(
      "--sub-color",
      this.dataset.color
    );
    localStorage.setItem("color", this.dataset.color);
  };
});

//landing page element
let landingPage = document.querySelector(".landing-page");
//create array of image
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
// بداية الهبد
let backgroundImageCont = document.querySelector(".random-background");
imgArray.forEach((img) => {
  let image = document.createElement("img");
  image.setAttribute("class", `new-image`);
  image.setAttribute("src", `../image/${img}`);
  backgroundImageCont.appendChild(image);
});
let choosenimage = document.querySelectorAll(".random-background .new-image");
choosenimage.forEach((element) => {
  element.onclick = function () {
    addActive(this, choosenimage);
    localStorage.setItem("backgroundImage", element.getAttribute("src"));
    landingPage.style.backgroundImage = `url("../image/${element.getAttribute(
      "src"
    )}")`;
  };
});
// نهاية الهبد
//change background image
// landingPage.style.backgroundImage = `url("../image/04.jpg")`;
//طريقتي البسيطة
// let i = 1;
// setInterval(() => {
//   landingPage.style.backgroundImage = `url("../image/0${i}.jpg")`;
//   if (i <= 6) {
//     i++;
//   }
//   if (i == 6) {
//     i = 1;
//   }
// }, 2000);

/*
اشتغلت في منطق ثاني واشتغل 
الي هو باي ديفلت بيكون الخلفية تتغير 
ولو ضغط ع زر نو يقوم بوضع خلفية افتراضية ويقوم بايقاف تغير الخلفية 
وقمت بحفظ البيانات في اللوكل ستورج 
علشان لو طفا وشغل يحفظ الصورة الي تم اختيارها 
ولكن في مشكلة لو انه الخلفية بما انه بتتغير بشكل افتراضي فبالتالي ما في حاجة لحفظ الخلفية
في اللوكال ستورج
كبيرنا الزيرو شغال بمنطق ثاني وهينا بدنا نطبقه
yesButton.onclick = (e) => {
  allSpan.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
  setInterval(() => {
    let min = 1;
    let max = 6;
    let randomNumber = getRandomNumber(min, max);
    landingPage.style.backgroundImage = `url("../image/0${randomNumber}.jpg")`;
    localStorage.setItem("backgroundImage", landingPage.style.backgroundImage);
  }, 2000);
};
noButton.onclick = (e) => {
  clearInterval(backgroundInterval);
  allSpan.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
  landingPage.style.backgroundImage = `url("../image/01.jpg")`;
  localStorage.setItem("backgroundImage", landingPage.style.backgroundImage);
};
بالنسبة للزيرو اصح 
*/
let yesButton = document.querySelector(".option-box .yes");
let noButton = document.querySelector(".option-box .no");
let allSpan = document.querySelectorAll(".random-background span");
//random background Changing option true or false
let backgroundOptiont;
//background interval veriable
let backgroundInterval;
/*
الفكرة في فحص الصورة يقوم بفحص قيمة الترو اور فولس للباكقراون اوبشن 
*/
//check if there is local storage random background image
let backgroundLocalStorageItem = localStorage.getItem("background-option");

//check if random background local storage is not empty
if (backgroundLocalStorageItem !== null) {
  if (backgroundLocalStorageItem === `true`) {
    backgroundOptiont = true;
    randomizeImage();
    allSpan.forEach((element) => {
      element.classList.remove("active");
    });
    yesButton.classList.add("active");
  } else {
    backgroundOptiont = false;
    allSpan.forEach((element) => {
      element.classList.remove("active");
    });
    noButton.classList.add("active");
  }
} else {
  backgroundOptiont = true;
  randomizeImage();
}

allSpan.forEach((element) => {
  element.onclick = (e) => {
    allSpan.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOptiont = true;
      randomizeImage();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOptiont = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  };
});
function randomizeImage() {
  if (backgroundOptiont == true) {
    backgroundInterval = setInterval(() => {
      let min = 1;
      let max = 6;
      let randomNumber = getRandomNumber(min, max);
      landingPage.style.backgroundImage = `url("../image/0${randomNumber}.jpg")`;
    }, 2000);
  }
}
let skillSection = document.querySelector(".skills");
let skillSpan = document.querySelectorAll(".skill-progress span");

window.onscroll = function () {
  //Skills offset top
  let SkillOffeset = skillSection.offsetTop;
  //Skills outer hight تقوم بارجاع ارتفاع العنصر بما فيه البادنق تبع العنصر ولو بدنا المارقن بنعين قيمته بترو
  let SkillsOuterHeight = skillSection.offsetHeight;
  //window height
  let windowHeight = this.innerHeight;
  //window skroll top
  let windowSkroll = this.pageYOffset;

  if (windowSkroll > SkillOffeset + SkillsOuterHeight - windowHeight) {
    skillSpan.forEach((element) => {
      element.style.width = element.dataset.progress;
    });
  }
};

//create popup with the image
let ourGallary = document.querySelectorAll(".images-box img");
ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");
    overlay.className = `popup-overlay`;
    document.body.appendChild(overlay);

    //create the popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    //create the close span
    let closeSpan = document.createElement("span");
    let spanText = document.createTextNode("X");
    closeSpan.appendChild(spanText);
    closeSpan.className = "close";
    popupBox.appendChild(closeSpan);
    //هذي طريقة
    //الطريقة الثانية بدي اعمله برا الفانكشن كلها عن طريق الاد ايفنت ليسنر
    // closeSpan.addEventListener("click", () => {
    //   overlay.remove();
    //   popupBox.remove();
    // });

    //علشان بدي احط الهيد في البداية بدي انسخه كله واحطه قبل الصورة
    if (img.alt !== null) {
      //create heading
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    //create img
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className == "close") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//select all li
let allLi = document.querySelectorAll(".links a");
function chooseSection(array) {
  array.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      //استخدماها علشان نمنع اللينك من الانتقال الى العنوان يعني علشان يمنع فعله الافتراضي
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
chooseSection(allLi);
//بداية الهبد
let mainClass = document.querySelectorAll(".mainClass");
let navBullets = document.querySelector(".nav-bullets");
mainClass.forEach((Class) => {
  const DivBullet = document.createElement("div");
  DivBullet.className = "bullet";
  DivBullet.setAttribute("data-section", Class.classList[1]);
  const DivTool = document.createElement("div");
  DivTool.className = "tool-tip";
  DivTool.innerHTML = Class.classList[1];
  DivBullet.appendChild(DivTool);
  navBullets.appendChild(DivBullet);
});
//select all bullet
let bullets = document.querySelectorAll(".bullet");
chooseSection(bullets);
let enableButton = document.querySelector(".setting-box .bullets-option .yes");
let disableButton = document.querySelector(".setting-box .bullets-option .no");
let bulletsButton = document.querySelectorAll(".bullets-option span");
/*
بامكانا اختيار سبان وحدة بدل الزرين ونستخدم شرط لو كان الزر الي اخترته
في كلاس يس اعمله بلوك ولا نو اعمله نون
#28 - Settings Box - Show Bullets Local Storage
https://www.youtube.com/watch?v=R7dcDFTSrz8&list=PLDoPjvoNmBAzvmpzF-6l3tAviiCPbwkB8&index=28
*/
enableButton.onclick = function () {
  bullets.forEach((bullet) => {
    bullet.style.display = "block";
    localStorage.setItem("bullet", bullet.style.display);
  });
  addActive(enableButton, bulletsButton);
};

disableButton.onclick = function () {
  bullets.forEach((bullet) => {
    bullet.style.display = "none";
    localStorage.setItem("bullet", bullet.style.display);
  });
  addActive(disableButton, bulletsButton);
};

let localStorageBullet = localStorage.getItem("bullet");
if (localStorageBullet !== null) {
  bullets.forEach((bullet) => {
    bullet.style.display = localStorageBullet;
  });
  if (localStorageBullet === "block") {
    addActive(enableButton, bulletsButton);
  } else {
    addActive(disableButton, bulletsButton);
  }
}
function addActive(e, array) {
  array.forEach((element) => {
    element.classList.remove("active");
  });
  e.classList.add("active");
}
//طريقة ثانية لموضوع الاكتف
//بدل ما امررله المصفوفة هو بيجيبها
/*
function handleActive(ev){
  ev.target.parentElement.querySelectorAll("Active").forEach(element=>{
    element.classList.remove("active");
  })
  ev.classList.add("active");
}
*/
//نهايته الهبد
let resetButton = document.querySelector(".setting-box .reset-option");
resetButton.addEventListener("click", () => {
  // يقوم بحذف كل العناصر لو كان فيه بيانات ثانية نقوم بحضف كل عنصر لحاله
  localStorage.clear();
  window.location.reload();
});
let toogleMenu = document.querySelector(".links-container .toogle-menu");
let links = document.querySelector(".landing-page .header-area .links");
toogleMenu.addEventListener("click", (e) => {
  //stop Propagation
  // تستخدم لمنع الحدث من الانتشار عند معالجة حدث لعنصر معين
  //هان استخدمناها علشان لمن تضغط ع السبان ما بيعتبره ضغط ع التوقل منيو فاستخدمناها علشان يعتبرها السبان مع الاب
  e.stopPropagation();
  toogleMenu.classList.toggle("menu-active");
  links.classList.toggle("open");
});
links.onclick = function (e) {
  e.stopPropagation();
};

// window.onclick = function (e) {
//   if (
//     links.classList.contains("open") &&
//     e.target.nodeName !== "BUTTON" &&
//     e.target.nodeName !== "LI"
//   ) {
//     links.classList.remove("open");
//     toogleMenu.classList.remove("menu-active");
//   }
// };
//طريقة ثانية بدل ما يوصل لاسم العنصر عن طريق اختيار العنصر الي اخترناه فوق
document.addEventListener("click", (e) => {
  if (e.target !== toogleMenu && e.target !== links) {
    if (links.classList.contains("open")) {
      links.classList.remove("open");
      toogleMenu.classList.remove("menu-active");
    }
  }
});

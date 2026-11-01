// ========== 作品路径配置（动画改为youtube链接） ==========
const works = {
  handDrawn: [
    "assets/illustration/hand/01.jpg",
    "assets/illustration/hand/02.jpg",
    "assets/illustration/hand/03.jpg",
    "assets/illustration/hand/04.jpg",
    "assets/illustration/hand/05.jpg",
    "assets/illustration/hand/06.jpg",
    "assets/illustration/hand/07.jpg",
    "assets/illustration/hand/08.jpg",
    "assets/illustration/hand/09.jpg",
    "assets/illustration/hand/10.jpg"
  ],
  digital: [
    "assets/illustration/digital/01.jpg",
    "assets/illustration/digital/02.jpg",
    "assets/illustration/digital/03.jpg",
    "assets/illustration/digital/04.jpg",
    "assets/illustration/digital/05.jpg",
    "assets/illustration/digital/06.jpg",
    "assets/illustration/digital/07.jpg",
    "assets/illustration/digital/08.jpg",
    "assets/illustration/digital/09.jpg",
    "assets/illustration/digital/10.jpg",
    "assets/illustration/digital/11.jpg",
    "assets/illustration/digital/12.jpg",
    "assets/illustration/digital/13.jpg",
    "assets/illustration/digital/14.jpg",
    "assets/illustration/digital/15.jpg"
  ],
  comic1: [
    "assets/comic/millennium_spring/01.jpg",
    "assets/comic/millennium_spring/02.jpg",
    "assets/comic/millennium_spring/03.jpg",
    "assets/comic/millennium_spring/04.jpg",
    "assets/comic/millennium_spring/05.jpg",
    "assets/comic/millennium_spring/06.jpg",
    "assets/comic/millennium_spring/07.jpg",
    "assets/comic/millennium_spring/08.jpg",
    "assets/comic/millennium_spring/09.jpg",
    "assets/comic/millennium_spring/10.jpg",
    "assets/comic/millennium_spring/11.jpg",
    "assets/comic/millennium_spring/12.jpg",
    "assets/comic/millennium_spring/13.jpg",
    "assets/comic/millennium_spring/14.jpg",
    "assets/comic/millennium_spring/15.jpg"
  ],
  comic2: [
    "assets/comic/comic2/01.jpg",
    "assets/comic/comic2/02.jpg",
    "assets/comic/comic2/03.jpg",
    "assets/comic/comic2/04.jpg",
    "assets/comic/comic2/05.jpg",
    "assets/comic/comic2/06.jpg",
    "assets/comic/comic2/07.jpg",
    "assets/comic/comic2/08.jpg",
    "assets/comic/comic2/09.jpg",
    "assets/comic/comic2/10.jpg"
  ],
  animation: [
    {
      youtubeId: "yPEDAww-oL4",
      cover: "assets/animation/cover_01.jpg"
    },
    {
      youtubeId: "dcuBEw2529o",
      cover: "assets/animation/cover_02.jpg"
    },
    {
      youtubeId: "aIhGOQgjqQs",
      cover: "assets/animation/cover_03.jpg"
    },
    {
      youtubeId: "SNJsRe5G87Y",
      cover: "assets/animation/cover_04.jpg"
    },
    {
      youtubeId: "hvhnKjP-ZIQ",
      cover: "assets/animation/cover_05.jpg"
    }
  ]
};

// ========== 弹窗翻页状态 ==========
let modalOpen = false;
let modalCat = "";
let modalIndex = 0;
let isVideoModal = false;

// ========== 全局变量 ==========
let canvas;
let scrollY = 0;
let imgs = {};

const leftNavX = 40;
const contentX = 170;

// 图片卡片 2:3
const cardW = 190;
const cardH = 285;
const gapX = 240;
const gapY = 330;

// 视频卡片
const videoCardW = 240;
const videoCardH = 145;

// 标题间距
const titleGap = 50;
const subTitleGap = 32;
const sectionMargin = 80;

let clickAreas = [];

// ========== 预加载图片（不再预加载本地video） ==========
function preload() {
  Object.keys(works).forEach(category => {
    works[category].forEach((item, i) => {
      const key = category + "_" + i;
      if (category === "animation") {
        imgs[key + "_cover"] = loadImage(item.cover, () => { }, () => { });
      } else {
        imgs[key] = loadImage(item, () => { }, () => { });
      }
    });
  });
}

function setup() {
  canvas = createCanvas(windowWidth, 4500);
  document.body.style.overflowY = "scroll";
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (closeBtn) closeBtn.onclick = closeModal;
  if (prevBtn) prevBtn.onclick = prevPage;
  if (nextBtn) nextBtn.onclick = nextPage;
}

function draw() {
  background(18, 18, 18);
  scrollY = window.scrollY;
  if (modalOpen) return;
  clickAreas = [];

  fill(240);
  textAlign(RIGHT, TOP);
  textSize(16);
  text("Siyue Zhang", width - 30, 25);
  textSize(13);
  fill(180);
  text("siyuezhang@students.calarts.edu", width - 30, 48);

  push();
  translate(0, scrollY);
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(255);
  text("Illustration", leftNavX, 140);
  text("Comic", leftNavX, 190);
  text("Animation", leftNavX, 240);
  pop();

  let currentY = 120;

  currentY = drawSectionTitle("ILLUSTRATION", currentY);
  currentY += titleGap;
  currentY = drawSubTitle("Hand‑drawn", currentY);
  currentY += subTitleGap;
  currentY = drawImageGrid(currentY, "handDrawn", 10);
  currentY += sectionMargin;

  currentY = drawSubTitle("Digital", currentY);
  currentY += subTitleGap;
  currentY = drawImageGrid(currentY, "digital", 15);
  currentY += sectionMargin;

  currentY = drawSectionTitle("COMIC", currentY);
  currentY += titleGap;
  currentY = drawSubTitle("MILLENNIUM SPRING", currentY);
  currentY += subTitleGap;
  currentY = drawImageGrid(currentY, "comic1", 15);
  currentY += sectionMargin;

  currentY = drawSubTitle("Comic 2", currentY);
  currentY += subTitleGap;
  currentY = drawImageGrid(currentY, "comic2", 10);
  currentY += sectionMargin;

  currentY = drawSectionTitle("ANIMATION", currentY);
  currentY += titleGap;
  currentY = drawVideoGrid(currentY, "animation", 5);

  fill(120);
  textAlign(LEFT, TOP);
  textSize(13);
  text("Click any thumbnail to open full‑size preview", contentX, currentY + 60 - scrollY);
}

function drawSectionTitle(title, y) {
  fill(255);
  textAlign(LEFT, TOP);
  textSize(28);
  text(title, contentX, y - scrollY);
  return y + 36;
}

function drawSubTitle(title, y) {
  fill(220);
  textAlign(LEFT, TOP);
  textSize(16);
  text(title, contentX, y - scrollY);
  return y + 20;
}

function drawImageGrid(startY, category, count) {
  const cols = 5;
  const rows = ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = floor(i / cols);
    const x = contentX + col * gapX;
    const y = startY + row * gapY;
    const key = category + "_" + i;
    const img = imgs[key];

    clickAreas.push({
      x: x,
      y: y - scrollY,
      w: cardW,
      h: cardH,
      type: "image",
      cat: category,
      index: i
    });

    fill(45);
    rect(x, y - scrollY, cardW, cardH);

    if (img && img.width > 10) {
      const imgRatio = img.width / img.height;
      const cardRatio = cardW / cardH;
      let sx, sy, sw, sh;
      if (imgRatio > cardRatio) {
        sh = img.height;
        sw = img.height * cardRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / cardRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      image(img, x, y - scrollY, cardW, cardH, sx, sy, sw, sh);
    } else {
      fill(130);
      textAlign(CENTER, CENTER);
      textSize(14);
      text((i + 1), x + cardW / 2, y - scrollY + cardH / 2);
    }
  }
  return startY + rows * gapY;
}

function drawVideoGrid(startY, category, count) {
  const cols = 5;
  const rows = ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = floor(i / cols);
    const x = contentX + col * gapX;
    const y = startY + row * gapY;
    const key = category + "_" + i;
    const coverImg = imgs[key + "_cover"];
    const videoItem = works[category][i];

    clickAreas.push({
      x: x,
      y: y - scrollY,
      w: videoCardW,
      h: videoCardH,
      type: "youtube",
      youtubeId: videoItem.youtubeId
    });

    fill(40);
    rect(x, y - scrollY, videoCardW, videoCardH);

    if (coverImg && coverImg.width > 10) {
      const imgRatio = coverImg.width / coverImg.height;
      const cardRatio = videoCardW / videoCardH;
      let sx, sy, sw, sh;
      if (imgRatio > cardRatio) {
        sh = coverImg.height;
        sw = coverImg.height * cardRatio;
        sx = (coverImg.width - sw) / 2;
        sy = 0;
      } else {
        sw = coverImg.width;
        sh = coverImg.width / cardRatio;
        sx = 0;
        sy = (coverImg.height - sh) / 2;
      }
      image(coverImg, x, y - scrollY, videoCardW, videoCardH, sx, sy, sw, sh);
    } else {
      fill(150);
      textAlign(CENTER, CENTER);
      textSize(14);
      text("Video " + (i + 1), x + videoCardW / 2, y - scrollY + videoCardH / 2);
    }
  }
  return startY + rows * gapY;
}

function mousePressed() {
  if (modalOpen) return;
  if (mouseX > leftNavX && mouseX < leftNavX + 130) {
    if (abs(mouseY - 140) < 20) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }
    if (abs(mouseY - 190) < 20) {
      window.scrollTo({ top: 800, behavior: "smooth" });
      return;
    }
    if (abs(mouseY - 240) < 20) {
      window.scrollTo({ top: 2200, behavior: "smooth" });
      return;
    }
  }
  for (let area of clickAreas) {
    if (mouseX >= area.x && mouseX <= area.x + area.w &&
      mouseY >= area.y && mouseY <= area.y + area.h) {
      openModal(area);
      break;
    }
  }
}

function openModal(area) {
  modalOpen = true;
  const modalContent = document.getElementById("modalContent");
  const pageText = document.getElementById("pageNum");
  modalContent.innerHTML = "";

  if (area.type === "image") {
    isVideoModal = false;
    modalCat = area.cat;
    modalIndex = area.index;
    renderModalImage();
    document.getElementById("prevBtn").style.display = "block";
    document.getElementById("nextBtn").style.display = "block";
    pageText.style.display = "block";
  } else if (area.type === "youtube") {
    isVideoModal = true;
    // youtube iframe，autoplay=1自动播放，rel=0关闭相关推荐
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${area.youtubeId}?autoplay=1&rel=0`;
    iframe.width = "850";
    iframe.height = "480";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard‑write; encrypted‑media; gyroscope; picture‑in‑picture";
    iframe.allowFullscreen = true;
    modalContent.appendChild(iframe);

    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    pageText.style.display = "none";
  }
  document.getElementById("modal").style.display = "flex";
  noLoop();
}

function renderModalImage() {
  const modalContent = document.getElementById("modalContent");
  const pageText = document.getElementById("pageNum");
  modalContent.innerHTML = "";
  const img = document.createElement("img");
  img.src = works[modalCat][modalIndex];
  modalContent.appendChild(img);
  const total = works[modalCat].length;
  pageText.innerText = `${modalIndex + 1} / ${total}`;
}

function prevPage() {
  if (isVideoModal) return;
  if (modalIndex > 0) {
    modalIndex--;
    renderModalImage();
  }
}
function nextPage() {
  if (isVideoModal) return;
  const total = works[modalCat].length;
  if (modalIndex < total - 1) {
    modalIndex++;
    renderModalImage();
  }
}

function keyPressed() {
  if (!modalOpen || isVideoModal) return;
  if (keyCode === LEFT_ARROW) prevPage();
  if (keyCode === RIGHT_ARROW) nextPage();
}

function closeModal() {
  modalOpen = false;
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalContent").innerHTML = "";
  document.getElementById("pageNum").innerText = "";
  loop();
}

function windowResized() {
  resizeCanvas(windowWidth, 4500);
}
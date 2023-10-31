const articles = document.querySelectorAll('.article');
const rotationSpeed = 0.1; // Скорость вращения статей (в градусах на пиксель)
const maxOpacity = 1; // Максимальная прозрачность в центральной части экрана
const minOpacity = 0.2; // Минимальная прозрачность на краях экрана
const centralZone = 0.2; // Процентная часть центральной области

window.addEventListener('scroll', rotateArticles);

function rotateArticles() {
  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;

  articles.forEach((article, index) => {
    const articleTop = article.offsetTop;
    const articleBottom = articleTop + article.clientHeight;

    const centralZoneHeight = window.innerHeight * centralZone;
    const centralZoneTop = viewportTop + (window.innerHeight - centralZoneHeight) / 2;
    const centralZoneBottom = centralZoneTop + centralZoneHeight;

    if (articleBottom > centralZoneTop && articleTop < centralZoneBottom) {
      // Статья видна в центральной части экрана
      const scrollPosition = (articleTop - centralZoneTop) * rotationSpeed;
      const rotationAngle = Math.min(scrollPosition, 180); // Ограничиваем угол до 180 градусов
      article.style.transform = `rotateY(${rotationAngle}deg)`;

      // Прозрачность в центральной части экрана
      article.style.opacity = maxOpacity;
    } else {
      // Статья находится за пределами центральной части экрана
      article.style.opacity = minOpacity;
    }
  });
}

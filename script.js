//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  const promises = images.map(imgObj => downloadImage(imgObj.url));

  Promise.all(promises)
    .then(loadedImages => {
      loadingDiv.style.display = "none";
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err.message;
    });
}

btn.addEventListener("click", downloadImages);

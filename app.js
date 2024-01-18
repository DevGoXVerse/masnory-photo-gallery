document.addEventListener("DOMContentLoaded", function () {
  

  const galleryElement = document.getElementById("gallery");
  const searchForm = document.getElementById("form");

  const fetchImages = async (query) => {
    let data = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${id}&page=1&orientation=landscape&per_page=20`
    );

    let response = await data.json();

    console.log(response);
    return response.results;
  };
  fetchImages();
  const createImage = (url) => {
    const image = document.createElement("img");
    image.src = url;
    image.alt = "gallery image";

    image.classList.add("w-full", "mb-5");

    return image;
  };

  const showImage = (images) => {
    galleryElement.innerHTML = null;
    images.forEach((image) => {
      const imageUrl = image.urls.regular;
      const imageElement = createImage(imageUrl);
      galleryElement.appendChild(imageElement);
    });
  };

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchQuery = event.target.elements.search.value;

    if (searchQuery !== "") {
      fetchImages(searchQuery).then(showImage);
    }
  });

  fetchImages('dev').then(showImage);
});

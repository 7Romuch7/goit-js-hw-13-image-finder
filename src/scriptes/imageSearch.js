import imgCardTpl from '../templates/image-card.hbs';
import getRefs from '../scriptes/refs.js';
import ImageApiService from '../scriptes/apiService.js';

const imageApiService = new ImageApiService();

getRefs.searchForm.addEventListener('submit', onSearch);
getRefs.loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(event) {
    event.preventDefault();

    clearImageList();

    imageApiService.query = event.currentTarget.elements.query.value
    imageApiService.resetPage();
    imageApiService.fetchImage().then(appendImageMarkup);
}

function onloadMore(event) {
    imageApiService.fetchImage();
}

function appendImageMarkup(images) {
    getRefs.galleryImage.insertAdjacentHTML('beforeend', images);
}

function buildImageTpl(images) {
    return imgCardTpl(images);
}

function clearImageList() {
    getRefs.galleryImage.innerHTML = '';
}
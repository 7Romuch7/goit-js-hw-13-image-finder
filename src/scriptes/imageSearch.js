import imgCardTpl from '../templates/image-card.hbs';
import getRefs from '../scriptes/refs.js';
import ImageApiService from '../scriptes/apiService.js';

const imageApiService = new ImageApiService();

getRefs.searchForm.addEventListener('submit', onSearch);
getRefs.loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.query;

    clearImageList();

    imageApiService.query = input.value;

    imageApiService.resetPage();
    imageApiService.fetchImage().then(images => {
        const markup = buildImageTpl(images);
        appendImageMarkup(markup);
    });
    input.value = '';
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
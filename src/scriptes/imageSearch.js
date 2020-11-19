import imgCardTpl from '../templates/images.hbs';
import getRefs from '../scriptes/refs.js';
import ImageApiService from '../scriptes/apiService';

const imageApiService = new ImageApiService();

getRefs.searchForm.addEventListener('submit', onSearch);
getRefs.loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.query;

    clearImageList();

    imageApiService.resetPage();
    imageApiService.searchQuery = input.value;

    imageApiService.fetchImage().then(data => {
        const murkup = buildImageListTpl(data);
        appendImageMarkup(murkup);
    });
    input.value = '';
}

function onloadMore(event) {
    imageApiService.fetchImage();
}

function appendImageMarkup(images) {
    getRefs.galleryImage.insertAdjacentHTML('beforeend', images);
}

function buildImageListTpl(images) {
    return imgCardTpl(images);
}

function clearImageList() {
    getRefs.galleryImage.innerHTML = '';
}
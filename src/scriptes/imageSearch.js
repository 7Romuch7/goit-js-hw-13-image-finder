import imgCardTpl from '../templates/images.hbs';
import getRefs from '../scriptes/refs.js';
import ImageApiService from '../scriptes/apiService';
import LoadMoreBtn from '../scriptes/loadMoreBtn';
import * as basicLightbox from 'basiclightbox';
import"@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

getRefs.searchForm.addEventListener('submit', onSearch);
getRefs.galleryImage.addEventListener('click', openLightBox);
loadMoreBtn.refs.button.addEventListener('click', fetchImage);

function onSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.query;

    clearImageList();

    loadMoreBtn.show();
    imageApiService.resetPage();
    imageApiService.searchQuery = input.value;

    fetchImage();
    input.value = '';
}

function fetchImage() {
    loadMoreBtn.disable();
    imageApiService.fetchImage().then(data => {
        const murkup = buildImageListTpl(data);
        appendImageMarkup(murkup);
        loadMoreBtn.enable();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
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

function openLightBox(event) {
    const viewing = { src: event.target.dataset.src, alt: event.target.alt };
    openImg(viewing);
}

function openImg({ src, alt }) {
    const instance = basicLightbox.create(`
        <img class="photo-card__image"
        src="${src}" 
        alt="${alt}" />
    `);
        instance.show();
}
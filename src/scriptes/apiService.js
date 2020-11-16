const API_KEY = '19136098-9af9f23d9dd8880169b991a94';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
    headers: {
        Authorization: API_KEY
    },
};

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImage() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.page = + 1;
            });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};
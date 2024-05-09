import fetchAPI, { API_DETAIL_MOVIE, API_NEW_MOVIE } from "./api.js"
import { handleToDetailPage, handleToWatchMoviePage } from "./global.js";


const bannerIndexPageControlHandler = () => {
    // Event delegation for handling click events on poster elements
    document.addEventListener("click", (event) => {
        const poster = event.target.closest("[poster]");
        const buttonPoster = event.target.closest("[buttonPoster]")
        if (!poster) return; // If the clicked element is not a poster, exit

        // Remove active class from all posters and slider items
        document.querySelectorAll("[buttonPoster]").forEach(item => {
            item.classList.remove("active");
        });
        document.querySelectorAll("[poster]").forEach(item => {
            item.classList.remove("active");
        });
        document.querySelectorAll("[slider-item]").forEach(item => {
            item.classList.remove("active");
        });

        // Add active class to the clicked poster and corresponding slider item
        poster.classList.add("active");
        buttonPoster.classList.add("active")
        const sliderItemId = poster.getAttribute("poster-id");
        const correspondingSliderItem = document.querySelector(`[slideritem-id="${sliderItemId}"]`);
        if (correspondingSliderItem) {
            correspondingSliderItem.classList.add("active");
        } else {
            console.error(`Corresponding slider item with ID ${sliderItemId} not found.`);
        }
    });
};

const bannerIndexPage = async () => {

    const respone = await fetchAPI(API_NEW_MOVIE)
    const result = respone.items
    const dataPromises = result.map(async (item) => {
        const api = API_DETAIL_MOVIE + item.slug;
        const movie = await fetchAPI(api);
        return movie;
    });

    // Wait for all asynchronous operations to complete
    const data = await Promise.all(dataPromises);
    const container = document.querySelector("[page-content]")

    //banner
    const banner = `
    <section class="banner">
            <div class="banner-slider">
                ${data.map((item, index) => {
        return `
               <div class= "slider-item ${index == 0 ? ("active") : ("")}" slider-item slideritem-id=${index}>
                    <img src=${item.movie.thumb_url} alt=${item.movie.name} class="img-cover"
                        loading="lazy">
                    <div class="banner-content">
                        <h2 class="heading">
                            ${item.movie.name}
                        </h2>
                        <div class="meta-list">
                            <div class="meta-item card-badge">
                                ${item.movie.year}
                            </div>

                        </div>
                        <div class="category">
                        ${item.movie.category.map(cate => {
            return `${cate.name}`
        }).join(", ")}
                        </div>
                        <p class="banner-text">
                           ${item.movie.content}
                        </p>
                        <div style="display: flex; gap: 16px;">
                        <a href="./watchMovie.html" class="btn" watch-now-btn movie-slug=${item.movie.slug} movie-alike=${item.movie.category[0].slug} movie-name="${item.movie.name}">
                            <img src="./assets/images/play_circle.png" alt="" width="24" height="24">
                            <span class="span">Xem ngay</span>
                        </a>
                        <a href="./detail.html" class="btn normal" movie-name="${item.movie.name}" movie-slug=${item.movie.slug} movie-alike=${item.movie.category[0].slug} todetail>
                            <span class="span">Chi tiết</span>
                        </a>
                        </div>
                        
                    </div>
                </div>
               `
    })}
                
            </div>   

            <div class="slider-control">
                <div class="control-inner">
                    ${data.map((item, index) => {
        return `
                        <button class="poster-box slider-item ${index == 0 ? ("active") : ("")}" buttonPoster>
                        <img src=${item.movie.poster_url} alt=${item.movie.name}
                            loading="lazy" draggable="false" class="img-cover" 
                            poster poster-id=${index}>
                        </button>
                        `
    }).join("")}
                    
                </div>
            </div>
        </section>
    
    `

    container.innerHTML += banner
    await handleToDetailPage()
    await bannerIndexPageControlHandler()
    await handleToWatchMoviePage()
}

export { bannerIndexPage, bannerIndexPageControlHandler }
// creat load Categories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
};

const loadVideos = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
};

function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = remainingSecond /60;
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
} 

console.log(getTimeString(4320))

const displayVideos = (videos) => {
    console.log(videos)
    const videoContainer = document.getElementById('videos')
    videos.forEach((video) => {

        const card = document.createElement('div')
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                src= ${video.thumbnail}
                class="h-full w-full object-cover rounded-xl"
                alt="Shoes" />

                ${
                    video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)}</span>`
                }

                
            </figure>
            <div class="py-2 flex gap-2">
               <img class="w-[40px] h-[40px] rounded-full object-cover" src="${video?.authors[0]?.profile_picture}">
               <div>
                    <h2 class="font-bold">${video?.title}</h2>
                    <div class="flex space-x-2">
                        <p class="text-gray-400">${video?.authors[0]?.profile_name}</p>
                        ${video.authors[0].verified == true ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : " "}
                    </div>

               </div>
            </div>
        `
        videoContainer.append(card) 
    })
}

/*
category: "Music"
category_id: "1001"
*/ 

// creat display Categories
const displayCategories = (Categories) => {

    const CategoryContainer = document.getElementById('Categories')
    // add data in html
    Categories.forEach((item) => {
        
        const button = document.createElement('button')
        button.classList = "btn";
        button.innerText = item.category

        // add button to category container
        CategoryContainer.append(button)

    });

};


loadCategories();
loadVideos();
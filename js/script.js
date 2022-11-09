const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'Easy Pose',
        'name': 'yogavideo1.mp4',
        'duration': '1:23',
    },
    {
        'id': 'a2',
        'title': 'Seated Neck Stretch',
        'name': 'yogavideo1.mp4',
        'duration': '2:45',
    },
    {
        'id': 'a3',
        'title': 'Seated Twist (Left)',
        'name': 'yogavideo1.mp4',
        'duration': '4:49',
    },

    {
        'id': 'a4',
        'title': 'Seated Twist (Right)',
        'name': 'yogavideo1.mp4',
        'duration': '3:59',
    },
    {
        'id': 'a5',
        'title': 'Side Body Streches',
        'name': 'yogavideo1.mp4',
        'duration': '4:25',
    },
    {
        'id': 'a6',
        'title': 'Forward Fold',
        'name': 'yogavideo1.mp4',
        'duration': '5:33',
    },
    {
        'id': 'a7',
        'title': 'Mini Flow',
        'name': 'yogavideo1.mp4',
        'duration': '0:29',
    },

    {
        'id': 'a8',
        'title': 'Tabletop Twists',
        'name': 'yogavideo1.mp4',
        'duration': '1:12',
    },

];

data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="images/play.svg" alt="">
                    <p>${i + 1 > 9 ? i + 1 : '0' + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
})

let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'image/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'image/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'image/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;
    }
});
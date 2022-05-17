/* global L */
import store from './store';
let map;

export function centerMapToUserLocation() {
    if(store.getters.userLongitude && store.getters.userLatitude) {
        getMap().setView([store.getters.userLatitude, store.getters.userLongitude]);
    }
}

export function getMap(id = 'canvas') {
    if(map) {
        return map;
    }
    
    map = L.map(id, {
        zoomControl: false,
        zoom: 4,
        center: L.latLng(55, 23),
        minZoom: 4,
        maxZoom: 10,
        zoomDelta: 2
    });
    
    const tileLayerUrl = 'https://api.mapbox.com/styles/v1/yannik131/cl396p2vi00cj14nu8pk3uvvg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFubmlrMTMxIiwiYSI6ImNrb2Jxd2cydTE0NjEycHFtcjhzeWxhcWEifQ.MLJRNjUUkyI65DSSEulrjA';
    const attribution = '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    
    //Openstreetmap tiles:
    //L.tileLayer('https://api.mapbox.com/styles/v1/yannik131/cl2z0gvu7000314nv0mgxg2f1/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWFubmlrMTMxIiwiYSI6ImNrb2Jxd2cydTE0NjEycHFtcjhzeWxhcWEifQ.MLJRNjUUkyI65DSSEulrjA')
    
    L.tileLayer(tileLayerUrl, {
        attribution: attribution,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svgElement.setAttribute('viewBox', "0 0 100 300");
    svgElement.style.backgroundColor = 'red';
    svgElement.innerHTML = `<path style="mix-blend-mode:screen" d="M168.246 20.4145C186.917 38.2963 124.012 42.4495 84.3315 83.8783C44.6515 125.307 43.2246 188.315 24.5534 170.452C5.88222 152.588 2.87054 85.2688 42.5567 43.8339C82.2428 2.3991 149.599 2.53268 168.246 20.4145Z" fill="url(#paint0_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M134 268.204C207.843 268.204 267.704 208.343 267.704 134.5C267.704 60.6573 207.843 0.796082 134 0.796082C60.1574 0.796082 0.296143 60.6573 0.296143 134.5C0.296143 208.343 60.1574 268.204 134 268.204Z" fill="url(#paint1_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M136.307 260.42C206.75 260.42 263.854 203.315 263.854 132.873C263.854 62.4305 206.75 5.32579 136.307 5.32579C65.8652 5.32579 8.7605 62.4305 8.7605 132.873C8.7605 203.315 65.8652 260.42 136.307 260.42Z" fill="url(#paint2_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M128.863 22.8797C128.863 22.8797 83.1355 35.145 53.6503 71.018C24.165 106.891 22.0762 152.801 22.0762 152.801C22.0762 152.801 12.009 95.7915 41.5064 59.9003C71.0038 24.0091 128.863 22.8797 128.863 22.8797Z" fill="url(#paint3_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M259.27 127.76C259.27 127.76 248.62 168.897 219.068 204.716C189.516 240.534 152.24 257.475 152.24 257.475C152.24 257.475 198.332 246.697 227.89 210.879C257.448 175.06 259.27 127.76 259.27 127.76Z" fill="url(#paint4_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M75.3084 61.095C86.0073 54.918 91.6127 44.5969 87.8283 38.0422C84.044 31.4875 72.303 31.1813 61.604 37.3584C50.9051 43.5354 45.2998 53.8565 49.0841 60.4112C52.8685 66.9658 64.6095 67.272 75.3084 61.095Z" fill="url(#paint5_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M59.6047 86.1157C67.0164 69.3585 65.3277 52.3696 55.8328 48.17C46.3378 43.9703 32.6323 54.1502 25.2205 70.9074C17.8087 87.6646 19.4974 104.653 28.9924 108.853C38.4873 113.053 52.1929 102.873 59.6047 86.1157Z" fill="url(#paint6_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M254.671 194.055C262.083 177.297 260.963 160.56 252.171 156.671C243.378 152.782 230.242 163.214 222.83 179.971C215.418 196.728 216.537 213.465 225.33 217.355C234.123 221.244 247.259 210.812 254.671 194.055Z" fill="url(#paint7_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M225.37 65.3026C230.628 56.9945 220.188 40.9535 202.05 29.4739C183.912 17.9944 164.946 15.4234 159.687 23.7315C154.429 32.0396 164.87 48.0806 183.008 59.5602C201.146 71.0397 220.112 73.6107 225.37 65.3026Z" fill="url(#paint8_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M106.307 242.828C110.716 236.577 102.086 222.901 87.031 212.281C71.9761 201.661 56.1973 198.119 51.7881 204.369C47.3788 210.62 56.0088 224.296 71.0637 234.916C86.1186 245.536 101.897 249.078 106.307 242.828Z" fill="url(#paint9_radial_43_916)"/>
    <path style="mix-blend-mode:screen" d="M239.393 93.805C246.779 87.3144 241.279 68.982 227.109 52.8583C212.939 36.7346 195.465 28.9255 188.079 35.4161C180.694 41.9067 186.194 60.2392 200.364 76.3628C214.533 92.4865 232.008 100.296 239.393 93.805Z" fill="url(#paint10_radial_43_916)"/>
    <path d="M77.81 105.01C80.7915 105.01 83.2762 105.744 85.2639 107.211C87.2517 108.678 88.565 110.678 89.2039 113.21H84.9445C84.4002 111.861 83.501 110.784 82.2468 109.98C81.0164 109.175 79.5492 108.773 77.8455 108.773C76.2837 108.773 74.8757 109.14 73.6215 109.873C72.391 110.607 71.4208 111.648 70.7109 112.997C70.0247 114.346 69.6816 115.931 69.6816 117.753C69.6816 119.67 70.0365 121.314 70.7464 122.687C71.4563 124.059 72.4502 125.112 73.728 125.846C75.0295 126.556 76.5321 126.911 78.2359 126.911C80.3183 126.911 82.1049 126.272 83.5957 124.994C85.0865 123.693 85.9857 121.918 86.2933 119.67H77.1001V116.688H89.7008V120.557C89.4169 122.403 88.7543 124.083 87.7131 125.598C86.6956 127.088 85.3349 128.283 83.6312 129.183C81.9511 130.082 80.0225 130.531 77.8455 130.531C75.4081 130.531 73.2547 129.987 71.3853 128.899C69.5159 127.81 68.0725 126.307 67.0549 124.391C66.0374 122.45 65.5286 120.238 65.5286 117.753C65.5286 115.268 66.0374 113.068 67.0549 111.151C68.0725 109.211 69.5041 107.708 71.3498 106.643C73.2193 105.555 75.3726 105.01 77.81 105.01ZM101.643 110.477C103.417 110.477 104.932 110.914 106.186 111.79C107.44 112.665 108.328 113.825 108.848 115.268V110.725H112.895V130.283H108.848V125.739C108.328 127.183 107.44 128.342 106.186 129.218C104.932 130.094 103.417 130.531 101.643 130.531C99.939 130.531 98.4127 130.129 97.0639 129.324C95.7387 128.52 94.6975 127.36 93.9403 125.846C93.1831 124.332 92.8044 122.545 92.8044 120.486C92.8044 118.451 93.1831 116.676 93.9403 115.162C94.6975 113.647 95.7387 112.488 97.0639 111.683C98.4127 110.879 99.939 110.477 101.643 110.477ZM102.885 114.026C101.087 114.026 99.6432 114.606 98.5546 115.765C97.4898 116.901 96.9574 118.475 96.9574 120.486C96.9574 122.498 97.4898 124.083 98.5546 125.243C99.6432 126.378 101.087 126.946 102.885 126.946C104.021 126.946 105.038 126.686 105.938 126.165C106.837 125.621 107.547 124.864 108.067 123.894C108.588 122.924 108.848 121.788 108.848 120.486C108.848 119.208 108.588 118.084 108.067 117.114C107.547 116.12 106.837 115.363 105.938 114.842C105.038 114.298 104.021 114.026 102.885 114.026ZM142.207 110.406C144.526 110.406 146.372 111.139 147.744 112.606C149.14 114.073 149.838 116.168 149.838 118.889V130.283H145.792V119.315C145.792 117.611 145.366 116.298 144.514 115.375C143.662 114.428 142.491 113.955 141 113.955C139.414 113.955 138.148 114.464 137.202 115.481C136.279 116.475 135.818 117.942 135.818 119.883V130.283H131.771V119.315C131.771 117.611 131.345 116.298 130.493 115.375C129.641 114.428 128.47 113.955 126.979 113.955C125.394 113.955 124.128 114.464 123.181 115.481C122.258 116.475 121.797 117.942 121.797 119.883V130.283H117.751V110.725H121.797V114.807C122.294 113.387 123.122 112.299 124.282 111.541C125.441 110.784 126.802 110.406 128.364 110.406C129.996 110.406 131.404 110.808 132.588 111.612C133.794 112.417 134.67 113.576 135.214 115.091C135.782 113.624 136.693 112.476 137.947 111.648C139.201 110.82 140.621 110.406 142.207 110.406ZM153.995 105.046C153.995 104.36 154.232 103.792 154.705 103.342C155.178 102.892 155.805 102.668 156.586 102.668C157.367 102.668 157.994 102.892 158.467 103.342C158.964 103.792 159.213 104.36 159.213 105.046C159.213 105.732 158.964 106.288 158.467 106.714C157.994 107.14 157.367 107.353 156.586 107.353C155.805 107.353 155.178 107.14 154.705 106.714C154.232 106.288 153.995 105.732 153.995 105.046ZM158.609 110.725V130.283H154.563V110.725H158.609ZM174.439 110.406C176.71 110.406 178.532 111.139 179.905 112.606C181.277 114.073 181.964 116.168 181.964 118.889V130.283H177.917V119.315C177.917 117.564 177.467 116.215 176.568 115.268C175.669 114.298 174.439 113.813 172.877 113.813C171.268 113.813 169.978 114.334 169.008 115.375C168.038 116.392 167.552 117.895 167.552 119.883V130.283H163.506V110.725H167.552V115.02C168.073 113.553 168.949 112.417 170.179 111.612C171.41 110.808 172.829 110.406 174.439 110.406ZM194.54 110.477C196.315 110.477 197.829 110.914 199.084 111.79C200.338 112.665 201.225 113.825 201.746 115.268V110.725H205.792V130.496C205.792 132.318 205.414 133.927 204.656 135.323C203.923 136.743 202.858 137.855 201.462 138.66C200.066 139.464 198.409 139.867 196.492 139.867C193.747 139.867 191.523 139.216 189.819 137.914C188.139 136.613 187.086 134.85 186.66 132.626H190.671C191.002 133.785 191.641 134.684 192.588 135.323C193.534 135.986 194.741 136.317 196.208 136.317C197.818 136.317 199.143 135.82 200.184 134.826C201.225 133.832 201.746 132.389 201.746 130.496V125.739C201.225 127.183 200.338 128.342 199.084 129.218C197.829 130.094 196.315 130.531 194.54 130.531C192.836 130.531 191.31 130.129 189.961 129.324C188.636 128.52 187.595 127.36 186.838 125.846C186.08 124.332 185.702 122.545 185.702 120.486C185.702 118.451 186.08 116.676 186.838 115.162C187.595 113.647 188.636 112.488 189.961 111.683C191.31 110.879 192.836 110.477 194.54 110.477ZM195.783 114.026C193.984 114.026 192.541 114.606 191.452 115.765C190.387 116.901 189.855 118.475 189.855 120.486C189.855 122.498 190.387 124.083 191.452 125.243C192.541 126.378 193.984 126.946 195.783 126.946C196.918 126.946 197.936 126.686 198.835 126.165C199.734 125.621 200.444 124.864 200.965 123.894C201.485 122.924 201.746 121.788 201.746 120.486C201.746 119.208 201.485 118.084 200.965 117.114C200.444 116.12 199.734 115.363 198.835 114.842C197.936 114.298 196.918 114.026 195.783 114.026Z" fill="white"/>
    <path d="M111.64 174.424V168.733L124.496 151.101H131.819V168.494H135.202V174.424H131.819V179.598H124.934V174.424H111.64ZM125.491 158.982L118.566 168.494H125.491V158.982ZM138.302 165.231C138.302 169.635 139.19 173.124 140.968 175.698C142.746 178.272 145.585 179.559 149.485 179.559C153.359 179.559 156.185 178.272 157.963 175.698C159.767 173.124 160.669 169.635 160.669 165.231C160.669 160.852 159.767 157.39 157.963 154.843C156.185 152.269 153.359 150.982 149.485 150.982C145.585 150.982 142.746 152.269 140.968 154.843C139.19 157.39 138.302 160.852 138.302 165.231ZM153.903 165.231C153.903 167.751 153.598 169.701 152.988 171.081C152.404 172.434 151.237 173.111 149.485 173.111C147.708 173.111 146.514 172.434 145.903 171.081C145.293 169.701 144.988 167.751 144.988 165.231C144.988 162.736 145.293 160.813 145.903 159.459C146.514 158.106 147.708 157.43 149.485 157.43C151.237 157.43 152.404 158.106 152.988 159.459C153.598 160.786 153.903 162.71 153.903 165.231Z" fill="white"/>
    <defs>
    <radialGradient id="paint0_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(58.1763 60.2473) rotate(-46.425) scale(133.374 59.7157)">
    <stop stop-color="white"/>
    <stop offset="0.02" stop-color="#F6F6F6"/>
    <stop offset="0.13" stop-color="#BDBDBD"/>
    <stop offset="0.25" stop-color="#8B8B8B"/>
    <stop offset="0.37" stop-color="#606060"/>
    <stop offset="0.49" stop-color="#3D3D3D"/>
    <stop offset="0.62" stop-color="#222222"/>
    <stop offset="0.74" stop-color="#0F0F0F"/>
    <stop offset="0.87" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint1_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(133.969 134.564) rotate(-48.72) scale(133.704)">
    <stop offset="0.19"/>
    <stop offset="0.37" stop-color="#030303"/>
    <stop offset="0.53" stop-color="#0E0E0E"/>
    <stop offset="0.67" stop-color="#1F1F1F"/>
    <stop offset="0.81" stop-color="#373737"/>
    <stop offset="0.94" stop-color="#565656"/>
    <stop offset="1" stop-color="#666666"/>
    </radialGradient>
    <radialGradient id="paint2_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(136.278 132.938) rotate(-48.72) scale(127.553)">
    <stop offset="0.67"/>
    <stop offset="0.84" stop-color="#020202"/>
    <stop offset="0.9" stop-color="#090909"/>
    <stop offset="0.94" stop-color="#141414"/>
    <stop offset="0.98" stop-color="#252525"/>
    <stop offset="1" stop-color="#333333"/>
    </radialGradient>
    <radialGradient id="paint3_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(59.7249 65.7225) rotate(-50.2677) scale(92.3539 38.0286)">
    <stop stop-color="white"/>
    <stop offset="0.07" stop-color="#D3D3D3"/>
    <stop offset="0.16" stop-color="#A2A2A2"/>
    <stop offset="0.26" stop-color="#777777"/>
    <stop offset="0.36" stop-color="#525252"/>
    <stop offset="0.47" stop-color="#343434"/>
    <stop offset="0.58" stop-color="#1D1D1D"/>
    <stop offset="0.7" stop-color="#0D0D0D"/>
    <stop offset="0.83" stop-color="#030303"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint4_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(237.234 206.526) rotate(-50.2677) scale(98.8346 26.6681)">
    <stop stop-color="white"/>
    <stop offset="0.01" stop-color="#FBFBFB"/>
    <stop offset="0.13" stop-color="#C1C1C1"/>
    <stop offset="0.25" stop-color="#8E8E8E"/>
    <stop offset="0.37" stop-color="#626262"/>
    <stop offset="0.5" stop-color="#3F3F3F"/>
    <stop offset="0.62" stop-color="#232323"/>
    <stop offset="0.74" stop-color="#101010"/>
    <stop offset="0.87" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint5_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.5303 72.2824) rotate(-64.5085) scale(21.1104 20.0465)">
    <stop stop-color="white"/>
    <stop offset="0.04" stop-color="#EAEAEA"/>
    <stop offset="0.15" stop-color="#B4B4B4"/>
    <stop offset="0.26" stop-color="#848484"/>
    <stop offset="0.37" stop-color="#5B5B5B"/>
    <stop offset="0.49" stop-color="#3A3A3A"/>
    <stop offset="0.61" stop-color="#212121"/>
    <stop offset="0.73" stop-color="#0E0E0E"/>
    <stop offset="0.86" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint6_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.27 58.6327) rotate(-98.69) scale(30.3114 28.1665)">
    <stop stop-color="white"/>
    <stop offset="0.04" stop-color="#EAEAEA"/>
    <stop offset="0.15" stop-color="#B4B4B4"/>
    <stop offset="0.26" stop-color="#848484"/>
    <stop offset="0.37" stop-color="#5B5B5B"/>
    <stop offset="0.49" stop-color="#3A3A3A"/>
    <stop offset="0.61" stop-color="#212121"/>
    <stop offset="0.73" stop-color="#0E0E0E"/>
    <stop offset="0.86" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint7_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(243.539 168.582) rotate(-96.9241) scale(29.7405 26.6999)">
    <stop stop-color="white"/>
    <stop offset="0.04" stop-color="#EAEAEA"/>
    <stop offset="0.15" stop-color="#B4B4B4"/>
    <stop offset="0.26" stop-color="#848484"/>
    <stop offset="0.37" stop-color="#5B5B5B"/>
    <stop offset="0.49" stop-color="#3A3A3A"/>
    <stop offset="0.61" stop-color="#212121"/>
    <stop offset="0.73" stop-color="#0E0E0E"/>
    <stop offset="0.86" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint8_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(191.761 40.053) rotate(4.52855) scale(33.8007 27.9953)">
    <stop stop-color="white"/>
    <stop offset="0.04" stop-color="#EAEAEA"/>
    <stop offset="0.15" stop-color="#B4B4B4"/>
    <stop offset="0.26" stop-color="#848484"/>
    <stop offset="0.37" stop-color="#5B5B5B"/>
    <stop offset="0.49" stop-color="#3A3A3A"/>
    <stop offset="0.61" stop-color="#212121"/>
    <stop offset="0.73" stop-color="#0E0E0E"/>
    <stop offset="0.86" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint9_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80.0765 234.373) rotate(10.5764) scale(28.7007 22.1123)">
    <stop stop-color="white"/>
    <stop offset="0.04" stop-color="#EAEAEA"/>
    <stop offset="0.15" stop-color="#B4B4B4"/>
    <stop offset="0.26" stop-color="#848484"/>
    <stop offset="0.37" stop-color="#5B5B5B"/>
    <stop offset="0.49" stop-color="#3A3A3A"/>
    <stop offset="0.61" stop-color="#212121"/>
    <stop offset="0.73" stop-color="#0E0E0E"/>
    <stop offset="0.86" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    <radialGradient id="paint10_radial_43_916" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(211.502 60.5432) rotate(20.8886) scale(33.8007 27.9953)">
    <stop stop-color="white"/>
    <stop offset="0.04" stop-color="#EAEAEA"/>
    <stop offset="0.15" stop-color="#B4B4B4"/>
    <stop offset="0.26" stop-color="#848484"/>
    <stop offset="0.37" stop-color="#5B5B5B"/>
    <stop offset="0.49" stop-color="#3A3A3A"/>
    <stop offset="0.61" stop-color="#212121"/>
    <stop offset="0.73" stop-color="#0E0E0E"/>
    <stop offset="0.86" stop-color="#040404"/>
    <stop offset="1"/>
    </radialGradient>
    </defs>`;
    
    var svgNS = "http://www.w3.org/2000/svg";
    var newText = document.createElementNS(svgNS,"text");
    newText.setAttributeNS(null,"x",0);     
    newText.setAttributeNS(null,"y",0); 
    newText.setAttributeNS(null,"font-size","100");
    newText.setAttributeNS(null, "font-weight", "bold");
    newText.setAttributeNS(null, "fill", "white");
    var textNode = document.createTextNode('hihi');
    newText.appendChild(textNode);
    svgElement.appendChild(newText);

    var svgElementBounds = [ [52.2715136,8.0150528], [52.2715136+0.01,8.0150528+0.01] ];
    svgElement.addEventListener('click', function() {
        alert('click');
    });
    
    L.svgOverlay(svgElement, svgElementBounds, {
        opacity: 0.5,
        interactive: true
    }).addTo(map);
    
    return map;
}

/*
1. Add location marker to a location like on myactivities.net
export function createLocationMarker(text, latitude, longitude) {
    
}*/
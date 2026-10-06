let address_box = document.getElementById("address");
let benchmark_box = document.getElementById("benchmark");
let submit_btn = document.getElementById("submit_address");
let clear_btn = document.getElementById("clear_button");
let results = document.getElementById("results");
let matched_address_text = document.getElementById("matched_address");
let latitude_text = document.getElementById("latitude");
let longitude_text = document.getElementById("longitude");
let map_content = document.getElementById("map_content");
let google_api_key = "AIzaSyCUrXltBNrIPML-9uX-OeHpo6ZPVHs8Zf4";

fetch("https://geocoding.geo.census.gov/geocoder/benchmarks")
    .then((response) => response.json())
    .then((data) => {
        benchmark_box.innerHTML = "";
        data.benchmarks.forEach((benchmark) => {
            let option =
                document.createElement("option");
            option.value =
                benchmark.benchmarkName;
            option.textContent =
                benchmark.benchmarkName;
            benchmark_box.appendChild(option);
        });
    });


submit_btn.addEventListener("click", () => {
    let address = address_box.value.trim();
    let benchmark = benchmark_box.value;

    if (address == "") {
        alert("Please enter a complete address.");
        return;
    }


    let census_url =
        "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress" +
        "?address=" + encodeURIComponent(address) +
        "&benchmark=" + encodeURIComponent(benchmark) +
        "&format=json";

    fetch(census_url)
        .then((response) => response.json())
        .then((data) => {
            if (data.result.addressMatches.length == 0) {
                alert("No matching address was found.");
                return;
            }

            let match = data.result.addressMatches[0];
            let matched_address = match.matchedAddress;
            let longitude = match.coordinates.x;
            let latitude = match.coordinates.y;

            results.hidden = false;

            matched_address_text.textContent = matched_address;
            latitude_text.textContent = latitude;
            longitude_text.textContent = longitude;

            let map = document.createElement("iframe");

            map.width = "450";
            map.height = "300";
            map.style.border = "0";
            map.allowFullscreen = true;
            map.referrerPolicy = "strict-origin-when-cross-origin";

            let map_url =
                "https://www.google.com/maps/embed/v1/place" +
                "?key=" + google_api_key +
                "&q=" + encodeURIComponent(matched_address) +
                "&center=" + latitude + "," + longitude +
                "&zoom=16";
            map.src = map_url;
            map_content.innerHTML = "";
            map_content.appendChild(map);
        })

        .catch((error) => {
            console.log(error);
            alert("There was a problem finding the address.");
        });
});

clear_btn.addEventListener("click", () => {
    address_box.value = "";
    results.hidden = true;
    matched_address_text.textContent = "";
    latitude_text.textContent = "";
    longitude_text.textContent = "";
    map_content.innerHTML = "";
});
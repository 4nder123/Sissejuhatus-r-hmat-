// https://developers.google.com/maps/documentation/javascript/examples/place-details
function initMap() {
    // Loob uue kaardi vaate
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 58.38539607417315, lng: 26.72474596891486  },
      zoom: 15,
      styles: [{featureType: "poi.school", stylers: [{ visibility: "off" }],}],
      gestureHandling: "none",
      keyboardShortcuts: false,
      streetViewControl: false,
      fullscreenControl: false
    });
    // asukoha id
    const request = {
      placeId: "ChIJPe-m6LI360YRX4SjCaQewrE",
      fields: ["all"],
    };
    // Loob uue info akna
    const infowindow = new google.maps.InfoWindow();

    // Loob uue service et kastuada placesit
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      // Kui leiab placei ülesse paneb markeri maha ja avab info akna
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });
        // info akna avamine
        infowindow.setContent(content(place));
        infowindow.open(map, marker);
        // markeri peale vajutades avab info akna kui on kinni pandud
        google.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(content(place));
          infowindow.open(map, marker);
        });
      }
    });
  }
  // info akna sisu
  const content = function(place){
    const content = document.createElement("div");
    // div kus sees on asukoha nimi
    const nameElement = document.createElement("div");
    nameElement.innerHTML = "<b>"+place.name+"</b>";
    content.appendChild(nameElement);
    // div kus on sees asukoha aadress
    const placeAddressElement = document.createElement("div");
    placeAddressElement.innerHTML = place.formatted_address.replace(/,/g,"<br>");
    content.appendChild(placeAddressElement);
    // div kus kohas on asukoha google mapsi link
    const placeIdElement = document.createElement("div");
    placeIdElement.innerHTML = "<a style='outline:none; ' href="+place.url+">Vaadake Google Mapsist</a>";
    content.appendChild(placeIdElement);
    // tagastab sisu
    return content;
  }
  
  window.initMap = initMap;
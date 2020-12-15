const map = document.querySelector('#map');

if (map) {
  map.classList.remove('map__wrapper--nojs');

  ymaps.ready(init);

  function init() {
    const behaviors = ['drag', 'dblClickZoom', 'multiTouch', 'zoom'];
    let myMap = new ymaps.Map('map', {
        behaviors: behaviors,
        center: [34.869726184622785, -111.76009820576179],
        controls: [],
        zoom: 10
      }, {
        suppressMapOpenBlock: true,
      }),
      myPlacemark = new ymaps.Placemark([34.869726184622785, -111.76009820576179], {
        hintContent: 'Седона'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-marker.svg',
        iconImageSize: [27, 27],
        iconImageOffset: [-13, -13]
      })

    myMap.controls.add('zoomControl', {
      size: 'small',
      position: {
        top: 20,
        left: 20
      }
    });

    myMap.geoObjects.add(myPlacemark);
  }
}

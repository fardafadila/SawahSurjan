            <script src="nduwuran.js"></script>
            <script src="poi.js"></script>
            <script src="ngisoran.js"></script>
      
            <script>
              var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap",
              });
              var OpenTopoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
                maxZoom: 17,
                attribution:
                  'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
              });
              var GoogleMap = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains: ["mt0", "mt1", "mt2", "mt3"],
              });
      
              var map = L.map("map", {
                center: [-7.9354, 110.1654],
                zoom: 15,
                layers: [GoogleMap],
              });
      
              var baseMaps = {
                "Open Street Map": osm,
                "Open Topo Map": OpenTopoMap,
                "Google Maps": GoogleMap,
              };
      
              function cari() {
                alert("tombol ditekan!");
                map.locate({ setView: true, maxZoom: 16 });
      
                function onLocationFound(e) {
                  var radius = e.accuracy / 2;
      
                  L.marker(e.latlng)
                    .addTo(map)
                    .bindPopup("You are within " + radius + " meters from this point")
                    .openPopup();
      
                  L.circle(e.latlng, radius).addTo(map);
                }
      
                map.on("locationfound", onLocationFound);
              }
      
              var c = new L.Control.Coordinates();
              c.addTo(map);
      
              map.on("click", function (e) {
                c.setCoordinates(e);
              });
      
              var styleNgisoran = {
                color: "#16D39D",
                weight: 5,
                opacity: 0.65,
              };
      
              var poi = L.geoJSON(poi, {
                onEachFeature: function (feature, layer) {
                  layer.bindPopup("<p>" + feature.properties.nama_objek + "</p>");
                },
              }).addTo(map);
      
              var ngisoran = L.geoJSON(ngisoran, {
                style: styleNgisoran,
                onEachFeature: function (feature, layer) {
                  layer.bindPopup("<h3>Informasi Bidang sawah</h3>" + "<p> Pemilik  :" + feature.properties.pemilik + "</p>" + "<p> Kelompok tani  :" + feature.properties.kelompok_tani + "</p>");
                },
              }).addTo(map);
      
              var nduwuran = L.geoJSON(nduwuran, {
                onEachFeature: function (feature, layer) {
                  layer.bindPopup("<h3>Informasi Bidang sawah</h3>" + "<p> Pemilik  :" + feature.properties.pemilik + "</p>" + "<p> Kelompok tani  :" + feature.properties.kelompok_tani + "</p>");
                },
              }).addTo(map);
              
      
              var overlayMaps = {
                Nduwuran: nduwuran,
                POI: poi,
                Ngisoran: ngisoran,
              };
      
              L.control.layers(baseMaps, overlayMaps).addTo(map);
      
              L.Control.geocoder().addTo(map);
      
              L.easyPrint({
                title: "My awesome print button",
                position: "topleft",
                sizeModes: ["A4Portrait", "A4Landscape"],
              }).addTo(map);
      
              L.control.ruler().addTo(map);
      
              L.control.locate().addTo(map);
      
              var graphicScale = L.control
                .graphicScale({
                  fill: "fill",
                  doubleLine: "true",
                  showSubunits: "true",
                })
                .addTo(map);

              
            </script>
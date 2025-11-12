var geoServerURL = 'https://tngis.tnega.org/geoserver/wms';

var result_data;
// View
var view = new ol.View({
    zoom: 7,
    center: [8781480.570496075, 1174732.6162325153],
    enableRotation: false,
    // maxZoom:20,
    // minZoom:7
});

/* MAP */
/*******/
var map = new ol.Map({
    target: 'map',
    view,
});
// No Map
var noTile = new ol.layer.Tile({
    title: 'None',
    baseLayer: true,
    visible: false,
    name: "Basemap",
});
// OSM
var osmTile = new ol.layer.Tile({
    title: "OSM",
    baseLayer: true,
    source: new ol.source.OSM(),
    visible: false,
    name: "Basemap",
});
map.addLayer(osmTile);
map.addLayer(noTile);
// Google Satellite Map
var satelliteTile = new ol.layer.Tile({
    title: 'Google Satellite',
    visible: true,
    baseLayer: true,
    name: "Basemap",
    opacity: 0.8,
    source: new ol.source.XYZ({
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    })
});
map.addLayer(satelliteTile);

// District
var district_source = new ol.source.TileWMS({
    // TODO: Change URL
    url: geoServerURL,
    params: {
        'LAYERS': ' admin_master' + ':' + 'administrative_boundary_district',
    },
    serverType: 'geoserver'
});
const district = new ol.layer.Tile({
    title: 'District',
    type: 'wms',
    source: district_source,
    name: "District",
    visible: true,
    displayInLayerSwitcher: false,
    minResolution: 200,
    maxResolution: 3000,
});
map.addLayer(district);

var tog_flag = 0;
$('#switch_layer').on('click',function(){
    if(tog_flag == 0){
        satelliteTile.setVisible(false);
        osmTile.setVisible(true);
        tog_flag = 1;
    }else{
        satelliteTile.setVisible(true);
        osmTile.setVisible(false);
        tog_flag = 0;
    }
});

// Marker
const applicants = new ol.Feature({
    geometry: new ol.geom.Point([[]])
});
const applicantsSource = new ol.source.Vector({
    features: [applicants]
});

const applicantsLayer = new ol.layer.Vector({
    source: applicantsSource,
    style:new ol.style.Style({
        image: new ol.style.Icon({
            src: "assets/img/icon.png",
            anchor: [20, 2],
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            anchorOrigin: "bottom-left"
        })
    })
    // style: new ol.style.Style({  
    //     image: new ol.style.Circle({
    //         radius: 7,
    //         fill: new ol.style.Fill({
    //           color: '#FFF'
    //         }),
    //         stroke: new ol.style.Stroke({
    //            color: '#FF0000',
    //            width: 2
    //         }),
    //     })
    // })
});

map.addLayer(applicantsLayer);



// Lat/Lon on mouse hover
map.on('pointermove', function (e) {
  var lonlat = ol. proj. toLonLat(e. coordinate);
  $("#user_long").html(lonlat[0].toFixed(6));
  $("#user_lat").html(lonlat[1].toFixed(6));
});

// Zoom in/zoom Out
document.getElementById('zoomIn').onclick = function() {
  var view = map.getView();
  var zoom = view.getZoom();
  view.setZoom(zoom + 1);
};

document.getElementById('zoomOut').onclick = function() {
  var view = map.getView();
  var zoom = view.getZoom();
  view.setZoom(zoom - 1);
};

// Error Message
function error_message(message){
  Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer:2000
  })
}

// Success Message
function success_message(message){
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer:2000
  })
}


function getPoints(mobile_no,date1,date2){
    $.ajax({
        type: 'POST',
        headers: { 'X-APP-KEY': 'km$ut_verific@tion','X-APP-NAME': 'KMUT Verification App' },
        data: {
            'mobile_no': mobile_no,
            'date1': date1,
            'date2': date2,
        },
        url: `${config.api_url}/map_locationfetch`,
        cache: false,
        dataType: 'json',
        success: function (response) {
            var coordinates = [];
            if(response['success'] == 1){
                values = response['data'];
                count = response['count'];
                $('#verified_count').html(count);
                $('#shop_code').html('Shop Code: '+response['data'][0]['shopcode']);
                values.forEach((data, index, array) => {
                    coordinates.push([data.longtitude,data.latitude])
                });
                draw_point_geo(coordinates)
            }else{
                $('#verified_count').html(0);
                error_message(response['message']);
                zoom_extent = [8395626.451712506, 892078.6691354283, 9167334.689279644, 1557386.5633296024];
                map.getView().fit((zoom_extent),{ duration: 2000,});  
            }
        }
    });
}



function draw_point_geo(coordinates){
    coordinates.forEach(function(coord) {
        var longitude = coord[0];
        var latitude = coord[1];
        // Create an OpenLayers feature from the coordinate
        var feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]))
        });
        // Add the feature to the vector source
        applicantsSource.addFeature(feature);
    });
    map.getView().fit(applicantsLayer.getSource().getExtent(), {duration: 3000,maxZoom:22,padding: [170, 50, 90, 150]});
}


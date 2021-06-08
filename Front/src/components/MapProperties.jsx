import { Component } from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
// import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import {LineString, Point} from 'ol/geom';
import {transform} from 'ol/proj';



class MapProperties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: this.props.properties,
            number: 1,
            features: []
        }

        this.buildMapFeatures = this.buildMapFeatures.bind(this);

        this.buildMapFeatures();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.properties !== prevProps.properties) {
            this.buildMapFeatures();
        }
      }

    buildMapFeatures(){

        var features = [];
        var feature = null;

        for (const property of this.props.properties){
            feature = new Feature(new Point(transform([property.longitude, property.latitude], 'EPSG:4326','EPSG:3857')))
            feature.setId(property.id);
            features.push(feature);
        };
        this.setState({ features: features }); 
    }

    render() {
        
        var that = this;
        if (document.getElementById("map") != undefined){
            document.getElementById("map").innerHTML = "";
        }
        
        var map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new VectorLayer({
                    source: new VectorSource({
                                features: this.state.features
                            }),
                    style: new Style({
                        image: new Circle({
                            radius: 6,
                            fill: new Fill({color: 'red'}),
                        }),
                    }),
        
                })
            ],
            view: new View({
                center: transform([7, 50], 'EPSG:4326','EPSG:3857'),
                zoom: 4
            })
        });

        map.on('click', function(event) {
            
            // reset style of all points
            map.getLayers().getArray()[1].getSource().forEachFeature(function(feature){
                feature.setStyle(new Style({
                    image: new Circle({
                        radius: 6,
                        fill: new Fill({color: 'red'}),
                    }),
                }));
            });

            // get one of the feature at the selected position
            var feature = map.forEachFeatureAtPixel(event.pixel, function(feature,layer) {
                return feature;
            });
            if (feature != undefined){
                // and change its style
                feature.setStyle(new Style({
                    image: new Circle({
                        radius: 7,
                        fill: new Fill({color: 'green'}),
                    }),
                }));
                that.props.onClickOnPoint(feature.getId());
            }
        });

        return (
            <>
                <div id="map" className="map"></div>
            </>
        )
    }
} export default MapProperties;
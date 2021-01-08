const express = require('express');
const path = require('path');

const app = express();

app.use('/s', express.static(path.resolve(__dirname, '../static')));

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index');
});

/*
Information that needs to be displayed inside the
marker description box is stored in the "description" field
*/
app.get('/journeys', function(req, res, next) {
    var data = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    description: "Journey Start"
                },
                geometry: {
                    type: "Point",
                    coordinates: [7.088126, 51.886695]
                }
            },
            {
                type: "Feature",
                properties: {
                    description: "Journey End"
                },
                geometry: {
                    type: "Point",
                    coordinates: [-3.2, 52.5]
                },
            },
            {
                type: "Feature",
                properties: {
                    description: '<iframe width="420" height="345" src="https://www.youtube.com/embed/ZtNcvoG3YdQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    midpoint: [0, 51.9]
                },
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [7.088126, 51.886695],
                        [0, 51.9],
                        [-3.2, 52.5]
                    ]
                }
            }
        ]
    };

    res.send(JSON.stringify(data))
})

module.exports = app;
var express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
var app = express();

var SoundTerms = [
    {
        term: "Dynamics",
        defined: "The branch of mechanics concerned with the motion of bodies under the action of forces"
    },
    {
        term: "Juniper",
        defined: "Junipers are coniferous plants in the genus Juniperus /dʒuːˈnɪpərəs/[1] of the cypress family Cupressaceae. Depending on taxonomic viewpoint, between 50 and 67 species"
    },
    {
        term: "Boom Calibrator",
        defined: "Calibration is a technique to help you calculate how much water / chemical mix your sprayer puts out. "
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
	res.json(soundTerms);
});

app.post("/dictionary-api", function(req, res) {
	soundTerms.push(req.body);
    res.json(soundTerms);
});

app.delete("/dictionary-api/:term", function(req, res) {
    soundTerms = soundTerms.filter(function(definition) {
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });//This is a predicate
    res.json(soundTerms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;

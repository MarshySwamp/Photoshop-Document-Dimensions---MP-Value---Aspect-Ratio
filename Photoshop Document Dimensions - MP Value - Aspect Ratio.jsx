#target photoshop
// https://stackoverflow.com/questions/1186414/whats-the-algorithm-to-calculate-aspect-ratio-i-need-an-output-like-43-169
var savedRuler = app.preferences.rulerUnits;        
app.preferences.rulerUnits = Units.PIXELS;
function gcd(a, b) {
    return (b == 0) ? a : gcd(b, a % b);
}
var w = app.activeDocument.width.toString().replace(' px', '');
var h = app.activeDocument.height.toString().replace(' px', '');
var r = gcd(w, h);
var mp = w * h / 1000000
var pix = w * h
var ppiRes = app.activeDocument.resolution;
var ppcmRes = ppiRes/2.54
var ratio = w / h
var docName = app.activeDocument.name;
var wMetric = w / 72 * 2.54
var hMetric = h / 72 * 2.54
var wInches = w / 72
var hInches = h / 72
/////////////////////////////////////////////////////////////////////
    var doc = app.activeDocument    
    var w = doc.width.toString().replace(' px', '');
    var h = doc.height.toString().replace(' px', ''); 
        
    function aspect_ratio(val, lim) {

    var lower = [0, 1];
    var upper = [1, 0];

    while (true) {
        var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

        if (val * mediant[1] > mediant[0]) {
            if (lim < mediant[1]) {
                return upper;
            }
            lower = mediant;
        } else if (val * mediant[1] == mediant[0]) {
            if (lim >= mediant[1]) {
                return mediant;
            }
            if (lower[1] < upper[1]) {
                return lower;
            }
            return upper;
        } else {
            if (lim < mediant[1]) {
                return lower;
            }
            upper = mediant;
        }
    }
}
/////////////////////////////////////////////////////////////////////
app.preferences.rulerUnits = savedRuler;
alert('Document Info' + '\n' + 'Document Name: ' + docName + '\n' + 'Dimensions: ' + w + ' x ' + h + ' pixels' + '\n' + 'Dimensions: '  + Math.round(wMetric * 100) / 100 + ' x ' + Math.round(hMetric * 100) / 100 + ' cm / ' + Math.round(wInches * 1000) / 1000 + ' x ' + Math.round(hInches * 1000) / 1000 + ' inches' + '\n' + 'Resolution: ' + Math.round(ppiRes * 10) / 10 + ' ppi / ' + Math.round(ppcmRes * 1000) / 1000 + ' ppcm' + '\n' + 'Megapixel Value: ' + Math.round(mp * 10) / 10 + ' MP' + ' (' + pix + ' pixels)' + '\n' + 'Aspect Ratio:' + '\n' + ratio.toFixed(2) + ':1' + ' / ' + ratio.toFixed(2) * 2 + ':2 / ' + ratio.toFixed(2) * 4 + ':4' + ' (Basic)' + '\n' + w / r + ':' + h / r + ' (GCD)' + '\n' + aspect_ratio(w / h, 50).toString().replace(',', ':') + ' (Farey)');

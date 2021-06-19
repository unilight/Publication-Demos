var srcspk = "SEF1";
var trgspk = "TEF1";
var number = 1;

var reprs = [
    "Text",
    "BNF",
    "VQW2V",
];
var models = [
    "Baseline",
    "SPT",
    "TTP",
];

var model_mapping = {
    "Baseline": "baseline",
    "SPT": "spt-no-freeze-gst",
    "TTP": "ttp",
};

function lock() {
    $('#srcspk').attr('disabled', 'disabled');
    $('#trgspk').attr('disabled', 'disabled');
    $('#number').attr('disabled', 'disabled');
    $('#loading-status').show();
}
function unlock() {
    $('#srcspk').removeAttr('disabled');
    $('#trgspk').removeAttr('disabled');
    $('#number').removeAttr('disabled');
    $('#loading-status').hide();
}

function preload(_srcspk, _trgspk, _number, push) {
    lock();
    $('#srcspk').val(_srcspk);
    $('#trgspk').val(_trgspk);
    $('#number').val(_number);
    $("#gt-div").empty();
    $("#cvt-div").empty();
    $("#gt-div").append(createGtTable());
    $("#cvt-div").append(createCvtTable());
    
    wavesurfer_original_src = WaveSurfer.create({
        container: '#source-uttr-div',
        waveColor: 'violet',
        progressColor: 'purple',
    });

    wavesurfer_original_src.load('./samples/source/' + srcspk + '/E3000' + number + '.wav');

    wavesurfer_original_tgt = WaveSurfer.create({
        container: '#target-uttr-div',
        waveColor: 'violet',
        progressColor: 'purple',
    });

    wavesurfer_original_tgt.load('./samples/target/' + trgspk + '/E3000' + number + '.wav');

    for (var j = 0; j < models.length; j++) {
        for (var k = 0; k < reprs.length; k++) {
            wavesurfer_converted[j][k] = WaveSurfer.create({
                container: '#converted-uttr-' + j + '-' + k + '-div',
                waveColor: 'violet',
                progressColor: 'purple',
            });

            wavesurfer_converted[j][k].load("./samples/" + reprs[k].toLowerCase() + "/" + model_mapping[models[j]] + "/" + trgspk + '/' + srcspk + "_E3000" + number + ".wav");
        }
    }
    unlock();
}

preload(srcspk, trgspk, number, true);

function createGtTable() {
    var tableElem;
    tableElem = document.createElement('table');
    
    var truthline, colElem;
    var txt_color = 'rgb(22, 38, 67)';
    var src_color = 'rgb(255, 255, 230)'
    var trg_color = 'rgb(230, 255, 255)'

    truthline = document.createElement('tr');

    colElem = document.createElement('td');
    colElem.appendChild(document.createTextNode('Source speaker:'));
    colElem.appendChild(document.createElement('br'));
    colElem.appendChild(document.createTextNode(srcspk))
    colElem.style.color = 'rgb(22, 38, 67)';
    colElem.style.center = true;
    colElem.style.backgroundColor = src_color;
    truthline.appendChild(colElem);

    colElem = document.createElement('td');
    var waveDiv = document.createElement('div');
    waveDiv.setAttribute("id", "source-uttr-div");
    colElem.appendChild(waveDiv);
    colElem.style.color = txt_color;
    colElem.style.center = true;
    colElem.setAttribute("width", "200px");
    colElem.style.backgroundColor = src_color;
    truthline.appendChild(colElem);

    colElem = document.createElement('td');
    var x = document.createElement("input");
    x.setAttribute("type", "button");
    x.setAttribute("value", "PLAY");
    x.setAttribute("class", "play_button-demo btn btn-primary");
    x.setAttribute("onclick", "wavesurfer_original_src.playPause()");
    colElem.appendChild(x);
    colElem.style.color = txt_color;
    colElem.style.center = true;
    colElem.style.backgroundColor = src_color;
    truthline.appendChild(colElem);

    colElem = document.createElement('td');
    colElem.appendChild(document.createTextNode('Target speaker: '));
    colElem.appendChild(document.createElement('br'));
    colElem.appendChild(document.createTextNode(trgspk))
    colElem.style.color = 'rgb(22, 38, 67)';
    colElem.style.center = true;
    colElem.style.backgroundColor = trg_color;
    truthline.appendChild(colElem);

    colElem = document.createElement('td');
    var waveDiv = document.createElement('div');
    waveDiv.setAttribute("id", "target-uttr-div");
    colElem.appendChild(waveDiv);
    colElem.style.color = txt_color;
    colElem.style.center = true;
    colElem.setAttribute("width", "200px");
    colElem.style.backgroundColor = trg_color;
    truthline.appendChild(colElem);


    colElem = document.createElement('td');
    var x = document.createElement("input");
    x.setAttribute("type", "button");
    x.setAttribute("value", "PLAY");
    x.setAttribute("class", "play_button-demo btn btn-primary");
    x.setAttribute("onclick", "wavesurfer_original_tgt.playPause()");
    colElem.appendChild(x);
    colElem.style.color = txt_color;
    colElem.style.center = true;
    colElem.style.backgroundColor = trg_color;
    truthline.appendChild(colElem);

    tableElem.appendChild(truthline);

    return tableElem
}

function createCvtTable() {
    var tableElem;
    tableElem = document.createElement('table');

    var headline, rowElem, colElem;

    // Header line
    var header_color = 'rgb(204, 255, 204)';

    headline = document.createElement('tr');
    headline.style.backgroundColor = header_color;

    colElem = document.createElement('td');
    colElem.appendChild(document.createTextNode('Model/Representation'));
    colElem.style.color = 'rgb(22, 38, 67)';
    colElem.style.center = true;
    headline.appendChild(colElem);

    colElem = document.createElement('td');
    colElem.appendChild(document.createTextNode('Text'));
    colElem.style.color = 'rgb(22, 38, 67)';
    colElem.style.center = true;
    colElem.setAttribute("colspan", 2)
    headline.appendChild(colElem);

    colElem = document.createElement('td');
    colElem.appendChild(document.createTextNode('BNF'));
    colElem.style.color = 'rgb(22, 38, 67)';
    colElem.style.center = true;
    colElem.setAttribute("colspan", 2)
    headline.appendChild(colElem);

    colElem = document.createElement('td');
    colElem.appendChild(document.createTextNode('VQW2V'));
    colElem.style.color = 'rgb(22, 38, 67)';
    colElem.style.center = true;
    colElem.setAttribute("colspan", 2)
    headline.appendChild(colElem);

    tableElem.appendChild(headline);

    // Converted samples lines

    var bg_color = 'rgb(230, 255, 230)';
    var txt_color = 'rgb(22, 38, 67)';

    var N = models.length;
    var M = reprs.length;
    for (var j = 0; j < N; j++) {

        rowElem = document.createElement('tr');
        rowElem.style.backgroundColor = bg_color;

        colElem = document.createElement('td');
        colElem.appendChild(document.createTextNode(models[j]));
        colElem.style.color = txt_color;
        colElem.style.center = true;
        rowElem.appendChild(colElem);
        
        for (var k = 0; k < M; k++) {
            colElem = document.createElement('td');

            var waveDiv = document.createElement('div');
            colElem.setAttribute("id", 'converted-uttr-' + j + '-' + k + '-div');
            colElem.appendChild(waveDiv);
            colElem.style.color = txt_color;
            colElem.style.center = true;
            colElem.setAttribute("width", "200px");
            rowElem.appendChild(colElem);

            colElem = document.createElement('td');
            var x = document.createElement("input");
            x.setAttribute("type", "button");
            x.setAttribute("value", "PLAY");
            x.setAttribute("class", "play_button-demo btn btn-primary");
            x.setAttribute("onclick", 'wavesurfer_converted[' + j + '][' + k + '].playPause()');
            colElem.appendChild(x);
            colElem.style.color = txt_color;
            colElem.style.center = true;
            
            rowElem.appendChild(colElem);
        }

        tableElem.appendChild(rowElem);

    }

    return tableElem;
}

function fetch_result() {
    $(window).ready(function () {
        srcspk = $("#srcspk").val();
        trgspk = $("#trgspk").val();
        number = $("#number").val();
        
        $("#gt-div").empty();
        $("#gt-div").append(createGtTable());
        $("#cvt-div").empty();
        $("#cvt-div").append(createCvtTable());

        wavesurfer_original_src = WaveSurfer.create({
            container: '#source-uttr-div',
            waveColor: 'violet',
            progressColor: 'purple',
        });
        wavesurfer_original_src.load('./samples/source/' + srcspk + '/E3000' + number + '.wav');
    
        wavesurfer_original_tgt = WaveSurfer.create({
            container: '#target-uttr-div',
            waveColor: 'violet',
            progressColor: 'purple',
        });
    
        wavesurfer_original_tgt.load('./samples/target/' + trgspk + '/E3000' + number + '.wav');
    
        for (var j = 0; j < models.length; j++) {
            for (var k = 0; k < reprs.length; k++) {
                wavesurfer_converted[j][k] = WaveSurfer.create({
                    container: '#converted-uttr-' + j + '-' + k + '-div',
                    waveColor: 'violet',
                    progressColor: 'purple',
                });
    
                wavesurfer_converted[j][k].load("./samples/" + reprs[k].toLowerCase() + "/" + model_mapping[models[j]] + "/" + trgspk + '/' + srcspk + "_E3000" + number + ".wav");
            }
        }
        unlock();
    });
}

function record(sel) {
    lock();
    fetch_result();
}

window.addEventListener('popstate', function (e) {
    preload(e.state["srcspk"], e.state["trgspk"], e.state["number"], false);
});
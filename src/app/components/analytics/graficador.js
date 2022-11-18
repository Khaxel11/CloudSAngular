    var div='myDiv';
    var trace1 = {
        //x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'lines',
      };

    var data = [trace1];    
    Plotly.newPlot(div, data, {}, {showSendToCloud: true});
    document.getElementById("btnAgregar").onclick=function(){
        var y = Math.floor(Math.random() * 15) + 1;
        Plotly.extendTraces(div,{y: [[y]]}, [0]);
    }

  
var years = ['DKI Jakarta','Kalimantan Selatan','Yogyakarta','Kep. Riau','Maluku Utara','Maluku','Riau','Aceh','Bengkulu','Sulawesi Barat','Jambi','Gorontalo','Sulawesi Tengah','Banten','Lampung','Sumatera Barat','Kalimantan Barat','Sulawesi Utara','Bali','Sulawesi Tenggara','Kalimantan Timur','NTB','Kalimantan Tengah','Jawa Barat','Jawa Tengah','Bangka Belitung','Sulawesi Selatan','NTT','Sumatera Utara','Papua Barat','Kalimantan Utara','Sumatera Selatan',' Jawa Timur','Papua'];
// For drawing the lines
var data16 = [22.3,9.8,9.7,9.6,9.2,8.4,8.2,8.1,7.6,7.4,7.2,6.6,5.9,5.7,4.7,4.1,3.9,3.7,3.7,3.4,3.2,3.1,3,2.9,2.9,2.9,2.9,2.7,2.5,2.3,2.2,2,1.7,1.4];
var data15 = [19.5,9.1,9,8.7,6.4,8,6.6,9.3,8.1,5.4,8.8,7.6,5.1,4.4,8.5,4.2,3.6,3.7,4.5,4.2,3.6,2,5.1,2.2,2.3,2.1,3,2.2,3.4,1.3,2.7,3.9,2.2,0.9];

var randomColorGenerator = function () { 
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};

var ctx = document.getElementById("chart16");
		var chart16 = new Chart(ctx, {
		  type: 'horizontalBar',
		  data: {
			labels: years,
			datasets: [			  
			  { 
				data: data16,
				label: "2016",
				borderColor: "#ff0000", //566573
				fill: false,
				backgroundColor: "#f87736"
			  }
			]
		  },
			options: {"hover": {
        	"animationDuration": 0
				},
				"animation": {
					"duration": 1,
								"onComplete": function () {
									var chartInstance = this.chart,
										ctx = chartInstance.ctx;
									
									ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
									ctx.textAlign = 'left';
									ctx.textBaseline = 'bottom';

									this.data.datasets.forEach(function (dataset, i) {
										var meta = chartInstance.controller.getDatasetMeta(i);
										meta.data.forEach(function (bar, index) {
											var data = dataset.data[index];                            
											ctx.fillText( '  ' + data + ' %', bar._model.x, bar._model.y - -7);
										});
									});
								}
				},
					legend: {
					"display": true
				},
				tooltips: {
					"enabled": false,
					  callbacks: {
						title: function(tooltipItem, data) {
						  return data['labels'][tooltipItem[0]['index']];
						},
						label: function(tooltipItem, data) {
						  return data['datasets'][0]['data'][tooltipItem['index']];
						},
						afterLabel: function(tooltipItem, data) {
						  var dataset = data['datasets'][0];
						  var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
						  return '(' + percent + '%)';
						}
					  },
					  backgroundColor: '#FFF',
					  titleFontSize: 16,
					  titleFontColor: '#0066ff',
					  bodyFontColor: '#000',
					  bodyFontSize: 14,
					  displayColors: true
				 },
				scales:
				{
					xAxes: [{
						stacked: true,
						display: false,
						gridLines: {
							drawBorder: false,
						},
					}],
					yAxes: [{
						gridLines : {
							display : false,
							drawBorder: false
						}
					}]
				}
			}
		});		

var ctx = document.getElementById("chart15");
var chart15 = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
    labels: years,
    datasets: [			  
      { 
        data: data15,
        label: "2015",
        borderColor: "#8e5ea2",
        fill: false,
        backgroundColor: [
          "#566573"
        ]
      }
    ]
  },
    options: {
        scales:
        {
            xAxes: [{
                stacked: true,
                display: false,
                gridLines: {
                    drawBorder: false,
                },
            }],
            yAxes: [{
                gridLines : {
                    display : false,
                    drawBorder: false
                }
            }]
        }
    }
});		           


(function () {
    
            var tinggi = 430, lebar = 800;
    
            function sd() {
                    //var popDomain = ([ 0, 10, 20, 30, 40, 50, 60, 70, 100]);
                    var popDomain = [0, 5, 10, 15, 20, 25, 30];
                    var popColor = d3.scaleThreshold().domain(popDomain).range(['#000', '#17b42a', '#93df34', '#e9c50b', '#e67b18', '#ff2a00', '#b81400']);
                    // .range(d3.schemePiYG[8]);f03c18
    
                    var sd = d3.map();
                    var svg = d3.select('#mapContainer').append('svg').attr('class', 'blockMap').attr('width', lebar).attr('height', tinggi);
    
                    // Tooltip
                    var offsetL = document.getElementById('mapContainer').offsetLeft + 20;
                    var offsetT = document.getElementById('mapContainer').offsetTop - 5;
    
                    var tooltip = d3.select('#mapContainer').append('div').attr('class', 'balontip sembunyikan');
    
                    d3.queue().defer(d3.json, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/map.json').defer(d3.csv, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/kondisi_ruang_kelas_sd.csv', function (d) {
                            if (isNaN(d.PCT_BERAT)) {
                                    sd.set(d.KODE_KAB, 'No Value');
                            } else {
                                    sd.set(d.KODE_KAB, +d.PCT_BERAT);
                            }
                    }).await(ready);
    
                    function showTooltip(d) {
                            var kabupaten = d.properties.KABKOT,
                                pct_berat = d.PCT_BERAT;
                            var mouse = d3.mouse(svg.node()).map(function (d) {
                                    return parseInt(d);
                            });
    
                            tooltip.classed('sembunyikan', false).attr('style', 'left:' + (mouse[0] + offsetL) + 'px;top:' + (mouse[1] + offsetT) + 'px').html('<p>KABUPATEN: ' + kabupaten + '<br/> Persentase: ' + pct_berat + '%</p>');
                    }
    
                    function ready(err, data) {
                            if (err) throw err;
    
                            var indo = topojson.feature(data, {
                                    type: 'GeometryCollection',
                                    geometries: data.objects.idn_kab.geometries
                            });
    
                            var proyeksi = d3.geoMercator().fitExtent([[2, 2], [650, 430]], indo);
    
                            var gPath = d3.geoPath().projection(proyeksi);
    
                            d3.select('svg.blockMap').selectAll('path').data(indo.features).enter().append('path').attr('d', gPath).attr('class', 'idnDistrict').attr('stroke', '#FFF').on('mousemove', showTooltip).on('mouseout', function (d, i) {
                                    tooltip.classed('sembunyikan', true);
                            }).attr('id', function (d) {
                                    return d.properties.KODE_KAB;
                            }).attr('fill', function (d) {
                                    if (isNaN(d.PCT_BERAT = sd.get(d.properties.KODE_KAB))) {
                                            return '#ddd';
                                    } else {
                                            return popColor(d.PCT_BERAT = sd.get(d.properties.KODE_KAB));
                                    }
                            });
                    }
            }
    
            function smp() {
                    var popDomain = [0, 5, 10, 15, 20, 25, 30];
                    var popColor = d3.scaleThreshold().domain(popDomain).range(['#000', '#17b42a', '#93df34', '#e9c50b', '#e67b18', '#ff2a00', '#b81400']);
    
                    var smp = d3.map();
                    var svg = d3.select('#mapContainer2').append('svg').attr('class', 'blockMap2').attr('width', lebar).attr('height', tinggi);
    
                    // Tooltip
                    var offsetL2 = document.getElementById('mapContainer2').offsetLeft + 20;
                    var offsetT2 = document.getElementById('mapContainer2').offsetTop - 5;
    
                    var tooltip2 = d3.select('#mapContainer2').append('div').attr('class', 'balontip sembunyikan');
    
                    d3.queue().defer(d3.json, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/map.json').defer(d3.csv, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/kondisi_ruang_kelas_smp.csv', function (d) {
                            if (isNaN(d.PCT_BERAT)) {
                                    smp.set(d.KODE_KAB, 'No Value');
                            } else {
                                    smp.set(d.KODE_KAB, +d.PCT_BERAT);
                            }
                    }).await(ready);
    
                    function showTooltip2(d) {
                            var kabupaten = d.properties.KABKOT,
                                pct_berat = d.PCT_BERAT;
                            var mouse = d3.mouse(svg.node()).map(function (d) {
                                    return parseInt(d);
                            });
    
                            tooltip2.classed('sembunyikan', false).attr('style', 'left:' + (mouse[0] + offsetL2) + 'px;top:' + (mouse[1] + offsetT2) + 'px').html('<p>KABUPATEN: ' + kabupaten + '<br/> Persentase: ' + pct_berat + '%</p>');
                    }
    
                    function ready(err, data) {
                            if (err) throw err;
    
                            var indo = topojson.feature(data, {
                                    type: 'GeometryCollection',
                                    geometries: data.objects.idn_kab.geometries
                            });
    
                            var proyeksi = d3.geoMercator().fitExtent([[2, 2], [650, 430]], indo);
    
                            var gPath = d3.geoPath().projection(proyeksi);
    
                            d3.select('svg.blockMap2').selectAll('path').data(indo.features).enter().append('path').attr('d', gPath).attr('class', 'idnDistrict').attr('stroke', '#FFF').on('mousemove', showTooltip2).on('mouseout', function (d, i) {
                                    tooltip2.classed('sembunyikan', true);
                            }).attr('id', function (d) {
                                    return d.properties.KODE_KAB;
                            }).attr('fill', function (d) {
                                    if (isNaN(d.PCT_BERAT = smp.get(d.properties.KODE_KAB))) {
                                            return '#ddd';
                                    } else {
                                            return popColor(d.PCT_BERAT = smp.get(d.properties.KODE_KAB));
                                    }
                            });
                    }
            }
    
            function sma() {
                    var popDomain = [0, 5, 10, 15, 20, 25, 30];
                    var popColor = d3.scaleThreshold().domain(popDomain).range(['#000', '#17b42a', '#93df34', '#e9c50b', '#e67b18', '#ff2a00', '#b81400']);
    
                    var sma = d3.map();
                    var svg = d3.select('#mapContainer3').append('svg').attr('class', 'blockMap3').attr('width', lebar).attr('height', tinggi);
    
                    // Tooltip
                    var offsetL3 = document.getElementById('mapContainer3').offsetLeft + 20;
                    var offsetT3 = document.getElementById('mapContainer3').offsetTop - 5;
    
                    var tooltip3 = d3.select('#mapContainer3').append('div').attr('class', 'balontip sembunyikan');
    
                    d3.queue().defer(d3.json, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/map.json').defer(d3.csv, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/kondisi_ruang_kelas_sma.csv', function (d) {
                            if (isNaN(d.PCT_BERAT)) {
                                    sma.set(d.KODE_KAB, 'No Value');
                            } else {
                                    sma.set(d.KODE_KAB, +d.PCT_BERAT);
                            }
                    }).await(ready);
    
                    function showTooltip3(d) {
                            var kabupaten = d.properties.KABKOT,
                                pct_berat = d.PCT_BERAT;
                            var mouse = d3.mouse(svg.node()).map(function (d) {
                                    return parseInt(d);
                            });
    
                            tooltip3.classed('sembunyikan', false).attr('style', 'left:' + (mouse[0] + offsetL3) + 'px;top:' + (mouse[1] + offsetT3) + 'px').html('KABUPATEN: ' + kabupaten + '<br/> Persentase: ' + pct_berat + '%</p>');
                    }
    
                    function ready(err, data) {
                            if (err) throw err;
    
                            var indo = topojson.feature(data, {
                                    type: 'GeometryCollection',
                                    geometries: data.objects.idn_kab.geometries
                            });
    
                            var proyeksi = d3.geoMercator().fitExtent([[2, 2], [650, 430]], indo);
    
                            var gPath = d3.geoPath().projection(proyeksi);
    
                            d3.select('svg.blockMap3').selectAll('path').data(indo.features).enter().append('path').attr('d', gPath).attr('class', 'idnDistrict').attr('stroke', '#FFF').on('mousemove', showTooltip3).on('mouseout', function (d, i) {
                                    tooltip3.classed('sembunyikan', true);
                            }).attr('id', function (d) {
                                    return d.properties.KODE_KAB;
                            }).attr('fill', function (d) {
                                    if (isNaN(d.PCT_BERAT = sma.get(d.properties.KODE_KAB))) {
                                            return '#ddd';
                                    } else {
                                            return popColor(d.PCT_BERAT = sma.get(d.properties.KODE_KAB));
                                    }
                            });
                    }
            }
    
            function smk() {
                    var popDomain = [0, 5, 10, 15, 20, 25, 30];
                    var popColor = d3.scaleThreshold().domain(popDomain).range(['#000', '#17b42a', '#93df34', '#e9c50b', '#e67b18', '#ff2a00', '#b81400']);
    
                    var smk = d3.map();
                    var svg = d3.select('#mapContainer4').append('svg').attr('class', 'blockMap4').attr('width', lebar).attr('height', tinggi);
    
                    // Tooltip
                    var offsetL4 = document.getElementById('mapContainer4').offsetLeft + 20;
                    var offsetT4 = document.getElementById('mapContainer4').offsetTop - 5;
    
                    var tooltip4 = d3.select('#mapContainer4').append('div').attr('class', 'balontip sembunyikan');
    
                    d3.queue().defer(d3.json, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/map.json').defer(d3.csv, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/kondisi_ruang_kelas_smk.csv', function (d) {
                            if (isNaN(d.PCT_BERAT)) {
                                    smk.set(d.KODE_KAB, 'No Value');
                            } else {
                                    smk.set(d.KODE_KAB, +d.PCT_BERAT);
                            }
                    }).await(ready);
    
                    function showTooltip4(d) {
                            var kabupaten = d.properties.KABKOT,
                                pct_berat = d.PCT_BERAT;
                            var mouse = d3.mouse(svg.node()).map(function (d) {
                                    return parseInt(d);
                            });
    
                            tooltip4.classed('sembunyikan', false).attr('style', 'left:' + (mouse[0] + offsetL4) + 'px;top:' + (mouse[1] + offsetT4) + 'px').html('KABUPATEN: ' + kabupaten + '<br/> Persentase: ' + pct_berat + '%</p>');
                    }
    
                    function ready(err, data) {
                            if (err) throw err;
    
                            var indo = topojson.feature(data, {
                                    type: 'GeometryCollection',
                                    geometries: data.objects.idn_kab.geometries
                            });
    
                            var proyeksi = d3.geoMercator().fitExtent([[2, 2], [650, 430]], indo);
    
                            var gPath = d3.geoPath().projection(proyeksi);
    
                            d3.select('svg.blockMap4').selectAll('path').data(indo.features).enter().append('path').attr('d', gPath).attr('class', 'idnDistrict').attr('stroke', '#FFF').on('mousemove', showTooltip4).on('mouseout', function (d, i) {
                                    tooltip4.classed('sembunyikan', true);
                            }).attr('id', function (d) {
                                    return d.properties.KODE_KAB;
                            }).attr('fill', function (d) {
                                    if (isNaN(d.PCT_BERAT = smk.get(d.properties.KODE_KAB))) {
                                            return '#ddd';
                                    } else {
                                            return popColor(d.PCT_BERAT = smk.get(d.properties.KODE_KAB));
                                    }
                            });
                    }
            }
    
            function slb() {
                    var popDomain = [0, 5, 10, 15, 20, 25, 30];
                    var popColor = d3.scaleThreshold().domain(popDomain).range(['#000', '#17b42a', '#93df34', '#e9c50b', '#e67b18', '#ff2a00', '#b81400']);
    
                    var slb = d3.map();
                    var svg = d3.select('#mapContainer5').append('svg').attr('class', 'blockMap5').attr('width', lebar).attr('height', tinggi);
    
                    // Tooltip
                    var offsetL5 = document.getElementById('mapContainer5').offsetLeft + 20;
                    var offsetT5 = document.getElementById('mapContainer5').offsetTop - 5;
    
                    var tooltip5 = d3.select('#mapContainer5').append('div').attr('class', 'balontip sembunyikan');
    
                    d3.queue().defer(d3.json, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/map.json').defer(d3.csv, 'https://raw.githubusercontent.com/farreldev/cdn-vendor/master/data/kondisi_ruang_kelas_slb.csv', function (d) {
                            if (isNaN(d.PCT_BERAT)) {
                                    slb.set(d.KODE_KAB, 'No Value');
                            } else {
                                    slb.set(d.KODE_KAB, +d.PCT_BERAT);
                            }
                    }).await(ready);
    
                    function showTooltip5(d) {
                            var kabupaten = d.properties.KABKOT,
                                pct_berat = d.PCT_BERAT;
                            var mouse = d3.mouse(svg.node()).map(function (d) {
                                    return parseInt(d);
                            });
    
                            tooltip5.classed('sembunyikan', false).attr('style', 'left:' + (mouse[0] + offsetL5) + 'px;top:' + (mouse[1] + offsetT5) + 'px').html('KABUPATEN: ' + kabupaten + '<br/> Persentase: ' + pct_berat + '%</p>');
                    }
    
                    function ready(err, data) {
                            if (err) throw err;
    
                            var indo = topojson.feature(data, {
                                    type: 'GeometryCollection',
                                    geometries: data.objects.idn_kab.geometries
                            });
    
                            var proyeksi = d3.geoMercator().fitExtent([[2, 2], [650, 430]], indo);
    
                            var gPath = d3.geoPath().projection(proyeksi);
    
                            d3.select('svg.blockMap5').selectAll('path').data(indo.features).enter().append('path').attr('d', gPath).attr('class', 'idnDistrict').attr('stroke', '#FFF').on('mousemove', showTooltip5).on('mouseout', function (d, i) {
                                    tooltip5.classed('sembunyikan', true);
                            }).attr('id', function (d) {
                                    return d.properties.KODE_KAB;
                            }).attr('fill', function (d) {
                                    if (isNaN(d.PCT_BERAT = slb.get(d.properties.KODE_KAB))) {
                                            return '#ddd';
                                    } else {
                                            return popColor(d.PCT_BERAT = slb.get(d.properties.KODE_KAB));
                                    }
                            });
                    }
            }
    
            sd();
            smp();
            sma();
            smk();
            slb();
    })();
    //# sourceMappingURL=all-map.js.map
    
    
    	           
    
        
          var ctx = document.getElementById("chartpddk");
    var chartpddk = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [2010,2011,2012,2013,2014,2015,2016,2017],
        datasets: [
          { 
            data: [225.2,266.9,310.8,345.3,375.4,408.5,416.6,416.1],
            label: "Anggaran Pendidikan",
            borderColor: "#e8c3b9",
            backgroundColor: "#4082c4",
            fill: true
          }
        ]
      },
        responsive: true,
        options: {
        //https://jsfiddle.net/4mxhogmd/1/
        "hover": {
        "animationDuration": 0
            },
            "animation": {
                "duration": 1,
                            "onComplete": function () {
                                var chartInstance = this.chart,
                                    ctx = chartInstance.ctx;
                                
                                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
    
                                this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];                            
                                        ctx.fillText(data, bar._model.x, bar._model.y - 9);
                                    });
                                });
                            }
            },
                legend: {
                "display": false
            },
            tooltips: {
                "enabled": false
             },
     
            scales:
            {
                xAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: 'Anggaran Pendidikan yang Dialokasikan Setiap Tahun',
                            fontColor: "#cchh11"
                          },
                    stacked: false,
                    display: true,
                    gridLines : {
                        display : false,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    stacked: true,
                    display: false,
                    gridLines : {
                        display : false,
                        drawBorder: false
                    }
                }]
            }, 
            legend: {
                display: false,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
             
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return "Rp. " + Number(tooltipItem.yLabel) + " triliun";
                    },
                    labelColor: function(tooltipItem, chart) {
                        return {
                            borderColor: 'rgb(255, 0, 0)',
                            backgroundColor: 'rgb(255, 0, 0)'
                        }
                    },
                    labelTextColor:function(tooltipItem, chart){
                        return '#543453';
                    }
                }
            }				
        }
    });
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
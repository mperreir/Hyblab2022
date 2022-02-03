Chart.register(ChartDataLabels);
//bar
function bar(id, ville, data) {
  const databar = {
    labels: [
      ville + ' ' + data[0],
      'france ' + data[1]
    ],
    datasets: [{
      labels: [
        ville + ' ' + data[0],
        'france ' + data[1]
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      data: data,
    }]
  };

  const configbar = {
    label: "vile",
    type: 'bar',
    data: databar,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
          formatter: function (value, context) {

            return context.dataset.labels[context.dataIndex];
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          position: 'top',
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
        y: {
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          reverse: true,
          ticks: {
            display: false
          }
        },
      }
    }
  };

  const bar = new Chart(
    document.getElementById(id),
    configbar
  );
}


// pie
function pie(id, ville, data) {
  const datapie = {
    datasets: [{
      labels: [
        ville + ' ' + data[0],
        'france ' + data[1]
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      data: data,
    }]
  };

  const configpie = {
    type: 'pie',
    data: datapie,
    options: {
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
          formatter: function (value, context) {

            return context.dataset.labels[context.dataIndex];
          }
        },
      }
    }
  };

  const pie = new Chart(
    document.getElementById(id),
    configpie
  );
}



//donut
function donut(id, ville, data) {
  const datadonut = {
    datasets: [{
      labels: [
        ville + ' ' + data[0],
        'france ' + data[1]
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      data: data,
    }]
  };

  const configdonut = {
    type: 'doughnut',
    data: datadonut,
    options: {
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
          formatter: function (value, context) {

            return context.dataset.labels[context.dataIndex];
          }
        },
      }

    }
  };

  const donut = new Chart(
    document.getElementById(id),
    configdonut
  );
}


//circle
function circle(id, ville, data) {
  const datacircle = {
    datasets: [{
      labels: [
        ville + ' ' + data[0],
        'france ' + data[1]
      ],
      data: [{
        x: Math.max(...data) / 20,
        y: Math.max(...data) / 20,
        r: data[0]
      }, {
        x: Math.max(...data) / 20 * 3,
        y: Math.max(...data) / 20,
        r: data[1]
      }],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
    }]
  };

  const configcircle = {
    type: 'bubble',
    data: datacircle,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          suggestedMin: 0,
          suggestedMax: 10,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 10,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
      },
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
          formatter: function (value, context) {

            return context.dataset.labels[context.dataIndex];
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.labels[context.dataIndex];
              return label;
            }
          }
        }
      }
    }
  }

  const circle = new Chart(
    document.getElementById(id),
    configcircle
  );
}


function calculate(data) {
  renderData = []
  renderColor = []
  for (i = 0; i < data[0]; i++) {
    d = {
      x: i % 3,
      y: Math.floor(i / 3),
      r: 10
    };
    renderData.push(d);
    renderColor.push('rgb(255, 99, 132)');
  }
  renderData.push({
    x: data[0] % 3,
    y: Math.floor(data[0] / 3),
    r: Math.floor((data[0] - Math.floor(data[0])) * 10)
  })
  renderColor.push('rgb(255, 99, 132)');

  for (i = 0; i < data[1]; i++) {
    d = {
      x: i % 3 + 4,
      y: Math.floor(i / 3),
      r: 10
    };
    renderData.push(d);
    renderColor.push('rgb(54, 162, 235)');
  }
  renderData.push({
    x: Math.floor(data[1]) % 3 + 5,
    y: Math.floor(data[1] / 3),
    r: Math.floor((data[1] - Math.floor(data[1])) * 10)
  });
  renderColor.push('rgb(54, 162, 235)');
  return ([renderData, renderColor]);

}

function multipledot(id, ville, data) {
  const render = calculate(data);
  const renderData = render[0];
  const renderColor = render[1]
  const datadot = {
    datasets: [{
      initialData: data,
      labels: [
        ville + ' ' + data[0],
        'france ' + data[1]
      ],
      data: renderData,
      backgroundColor: renderColor,
    }]
  };

  var configdot = {
    type: 'bubble',
    data: datadot,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          suggestedMin: 0,
          suggestedMax: 6,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
        y: {
          suggestedMin: 0,
          suggestedMax: Math.floor(Math.max(...data) / 3) + 1,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
      },
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
          formatter: function (value, context) {
            let appearance1 = {
              x: 1,
              y: Math.floor(context.dataset.initialData[0] / 6),
            }
            let appearance2 = {
              x: 5,
              y: Math.floor(context.dataset.initialData[1] / 6),
            }
            console.log(value, appearance1)
            if (value.x === appearance1.x && value.y === appearance1.y) {
              return context.dataset.labels[0];
            }
            else if (value.x === appearance2.x && value.y === appearance2.y) {
              return context.dataset.labels[1];
            }
            else {
              return '';
            }
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label;
              if (context.dataIndex < data[0]) {
                label = context.dataset.labels[0];
              }
              else {
                label = context.dataset.labels[1];
              }

              return label;
            }
          }
        }
      }

    }
  }
  var circle = new Chart(
    document.getElementById(id),
    configdot
  );
}

function barage(id, data) {
  const databar = {
    labels: [
      '-11',
      '11-17',
      '18-24',
      '25-39',
      '40-54',
      '55-64',
      '65-79',
      '80+'
    ],
    datasets: [{
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(255, 159, 64)',
        'rgba(255, 205, 86)',
        'rgba(75, 192, 192)',
        'rgba(54, 162, 235)',
        'rgba(153, 102, 255)',
        'rgba(201, 203, 207)',
        'rgba(100, 100, 255)'
      ],
      data: data,
    }]
  };

  const configbar = {
    label: "tranche d'âge",
    type: 'bar',
    data: databar,
    plugins: [ChartDataLabels],
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      scales: {
        x: {
          display: false,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          }
        },
        y: {

          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          }
        }
      },
      responsive: true,
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
        },
        legend: {
          display: false,
        },
      }
    },

  };

  const bar = new Chart(
    document.getElementById(id),
    configbar
  );
}


function metierdot(id, data) {
  const ligne = Math.max(...data);
  const diago = Math.sqrt(2) * Math.max(...data) / 2;
  const center = ligne;
  const datadot = {
    datasets: [{
      labels: [
        'agriculteurs ' + data[0],
        'artisans ' + data[1],
        'cadres ' + data[2],
        'intermédiaire ' + data[3],
        'employés ' + data[4],
        'ouvriers ' + data[5],
        'retraités ' + data[6],
        'sans activité ' + data[7],

      ],
      data: [
        {
          x: center + ligne,
          y: center,
          r: data[0] * 3
        },
        {
          x: center - ligne,
          y: center,
          r: data[1] * 3
        },
        {
          x: center,
          y: center + ligne,
          r: data[2] * 3
        },
        {
          x: center,
          y: center - ligne,
          r: data[3] * 3
        },
        {
          x: center + diago,
          y: center + diago,
          r: data[4] * 3
        },
        {
          x: center + diago,
          y: center - diago,
          r: data[5] * 3
        },
        {
          x: center - diago,
          y: center + diago,
          r: data[6] * 3
        },
        {
          x: center - diago,
          y: center - diago,
          r: data[7] * 3
        }],
      backgroundColor: [
        '#FF2E00',
        '#E12D20',
        '#C32D3F',
        '#A52C5F',
        '#882B7F',
        '#6A2A9E',
        '#4C2ABE',
        '#2E29DD'
      ],
    }]
  };

  var configdot = {
    type: 'bubble',
    data: datadot,
    options: {
      scales: {
        x: {
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
        y: {
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
      },
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'center',
          formatter: function (value, context) {

            return context.dataset.labels[context.dataIndex];
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.labels[context.dataIndex];
              return label;
            }
          }
        }
      }

    }
  }
  const circle = new Chart(
    document.getElementById(id),
    configdot
  );
}

function popdot(id, data) {
  const ligne = Math.max(...data) / (2 * data[0]);
  const diago = Math.sqrt(2) * Math.max(...data) / (4 * data[0]);
  const center = Math.max(...data);
  const datadot = {
    datasets: [{
      label: [
        'population ' + data[0],
      ],
      data: [{
        x: center,
        y: center,
        r: data[0] * 2
      }],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
    },
    {
      label: [
        'non votants ' + data[1],
      ],
      data: [{
        x: center + 4 * diago,
        y: center + 4 * diago,
        r: data[1] * 2
      }],
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
      ],
    },
    {
      label: [
        'abstentionnistes ' + data[2],
      ],
      data: [{
        x: center,
        y: center - 4 * ligne,
        r: data[2] * 2
      }],
      backgroundColor: [
        'rgba(54, 162, 235, 1)'
      ],
    },
    {
      label: [
        'vote blancs/nuls ' + data[3],
      ],
      data: [{
        x: center - 4 * diago,
        y: center + 4 * diago,
        r: data[3] * 2
      }],
      backgroundColor: [
        'rgba(100, 100, 255, 1)'
      ],
    }]
  };

  const configdot = {
    type: 'bubble',
    data: datadot,
    options: {
      scales: {
        x: {
          suggestedMin: center - 3 * ligne,
          suggestedMax: center + 3 * ligne,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
        y: {
          suggestedMin: center - 3 * ligne,
          suggestedMax: center + 3 * ligne,
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: 0,
          },
          ticks: {
            display: false
          }
        },
      },
      plugins: {
        datalabels: {
          labels: {
            value: {
              color: 'black',
            }
          },
          font: {
            size: '20'
          },
          anchor: 'end',
          formatter: function (value, context) {

            return context.dataset.label[context.dataIndex];
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.labels[context.dataIndex];
              return label;
            }
          }
        }
      }

    }
  }

  const circle = new Chart(
    document.getElementById(id),
    configdot
  );
}

function beforePrintHandler() {
  for (var id in Chart.instances) {
    Chart.instances[id].resize()
  }
}

/*
donut("donut",'nantes',[45,20]);
pie("pie","toulouse",[30,45]);
bar("bar","nantes",[130,54]);
circle("circle",'paris',[50,35]);
multipledot("dot",'marseille',[20,25.73]);
barage("barage",[10,15,12,11.2,11.8,14,17,19]);
metierdot("dotmetier",[10,15,12,11.2,11.8,14,17,19]);
popdot("popdot",[100,20,40,15])

dat = calculate([20,25]);
console.log(dat);
*/
function createChart(currentPokemon) {
    let stat = currentPokemon["stats"];
    const data = {
      labels: ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"],
      datasets: [
        {
          label: "Base Stats",
          data: [stat[0]["base_stat"], stat[1]["base_stat"], stat[2]["base_stat"], stat[3]["base_stat"], stat[4]["base_stat"], stat[5]["base_stat"]],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    };
  
    createBaseStatsChart(data);
  }

  function createBaseStatsChart(data) {
    if (myChart) {
      // If a chart instance exists, destroy it
      myChart.destroy();
    }
  
    myChart = new Chart(document.getElementById("baseStats"), {
      type: "radar",
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.dataset.data[context.dataIndex];
                return value;
              },
            },
          },
        },
        options: {
          layout: {
            padding: -50,
          },
        },
      },
    });
  }
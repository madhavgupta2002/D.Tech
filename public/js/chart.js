
function CreateGraph(data) {
    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
      type: 'line',
      backgroundColor: 'rgba(01, 10, 10, 0.1)',

      data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        datasets: [{
          label: 'GPA',
          data: [data.s1, data.s2, data.s3, data.s4],
          borderWidth: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
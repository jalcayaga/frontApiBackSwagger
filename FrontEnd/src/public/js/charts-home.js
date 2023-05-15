// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Configurar y mostrar el gráfico
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("productStatsChart").getContext("2d");

  const data = [];
  const labels = [];

  for (const item of window.productStatsData) {
    data.push(item.product_count);

    const [year, month] = item.month.split("-");
    labels.push(
      capitalizeFirstLetter(
        new Date(year, month - 1).toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        })
      )
    );
  }

  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Cantidad de productos",
          data: data,
          backgroundColor: "rgba(40, 167, 69, 0.2)",
          borderColor: "rgba(40, 167, 69, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  var chart = {
    responsive: true,
  };
});
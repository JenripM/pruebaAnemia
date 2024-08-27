import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { config } from "@/lib/config";

// Configuración de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface NivelAnemiaChartProps {
  pacienteId: string; // Define el tipo que corresponda según tu API
  nivelAnemia: string; // O el tipo que sea apropiado (puede ser un enum, por ejemplo)
}

const NivelAnemiaChart: React.FC<NivelAnemiaChartProps> = ({ pacienteId, nivelAnemia }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[], // O el tipo que corresponda según tu API
    datasets: [
      {
        label: "Hemoglobina",
        data: [] as number[], // O el tipo que corresponda
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Peso",
        data: [] as number[], // O el tipo que corresponda
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
      {
        label: "Estatura",
        data: [] as number[], // O el tipo que corresponda
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.backendUrl}/diagnosticos/estadisticas/paciente/${pacienteId}`
        );

        const data = response.data[nivelAnemia].diagnosticos.data;

        const labels = data.map((diagnostico: { created_at: string | number | Date; }) =>
          new Date(diagnostico.created_at).toLocaleDateString()
        );
        const hemoglobina = data.map((diagnostico: { hemoglobina: number }) => diagnostico.hemoglobina);
        const peso = data.map((diagnostico: { peso: number }) => diagnostico.peso);
        const estatura = data.map((diagnostico: { talla: number }) => diagnostico.talla);

        setChartData({
          labels,
          datasets: [
            {
              label: "Hemoglobina",
              data: hemoglobina,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
            {
              label: "Peso",
              data: peso,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
            {
              label: "Estatura",
              data: estatura,
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (pacienteId && nivelAnemia) {
      fetchData();
    }
  }, [pacienteId, nivelAnemia]);

  return (
    <div>
      <h2>Datos del Nivel de Anemia: {nivelAnemia}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default NivelAnemiaChart;

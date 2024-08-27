import React, { useState, useEffect, useContext } from "react";
import { Divider, List } from "antd";
import axios from "axios";
import { PacientesContext } from "@/providers/pacientesContext";
import { useSession } from "next-auth/react";
import { config } from "@/lib/config";


const App: React.FC = () => {
  const context = useContext(PacientesContext);

  // Manejar el caso en que el contexto es undefined
  if (!context) {
    return <div>Loading...</div>; // O cualquier otro mensaje o componente que indique que el contexto está cargando
  }
  const { pacientes } = context;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refreshPacientes, setRefreshPacientes] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Función para obtener datos de la API
    const fetchPacientes = async () => {
      try {
        if (session && session.idApoderado) {
          const response = await axios.get(
            `${config.backendUrl}/pacientes/apoderado/${session.idApoderado}`
          );
          setRefreshPacientes(response.data);
        }
        //agregarPaciente(response.data);
      } catch (error) {
        console.error("Error fetching provincias:", error);
      }
    };

    fetchPacientes();
  }, [pacientes, session]);

  return (
    <>
      <div style={{ padding: "25px" }}>
        <Divider orientation="left">Listado de pacientes:</Divider>
        <List
          size="small"
          bordered
          dataSource={refreshPacientes}
        />
      </div>
    </>
  );
};

export default App;

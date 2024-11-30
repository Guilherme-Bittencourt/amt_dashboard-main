import React from "react";
import { Event } from "../components/Event";
// import { Link } from "react-router-dom";

import UploadFileIcon from "../icons/upload_file.svg";
import ExportDashboardIcon from "../icons/export_dashboard.svg";
import GenerateReportIcon from "../icons/generate_report.svg";
import RequestIcon from "../icons/request_icon.svg";
import AnalysisIcon from "../icons/analysis_icon.svg";

export function EventRegister() {
  const eventItems = [
    {
      icon: UploadFileIcon,
      option: "escolher arquivo",
      user: "por sistema",
      date: "15/06/2024",
      hour: "4:43 pm",
    },
    {
      icon: ExportDashboardIcon,
      option: "exportar dashboard",
      user: "por sistema",
      date: "15/06/2024",
      hour: "4:43 pm",
    },
    {
      icon: GenerateReportIcon,
      option: "gerar relatório",
      user: "por sistema",
      date: "15/06/2024",
      hour: "4:43 pm",
    },
    {
      icon: RequestIcon,
      option: "registro de eventos",
      user: "por sistema",
      date: "15/06/2024",
      hour: "4:43 pm",
    },
    {
      icon: AnalysisIcon,
      option: "resetar dashboard",
      user: "por sistema",
      date: "15/06/2024",
      hour: "4:43 pm",
    },
  ];

  return (
    <>
      <div>
        <div className="bg-secondary h-screen min-h-screen w-screen font-outfit font-bold">
          <div className="flex flex-col">
            <h1 className="mt-6 ml-8 mb-6 text-white uppercase">
              Registro de Eventos
            </h1>
          </div>
          <div className="flex-grow">
            {eventItems.map((item, index) => (
              <Event
                key={index}
                icon={item.icon}
                option={item.option}
                user={item.user}
                date={item.date}
                hour={item.hour}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

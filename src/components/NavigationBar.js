import React, { useState } from "react";
import logo from "../logo_amt.svg";
import { MenuOptions } from "./MenuOptions";
import { ChooseFileModal } from "../components/ChooseFileModal";

import UploadFileIcon from "../icons/upload_file.svg";
import ExportDashboardIcon from "../icons/export_dashboard.svg";
import GenerateReportIcon from "../icons/generate_report.svg";
import EventsRegistrationIcon from "../icons/event_registration.svg";
import ResetDashboard from "../icons/reset_dashboard.svg";
import DashboardIcon from "../icons/dashboard_icon.svg";
import LogoutIcon from "../icons/logout_icon.svg";
import UserIcon from "../icons/person_icon.svg";

export function NavigationBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const menuItems = [
    {
      icon: UploadFileIcon,
      option: "escolher arquivo",
      onClick: handleOpenModal,
    },
    { icon: ExportDashboardIcon, option: "exportar dashboard" },
    { icon: GenerateReportIcon, option: "gerar relatório", showDivider: true },
    {
      icon: EventsRegistrationIcon,
      option: "registro de eventos",
      to: "/eventregister",
    },
    { icon: ResetDashboard, option: "resetar dashboard", spaceBetween: true },
  ];

  return (
    <header className="flex flex-col min-h-screen w-2/6 2xl:w-1/6">
      <div className="flex items-center text-center justify-center gap-4 mt-4 mb-10">
        <img src={logo} alt="logo" />
        <div className="h-12 w-0.5 bg-secondary rounded-full"></div>
        <p
          id="title_logo"
          className="text-xs text-primary font-outfit font-black"
        >
          ANALYZE MY TRASH
        </p>
      </div>
      <div className="flex-grow">
        {menuItems.map((item, index) => (
          <MenuOptions
            key={index}
            icon={item.icon}
            option={item.option}
            to={item.to}
            showDivider={item.showDivider}
            spaceBetween={item.spaceBetween}
            onClick={item.onClick} // Pass the onClick handler if provided
          />
        ))}
      </div>
      <div className="mt-auto">
        <MenuOptions icon={DashboardIcon} option="voltar para o dashboard" />
        <MenuOptions icon={LogoutIcon} option="logout" />
        <MenuOptions icon={UserIcon} option="usuário" />
      </div>

      <ChooseFileModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}
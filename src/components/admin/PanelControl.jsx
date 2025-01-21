import { useMatch } from "react-router-dom";
import { PanelControlButton } from "../panelControl/uikit/panelControlButton.jsx";
import { useEffect, useState } from "react";
import { Sections } from "./Sections.jsx";
import { pages } from "./pages.data.jsx";


export default function PanelControl({ adminInfo }) {
  const match = useMatch("/admin/:page/:section?");
  const page = match?.params?.page;
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (["video", "stream", "playlist", "users"].includes(page)) {
      setPageInfo(pages[page]);
    } else {
      setPageInfo(pages["personal"]);
    }
  }, [page]);

  console.log(1);

  return (
    <div className="flex min-h-screen text-base">
      <div
        className="flex flex-col  flex-shrink-0 align-items-center
            flex-column pt-[33px] w-[293px] border-r-[3px] border-[#D9D9D9]"
      >
        <div className="flex flex-col w-full">
          {Object.values(pages).map((element) => (
            <PanelControlButton
              key={element.path}
              Icon={element.icon}
              name={element.name ? element.name : element.tabs[0].name}
              path={element.path}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <h1 className="p-[49px] text-3xl font-bold border-b-[3px] border-[#D9D9D9] ">
          {pageInfo.section}
        </h1>
        <div className="panel-control-content">
          {!pageInfo.tabs ? (
            pageInfo.component
          ) : (
            <Sections tabs={pageInfo.tabs} />
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Headline } from "../components/contentLayout/Headline";
import { MediaItems } from "@/components/contentLayout/media/mediaItems";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "../../config/routes";

export default function ContentLayout() {
  const [search, setSearch] = useState("");
  const [pageInfo, setPageInfo] = useState({});
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newPageInfo = {};
    if (location.pathname === routes.playlists) {
      newPageInfo.title = "Курсы";
      newPageInfo.component = () => (
        <MediaItems
          type="playlists"
          search={searchParams.get("search")}
        ></MediaItems>
      );
    } else if (location.pathname === routes.streams) {
      newPageInfo.title = "Трансляции";
      newPageInfo.component = () => (
        <>
          <h1 className="text-2xl font-semibold mb-5">В эфире</h1>
          <MediaItems type="streams" status="LIVE" search={searchParams.get("search")}></MediaItems>
          <h1 className="text-2xl font-semibold mb-5">
            Предстоящие трансляции
          </h1>
          <MediaItems type="streams" status="CREATED" search={searchParams.get("search")}></MediaItems>
          <h1 className="text-2xl font-semibold mb-5">
            Завершенные трансляции
          </h1>
          <MediaItems type="streams" status="FINISHED&is_captured=true" search={searchParams.get("search")}></MediaItems>
        </>
      );
    } else {
      newPageInfo.title = "Лекторий ВШЭ";
      newPageInfo.component = () => (
        <>
          <h1 className="text-2xl font-semibold mb-5">Видео</h1>
          <MediaItems
            type="videos"
            length={8}
            search={searchParams.get("search")}
          ></MediaItems>
          <h1 className="text-2xl font-semibold mb-5">Трансляции</h1>
          <MediaItems type="streams" length={4} search={searchParams.get("search")}></MediaItems>
          <h1 className="text-2xl font-semibold mb-5">Курсы</h1>
          <MediaItems
            type="playlists"
            length={8}
            search={searchParams.get("search")}
          ></MediaItems>
        </>
      );
    }
    setPageInfo(newPageInfo);
  }, [location]);

  return (
    <div>
      <Headline title={pageInfo.title} setSearch={setSearch}></Headline>
      <div className="container ">
        {pageInfo.component ? <pageInfo.component /> : null}
      </div>
    </div>
  );
}

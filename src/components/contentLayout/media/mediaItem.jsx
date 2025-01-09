import { Link } from "react-router-dom";

export function MediaItem({ item, type }) {
  return (
    <Link
      to={{
        pathname: `/${type === 'playlists' ? item.identifier : type+'/'+item.identifier}`,
      }}
    >
      <div className="w-[315px] mb-9">
        <div className="w-[315px] h-[177px] mb-2 rounded-xl overflow-hidden bg-gray-400">
          <img src={item?.preview || "/static/images/defaultPreview.png"} alt="Обложка" className="w-[315px h-[177px] object-cover object-center"/>
        </div>
        <div className="flex">
          <div className="playlists-element-info-text">
            <div className="text-base overflow-hidden line-clamp-1">{item.title}</div>
            <div className="text-xs">
              {item.creator}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

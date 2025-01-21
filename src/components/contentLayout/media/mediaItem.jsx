import { routes } from "../../../../config/routes";
import { Link } from "react-router-dom";

export function MediaItem({ item, type }) {
  return (
    <Link
      to={{
        pathname: `${type === 'playlists' ? routes.root + '/' + item?.identifier : routes.root + '/'+type+'/'+item?.identifier}`,
      }}
    >
      <div className="mb-9">
        <div className="mb-2 rounded-xl overflow-hidden bg-gray-400">
          <img src={item?.preview || "/ui/static/images/defaultPreview.png"} alt="Обложка" className="object-cover object-center"/>
        </div>
        <div className="flex">
          <div className="playlists-element-info-text">
            <div className="text-base overflow-hidden line-clamp-1">{item?.title}</div>
            <div className="text-xs">
              {item?.creator}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

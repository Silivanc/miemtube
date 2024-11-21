import config from "./config/config";
import {HttpRequest} from "./services/Http";
import {Auth} from "./services/Auth";

Auth.setToken();
const a = await HttpRequest.request(config.host + 'events');
console.log(a);

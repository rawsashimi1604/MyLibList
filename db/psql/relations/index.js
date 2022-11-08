import VehicleRelation from "./vehicle.js";
import UserRelation from "./user.js";
import RefreshTokenRelation from "./refresh_token.js";

import AlternativeTitlesRelation from "./alternative_titles.js";

const vehicle = VehicleRelation;
const user = UserRelation;
const refresh_token = RefreshTokenRelation;

const alternative_titles = AlternativeTitlesRelation;


export default {
  vehicle,
  user,
  refresh_token,
};

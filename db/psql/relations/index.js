import UserRelation from "./user.js";
import RefreshTokenRelation from "./refresh_token.js";

import AlternativeTitlesRelation from "./alternative_titles.js";

const user = UserRelation;
const refresh_token = RefreshTokenRelation;

const alternative_titles = AlternativeTitlesRelation;

export default {
  user,
  refresh_token,
};

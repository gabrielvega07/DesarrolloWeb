
//import { bestFruit } from "../references";
import { multiply } from "../calculation";
import { aboutMe } from "../bio";

import { bestFruit } from "./agregator";

const news = 'Soy dde' + aboutMe.name + 'multiplicado por' + multiply(2, 3) + 'y mi fruta favorita es' + bestFruit[0];
console.log(news);
import { textEl } from "./components/text";
import { buttonEl } from "./components/button";
import { starComp } from "./components/star";
import { scoreComp } from "./components/score";
import { choiceComp } from "./components/choices";
import { initRouter } from "./router";
import { timerComp } from "./components/timer";
import { versusComp } from "./components/versus";

(function () {
  textEl();
  buttonEl();
  starComp();
  scoreComp();
  choiceComp();
  const root = document.querySelector(".root");
  initRouter(root);
  timerComp();
  versusComp();
})();

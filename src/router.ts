import { homePage } from "./pages/home";
import { instructionsPage } from "./pages/instructions";
import { gamePage } from "./pages/game";
import { confrontationPage } from "./pages/confrontation";
import { scorePage } from "./pages/score";

const routes = [
  {
    path: /\/home/,
    component: homePage,
  },
  {
    path: /\/instructions/,
    component: instructionsPage,
  },
  {
    path: /\/game/,
    component: gamePage,
  },
  {
    path: /\/confrontation/,
    component: confrontationPage,
  },
  {
    path: /\/score/,
    component: scorePage,
  },
];

const BASE_PATH = "/piedra-papel-tijera"; // fragmento de path que se agrega a github (nombre del repo)
function isGitHubPages() {
  return location.host.includes("github.io");
}
export function initRouter(container) {
  function goTo(path) {
    const completePath = isGitHubPages() ? BASE_PATH + path : path; //si estamos en github BASE_PATH mas el path propio de la page, si estamos en dev solo el path de la page
    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }
  function handleRoute(route) {
    console.log(" el handleRoute recibio una ruta", route);
    const newRoute = isGitHubPages() ? route.replace(BASE_PATH, "") : route;
    //limpiamos el body html antes de agregarle una pagina, asi no se acoplan una debajo de la otra
    container.innerHTML = "";

    let routeFound = false; // Variable para verificar si se encontró la ruta

    for (const r of routes) {
      if (r.path.test(newRoute)) {
        r.component({ goTo: goTo });
        routeFound = true; // Marcamos que se encontró la ruta
        break; // Salimos del bucle una vez que encontramos la ruta
      }
    }
    if (!routeFound) {
      // Aquí podrías mostrar un mensaje en la interfaz de usuario si lo deseas
      console.log("Ruta no encontrada:", newRoute); // O simplemente no hacer nada
    }
  }
  if (location.pathname == "/") {
    // la pagina inicial (osea el index html) es direcion ip + puerto + "/" = 127.0.0.1:8080/ entonces hay que cambiar la "/" a "/welcome" cuando iniciamos el navegador
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}

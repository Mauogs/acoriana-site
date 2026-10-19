/* =========================================================
   rodape.js - comportamentos do rodapé
   1. Selo "Aberto agora / Fechado agora" com base no horário
      de atendimento (fuso de São Paulo).
   2. Botão "Voltar ao topo" com rolagem suave.
   O ano do rodapé continua sendo atualizado por script.js
   (elemento #ano-atual).
   ========================================================= */

(function () {
  "use strict";

  var FUSO = "America/Sao_Paulo";

  // Horários em horas cheias (devem coincidir com o texto do rodapé).
  var HORARIOS = {
    semana: { abre: 6, fecha: 22 }, // segunda a sábado
    domingo: { abre: 7, fecha: 21 }, // domingos
  };

  /** Formata 6 como "06h". */
  function formatarHora(hora) {
    return (hora < 10 ? "0" : "") + hora + "h";
  }

  /** Lê dia da semana e minutos do dia no fuso de São Paulo. */
  function agoraNoFuso() {
    var partes = new Intl.DateTimeFormat("en-US", {
      timeZone: FUSO,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());

    var dados = {};
    partes.forEach(function (parte) {
      dados[parte.type] = parte.value;
    });

    return {
      dia: dados.weekday,
      minutos: (parseInt(dados.hour, 10) % 24) * 60 + parseInt(dados.minute, 10),
    };
  }

  /** Decide se a padaria está aberta e monta a mensagem exibida. */
  function calcularStatus() {
    var agora = agoraNoFuso();
    var hoje = agora.dia === "Sun" ? HORARIOS.domingo : HORARIOS.semana;
    var abre = hoje.abre * 60;
    var fecha = hoje.fecha * 60;

    if (agora.minutos >= abre && agora.minutos < fecha) {
      return {
        aberto: true,
        texto: "Aberto agora · fecha às " + formatarHora(hoje.fecha),
      };
    }

    if (agora.minutos < abre) {
      return {
        aberto: false,
        texto: "Fechado agora · abre hoje às " + formatarHora(hoje.abre),
      };
    }

    // Depois do fechamento: o próximo dia é domingo apenas se hoje é sábado.
    var amanha = agora.dia === "Sat" ? HORARIOS.domingo : HORARIOS.semana;
    return {
      aberto: false,
      texto: "Fechado agora · abre amanhã às " + formatarHora(amanha.abre),
    };
  }

  /** Atualiza o selo no DOM. Sem o elemento, não faz nada. */
  function atualizarStatus() {
    var selo = document.getElementById("rodape-status");
    var texto = document.getElementById("rodape-status-texto");
    if (!selo || !texto) return;

    try {
      var status = calcularStatus();
      selo.dataset.aberto = String(status.aberto);
      texto.textContent = status.texto;
      selo.hidden = false;
    } catch (erro) {
      // Navegador sem suporte a Intl/fuso: o selo simplesmente não aparece.
      selo.hidden = true;
    }
  }

  /** Rolagem suave até o topo, respeitando a preferência por menos movimento. */
  function configurarVoltarAoTopo() {
    var botao = document.querySelector(".rodape-topo");
    if (!botao) return;

    botao.addEventListener("click", function (evento) {
      evento.preventDefault();
      var reduzir = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({ top: 0, behavior: reduzir ? "auto" : "smooth" });
    });
  }

  function iniciar() {
    atualizarStatus();
    setInterval(atualizarStatus, 60 * 1000); // revalida a cada minuto
    configurarVoltarAoTopo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
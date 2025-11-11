import { TipoInstalacao } from '../instalacao/instalacao.model/instalacao.model';

/**
 * Dicionário de fatores multiplicadores por categoria
 * — equivalente aos enums Java (TipoAuditorio, TipoSpa, etc.)
 */
export const FatoresPorCategoria: Record<TipoInstalacao, Record<string, number>> = {
  [TipoInstalacao.AUDITORIO]: {
    ANFITEATRO: 2.0,
    TEATRO: 3.0,
    CONGRESSO: 5.0,
  },
  [TipoInstalacao.SALAODECONFERENCIA]: {
    BOARDROOM: 2.0,
    TRAINING: 1.6,
    CO_WORKING: 1.4,
  },
  [TipoInstalacao.SALAODEEVENTOS]: {
    CASAMENTO: 3.0,
    FESTA_INFANTIL: 1.5,
    FORMATURA: 2.0,
    CORPORATIVO: 3.0,
  },
  [TipoInstalacao.SAUNA]: {
    SECA: 1.0,
    VAPOR: 1.6,
    INFRAVERMELHO: 1.8,
    MISTA: 1.4,
  },
  [TipoInstalacao.SPA]: {
    HIDROTERAPIA: 2.0,
    TERAPEUTICO: 1.5,
    DETOX: 1.2,
  },
  [TipoInstalacao.QUARTO]: {}, // Quarto será tratado separadamente
};

// Valor base fixo
export const VALOR_BASE = 1000;

/**
 * Calcula o orçamento de forma local (sem depender do backend)
 */
export function calcularOrcamento(
  tipo: TipoInstalacao,
  categoria: string,
  checkIn: string,
  checkOut: string
): number {
  const inicio = new Date(checkIn);
  const fim = new Date(checkOut);

  if (inicio >= fim) {
    throw new Error('A data de check-out deve ser posterior à data de check-in.');
  }

  // --- Cálculo de horas ou dias ---
  let quantidade: number;
  if (tipo === TipoInstalacao.QUARTO) {
    // Diferença em dias
    const diffMs = fim.getTime() - inicio.getTime();
    quantidade = diffMs / (1000 * 60 * 60 * 24);
  } else {
    // Diferença em horas
    const diffMs = fim.getTime() - inicio.getTime();
    quantidade = diffMs / (1000 * 60 * 60);
  }

  if (quantidade <= 0) {
    throw new Error('O período selecionado deve ser maior que zero.');
  }

  // --- Fator de multiplicação ---
  const fator = FatoresPorCategoria[tipo]?.[categoria] ?? 1.0;

  // --- Valor final ---
  const valorFinal = VALOR_BASE * quantidade * fator;
  return Number(valorFinal.toFixed(2));
}

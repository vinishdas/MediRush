import { Severity, Patient, GameState, PATIENT_DATABASE, TARGET_GOALS } from './gameData';

export function getStabilityColor(stability: number): string {
  return stability > 60 ? '#27AE60' : stability > 30 ? '#E67E22' : '#E03030';
}

export function getSeverityColor(severity: Severity): string {
  return severity === 'high' ? '#D83030' : severity === 'medium' ? '#E67E22' : '#1E9030';
}

export function getEfficiencyColor(efficiency: number): string {
  return efficiency > 60 ? '#27AE60' : efficiency > 30 ? '#E67E22' : '#E03030';
}

export function calculateDecay(patient: Patient): number {
  let decay = patient.severity === 'high' ? 3 : patient.severity === 'medium' ? 2 : 1;
  if (patient.contagious) {
    decay = Math.ceil(decay * 1.5);
  }
  return decay;
}

export function createNewPatient(patientIdCounter: number, level: number): Patient {
  const basePatient = PATIENT_DATABASE[Math.floor(Math.random() * PATIENT_DATABASE.length)];
  return {
    ...basePatient,
    id: ++patientIdCounter,
    stability: 100,
    diagnosed: level === 1,
    contagious: level === 3 && Math.random() > 0.65,
  };
}

export function generateFaceSVG(patient: Patient): string {
  const s = patient.stability;
  const mouth = s > 60 ? 'M7,14 Q10,17 13,14' : s > 30 ? 'M7,14 L13,14' : 'M7,16 Q10,12.5 13,16';
  const faceColor =
    patient.severity === 'high' ? '#FFD0B8' : patient.severity === 'medium' ? '#FFE8A0' : '#C8EFC8';
  const skinColor = patient.severity === 'high' ? '#E08060' : patient.severity === 'medium' ? '#C09020' : '#60A060';

  return `<svg width="26" height="26" viewBox="0 0 20 20" style="flex-shrink:0;"><circle cx="10" cy="10" r="9" fill="${faceColor}" stroke="${skinColor}" stroke-width="1"/><circle cx="7" cy="9" r="1.3" fill="#333"/><circle cx="13" cy="9" r="1.3" fill="#333"/><circle cx="6.4" cy="8.4" r=".5" fill="white"/><circle cx="12.4" cy="8.4" r=".5" fill="white"/><path class="fm" d="${mouth}" fill="none" stroke="#666" stroke-width="1.3" stroke-linecap="round"/>${s < 30 ? '<path d="M3.5 3.5 L5.5 5.5 M16.5 3.5 L14.5 5.5" stroke="#D83030" stroke-width="1.2" stroke-linecap="round"/>' : ''}${patient.contagious ? '<text x="6.5" y="19" font-size="5" fill="#C84040">☣</text>' : ''}</svg>`;
}

export function generatePatientCardHTML(patient: Patient, gameState: GameState): string {
  const isCritical = patient.stability < 30 ? 'crit' : '';
  const isSelected = gameState.selectedPatient === patient.id ? 'sel' : '';
  const borderColor = patient.stability < 30 ? '#E03030' : getSeverityColor(patient.severity);

  let bottomHTML = '';
  if (!patient.diagnosed && gameState.level > 1) {
    const isDiagnosing = patient.id === gameState.diagnosingId;
    bottomHTML = `<div class="dbtn" onclick="event.stopPropagation();window.startDg(${patient.id})">${isDiagnosing ? `<div class="dpb" style="width:${gameState.diagnosisProgress}%"></div>` : ''}<span style="position:relative;z-index:1">DIAGNOSE</span></div>`;
  } else if (patient.diagnosed) {
    bottomHTML = `<div style="font-size:9px;color:#8090A8;margin-top:1px;">→ ${patient.targetDept}</div>`;
  }

  return `<div class="pc ${isCritical} ${isSelected}" data-pid="${patient.id}" onclick="window.selP(${patient.id})" style="border-left-color:${borderColor}"><div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">${generateFaceSVG(patient)}<div style="min-width:0;"><div style="font-size:10px;font-weight:700;color:#1A2A3A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;">${patient.name}</div><div style="font-size:8px;font-weight:600;color:${getSeverityColor(patient.severity)};text-transform:uppercase;">${patient.severity}</div></div></div><div class="sb"><div class="sbf" style="width:${patient.stability}%;background:${getStabilityColor(patient.stability)};"></div></div>${bottomHTML}</div>`;
}

export function getTargetGoalForLevel(level: number): number {
  return TARGET_GOALS[level as keyof typeof TARGET_GOALS] || 10;
}

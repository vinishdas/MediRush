export const DEPARTMENT_CONFIG = {
  ER: {
    label: 'Emergency Room',
    description: 'Trauma & critical',
    color: '#D83030',
    background: '#FEF0F0',
    textColor: '#A01818',
    icon: '<svg width="26"  height="26" viewBox="0 0 26 26"><rect x="10" y="2" width="6" height="22" rx="2" fill="#D83030"/><rect x="2" y="10" width="22" height="6" rx="2" fill="#D83030"/></svg>',
  },
  ICU: {
    label: 'Intensive Care',
    description: 'Life-threatening',
    color: '#1560A0',
    background: '#EEF4FF',
    textColor: '#0A4080',
    icon: '<svg width="26"  height="26" viewBox="0 0 26 26"><path d="M13 23C13 23 2 16 2 10C2 6 5 3 9 3C11 3 12.5 3.8 13 5.5C13.5 3.8 15 3 17 3C21 3 24 6 24 10C24 16 13 23 13 23Z" fill="none" stroke="#1560A0" stroke-width="2"/><path d="M2 13 L5 13 L6.5 10 L9 17 L11 11 L13 15 L15 13 L19 13 L22 13" fill="none" stroke="#1560A0" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  },
  General: {
    label: 'General Ward',
    description: 'Standard care',
    color: '#1E8030',
    background: '#F0F9F0',
    textColor: '#145820',
    icon: '<svg width="26"  height="26" viewBox="0 0 26 26"><rect x="2" y="12" width="22" height="12" rx="2" fill="none" stroke="#1E8030" stroke-width="2"/><path d="M2 16 L24 16" stroke="#1E8030" stroke-width="1.5"/><rect x="7" y="8" width="5" height="8" rx="1" fill="none" stroke="#1E8030" stroke-width="1.5"/><rect x="14" y="8" width="5" height="8" rx="1" fill="none" stroke="#1E8030" stroke-width="1.5"/></svg>',
  },
  Lab: {
    label: 'Laboratory',
    description: 'Testing & analysis',
    color: '#B06010',
    background: '#FEF6E8',
    textColor: '#804008',
    icon: '<svg width="26"  height="26" viewBox="0 0 26 26"><path d="M10 3 L10 13 L3 21 Q2 23 4 23 L22 23 Q24 23 23 21 L16 13 L16 3Z" fill="none" stroke="#B06010" stroke-width="2"/><line x1="10" y1="3" x2="16" y2="3" stroke="#B06010" stroke-width="2"/><circle cx="9" cy="18" r="1.8" fill="#B06010" opacity=".65"/><circle cx="15" cy="20" r="1.4" fill="#B06010" opacity=".7"/><circle cx="19" cy="17" r="1" fill="#B06010" opacity=".55"/></svg>',
  },
};

export const PATIENT_DATABASE = [
  { name: 'Maria Chen', symptoms: 'Severe chest pain, diaphoresis', severity: 'high', targetDept: 'ER' },
  { name: 'James Okafor', symptoms: 'Deep laceration, heavy bleeding', severity: 'high', targetDept: 'ER' },
  { name: 'Sarah Kim', symptoms: 'Stroke symptoms, facial droop', severity: 'high', targetDept: 'ER' },
  { name: 'Dev Patel', symptoms: 'Blunt trauma, head injury', severity: 'high', targetDept: 'ER' },
  { name: 'Robert Vance', symptoms: 'Respiratory failure, SpO₂ 78%', severity: 'high', targetDept: 'ICU' },
  { name: 'Lisa Park', symptoms: 'Post-cardiac arrest, unstable', severity: 'high', targetDept: 'ICU' },
  { name: 'Tom Nguyen', symptoms: 'Septic shock, multi-organ', severity: 'medium', targetDept: 'ICU' },
  { name: 'Ana Flores', symptoms: 'Acute kidney failure, oliguria', severity: 'medium', targetDept: 'ICU' },
  { name: 'Amy Torres', symptoms: 'Fractured wrist, moderate pain', severity: 'low', targetDept: 'General' },
  { name: 'David Clark', symptoms: 'Low-grade fever, fatigue 3 days', severity: 'low', targetDept: 'General' },
  { name: 'Jenny Walsh', symptoms: 'Ankle sprain, visible swelling', severity: 'low', targetDept: 'General' },
  { name: 'Carlos Reyes', symptoms: 'Mild allergic reaction, hives', severity: 'medium', targetDept: 'General' },
  { name: 'Nina Johansson', symptoms: 'Unexplained spreading rash', severity: 'medium', targetDept: 'Lab' },
  { name: 'Paul Kimura', symptoms: 'Abnormal bloodwork, fatigue', severity: 'low', targetDept: 'Lab' },
  { name: 'Fatima Hassan', symptoms: 'Fever of unknown origin', severity: 'medium', targetDept: 'Lab' },
  { name: 'Omar Diallo', symptoms: 'Suspected toxic exposure', severity: 'medium', targetDept: 'Lab' },
];

export const TARGET_GOALS = {
  1: 10,
  2: 15,
  3: 20,
};

export type Severity = 'high' | 'medium' | 'low';
export type DepartmentKey = 'ER' | 'ICU' | 'General' | 'Lab';

export interface Patient {
  id: number;
  name: string;
  symptoms: string;
  severity: Severity;
  targetDept: DepartmentKey;
  stability: number;
  diagnosed: boolean;
  contagious: boolean;
}

export interface DragState {
  draggingPatientId: number | null;
  draggedOverDept: DepartmentKey | null;
}

export interface GameState {
  state: 'menu' | 'game' | 'transition' | 'over';
  queue: Patient[];
  efficiency: number;
  score: number;
  level: number;
  selectedPatient: number | null;
  diagnosisCount: number;
  diagnosingId: number | null;
  diagnosisProgress: number;
  diagnosisClicks: number; // <-- ADD THIS
  diagnosisTarget: number;
  tickInterval: NodeJS.Timeout | null;
  spawnInterval: NodeJS.Timeout | null;
  diagnosisInterval: NodeJS.Timeout | null;
  patientIdCounter: number;
  won: boolean;
  showNarration: boolean;
  dragState: DragState;
}

export const NARRATION_CONTENT = {
  intro: {
    character: 'Nurse Elena',
    messages: [
      'Hey! Welcome to Beacon Hope Medical Center. I\'m Elena, the triage nurse.',
      'Your job is to quickly diagnose incoming patients and route them to the right department.',
      'Click on a patient from the queue to select them, then run diagnostics to determine where they need to go.',
      'Route them correctly and fast to keep our hospital running smoothly!',
      'Let\'s save some lives. Ready?'
    ]
  },
  levelUp: {
    1: {
      character: 'Nurse Elena',
      messages: ['Great job! You\'ve handled the first shift perfectly. The pressure is about to increase...']
    },
    2: {
      character: 'Nurse Elena',
      messages: ['Excellent work! Now things are getting hectic. More patients, faster pace. Stay sharp!']
    },
    3: {
      character: 'Nurse Elena',
      messages: ['This is it - the critical shift. Contagious patients are coming in. Isolate them immediately!']
    }
  },
  complete: {
    1: {
      character: 'Nurse Elena',
      messages: ['Outstanding! You handled that shift like a pro. The afternoon team is impressed.']
    },
    2: {
      character: 'Nurse Elena',
      messages: ['Amazing! You navigated the chaos perfectly. The ER team says you\'re the best they\'ve seen.']
    },
    3: {
      character: 'Nurse Elena',
      messages: ['YOU DID IT! Beacon Hope\'s hero! You conquered all three shifts and saved countless lives!']
    }
  },
  failure: {
    1: {
      character: 'Nurse Elena',
      messages: [
        'Oh no... the system is overwhelmed.',
        'We lost coordination. Too many patients routed wrong, too fast.',
        'The efficiency collapsed and we couldn\'t keep up with the incoming crisis.',
        'Next time, work faster and more carefully. The lives depend on your accuracy.'
      ]
    },
    2: {
      character: 'Nurse Elena',
      messages: [
        'I\'m sorry... we couldn\'t handle the pressure of this shift.',
        'The delays compounded, patients were misrouted, and efficiency crumbled.',
        'This is harder than the first shift. You need better strategy and speed.',
        'Don\'t give up—try again. You can do this.'
      ]
    },
    3: {
      character: 'Nurse Elena',
      messages: [
        'The contagion outbreak was too much to contain...',
        'Misrouted patients spread illness, efficiency crashed, and we lost control.',
        'This final shift demands precision and perfect judgment under extreme pressure.',
        'One more time. I believe in you.'
      ]
    }
  }
};

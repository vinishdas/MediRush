'use client';

import { GameState, DEPARTMENT_CONFIG, DepartmentKey, TARGET_GOALS } from '@/lib/gameData';
import { getEfficiencyColor, getSeverityColor } from '@/lib/gameUtils';
import PatientCard from './PatientCard';
import DepartmentZone from './DepartmentZone';
import { Bluetooth } from 'lucide-react';

interface GameBoardProps {
  gameState: GameState;
  onAssignPatient: (department: DepartmentKey) => void;
}

export default function GameBoard({ gameState, onAssignPatient }: GameBoardProps) {
  const selectedPatient = gameState.queue.find((p) => p.id === gameState.selectedPatient);
  const targetGoal = TARGET_GOALS[gameState.level as keyof typeof TARGET_GOALS] || 10;
  const efficiencyColor = getEfficiencyColor(gameState.efficiency);

  const headerText = selectedPatient
    ? selectedPatient.diagnosed
      ? `Routing ${selectedPatient.name} — click a department`
      : 'Run diagnostics before routing'
    : 'Select a patient from the queue';

  return (
    <div className="gw">
      <div className="ghdr">
        <div
          style={{
            fontSize: 8,
            letterSpacing: '.1em',
            color: 'rgba(255,255,255,.7)',
            whiteSpace: 'nowrap',
          }}
        >
          SHIFT {gameState.level}/3
        </div>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,.7)' }}>EFFICIENCY</span>
        <div className="eb">
          <div
            className="ebf"
            id="ef"
            style={{
              width: `${gameState.efficiency}%`,
              background: efficiencyColor,
            }}
          ></div>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#fff',
            minWidth: 30,
          }}
          id="en"
        >
          {Math.round(gameState.efficiency)}%
        </span>
        <div style={{ flex: 1 }}></div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#E8F4FF',
          }}
          id="sce"
        >
          {gameState.score.toLocaleString()} pts
        </span>
        <span
          style={{
            fontSize: 8,
            color: 'rgba(255,255,255,.7)',
          }}
          id="dne"
        >
          {gameState.diagnosisCount}/{targetGoal}
        </span>
      </div>
      <div className="gbod">
        <div className="qpn" id="qpanel">
          <div
            style={{
              fontSize: 7.5,
              letterSpacing: '.12em',
              color: '#7890A0',
              flexShrink: 0,
            }}
          >
            WAITING — <span id="qc">{gameState.queue.length}</span>
          </div>
          {gameState.queue.map((patient) => (
            <PatientCard key={patient.id} patient={patient} gameState={gameState} />
          ))}
        </div>
        <div className="mpn">
          <div style={{ fontSize: 9.5, color: '#4878A0' }} id="ht">
            {headerText}
          </div>
          <div className="dgr">
            {Object.entries(DEPARTMENT_CONFIG).map(([key, dept]) => (
              <DepartmentZone
                key={key}
                departmentKey={key as DepartmentKey}
                department={dept}
                isActive={selectedPatient?.diagnosed ?? false}
                isTarget={selectedPatient?.targetDept === key}
                onAssign={() => onAssignPatient(key as DepartmentKey)}
              />
            ))}
          </div>
          <div
            id="pd"
            style={{
              padding: '6px 9px',
              background: '#F2F7FA',
              borderRadius: 8,
              border: '1px solid #D0DAE2',
              flexShrink: 0,
              minHeight: 100,
            }}
          >
            <PatientDetails patient={selectedPatient} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientDetails({ patient }: { patient?: typeof GameBoard extends (props: infer P) => any ? P['gameState']['queue'][number] : never }) {
  if (!patient) {
    return (
      <div style={{ fontSize: 15, color: '#8090A8' }}>
        Patient clipboard — select a patient to view details
      </div>
    );
  }

  const severityBg =
    patient.severity === 'high'
      ? '#FEE8E8'
      : patient.severity === 'medium'
        ? '#FEF4E0'
        : '#ECFAE8';

  return (
    <div >
      <div
        style={{
          display: 'flex',
           
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <span style={{ fontSize: 21, fontWeight: 700, color: '#1A2A3A' }}>
          {patient.name}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: getSeverityColor(patient.severity),
            background: severityBg,
            padding: '2px 6px',
            borderRadius: 3,
          }}
        >
          {patient.severity.toUpperCase()}
        </span>
      </div>
      <div style={{ fontSize: 15,fontWeight:500, color: '#506880' }}>{patient.symptoms}</div>
      {patient.contagious && (
        <div
          style={{
            marginTop: 3,
            fontSize: 9,
            color: '#B02020',
            background: '#FEEAEA',
            padding: '2px 7px',
            borderRadius: 3,
            display: 'inline-block',
          }}
        >
          ☣ CONTAGION — route immediately
        </div>
      )}
    </div>
  );
}

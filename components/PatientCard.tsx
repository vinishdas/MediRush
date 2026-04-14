'use client';

import { Patient, GameState } from '@/lib/gameData';
import { getStabilityColor, getSeverityColor, generateFaceSVG } from '@/lib/gameUtils';
import { audioManager } from '@/lib/audioUtils';

interface PatientCardProps {
  patient: Patient;
  gameState: GameState;
}

export default function PatientCard({ patient, gameState }: PatientCardProps) {
  const isCritical = patient.stability < 30 ? 'crit' : '';
  const isSelected = gameState.selectedPatient === patient.id ? 'sel' : '';
  const borderColor = patient.stability < 30 ? '#E03030' : getSeverityColor(patient.severity);
  const stabilityColor = getStabilityColor(patient.stability);
  const isDiagnosing = patient.id === gameState.diagnosingId;

  const isDragging = gameState.dragState.draggingPatientId === patient.id;

  return (
    <div
      className={`pc ${isCritical} ${isSelected} ${isDragging ? 'dragging' : ''}`}
      data-pid={patient.id}
      draggable={patient.diagnosed}
      onClick={() => (window as any).selP(patient.id)}
      onDragStart={() => {
        if (patient.diagnosed) {
          (window as any).startDrag(patient.id);
        }
      }}
      onDragEnd={() => {
        (window as any).endDrag();
      }}
      style={{
        borderLeftColor: borderColor,
        opacity: isDragging ? 0.6 : 1,
        cursor: patient.diagnosed ? 'grab' : 'default',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 2,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: generateFaceSVG(patient) }} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#1A2A3A',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 90,
            }}
          >
            {patient.name}
          </div>
          <div
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: getSeverityColor(patient.severity),
              textTransform: 'uppercase',
            }}
          >
            {patient.severity}
          </div>
        </div>
      </div>
      <div className="sb">
        <div
          className="sbf"
          style={{
            width: `${patient.stability}%`,
            background: stabilityColor,
          }}
        ></div>
      </div>
      {!patient.diagnosed && gameState.level > 1 ? (
        <div
          className="dbtn"
          onClick={(e) => {
            e.stopPropagation();
            audioManager.playSFX('/audio/click.mp3');
            (window as any).startDg(patient.id);
          }}
        >
          {isDiagnosing && (
            <div
              className="dpb"
              style={{
                width: `${gameState.diagnosisProgress}%`,
              }}
            ></div>
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>DIAGNOSE</span>
        </div>
      ) : patient.diagnosed ? (
        <div style={{ fontSize: 9, color: '#8090A8', marginTop: 1 }}>→ Click and drop me</div>
      ) : null}
    </div>
  );
}

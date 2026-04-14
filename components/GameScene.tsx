'use client';

import '../app/game.css';

export default function GameScene() {
  return (
    <div className="scene">
      {/* Wooden plank lines on lower wall */}
      <div className="r-mid"></div>
      <div
        className="r-deco"
        style={{
          bottom: 205,
          left: 0,
          right: 0,
          height: '52%',
          background: 'repeating-linear-gradient(180deg,transparent 0,transparent 34px,rgba(0,0,0,.08) 34px,rgba(0,0,0,.08) 36px)',
          pointerEvents: 'none',
        }}
      ></div>
      <div className="r-floor"></div>
      <div className="r-dsk"></div>

      {/* Pendant light 1 */}
      <svg
        className="r-deco"
        style={{ top: 0, left: '13%' }}
        width="56"
        height="100"
        viewBox="0 0 56 100"
      >
        <rect x="27" y="0" width="2" height="42" fill="#7A5230" />
        <path d="M14 56 Q28 44 42 56 L38 74 Q28 78 18 74 Z" fill="#E8C840" />
        <ellipse cx="28" cy="56" rx="14" ry="6" fill="#EEDA60" opacity=".9" />
        <ellipse cx="28" cy="56" rx="22" ry="28" fill="#F5E060" opacity=".12" />
        <rect x="18" y="42" width="20" height="8" rx="3" fill="#9A7040" />
      </svg>

      {/* Pendant light 2 */}
      <svg
        className="r-deco"
        style={{ top: 0, right: '16%' }}
        width="50"
        height="88"
        viewBox="0 0 50 88"
      >
        <rect x="24" y="0" width="2" height="38" fill="#7A5230" />
        <path d="M12 50 Q25 40 38 50 L34 66 Q25 70 16 66 Z" fill="#E8C840" />
        <ellipse cx="25" cy="50" rx="13" ry="5" fill="#EEDA60" opacity=".9" />
        <ellipse cx="25" cy="50" rx="20" ry="24" fill="#F5E060" opacity=".12" />
        <rect x="16" y="38" width="18" height="8" rx="3" fill="#9A7040" />
      </svg>

      {/* Bookshelf left */}
      <svg
        className="r-deco"
        style={{ top: '8%', left: '1%' }}
        width="130"
        height="110"
        viewBox="0 0 130 110"
      >
        <rect x="0" y="0" width="8" height="110" rx="2" fill="#7A5228" />
        <rect x="122" y="0" width="8" height="110" rx="2" fill="#7A5228" />
        <rect x="0" y="0" width="130" height="9" rx="2" fill="#8B6535" />
        <rect x="0" y="52" width="130" height="8" rx="2" fill="#8B6535" />
        <rect x="0" y="102" width="130" height="8" rx="2" fill="#8B6535" />
        {/* Row 1 binders */}
        <rect x="10" y="11" width="13" height="38" rx="2" fill="#E74C3C" />
        <rect x="11" y="17" width="2" height="6" rx="1" fill="rgba(0,0,0,.2)" />
        <rect x="24" y="11" width="13" height="38" rx="2" fill="#3498DB" />
        <rect x="38" y="14" width="11" height="35" rx="2" fill="#27AE60" />
        <rect x="50" y="11" width="13" height="38" rx="2" fill="#F39C12" />
        <rect x="64" y="11" width="13" height="38" rx="2" fill="#9B59B6" />
        <rect x="78" y="14" width="11" height="35" rx="2" fill="#E74C3C" opacity=".8" />
        <rect x="90" y="11" width="13" height="38" rx="2" fill="#1ABC9C" />
        <rect x="104" y="11" width="13" height="38" rx="2" fill="#E67E22" />
        {/* Row 2 */}
        <rect x="10" y="62" width="13" height="36" rx="2" fill="#2ECC71" />
        <rect x="24" y="62" width="13" height="36" rx="2" fill="#E74C3C" opacity=".7" />
        <rect x="38" y="64" width="11" height="34" rx="2" fill="#3498DB" opacity=".85" />
        <rect x="50" y="62" width="13" height="36" rx="2" fill="#8E44AD" />
        <rect x="64" y="62" width="13" height="36" rx="2" fill="#F39C12" opacity=".9" />
        <rect x="78" y="62" width="13" height="36" rx="2" fill="#27AE60" opacity=".8" />
        <rect x="92" y="65" width="10" height="33" rx="2" fill="#2980B9" />
        <rect x="103" y="62" width="14" height="36" rx="2" fill="#C0392B" />
      </svg>

      {/* Medical poster right wall */}
      <div
        className="r-deco"
        style={{
          top: '9%',
          right: '2%',
          width: 65,
          height: 84,
          background: '#FFFBF4',
          borderRadius: 4,
          border: '2px solid #B09060',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <svg width="38" height="38" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="16" fill="none" stroke="#C84040" strokeWidth="2.5" />
          <rect x="16" y="7" width="6" height="24" rx="2" fill="#C84040" />
          <rect x="7" y="16" width="24" height="6" rx="2" fill="#C84040" />
        </svg>
        <div style={{ fontSize: 6, color: '#8B6040', fontWeight: 700, letterSpacing: '.06em' }}>
          MEDICAL
        </div>
      </div>

      {/* Desk plant right */}
      <svg
        className="r-deco"
        style={{ bottom: 218, right: '4%' }}
        width="48"
        height="68"
        viewBox="0 0 48 68"
      >
        <path d="M14 46 L10 68 L38 68 L34 46Z" fill="#C07438" />
        <rect x="8" y="42" width="32" height="8" rx="3" fill="#A05E28" />
        <ellipse cx="24" cy="43" rx="14" ry="4" fill="#7A4820" />
        <path d="M24 42 C20 34 8 30 10 20 C12 12 20 16 24 26" fill="#2ECC71" />
        <path d="M24 42 C28 32 40 28 38 18 C36 10 26 14 24 26" fill="#27AE60" />
        <path d="M24 42 C21 30 13 22 18 14 C22 8 26 16 24 30" fill="#1ABC9C" opacity=".8" />
      </svg>

      {/* Desk coffee mug left */}
      <svg
        className="r-deco"
        style={{ bottom: 224, left: 'calc(50% - 250px)' }}
        width="26"
        height="32"
        viewBox="0 0 26 32"
      >
        <rect x="2" y="8" width="16" height="20" rx="3" fill="white" stroke="#DDD" strokeWidth="1.5" />
        <path d="M18 11 Q24 11 24 16 Q24 21 18 21" fill="none" stroke="#DDD" strokeWidth="2" />
        <rect x="4" y="4" width="12" height="6" rx="1" fill="#C84040" />
        <text x="6" y="10" fontSize="5.5" fill="white" fontWeight="bold">
          +
        </text>
        <path d="M7 4 Q5.5 1.5 7 -1" fill="none" stroke="#CCC" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11 4 Q9.5 .5 11 -2" fill="none" stroke="#CCC" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {/* Notepad left of monitor */}
      <svg
        className="r-deco"
        style={{ bottom: 220, left: 'calc(50% - 220px)' }}
        width="40"
        height="50"
        viewBox="0 0 40 50"
      >
        <rect x="0" y="4" width="40" height="46" rx="3" fill="#FFFDE8" stroke="#D8C860" strokeWidth="1" />
        <rect x="0" y="0" width="40" height="8" rx="3" fill="#D8C860" />
        <line x1="5" y1="16" x2="35" y2="16" stroke="#E0D8A0" strokeWidth="1.5" />
        <line x1="5" y1="22" x2="35" y2="22" stroke="#E0D8A0" strokeWidth="1.5" />
        <line x1="5" y1="28" x2="35" y2="28" stroke="#E0D8A0" strokeWidth="1.5" />
        <line x1="5" y1="34" x2="28" y2="34" stroke="#E0D8A0" strokeWidth="1.5" />
        <line x1="5" y1="40" x2="22" y2="40" stroke="#E0D8A0" strokeWidth="1.5" />
      </svg>

      {/* MONITOR */}
      <div className="mon-asm">
        <div className="mon-body">
          <div className="mon-cam"></div>
          <div className="mon-scr" id="ct"></div>
        </div>
        <div className="mon-nk"></div>
        <div className="mon-base"></div>
      </div>

      {/* Keyboard + mouse */}
      <div className="kbd r-deco" style={{ bottom: 207, left: '50%', transform: 'translateX(-50%)' }}></div>
      <div className="mse r-deco" style={{ right: 'calc(50% - 172px)', bottom: 209 }}></div>

      {/* NURSE CHARACTER */}
      <svg
        className="r-deco"
        style={{ bottom: 204, right: '2%' }}
        width="105"
        height="196"
        viewBox="0 0 105 196"
      >
        {/* Chair */}
        <rect x="20" y="72" width="65" height="78" rx="8" fill="#485260" />
        <rect x="16" y="136" width="73" height="20" rx="6" fill="#485260" />
        <rect x="16" y="110" width="9" height="28" rx="4" fill="#363D49" />
        <rect x="80" y="110" width="9" height="28" rx="4" fill="#363D49" />
        {/* Chair base legs */}
        <path d="M30 160 L18 192" stroke="#485260" strokeWidth="5" strokeLinecap="round" />
        <path d="M52 162 L52 194" stroke="#485260" strokeWidth="5" strokeLinecap="round" />
        <path d="M74 160 L87 192" stroke="#485260" strokeWidth="5" strokeLinecap="round" />
        <circle cx="18" cy="193" r="4" fill="#3A4050" />
        <circle cx="52" cy="194" r="4" fill="#3A4050" />
        <circle cx="87" cy="193" r="4" fill="#3A4050" />
        {/* Legs/shoes */}
        <rect x="31" y="148" width="15" height="32" rx="4" fill="#5BA8D8" />
        <rect x="59" y="148" width="15" height="32" rx="4" fill="#5BA8D8" />
        <ellipse cx="39" cy="182" rx="13" ry="6" fill="#2A3040" />
        <ellipse cx="67" cy="182" rx="13" ry="6" fill="#2A3040" />
        {/* Torso scrubs */}
        <rect x="26" y="96" width="53" height="48" rx="6" fill="#5BA8D8" />
        {/* Scrubs detail pocket */}
        <rect x="42" y="106" width="21" height="16" rx="3" fill="#4A98C8" />
        {/* Pen in pocket */}
        <rect x="58" y="104" width="3" height="10" rx="1" fill="#E84040" />
        <rect x="58" y="104" width="3" height="2" rx=".5" fill="#F0D000" />
        {/* ID badge */}
        <rect x="64" y="108" width="11" height="15" rx="2" fill="white" />
        <rect x="66" y="110" width="7" height="2.5" rx=".8" fill="#C84040" />
        <rect x="66" y="114" width="7" height="1.5" rx=".5" fill="#CCC" />
        <rect x="66" y="117" width="5" height="1.5" rx=".5" fill="#CCC" />
        <rect x="66" y="120" width="6" height="1.5" rx=".5" fill="#CCC" />
        {/* Stethoscope */}
        <path
          d="M35 96 Q25 84 25 72 Q25 64 33 64 Q40 64 40 72 L40 78"
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="80" r="5" fill="none" stroke="#E0E0E0" strokeWidth="2" />
        <path
          d="M52 96 Q48 90 50 84"
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Arms */}
        <rect x="12" y="100" width="18" height="12" rx="5" fill="#5BA8D8" />
        <rect x="75" y="100" width="18" height="12" rx="5" fill="#5BA8D8" />
        <ellipse cx="12" cy="106" rx="7" ry="5" fill="#F5C5A0" />
        <ellipse cx="93" cy="106" rx="7" ry="5" fill="#F5C5A0" />
        {/* Neck */}
        <rect x="43" y="86" width="19" height="14" rx="4" fill="#F5C5A0" />
        {/* Head */}
        <ellipse cx="52" cy="66" rx="22" ry="24" fill="#F5C5A0" />
        {/* Ears */}
        <ellipse cx="30" cy="68" rx="5" ry="7" fill="#F0B898" />
        <ellipse cx="74" cy="68" rx="5" ry="7" fill="#F0B898" />
        <ellipse cx="31" cy="68" rx="3" ry="4" fill="#E8A07A" />
        <ellipse cx="73" cy="68" rx="3" ry="4" fill="#E8A07A" />
        {/* Hair - short bob */}
        <path d="M30 52 Q32 36 52 34 Q72 36 74 52 Q68 46 52 46 Q36 46 30 52Z" fill="#4A3020" />
        <rect x="30" y="50" width="10" height="28" rx="5" fill="#4A3020" />
        <rect x="74" y="50" width="10" height="28" rx="5" fill="#4A3020" opacity=".8" />
        {/* Nurse cap */}
        <path d="M38 50 Q52 42 66 50 L64 57 L40 57 Z" fill="white" />
        <rect x="40" y="52" width="24" height="5" rx="1.5" fill="#F0F0F0" />
        <rect x="50" y="53" width="4" height="5" rx=".8" fill="#C84040" />
        <rect x="48" y="55" width="8" height="2" rx=".8" fill="#C84040" />
        {/* Face - slightly looking left toward monitor */}
        {/* Eyes (looking left) */}
        <g
          style={{
            animation: 'eyeblink 5s infinite',
            transformOrigin: '52px 65px',
          }}
        >
          <ellipse cx="45" cy="64" rx="4.5" ry="4.5" fill="white" />
          <ellipse cx="60" cy="64" rx="4.5" ry="4.5" fill="white" />
          <circle cx="44" cy="64" r="3" fill="#3A2010" />
          <circle cx="59" cy="64" r="3" fill="#3A2010" />
          <circle cx="43" cy="63" r=".9" fill="white" />
          <circle cx="58" cy="63" r=".9" fill="white" />
        </g>
        {/* Eyebrows */}
        <path
          d="M40 57 Q45 55 50 58"
          fill="none"
          stroke="#4A3020"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M56 58 Q61 55 66 57"
          fill="none"
          stroke="#4A3020"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Nose */}
        <path
          d="M50 69 L52 73 L56 73 L58 69"
          fill="none"
          stroke="#D49070"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Smile */}
        <path
          d="M46 78 Q52 83 58 78"
          fill="none"
          stroke="#C87A5A"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Blush */}
        <ellipse cx="39" cy="74" rx="7" ry="4" fill="#FFB0B0" opacity=".35" />
        <ellipse cx="65" cy="74" rx="7" ry="4" fill="#FFB0B0" opacity=".35" />
      </svg>

      {/* SMALL PLANT BOTTOM LEFT */}
      <svg
        className="r-deco"
        style={{ bottom: 220, left: 'calc(50% - 240px)' }}
        width="28"
        height="36"
        viewBox="0 0 28 36"
      >
        <path d="M9 22 L7 36 L21 36 L19 22Z" fill="#C07438" />
        <rect x="5" y="19" width="18" height="5" rx="2" fill="#A05E28" />
        <path d="M14 18 C10 12 4 8 6 3 C8 -1 12 3 14 10" fill="#27AE60" />
        <path d="M14 18 C18 10 24 6 22 1 C20 -3 16 2 14 10" fill="#2ECC71" />
      </svg>
    </div>
  );
}

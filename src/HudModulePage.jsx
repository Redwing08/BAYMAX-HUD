import React from 'react';

export default function HudModulePage({ moduleData }) {
  if (!moduleData) return null;

  return (
    <div className="laser-content-wrapper">
      <div className="hud-modal-header">
        <div className="hud-modal-title">::{moduleData.label.toUpperCase()}::</div>
      </div>
      
      <div className="hud-modal-body">
        <p style={{ color: '#70e1ff', fontWeight: '700', letterSpacing: '1px', marginBottom: '15px' }}>
          SECURE SUBSYSTEM ACTIVE &bull; HOLOGRAPHIC PIPELINE ONLINE
        </p>
        <p>{moduleData.desc}</p>
        
        <div style={{ 
          marginTop: '25px', 
          padding: '20px', 
          background: 'rgba(0, 210, 255, 0.05)', 
          border: '1px dashed rgba(0, 210, 255, 0.4)',
          borderRadius: '6px' 
        }}>
          <h4 style={{ color: '#ffffff', letterSpacing: '2px', marginBottom: '10px' }}>DIAGNOSTIC TELEMETRY LOGS</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.85, fontFamily: 'monospace' }}>
            &gt; Initializing target buffers for {moduleData.label}...<br />
            &gt; Memory allocation stable at 4.9 GB.<br />
            &gt; Zero anomaly packets detected across local runtime sockets.
          </p>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import ModelEnginePage from './ModelEnginePage';
// import EncryptPage from './EncryptPage';
// import SimulatorPage from './SimulatorPage';
// // Import any other page components you create

// export default function HudModulePage({ moduleData }) {
//   if (!moduleData) return null;

//   // Helper to choose which component file to render based on the label or ID
//   const renderModuleContent = () => {
//     switch (moduleData.label) {
//       case '3D Model Engine':
//         return <ModelEnginePage />;
//       case 'Encrypt / Decrypt':
//         return <EncryptPage />;
//       case 'System Simulator':
//         return <SimulatorPage />;
//       default:
//         return <p>{moduleData.desc}</p>; // Fallback description
//     }
//   };

//   return (
//     <div className="laser-content-wrapper">
//       <div className="hud-modal-header">
//         <div className="hud-modal-title">::{moduleData.label.toUpperCase()}::</div>
//       </div>
      
//       <div className="hud-modal-body">
//         {/* This renders the separate JSX file component */}
//         {renderModuleContent()}
        
//         <div style={{ 
//           padding: '20px', 
//           background: 'rgba(0, 210, 255, 0.04)', 
//           border: '1px dashed rgba(0, 210, 255, 0.45)',
//           borderRadius: '8px',
//           marginTop: '25px'
//         }}>
//           <h4 style={{ color: '#ffffff', letterSpacing: '2px', marginBottom: '10px' }}>SUBSYSTEM TELEMETRY</h4>
//           <p style={{ fontSize: '0.9rem', opacity: 0.85, fontFamily: 'monospace' }}>
//             &gt; Component file mounted successfully for {moduleData.label}.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
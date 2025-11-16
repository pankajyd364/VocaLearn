import React from "react";
import useRecorder from "../../hooks/useRecorder";

export default function Recorder({ onRecorded }) {
  const { isRecording, start, stop, reRecord, audioBlob, audioUrl, download, error, duration } = useRecorder();

  React.useEffect(() => {
    if (audioBlob && onRecorded) onRecorded({ blob: audioBlob, url: audioUrl });
  }, [audioBlob, audioUrl, onRecorded]);

  return (
    <div className="card recorder">
      <div className="rec-state">
        <div>
          <div style={{ fontSize: 14, color: "#6b7280" }}>Microphone</div>
          <div style={{ fontWeight: 700 }}>{isRecording ? "Recording…" : "Ready to record"}</div>
        </div>

        <div className="rec-btns">
          {!isRecording && <button className="rec-btn record" onClick={start}>Record</button>}
          {isRecording && <button className="rec-btn stop" onClick={stop}>Stop</button>}
          <button className="rec-btn" onClick={reRecord}>Re-record</button>
        </div>
      </div>

      <div>
        <div style={{ marginTop: 8 }}>
          <canvas className="wave-canvas" />
        </div>

        <div className="mt-3 flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div className="rec-duration">Duration: {duration}s</div>
          <div>
            {audioUrl && <button className="btn btn-outline btn-sm" onClick={() => download()}>Download</button>}
            {error && <div style={{ color: "var(--danger)", marginLeft: 12 }}>{String(error?.message || error)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

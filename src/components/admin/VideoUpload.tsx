import { useRef, useState } from 'react';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { uploadVideo } from '../../services/adminService';

interface VideoUploadProps {
  lessonId: string;
  currentUrl?: string;
  onUploaded: (url: string) => void;
}

export function VideoUpload({ lessonId, currentUrl, onUploaded }: VideoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Solo se permiten archivos de video.');
      return;
    }
    setError('');
    setProgress(0);
    try {
      const url = await uploadVideo(file, lessonId, setProgress);
      onUploaded(url);
    } catch (e) {
      setError('Error al subir el video. Intentá de nuevo.');
    } finally {
      setProgress(null);
    }
  };

  return (
    <div className="video-upload">
      {currentUrl ? (
        <div className="video-upload__current">
          <CheckCircle2 size={14} className="video-upload__check" />
          <span className="video-upload__url">{currentUrl.split('/').pop()}</span>
          <button className="video-upload__replace" onClick={() => inputRef.current?.click()}>
            Reemplazar
          </button>
        </div>
      ) : (
        <button
          className="video-upload__btn"
          onClick={() => inputRef.current?.click()}
          disabled={progress !== null}
        >
          {progress !== null ? (
            <>
              <Loader2 size={14} className="video-upload__spinner" />
              Subiendo {progress}%
            </>
          ) : (
            <>
              <Upload size={14} />
              Subir video
            </>
          )}
        </button>
      )}

      {progress !== null && (
        <div className="video-upload__bar">
          <div className="video-upload__bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && <p className="video-upload__error">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}

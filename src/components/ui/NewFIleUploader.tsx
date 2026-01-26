import { SizeConverter } from '@/helpers/SizeConverter';
import { useEffect, useState } from 'react';
import { IoAlert, IoClose } from 'react-icons/io5';
import idStore from '@/store/id.store';
import triggerStore from '@/store/trigger.store';
import submissionStore from '@/store/submissions.store';

type evidence = {
  link: string;
  fileName: string;
  size: number;
};

interface UploadEvidenceProps {
  onChangeEvidence?: (files: FileList | null) => void;
}

const UploadEvidence: React.FC<UploadEvidenceProps> = ({
  onChangeEvidence,
}) => {
  const { getOneSubmission } = submissionStore();
  const { trigger } = triggerStore();
  const [file, setFile] = useState<FileList | null>(null);
  const [fileEvidence, setFileEvidence] = useState<evidence[] | null>(null);
  const [overSizeFile, setOverSizeFile] = useState<evidence[]>([]);
  const [overSize, isOverSize] = useState<boolean>(false);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const { selectedId } = idStore();

  useEffect(() => {
    if (selectedId === '') {
      setFileEvidence(null);
      setFile(null);
    }
  }, [selectedId, trigger]);

  useEffect(() => {
    if (selectedId) getOneSubmission(selectedId);
  }, [getOneSubmission, selectedId]);

  useEffect(() => {
    if (file) {
      const arrayPhoto = Array.from(file);
      const limitSize = 1000000; // 1MB
      const overSize = arrayPhoto.some((photo) => photo.size > limitSize);

      if (overSize) {
        isOverSize(true);
        const overSizeFileData = arrayPhoto
          .filter((photo) => photo.size > limitSize)
          ?.map<evidence>((photo) => ({
            link: URL.createObjectURL(photo),
            fileName: photo.name,
            size: photo.size,
          }));
        setOverSizeFile(overSizeFileData);
      } else {
        const photo = arrayPhoto.map<evidence>((photo) => ({
          link: URL.createObjectURL(photo),
          size: photo.size,
          fileName: photo.name,
        }));
        setFileEvidence((prev) => [...(prev || []), ...photo]);
        isOverSize(false);
      }
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFile(files);
    onChangeEvidence?.(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files);
      onChangeEvidence?.(files);
    }
  };

  const deleteItem = (fileName: string) => {
    if (fileEvidence) {
      setFileEvidence(
        fileEvidence.filter((evidence) => evidence.fileName !== fileName)
      );
    }
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex h-full flex-col items-center gap-4 justify-center border-2 border-dashed rounded-lg p-4 transition-colors duration-200
          ${isDragActive ? 'border-cyan-500 bg-cyan-50' : overSize ? 'border-red-500' : 'border-base-300'}
        `}
      >
        {(!fileEvidence || fileEvidence.length === 0) && (
          <p className="font-medium text-center text-gray-500">
            {isDragActive
              ? 'Drop files here...'
              : 'Drag files here or click the button below'}
          </p>
        )}

        {fileEvidence?.length ? (
          <div className="flex flex-col gap-4 w-full">
            {fileEvidence.map((evidence) => (
              <div
                key={evidence.fileName}
                className="w-full flex items-center border-1 p-2 rounded-sm border-dashed border-base-300"
              >
                <div className="w-[50px] h-[50px]">
                  <img
                    src={evidence.link}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
                <div className="flex items-center w-full pr-2 pl-2">
                  <div className="flex flex-col w-full font-medium">
                    <p className="text-[10px]">{evidence.fileName}</p>
                    <p className="opacity-50 w-max">{`${SizeConverter(evidence.size)} MB`}</p>
                  </div>
                  <button
                    onClick={() => deleteItem(evidence.fileName)}
                    className="cursor-pointer"
                  >
                    <IoClose className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div>
          <input
            onChange={handleFileChange}
            type="file"
            multiple
            className="hidden"
            id="upload-evidence"
          />
          <label
            htmlFor="upload-evidence"
            className="btn btn-md btn-secondary text-white"
          >
            Upload Photo
          </label>
        </div>

        {overSize && (
          <div className="bg-red-100 border-red-500 border-1 rounded-lg p-2 flex gap-4 items-center w-full">
            <div className="p-3 rounded-full bg-red-700">
              <IoAlert className="text-xl text-red-200" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-sm text-red-500">Oversize file:</p>
              {overSizeFile.map((file, idx) => (
                <p key={idx} className="text-[10px]">
                  {idx + 1}) {file.fileName} —{' '}
                  <span className="font-bold">
                    size: ({SizeConverter(file.size)} MB)
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}

        {(!fileEvidence || fileEvidence.length === 0) && (
          <p className="font-medium text-gray-400">JPEG, JPG, PNG — max 1 MB</p>
        )}
      </div>
    </>
  );
};

export default UploadEvidence;

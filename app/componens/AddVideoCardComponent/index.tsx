"use client";
import { useTheme } from "@/app/hooks/useTheme";
import TextField from '@mui/material/TextField';
import { IoMdClose } from "react-icons/io";

interface AddVideoCardComponentProps {
  errors?: string;
  label: string;
  video: File | null;
  handleVideoChange: (file: File | null) => void;
  cutted?: boolean;
  width: number,
  height: number
}

export function AddVideoCardComponent({
  errors,
  label,
  video,
  handleVideoChange,
  cutted,
  width,
  height,
  ...rest
}: AddVideoCardComponentProps) {
  const { theme } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivoSelecionado = e.target.files?.[0];
    if (arquivoSelecionado) {
      handleVideoChange(arquivoSelecionado);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col"
      style={{
        width: width,
        minWidth: width,
        maxWidth: width,
      }}
    >
      <div className="w-full">
        <div
          className={`border-2 rounded-2xl p-4 flex flex-col justify-center items-center gap-8`}
          style={{
            borderColor: theme.color,
            color: theme.color,
            width: width,
            height: height,
            minHeight: height,
            minWidth: width,
            maxWidth: width,
          }}>
          <TextField
            id={label}
            label={label}
            variant="outlined"
            className="w-full "
            {...rest}
            error={!!errors}
            helperText={errors}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.color,
                  color: theme.color,  // Cor primária do tema
                },
                "&:hover fieldset": {
                  borderColor: theme.color,
                  color: theme.color
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.color,
                  color: theme.color, // Cor primária quando focado
                },
              },
              "& .MuiInputLabel-root": {
                color: theme.color, // Cor do label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.color, // Cor do label quando focado
              },
              "& .MuiInputBase-input": {
                color: theme.color, // Cor do texto dentro do input
              },
            }} />
          <div
            className="w-full border-2 rounded-md flex justify-center items-center relative"
            style={{ borderColor: theme.color, height: 600 }}
          >
            {!video && <h3 className="text-2xl">Vídeo</h3>}
            {video && (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="w-full h-full rounded-md"
              />
            )}
            {!cutted && (<button
              className="absolute top-4 right-4 "
              onClick={() => handleVideoChange(null)}
            >
              <IoMdClose className="w-4 h-4" style={{ fill: theme.color }} />
            </button>)}

            {!video && !cutted && (
              <input
                type="file"
                accept="video/*"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                onChange={handleFileChange}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

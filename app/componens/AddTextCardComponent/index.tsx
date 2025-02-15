"use client";
import { useTheme } from "@/app/hooks/useTheme";
import TextField from '@mui/material/TextField';
import { FieldValues, UseFormRegister } from "react-hook-form";

interface AddTextCardComponentFrontProps {
    errors?: string
    face: "front" | "back"
    label: string
}


export function AddTextCardComponent({
    errors,
    face,
    label,
    ...rest
}: AddTextCardComponentFrontProps) {
    const { theme } = useTheme();

    return (
        <div className=" flex justify-center items-center flex-col"
            style={{
                width: 370,
                minWidth: 370,
                maxWidth: 370,
            }}
        >
            <h3 className="text-2xl font-bold text-center">{face === "front" ? "Frente" : "Verso"}</h3>
            <div className="w-full">
                <div
                    className={`col-span-12 border-2 rounded-2xl p-4 flex flex-col justify-center items-center`}
                    style={{
                        borderColor: theme.color,
                        color: theme.color,
                        width: 370,
                        height: 660,
                        minHeight: 660,
                        minWidth: 370,
                        maxWidth: 370,
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


                </div>
            </div>
        </div>
    )
}



{/* {type === "with image" && (
                  <>
                    <div
                      className="w-full border-2 rounded-md flex h-48 justify-center items-center relative mt-16"
                      style={{ borderColor: theme.color, }}
                    >
                      {!photo && <h3 className="text-2xl">Foto</h3>}
                      {photo && (
                        <Image
                          alt="foto do baralho"
                          src={URL.createObjectURL(photo)}
                          width={400}
                          height={250}
                          className="w-full h-full rounded-md"
                        />
                      )}
                      <input
                        type="file"
                        accept="images/*"
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </div>
                    <label
                      htmlFor={"titulo"}
                      className={`relative   block rounded-md border-2 h-24 px-2 mt-16 shadow-sm focus-within:border-white focus-within:ring-1 focus-within:ring-white`}
                      style={{ borderColor: theme.color }}
                    >
                      <input
                        type="text"
                        id={"titulo"}
                        className="peer border-none bg-transparent text-2xl placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full h-full"
                        placeholder={"Titulo"}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />

                      <span
                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-black p-0.5 text-2xl transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-2xl peer-focus:top-0 peer-focus:text-2xl"
                        style={{ color: theme.color }}
                      >
                        Titulo
                      </span>
                    </label>
                  </>
                )} */}
"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { AddVideoCardComponent } from "../AddVideoCardComponent";
import { TextField } from "@mui/material";
import { promisify } from "util";

interface AddVideosCardContainerProps {
  deckId: string;
  sucessCallback: () => void;
  errorCallback: () => void;
  cutted?: boolean;
  videos: File[];
  handleVideoChange: (file: File | null) => void;
}

const CREATE_CARD = gql`
  mutation CreateCard($data: CreateCardInput!) {
    createCard(data: $data) {
      id
    }
  }
`;

export function AddVideosCardContainer({
  deckId,
  sucessCallback,
  cutted,
  videos,
  handleVideoChange
}: AddVideosCardContainerProps) {

  const [createCard, { data, loading, error }] = useMutation(CREATE_CARD);

  // const [video, setVideo] = useState<File | null>(null);

  const schema = z.object({
    titles: z.array(
      z.string().min(1, "O título é do corte e obrigatorio")
    ).min(1, "Pelo menos um título é necessário"),
    title: z.string().min(1, "O título principal é obrigatório")
  });
  type FormData = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const createCardFromVideo = (file: File, title: string) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          createCard({
            variables: {
              data: {
                video: reader.result,
                photo: "",
                title,
                answer: "",
                evaluation: "Very Hard",
                times: 0,
                showDataTime: new Date().toISOString(),
                deckId,
                type: "video",
              },
            },
          })
            .then(resolve)
            .catch(reject);
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    Promise.all(
      data.titles.map((t, i) => {
        const file = videos[i];
        const fullTitle = `${data.title} ${t}`;
        return file ? createCardFromVideo(file, fullTitle) : Promise.resolve();
      })
    )
      .then(() => sucessCallback())
      .catch(e => console.log(e.message));


  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titles: videos.map((_, i) => "Parte " + (i + 1)), // Cria um array de strings vazias com o mesmo tamanho de `videos`
    },
  });

  const { theme } = useTheme();

  return (
    <form
      className="w-full"
      style={{ borderColor: theme.color, color: theme.color }}
      method="Post"
      onSubmit={handleSubmit(onSubmit)}
    // onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center justify-center p-8">
        <div className="w-3/6">
          <TextField
            id={"mainTitle"}
            label={"titulo principal"}
            variant="outlined"
            className="w-full "
            error={!!errors.title}
            helperText={errors.title?.message}
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
            }}
            {...register("title")}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8 items-center justify-center">
        {videos.map((video, index) => (
          <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 flex justify-center">
            <AddVideoCardComponent
              errors={errors.titles?.[index]?.message}
              label="titulo"
              video={video}
              cutted={cutted}
              handleVideoChange={handleVideoChange}
              width={270}
              height={460}
              {...register(`titles.${index}`)}
            />
          </div>
        ))}
      </div>



      <div className="w-full flex justify-center items-center mt-4">
        <button
          className="border-2 rounded-md p-4 w-32 mb-6"
          style={{ borderColor: theme.color, color: theme.color }}
          type="submit"
        >
          Criar
        </button>
      </div>
    </form>
  )
}
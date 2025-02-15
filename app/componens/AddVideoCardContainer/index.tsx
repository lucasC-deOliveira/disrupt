"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { AddVideoCardComponent } from "../AddVideoCardComponent";

interface AddVideoCardContainerProps {
  deckId: string;
  sucessCallback: () => void;
  errorCallback: () => void;
}

const CREATE_CARD = gql`
  mutation CreateCard($data: CreateCardInput!) {
    createCard(data: $data) {
      id
    }
  }
`;

export function AddVideoCardContainer({
  deckId,
  sucessCallback
}: AddVideoCardContainerProps) {

  const [createCard, { data, loading, error }] = useMutation(CREATE_CARD);

  const [video, setVideo] = useState<File | null>(null);

  const schema = z.object({
    title: z.string().min(1, "O Título é obrigatório"),
  });

  type FormData = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    
    const reader = new FileReader();
    reader.onload = () => {
      createCard({
        variables: {
          data: {
            video: reader.result,
            photo: "",
            title: data.title,
            answer: "",
            evaluation: "Very Hard",
            times: 0,
            showDataTime: new Date().toISOString(),
            deckId,
            type: "video",
          },
        },
      })
        .then(() => {
          sucessCallback();
        })
        .catch((e): any => console.log(e.message));
    };

    video && reader.readAsDataURL(video);

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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

      <div className="col-span-12 flex justify-center gap-16">

        <AddVideoCardComponent
          errors={errors.title?.message as string}
          label="titulo"
          video={video}
          handleVideoChange={(file) => setVideo(file)}
          {...register("title")}
        />



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
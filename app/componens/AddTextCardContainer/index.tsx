"use client";
import { useTheme } from "@/app/hooks/useTheme";
import { AddTextCardComponent } from "@/app/componens/AddTextCardComponent";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@apollo/client";

interface AddTextCardContainerProps {
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

export function AddTextCardContainer({
    deckId,
    sucessCallback
}: AddTextCardContainerProps) {

      const [createCard, { data, loading, error }] = useMutation(CREATE_CARD);
    
      const schema = z.object({
        title: z.string().min(1, "O Título é obrigatório"),
        answer: z.string().min(1, "A Resposta é obrigatória"), /// Validação Zod
      });

  type FormData = z.infer<typeof schema>;
  const onSubmit: SubmitHandler<FormData> = (data) => {
   
      createCard({
        variables: {
          data: {
            photo: "",
            title: data.title,
            answer: data.answer,
            evaluation: "Very Hard",
            times: 0,
            showDataTime: new Date().toISOString(),
            deckId,
            type: "text",
          },
        },
      })
        .then((result) => {
            sucessCallback();
        })
        .catch((e): any => console.log(e.message));
    
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

          <AddTextCardComponent
            errors={errors.title?.message as string}
            face="front"
            label="titulo"
            {...register("title")}
          />

          <AddTextCardComponent
            errors={errors.answer?.message as string}
            face="back"
            label="Resposta"
            {...register("answer")}
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
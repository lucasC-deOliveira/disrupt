export  interface Card {
  answer: string;
  photo?: string;
  title: string;
  deckId: string;
  showDataTime: string;
  evaluation: string;
  times: number;
  id: string;
  type: "text" | "video" | "image";
  video?: string;
}
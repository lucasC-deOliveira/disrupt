import { Card } from "../interfaces/Card";

export async function getImage(card: Card) {
  try {
    const videoResponse = await fetch(
      `http://localhost:3333/rest/midia/${card.id}/image`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!videoResponse.body) {
      throw new Error("Nenhum corpo recebido na resposta");
    }
    
    const reader = videoResponse.body.getReader();

    const chunks: Uint8Array[] = [];


    // Utilizando um for com condição, sem o while(true)
    for (let result = await reader.read(); !result.done; result = await reader.read()) {
      if (result.value) {
        chunks.push(result.value);
      }
    }

    let totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    
    // Concatena os chunks num único Uint8Array
    const uint8Buffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      uint8Buffer.set(chunk, offset);
      offset += chunk.length;
    }

    const decodedString = new TextDecoder("utf-8").decode(uint8Buffer);
    card.photo = decodedString;

  } catch (e) {
    console.log(e, "Erro ao buscar video");
  }
}

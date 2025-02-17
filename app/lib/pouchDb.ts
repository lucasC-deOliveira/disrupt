
'use client';
import Dayjs from 'dayjs';
import PouchDB from 'pouchdb-browser';
import { v4 as uuidv4 } from 'uuid';
import { answerCardEvaluationTimeStrategy } from '../utils/AnswerCardEvaluationTimeStrategy';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getMidia } from '../utils/getMidia';


const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_APIBACKEND || '', // Certifique-se de que essa variável de ambiente está correta
    cache: new InMemoryCache(),
});

export interface CardType {
    video?: string;
    answer: string;
    photo?: string;
    title: string;
    showDataTime: string;
    evaluation: string;
    times: number;
    id: string;
    deckId: string;
    type: 'text' | 'video' | 'image';
}

export interface DocumentType {
    _id: string;
    _rev?: string;
    id: string;
    title: string;
    photo?: string;
    cards: CardType[];
}

const db = new PouchDB<DocumentType>('DisruptDB');

export default db;


// Adiciona um novo documento
export async function addDoc(doc: DocumentType): Promise<PouchDB.Core.Response | undefined> {
    try {
        const response = await db.put({ ...doc, _id: doc.id, _rev: undefined });
        return response;
    } catch (error) {
        console.error('Erro ao adicionar documento:', error);
    }
}
// ...

export async function deleteDocById(id: string): Promise<PouchDB.Core.Response | undefined> {
    try {
        const doc = await db.get(id);
        const response = await db.remove(doc);
        return response;
    } catch (error) {
        console.error(`Erro ao deletar documento com id ${id}:`, error);
        return undefined;
    }
}


// Obtém todos os documentos
export async function getAllDocs(): Promise<DocumentType[]> {
    try {
        const result = await db.allDocs({ include_docs: true });
        return result.rows.map(row => row.doc as DocumentType);
    } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        return [];
    }
}


// Atualiza um documento existente
export async function updateDoc(updatedDoc: DocumentType): Promise<PouchDB.Core.Response | undefined> {
    try {
        const existingDoc = await db.get(updatedDoc.id);
        const response = await db.put({
            ...existingDoc,
            ...updatedDoc,
            _rev: existingDoc._rev,
        });
        return response;
    } catch (error) {
        console.error('Erro ao atualizar documento:', error);
    }
}


export async function syncToServer() {
    const docs = await db.allDocs({ include_docs: true });
    const formattedDocs = docs.rows.map(row => row.doc);

    try {

        const result = await fetch(process.env.NEXT_PUBLIC_APIBACKEND_REST || '', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decks: formattedDocs }),
        });
        console.log('Documentos sincronizados com sucesso!', result);
    } catch (error) {
        console.error('Erro ao sincronizar documentos:', error);
    }
}

let isSyncingFromServer = false;
export async function syncFromServer() {
    if (isSyncingFromServer) {
        console.log('Já está sincronizando com o servidor. Aguarde...');
        return;
    }
    isSyncingFromServer = true;
    try {
        const query = `
          query {
            getAllDecks {
              id
              title
              cards {
                id
                title
                answer
                showDataTime
                evaluation
                times
                type
              }
            }
          }
        `;

        const response = await fetch(process.env.NEXT_PUBLIC_APIBACKEND || ``, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const { data } = await response.json();

        const decks = data.getAllDecks;

        for (const deck of decks) {
            try {
                if (!deck._id) {
                    deck._id = deck.id || uuidv4();
                }

                deck.photo = await getMidia(`${deck.id}/deck%2Fimage`);

                const existing = await db.get(deck._id).catch(() => null);
                if (existing) {
                    await db.put({ ...existing, ...deck, _rev: existing._rev }); // Atualiza documento existente
                } else {
                    await db.put(deck); // Insere novo documento
                }
            } catch (error) {
                console.error('Erro ao sincronizar deck:', error);
            }
        }
    } catch (error) {
        console.error('Erro na sincronizacao do servidor', error);
    }
    finally {
        console.log(isSyncingFromServer);
        isSyncingFromServer = false;
        console.log('Sincronização concluída.');
    }
}

export async function syncDeckFromServerByDeckId(deckId: string) {
    if (isSyncingFromServer) {
        console.log('Já está sincronizando com o servidor. Aguarde...');
        return;
    }

    isSyncingFromServer = true;

    try {
        const GET_DECK_BY_ID = gql`
          query GetDeckById($id: String!) {
            getDeckById(id: $id) {
              id
              title
              cards {
                id
                title
                answer
                photo
                showDataTime
                evaluation
                times
                type
                }
              }
          }
        `;

        const { data, error } = await client.query({
            query: GET_DECK_BY_ID,
            variables: { id: deckId },
        });

        if (error) {
            console.error('Erro na query:', error);
        }

        const deckFromServer: DocumentType = { 
            _id: deckId,
            id: data.getDeckById.id,
            title: data.getDeckById.title,
            photo: await getMidia(`${deckId}/deck%2Fimage`) || '',
            cards: data.getDeckById.cards
        }

        if (!deckFromServer) {
            console.log(`Deck com id ${deckId} não encontrado no servidor.`);
            return;
        }
        try {
            const existing = await db.get(deckFromServer._id).catch(() => null);

            if (existing) {
                await db.put({ ...existing, ...deckFromServer, _rev: existing._rev }); // Atualiza documento existente
            } else {
                await db.put(deckFromServer); 
            }
        } catch (error) {
            console.error('Erro ao sincronizar deck:', error);
        }
    } catch (error) {
        console.error('Erro na sincronizacao do servidor', error);
    } finally {
        console.log(isSyncingFromServer);
        isSyncingFromServer = false;
        console.log('Sincronização concluída.');
    }
}
export async function getDocById(id: string): Promise<DocumentType | undefined> {
    try {
        const doc = await db.get(id);
        return doc;
    } catch (error) {
        console.error(`Erro ao buscar documento com id ${id}:`, error);
        return undefined;
    }
}

export async function findCardByDeckIdAndMostLateShowDataTime(deckId: string): Promise<CardType | undefined> {
    try {
        const deck = await db.get(deckId);
        const now = new Date();
        const overdueCards = deck.cards.filter(card => new Date(card.showDataTime) < now);
        if (overdueCards.length === 0) {
            return undefined;
        }
        // Retorna o card com a showDataTime mais antiga (mais atrasado)
        return overdueCards.reduce((earliest, card) => {
            return new Date(card.showDataTime) < new Date(earliest.showDataTime) ? card : earliest;
        }, overdueCards[0]);
    } catch (error) {
        console.error('Erro ao buscar card atrasado:', error);
        return undefined;
    }
}

export async function findCardsByDeckIdAndMostLateShowDataTimeAndQtd(deckId: string, quantity: number): Promise<CardType[]> {
    try {
        const deck = await db.get(deckId);
        const now = new Date();
        // Filtra os cards que estão atrasados
        const overdueCards = deck.cards.filter(card => new Date(card.showDataTime) < now);
        if (overdueCards.length === 0) {
            return [];
        }
        // Ordena os cards de forma que o com showDataTime mais antiga (mais atrasado) venha primeiro
        overdueCards.sort((a, b) => new Date(a.showDataTime).getTime() - new Date(b.showDataTime).getTime());
        // Retorna a quantidade solicitada de cards
        return overdueCards.slice(0, quantity);
    } catch (error) {
        console.error('Erro ao buscar cards atrasados:', error);
        return [];
    }
}

export async function answerCard(deckId: string, cardId: string, evaluation: "Very Hard" | "Hard" | "Normal" | "Easy"): Promise<PouchDB.Core.Response | undefined> {
    try {
        // Busca o deck com base no deckId
        const deck = await db.get(deckId);

        if (!deck) {
            console.error(`Deck with id ${deckId} not found`);
            return;
        }
        // Encontra o índice do card no array cards
        const cardIndex = deck.cards.findIndex(card => card.id === cardId);
        if (cardIndex === -1) {
            console.error(`Card with id ${cardId} not found in deck ${deckId}`);
            return;
        }

        // Atualiza a avaliação e incrementa o número de vezes que o card foi respondido
        deck.cards[cardIndex].times = deck.cards[cardIndex].evaluation == evaluation ? (deck.cards[cardIndex].times || 0) + 1 : 1;
        deck.cards[cardIndex].evaluation = evaluation;
        deck.cards[cardIndex].showDataTime = Dayjs().add(answerCardEvaluationTimeStrategy(deck.cards[cardIndex].times, evaluation), 's').toISOString();

        // Realiza o put no documento atualizado
        const response = await db.put({ ...deck, _rev: deck._rev });
        return response;
    } catch (error) {
        console.error('Erro ao atualizar a carta:', error);
    }
}

export async function getDeckById(deckId: string): Promise<DocumentType | undefined> {
    try {
        const deck = await db.get(deckId) as DocumentType;
        return deck;
    } catch (error) {
        console.error(`Erro ao buscar deck com id ${deckId}:`, error);
        return undefined;
    }
}

export async function syncDeckToServer(deckId: string) {
    try {
        // Busca o deck específico no banco local
        const deck = await db.get(deckId);

        // Envia o deck para o servidor, encapsulado em um array no mesmo formato que o syncToServer espera
        const result = await fetch(process.env.NEXT_PUBLIC_APIBACKEND_REST || ``, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decks: [deck] }),
        });

        console.log('Deck sincronizado com sucesso!', result);
    } catch (error) {
        console.error(`Erro ao sincronizar deck com id ${deckId}:`, error);
    }
}

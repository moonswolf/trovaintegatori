import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { products } = await request.json();

    // Verifica che la API key sia configurata
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key non configurata. Contatta l\'amministratore.' },
        { status: 500 }
      );
    }

    // Prepara il prompt per Claude
    const prompt = `Sei un esperto di integratori alimentari. Analizza questi prodotti e fornisci un confronto dettagliato.

PRODOTTI DA CONFRONTARE:
${products.map((p: any, i: number) => `
${i + 1}. ${p.name} - ${p.brand}
   Prezzo: €${p.price}
   Composizione: ${p.composition}
   Forma: ${p.form}
   Quantità: ${p.quantity}
`).join('\n')}

Fornisci la risposta in formato JSON con questa struttura esatta:
{
  "livello_equivalenza": "Alta/Media/Bassa - spiegazione breve",
  "migliore_rapporto_prezzo_qualita": "Nome del prodotto e motivazione",
  "differenze_principali": "Descrizione delle differenze chiave tra i prodotti",
  "avvertenze": "Eventuali avvertenze o note importanti sulla composizione",
  "raccomandazione_finale": "Raccomandazione conclusiva per l'acquisto"
}`;

    // Chiamata a Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return NextResponse.json(
        { error: 'Errore nella chiamata all\'AI. Riprova tra poco.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const analysisText = data.content[0].text;

    // Estrai il JSON dalla risposta
    let analysis;
    try {
      // Claude potrebbe rispondere con ```json ... ``` quindi rimuoviamo i backticks
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = JSON.parse(analysisText);
      }
    } catch (e) {
      console.error('JSON parse error:', e);
      return NextResponse.json(
        { error: 'Errore nel parsing della risposta AI.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis });

  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Errore interno del server' },
      { status: 500 }
    );
  }
}

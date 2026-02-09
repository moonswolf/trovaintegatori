# TrovaIntegratori.it 🏥

Comparatore intelligente di prezzi per integratori e vitamine in Italia con analisi AI.

## ✨ Nuove Funzionalità (v2)

- **Navbar di navigazione** con menu responsive
- **Pagina Confronta** - Comparatore con AI integrata
- **Pagina Chi Siamo** - Informazioni sul progetto
- **Pagina Come Funziona** - Guida per gli utenti
- **Pagina Contatti** - Form per contattare il team
- **Analisi AI** - Claude API per confrontare composizioni
- **Database prodotti** - 12 prodotti sample da diverse categorie

## 🚀 Setup Rapido

### 1. Configura l'API Key di Anthropic

Il comparatore AI richiede una chiave API di Anthropic.

**Ottieni la chiave:**
1. Vai su https://console.anthropic.com/
2. Crea un account (se non ce l'hai)
3. Vai in **API Keys** e genera una nuova chiave
4. Copia la chiave (inizia con `sk-ant-...`)

**Configura su Vercel:**
1. Vai nel tuo progetto su vercel.com
2. Settings → Environment Variables
3. Aggiungi una nuova variabile:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** (incolla la tua chiave API)
4. Salva
5. Vai in Deployments → Redeploy (per applicare le variabili)

### 2. Test in Locale (Opzionale)

Se vuoi testare sul tuo computer:

```bash
# Clona la repo
git clone https://github.com/moonswolf/trovaintegatori.git
cd trovaintegatori

# Installa dipendenze
npm install

# Crea file .env.local
cp .env.example .env.local

# Apri .env.local e aggiungi la tua API key
# ANTHROPIC_API_KEY=sk-ant-your-key-here

# Avvia il server di sviluppo
npm run dev
```

Apri http://localhost:3000

## 📁 Struttura Progetto

```
trovaintegatori/
├── app/
│   ├── api/
│   │   └── compare/
│   │       └── route.ts          # API endpoint per Claude
│   ├── chi-siamo/
│   │   └── page.tsx              # Pagina Chi Siamo
│   ├── come-funziona/
│   │   └── page.tsx              # Pagina Come Funziona
│   ├── confronta/
│   │   └── page.tsx              # Comparatore AI
│   ├── contatti/
│   │   └── page.tsx              # Form contatti
│   ├── layout.tsx                # Layout con Navbar
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Stili globali
├── components/
│   ├── EmailForm.tsx             # Form email early access
│   ├── Features.tsx              # Sezione benefici
│   ├── Footer.tsx                # Footer
│   ├── Hero.tsx                  # Hero section homepage
│   └── Navbar.tsx                # Menu di navigazione
└── public/                       # Assets statici
```

## 🛠️ Workflow Modifiche

### Come fare modifiche al sito:

1. **Chiedi a Claude** di modificare/aggiungere una feature
2. Claude ti genera i file modificati
3. **Scarica i file** che Claude ti output
4. **Carica su GitHub:**
   - Vai su github.com/moonswolf/trovaintegatori
   - Naviga al file da modificare
   - Click sull'icona matita (edit)
   - Incolla il nuovo contenuto
   - Commit changes
5. **Vercel deploya automaticamente** in 30 secondi

### Esempio workflow:

```
Tu: "Aggiungi una sezione FAQ nella homepage"
     ↓
Claude: [genera app/page.tsx modificato]
     ↓
Tu: Scarichi il file
     ↓
Tu: Lo carichi su GitHub (tramite browser)
     ↓
Vercel: Deploy automatico
     ↓
Sito aggiornato! ✅
```

## 🤖 Come Funziona l'AI

Il comparatore usa **Claude Sonnet 4** per:

1. Analizzare la composizione di 2-3 prodotti
2. Valutare il livello di equivalenza
3. Identificare il miglior rapporto qualità-prezzo
4. Evidenziare differenze chiave
5. Fornire raccomandazioni personalizzate

**Flusso tecnico:**
```
User seleziona prodotti
     ↓
Frontend chiama /api/compare
     ↓
Backend chiama Claude API (con ANTHROPIC_API_KEY)
     ↓
Claude analizza e risponde in JSON
     ↓
Frontend mostra l'analisi all'utente
```

## 📊 Database Prodotti (Attuale)

Al momento abbiamo un database **sample** con 12 prodotti:
- 3 prodotti Vitamina D
- 3 prodotti Magnesio
- 3 prodotti Collagene
- 3 prodotti Omega-3

**Prossimi step:**
- Integrare database Supabase
- Aggiungere 50-80 prodotti reali
- Implementare scraping prezzi automatico
- Storico prezzi e grafici

## 🔗 Link Amazon Affiliati

I link affiliati usano il tag: `trovaintegatori-21` (placeholder)

**Per usare il tuo vero tag:**
1. Ottieni il tag da Amazon Associates
2. Sostituisci in `app/confronta/page.tsx`:
   - Cerca: `trovaintegatori-21`
   - Sostituisci con: `tuo-tag-amazon`

## 📧 Integrazione Email (TODO)

Il form contatti è pronto ma serve integrazione backend.

**Opzioni consigliate:**
- **Resend** - https://resend.com (5.000 email/mese gratis)
- **SendGrid** - https://sendgrid.com
- **Mailchimp**

## 🎨 Personalizzazioni

### Colori principali:
- Emerald (verde): `emerald-600` (#059669)
- Blu: `blue-600`
- Grigio: `gray-900`, `gray-700`

### Font:
- Sistema: `font-sans` (Tailwind default)

## 📝 License

© 2025 TrovaIntegratori.it - Tutti i diritti riservati

---

**Made with ❤️ in Italy**

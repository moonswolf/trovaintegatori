# 🚀 GUIDA AGGIORNAMENTO TROVAINTEGATORI V2

## Cosa c'è di nuovo

✅ Menu di navigazione (Navbar)  
✅ Pagina Confronta Prezzi con AI  
✅ Pagina Chi Siamo  
✅ Pagina Come Funziona  
✅ Pagina Contatti con form  
✅ API backend per Claude  
✅ Database sample 12 prodotti  

---

## STEP 1 — Carica i nuovi file su GitHub

Hai 9 file da caricare/modificare. Ecco la lista in ordine:

### File DA CREARE (nuovi):

**1. components/Navbar.tsx**
- Vai su: github.com/moonswolf/trovaintegatori
- Click **Add file** → **Create new file**
- Nome file: `components/Navbar.tsx`
- Incolla il contenuto (dal file che scarichi)
- Commit

**2. app/api/compare/route.ts**
- **Add file** → **Create new file**
- Nome: `app/api/compare/route.ts`
- GitHub crea automaticamente le cartelle `api/compare/`
- Incolla contenuto
- Commit

**3. app/chi-siamo/page.tsx**
- **Add file** → **Create new file**
- Nome: `app/chi-siamo/page.tsx`
- Incolla contenuto
- Commit

**4. app/come-funziona/page.tsx**
- **Add file** → **Create new file**
- Nome: `app/come-funziona/page.tsx`
- Incolla contenuto
- Commit

**5. app/confronta/page.tsx**
- **Add file** → **Create new file**
- Nome: `app/confronta/page.tsx`
- Incolla contenuto
- Commit

**6. app/contatti/page.tsx**
- **Add file** → **Create new file**
- Nome: `app/contatti/page.tsx`
- Incolla contenuto
- Commit

**7. .env.example**
- **Add file** → **Create new file**
- Nome: `.env.example`
- Incolla contenuto
- Commit

---

### File DA MODIFICARE (esistenti):

**8. app/layout.tsx** (SOSTITUIRE)
- Vai nel file: `app/layout.tsx`
- Click icona **matita** (edit)
- Seleziona tutto il contenuto
- Sostituisci con il nuovo (dal file che scarichi)
- Commit

**9. README.md** (SOSTITUIRE)
- Vai nel file: `README.md`
- Click icona **matita** (edit)
- Seleziona tutto
- Sostituisci con il nuovo
- Commit

---

## STEP 2 — Configura l'API Key su Vercel

Dopo aver caricato i file su GitHub:

### 2.1 — Ottieni la chiave Anthropic

1. Vai su **https://console.anthropic.com/**
2. Crea account (se non ce l'hai)
3. Click **API Keys** nel menu
4. Click **Create Key**
5. Copia la chiave (inizia con `sk-ant-...`)

### 2.2 — Aggiungi su Vercel

1. Vai su **vercel.com**
2. Apri il progetto **trovaintegatori**
3. Click **Settings** (in alto)
4. Nel menu laterale: **Environment Variables**
5. Click **Add New**
6. Compila:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** (incolla la chiave che hai copiato)
   - **Environment:** Production, Preview, Development (seleziona tutti e 3)
7. Click **Save**

### 2.3 — Redeploy

1. Vai in **Deployments**
2. Trova il deployment più recente
3. Click i **tre puntini** `...`
4. Click **Redeploy**
5. Aspetta 30-60 secondi

✅ Fatto! Il sito è aggiornato con tutte le nuove funzionalità.

---

## STEP 3 — Verifica che tutto funzioni

Vai su **trovaintegatori.it** e controlla:

✅ Il menu in alto appare correttamente  
✅ Tutte le pagine del menu sono accessibili  
✅ La pagina /confronta mostra i prodotti  
✅ Selezionando 2-3 prodotti e cliccando "Confronta con AI" appare l'analisi  

Se l'analisi AI **non funziona**, verifica:
- L'API key è configurata correttamente su Vercel
- Hai fatto il Redeploy dopo aver aggiunto l'API key
- La chiave non è scaduta (controlla su console.anthropic.com)

---

## WORKFLOW FUTURO — Come fare modifiche

Da ora in poi, ogni volta che vuoi modificare qualcosa:

**1. Chiedi a Claude**
```
"Aggiungi una sezione FAQ nella homepage"
"Cambia il colore del menu in blu"
"Aggiungi 10 nuovi prodotti al database"
```

**2. Claude ti genera i file modificati**

**3. Tu li scarichi e carichi su GitHub** (come hai fatto ora)

**4. Vercel deploya automaticamente** in ~30 secondi

Non serve rifare tutto il setup. Solo:
- Scaricare il file che Claude ti da
- Caricarlo su GitHub (edit del file esistente)
- Aspettare il deploy automatico

---

## COSTI

**Vercel:** Gratuito (piano Hobby)  
**GitHub:** Gratuito  
**Anthropic API:** Pay-as-you-go
- Primo milione di token input: ~$3
- Claude Sonnet 4: $3 per milione token input, $15 per milione token output
- Confronto medio: ~500 token = $0.0015 (meno di 1 centesimo)
- Con 1.000 confronti/mese = ~$1.50/mese

---

## SUPPORT

Se qualcosa non funziona:

1. Controlla i **logs** su Vercel (Deployments → click sul deployment → Runtime Logs)
2. Verifica l'API key su Anthropic console
3. Chiedi a Claude di risolvere il problema specifico

---

**Buon lavoro! 🚀**

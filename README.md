# TrovaIntegratori.it 🏥

Comparatore intelligente di prezzi per integratori e vitamine in Italia.

## 🚀 Tecnologie

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel** - Hosting

## 📦 Installazione Locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 🌐 Deploy su Vercel

### Opzione 1 - Import da GitHub (Consigliata)

1. **Push su GitHub** (esegui questi comandi nella cartella del progetto):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Landing page TrovaIntegratori"
   git branch -M main
   git remote add origin https://github.com/moonswolf/trovaintegatori.git
   git push -u origin main
   ```

2. **Deploy su Vercel**:
   - Vai su [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import repository `moonswolf/trovaintegatori`
   - Click "Deploy" (zero configurazioni necessarie)
   - ✅ Fatto!

3. **Collega dominio personalizzato**:
   - Nel progetto Vercel → Settings → Domains
   - Aggiungi `trovaintegatori.it`
   - Vercel ti darà i DNS records da configurare su Aruba

### Opzione 2 - CLI Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🔧 Configurazione DNS Aruba

Dopo il deploy su Vercel, configura questi DNS records su Aruba:

**Record A:**
- Tipo: `A`
- Nome: `@`
- Valore: `76.76.21.21`
- TTL: `3600`

**Record CNAME:**
- Tipo: `CNAME`
- Nome: `www`
- Valore: `cname.vercel-dns.com`
- TTL: `3600`

⏱️ Tempo propagazione DNS: 10-30 minuti (max 24h)

## 📧 Integrazione Email (TODO)

Il form email è pronto per integrazione con:
- Mailchimp
- ConvertKit
- SendGrid
- Resend

File da modificare: `components/EmailForm.tsx`

## 🔗 Affiliazione Amazon

Per aggiungere link affiliazione:
1. Registrati su [programma-affiliazione.amazon.it](https://programma-affiliazione.amazon.it)
2. Ottieni il tuo ID affiliato
3. Aggiungi alla configurazione (prossimo step sviluppo)

## 📊 Roadmap

### Fase 1 - Landing (✅ Completata)
- [x] Design landing page
- [x] Form raccolta email
- [x] SEO base
- [x] Deploy Vercel

### Fase 2 - MVP Comparatore (In arrivo)
- [ ] Database Supabase
- [ ] API integrazione Amazon
- [ ] Pagina comparatore funzionante
- [ ] Sistema watchlist

### Fase 3 - Monetizzazione
- [ ] Integrazione Stripe
- [ ] Dashboard utente premium
- [ ] Sistema alert email/push

### Fase 4 - AI Features
- [ ] Claude API per suggerimenti
- [ ] Analisi composizione integratori
- [ ] Confronto prodotti equivalenti

## 🛠️ Comandi Utili

```bash
npm run dev          # Avvia development server
npm run build        # Build per production
npm run start        # Avvia production server
npm run lint         # Controlla codice
```

## 📝 License

© 2025 TrovaIntegratori.it - Tutti i diritti riservati

---

**Made with ❤️ in Italy**

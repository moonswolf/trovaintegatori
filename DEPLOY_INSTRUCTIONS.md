# 🚀 ISTRUZIONI RAPIDE DEPLOY

## STEP 1: PUSH SU GITHUB ✅

Esegui questi comandi nel terminale (nella cartella /home/claude/trovaintegatori):

```bash
cd /home/claude/trovaintegatori
git init
git add .
git commit -m "Initial commit - Landing page TrovaIntegratori"
git branch -M main
git remote add origin https://github.com/moonswolf/trovaintegatori.git
git push -u origin main
```

**NOTA**: Prima di eseguire i comandi, vai su https://github.com/new e crea il repository:
- Nome: `trovaintegatori`
- Visibilità: Pubblico
- NON aggiungere README, .gitignore, o license (già presenti)

---

## STEP 2: DEPLOY SU VERCEL 🌐

1. Vai su: https://vercel.com
2. Login (se non hai account, usa GitHub)
3. Click **"Add New Project"**
4. Seleziona repository **`moonswolf/trovaintegatori`**
5. Click **"Deploy"** (zero configurazioni necessarie)
6. Aspetta 2-3 minuti ⏱️
7. ✅ FATTO! Ricevi link tipo: `trovaintegatori.vercel.app`

---

## STEP 3: COLLEGA DOMINIO ARUBA 🔗

Nel progetto Vercel appena creato:

1. Vai in **Settings** → **Domains**
2. Aggiungi dominio: `trovaintegatori.it`
3. Vercel ti mostra i DNS records
4. Copia questi valori

Poi su **Aruba** (pannello gestione DNS):

**Record A:**
- Tipo: `A`
- Nome: `@`
- Valore: `76.76.21.21`

**Record CNAME:**
- Tipo: `CNAME`
- Nome: `www`
- Valore: `cname.vercel-dns.com`

⏱️ **Propagazione DNS**: 10-30 minuti (max 24h)

---

## VERIFICA TUTTO FUNZIONA ✅

Dopo propagazione DNS, visita:
- https://trovaintegatori.it
- https://www.trovaintegatori.it

Dovresti vedere la landing page live! 🎉

---

## PROBLEMI COMUNI 🔧

**"Repository non trovato":**
- Verifica di aver creato il repo su GitHub
- Controlla che sia pubblico

**"Permission denied" durante git push:**
- Configura SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Oppure usa HTTPS e inserisci username/password

**DNS non propagato dopo 2 ore:**
- Verifica record DNS su: https://dnschecker.org
- Controlla di non aver errori di battitura nei record

---

📧 **Prossimo step**: Integra sistema email per raccogliere iscrizioni!

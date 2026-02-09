#!/bin/bash

# COMANDI PER PUSHARE SU GITHUB
# Copia e incolla questi comandi nel terminale, UNO ALLA VOLTA

# 1. Vai nella cartella del progetto
cd /home/claude/trovaintegatori

# 2. Inizializza repository Git
git init

# 3. Aggiungi tutti i file
git add .

# 4. Fai il primo commit
git commit -m "Initial commit - Landing page TrovaIntegratori"

# 5. Rinomina branch in main
git branch -M main

# 6. Collega a GitHub (PRIMA devi creare il repository su github.com!)
git remote add origin https://github.com/moonswolf/trovaintegatori.git

# 7. Push su GitHub
git push -u origin main

# Fine! Se vedi errori sul comando 6 o 7, segui le istruzioni qui sotto:

# ALTERNATIVA SE NON HAI CREATO IL REPO SU GITHUB:
# 1. Vai su https://github.com/new
# 2. Nome repository: trovaintegatori
# 3. Pubblico
# 4. NO README, NO .gitignore, NO license
# 5. Click "Create repository"
# 6. Poi esegui i comandi 6 e 7 qui sopra

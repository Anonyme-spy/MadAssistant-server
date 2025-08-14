import  {Router} from 'express';
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import sql from "../config/db.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route pour récupérer les données des cartes
router.get('/cards', (req, res) => {
  try {
    const dbPath = path.join(__dirname,'..', 'json', 'db.json');
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);

    const cards = jsonData.Options;

    res.json(cards);
    console.log("json sended")
    console.log(jsonData)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
  }
});

// Route pour récupérer une carte spécifique
router.get('/cards/:id', (req, res) => {
  try {
    const dbPath = path.join(__dirname, 'json', 'db.json');
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);

    const card = jsonData.Options.CardData[req.params.id];

    if (card) {
      res.json(card);
    } else {
      res.status(404).json({ error: 'Carte non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
  }
});

// Route pour créer un formulaire
// Route pour créer un formulaire
router.post('/forms', async (req, res) => {
  try {
    const { Nom, Email, Message } = req.body;

    // Vérifier que les champs requis sont présents
    if (!Nom || !Email || !Message) {
      return res.status(400).json({
        error: 'Les champs Nom, Email et Message sont requis'
      });
    }

    const [result] = await sql.execute(
        'INSERT INTO forms (Nom, Email, Message, Sending_date) VALUES (?, ?, ?, NOW())',
        [Nom, Email, Message]
    );

    res.status(201).json({
      message: 'Formulaire enregistré avec succès',
      id: result.insertId
    });
  } catch (error) {
    console.error('Erreur MySQL:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
  }
});

// Route pour récupérer tous les formulaires
router.get('/forms', async (req, res) => {
  try {
    const [rows] = await sql.execute('SELECT * FROM forms ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Erreur MySQL:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

export default router;
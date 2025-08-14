import app from "./components/server.js";
const PORT = process.env.PORT || 3210;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
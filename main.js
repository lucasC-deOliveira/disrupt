const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

async function waitForServer(url, retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) return true;
      } catch (err) {
        console.log(`Aguardando servidor (${i + 1}/${retries})...`);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    return false;
  } 

app.whenReady().then(async () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: 'hidden',
        transparent: true, // Permite transparência na janela
        resizable: true, // Permite redimensionamento
        hasShadow: true, // Adiciona sombra
        roundedCorners: true, // Deixa os cantos arredondados (para macOS)
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        enableBlinkFeatures: "OverlayScrollbars",
    });


    const serverReady = await waitForServer("http://localhost:3000");
    if (serverReady) {
        mainWindow.loadURL("http://localhost:3000");
        mainWindow.webContents.openDevTools();
    } else {
        console.error("Falha ao conectar ao servidor Next.js.");
    }
});

// Eventos de controle de janela
ipcMain.on('close-app', () => {
    if (mainWindow) {
        mainWindow.close(); // Fechar a janela
    }
});

ipcMain.on('minimize-app', () => {
    if (mainWindow) {
        mainWindow.minimize(); // Minimizar a janela
    }
});

ipcMain.on('maximize-app', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.restore(); // Restaurar se já maximizado
        } else {
            mainWindow.maximize(); // Maximizar a janela
        }
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
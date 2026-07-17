const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');

const state = {
    base64Solved: false,
    rot13Solved: false,
    passwordUnlocked: false,
    finalPassword: "Joy4U",
    exited: false
};

function appendLine(text, type = "normal") {
    const line = document.createElement('div');
    line.classList.add('terminal-line');

    if (type === "info") line.innerHTML = `<span class="badge badge-info me-2">INFO</span>${text}`;
    else if (type === "hint") line.innerHTML = `<span class="badge badge-hint me-2">HINT</span>${text}`;
    else if (type === "error") line.innerHTML = `<span class="badge badge-error me-2">ERROR</span>${text}`;
    else line.textContent = text;

    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function bootSequence() {
    appendLine("[BOOT SEQUENCE INITIATED]");
    appendLine("Loading Friendship Kernel........ OK");
    appendLine("Mounting Birthday Partition...... OK");
    appendLine("Decrypting Memory Blocks......... OK");
    appendLine("Scanning User: ******...... OK");
    appendLine("");
    appendLine("System ready.", "info");
    appendLine("Tape 'help' pour voir les commandes disponibles.", "hint");
}

function showHelp() {
    appendLine("Commandes disponibles :", "info");
    appendLine("  help           - afficher l’aide");
    appendLine("  ls             - lister les fichiers");
    appendLine("  puzzle1        - puzzle Base64");
    appendLine("  puzzle2        - puzzle ROT13");
    appendLine("  unlock <pass>  - déverrouiller le message final");
    appendLine("  . <file>       - acceder a un fichier (ex :  readme.txt)");
    appendLine("  xx             - retour");
    appendLine("  exit           - quitter");
}

function listFiles() {
    appendLine("Répertoire /birthday :", "info");
    appendLine("  cake.png");
    appendLine("  confetti.sys");
    appendLine("  readme.txt");
    appendLine("  secret.key (protégé)");
}

function openFile(file) {

    switch(file) {

        case "readme.txt":
            appendLine("=== readme.txt ===", "info");
            appendLine("Bienvenue dans le Birthday Terminal !");
            appendLine("Pour accéder au message secret, tu devras :");
            appendLine("  1. Résoudre le puzzle Base64 (puzzle1)");
            appendLine("  2. Résoudre le puzzle ROT13 (puzzle2)");
            appendLine("  3. Ouvrir le fichier secret.key pour entrer le mot de passe");
            appendLine("Astuce : utilise le fichier confetti.sys pour déchiffret le code hexadécimal");
            appendLine("Tape 'xx' pour revenir en arrière.", "hint");
            break;

        case "cake.png":
            appendLine("Erreur : fichier corrompu. Impossible de lire cake.png.", "error");
            break;

        case "confetti.sys":
            if (state.base64Solved && state.rot13Solved) {
                appendLine("=== confetti.sys ===", "info");
                appendLine("Déchiffrement complet !");
                appendLine("Accès autorisé !");
                appendLine("Téléchargement du fichier réel…", "info");
                triggerDownload();
                appendLine("Confettis virtuels chargés !");
            } else {
                appendLine("Erreur : déchiffrement incomplet. Résous les puzzles d'abord.", "error");
            }
            break;

        case "secret.key":
            appendLine("=== secret.key ===", "info");
            appendLine("Tape 'xx' pour revenir en arrière.", "hint");
            appendLine("Ce fichier est protégé.");
            appendLine("Entrez le mot de passe avec : unlock <mot_de_passe>");
            break;

        default:
            appendLine("Erreur : fichier introuvable.", "error");
    }
}

function triggerDownload() {
    window.open("real-files/confetti.txt", "_blank");
}

function puzzleBase64() {
    appendLine("Puzzle #1 : Message encodé en Base64.", "info");
    const encoded = "YW5uaXZlcnNhaXJl"; // "anniversaire"
    appendLine("Message encodé : " + encoded, "info");
    appendLine("Astuce : c’est du Base64 😉", "hint");
    appendLine("Quand tu as trouvé : puzzle1 answer <message>");
}

function checkPuzzle1Answer(answer) {
    const expected = "anniversaire";
    if (answer.trim() === expected) {
        appendLine("Correct ! Puzzle 1 résolu.", "info");
        appendLine("Code hexadécimal : 0x4A 0x6F 0x79", "info");
        state.base64Solved = true;
    } else {
        appendLine("Incorrect. Réessaie.", "error");
    }
}

function rot13(text) {
    return text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
}

function puzzleRot13() {
    appendLine("Puzzle #2 : secret.key encodé en ROT13.", "info");
    const secret = "UnccL10"; // HAPPY10
    appendLine("Contenu : " + secret, "info");
    appendLine("Astuce : ROT13 décale de 13 lettres.", "hint");
    appendLine("Quand tu as trouvé : puzzle2 answer <mot>");
}

function checkPuzzle2Answer(answer) {
    const decoded = rot13("UnccL10");
    if (answer.trim() === decoded) {
        appendLine("Bien joué ! Mot de passe final obtenu.", "info");
        appendLine("Code hexadécimal : 0x34 0x55 0x21", "info");
        state.rot13Solved = true;
        state.passwordUnlocked = true;
    } else {
        appendLine("Ce n’est pas le bon mot.", "error");
    }
}

function showFinalMessage() {
    const ascii = `
██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗    ██████╗ ██╗██████╗ ████████╗██╗  ██╗██████╗  █████╗ ██╗   ██╗    ██╗██╗██╗
██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔══██╗██║██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝    ██║██║██║
███████║███████║██████╔╝██████╔╝ ╚████╔╝     ██████╔╝██║██████╔╝   ██║   ███████║██║  ██║███████║ ╚████╔╝     ██║██║██║
██╔══██║██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝      ██╔══██╗██║██╔══██╗   ██║   ██╔══██║██║  ██║██╔══██║  ╚██╔╝      ╚═╝╚═╝╚═╝
██║  ██║██║  ██║██║     ██║        ██║       ██████╔╝██║██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║   ██║       ██╗██╗██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝       ╚═════╝ ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝╚═╝╚═╝

`;

    const line = document.createElement('div');
    line.classList.add('ascii-title');
    line.textContent = ascii;
    terminal.appendChild(line);

    appendLine("Joy Level: 100% | Message : allowed", "info");
    appendLine("Message : Coucou ! Je te souhaite un très joyeux anniversaire et beaucoup de bonheur pour cette nouvelle année !", "info");
    appendLine("Tu peux fermer avec 'exit'.", "hint");
}

function tryUnlock(password) {
    if (!state.passwordUnlocked) {
        appendLine("Tu n’as pas encore débloqué le mot de passe.", "error");
        return;
    }
    if (password.trim() === state.finalPassword) {
        appendLine("Mot de passe accepté.", "info");
        showFinalMessage();
    } else {
        appendLine("Mot de passe incorrect.", "error");
    }
}


function handleCommand(cmd) {
    if (state.exited) return;

    appendLine("> " + cmd);

    const parts = cmd.split(" ");
    const base = parts[0];

    const commands = new Map([
        ["help", () => showHelp()],
        [".", () => {
            const file = cmd.slice(2).trim();
            if (!file) appendLine("Usage : . <nom_du_fichier>", "error");
            else openFile(file);
        }],
        ["ls", () => listFiles()],
        ["puzzle1", () => {
            if (parts[1] === "answer") {
                checkPuzzle1Answer(cmd.slice("puzzle1 answer".length).trim());
            } else puzzleBase64();
        }],
        ["puzzle2", () => {
            if (parts[1] === "answer") {
                checkPuzzle2Answer(cmd.slice("puzzle2 answer".length).trim());
            } else puzzleRot13();
        }],
        ["unlock", () => tryUnlock(cmd.slice("unlock".length).trim())],
        ["xx", () => appendLine("Retour en arrière.", "info")],
        ["exit", () => {
            appendLine("Fermeture du terminal.", "info");
            state.exited = true;
            input.disabled = true;
        }]
    ]);

    const action = commands.get(base);

    if (action) action();
    else appendLine("Commande inconnue.", "error");
}


input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const cmd = input.value;
        input.value = "";
        handleCommand(cmd);
    }
});

bootSequence();

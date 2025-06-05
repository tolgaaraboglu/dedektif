const sceneDiv = document.getElementById('scene');
const optionsDiv = document.getElementById('options');
const cluesUl = document.getElementById('clues');
let clues = [];

const scenes = {
    start: {
        text: `Egypt, 1937. The sun sets over the pyramids as you arrive at the excavation site. Whispered rumors speak of a hidden vault.`,
        options: [
            { text: 'Begin investigation', next: 'site' }
        ]
    },
    site: {
        text: `Workers hurry about nervously. A stack of wooden crates catches your attention as the foreman approaches.`,
        options: [
            { text: 'Inspect the crates', result: 'Inside a crate you find a torn telegram mentioning the digits \"19\".', clue: 'Telegram scrap with digits "19"', next: 'chamber' },
            { text: 'Talk to the foreman', result: 'The foreman stammers about missing relics.', next: 'chamber' }
        ]
    },
    chamber: {
        text: `Night falls as you venture into a newly uncovered chamber. Dusty walls are covered in fading hieroglyphs.`,
        options: [
            { text: 'Study the hieroglyphs', result: 'Among the symbols you decipher \"37\" etched beside an ankh.', clue: 'Glyph hinting digits "37"', next: 'camp' },
            { text: 'Follow a suspicious noise', result: 'You chase the sound but find only shifting sand. The glyphs draw your attention.', clue: 'Glyph hinting digits "37"', next: 'camp' }
        ]
    },
    camp: {
        text: `Back at camp, the tension is palpable. You know someone is hiding information about the vault.`,
        options: [
            { text: "Search the scribe's tent", result: 'You discover a note: "Combine the numbers from the telegram and the glyph."', clue: 'Note about combining numbers', next: 'vault' },
            { text: 'Confront the foreman', result: 'Sweating, he admits the code uses the digits you have found.', clue: 'Foreman confirms digits form the code', next: 'vault' }
        ]
    },
    vault: {
        text: 'You stand before the ancient vault door. Its mechanism awaits a four-digit code.',
        input: true
    }
};

function addClue(clue) {
    clues.push(clue);
    const li = document.createElement('li');
    li.textContent = clue;
    cluesUl.appendChild(li);
}

function showScene(key) {
    const scene = scenes[key];
    sceneDiv.textContent = scene.text;
    optionsDiv.innerHTML = '';
    if (scene.options) {
        scene.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt.text;
            btn.onclick = () => choose(opt);
            optionsDiv.appendChild(btn);
        });
    }
    if (scene.input) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'codeInput';
        input.maxLength = 4;
        const btn = document.createElement('button');
        btn.textContent = 'Unlock';
        btn.onclick = attemptCode;
        optionsDiv.appendChild(input);
        optionsDiv.appendChild(btn);
    }
}

function choose(option) {
    sceneDiv.innerHTML = `<p>${option.result}</p>`;
    optionsDiv.innerHTML = '';
    if (option.clue) addClue(option.clue);
    const cont = document.createElement('button');
    cont.textContent = 'Continue';
    cont.onclick = () => showScene(option.next);
    optionsDiv.appendChild(cont);
}

function attemptCode() {
    const code = document.getElementById('codeInput').value.trim();
    if (code === '1937') {
        sceneDiv.textContent = 'With a grinding boom, the vault opens revealing its ancient secrets. You have solved the mystery!';
        optionsDiv.innerHTML = '';
    } else {
        sceneDiv.textContent = 'The mechanism shudders but remains locked. That code is incorrect.';
    }
}

showScene('start');

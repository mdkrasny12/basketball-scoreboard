const homeScoreElem = document.getElementById('homeScore');
const awayScoreElem = document.getElementById('awayScore');
const timerElem = document.getElementById('timer');

const fetchScore = async () => {
    const response = await fetch('/score');
    const data = await response.json();
    homeScoreElem.textContent = data.home;
    awayScoreElem.textContent = data.away;
};

const fetchTime = async () => {
    const response = await fetch('/time');
    const data = await response.json();
    const minutes = Math.floor(data.time / 60);
    const seconds = data.time % 60;
    timerElem.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const resetScores = async () => {
    await fetch('/reset', { method: 'POST' });
    await fetchScore();
    await fetchTime();
};

const startTimer = async () => {
    await fetch('/start-timer', { method: 'POST' });
};

const stopTimer = async () => {
    await fetch('/stop-timer', { method: 'POST' });
};

const addPoints = async (team, points) => {
    await fetch('/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, points })
    });
    await fetchScore();
};

setInterval(fetchScore, 1000);
setInterval(fetchTime, 1000);

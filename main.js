<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

    // Firebase Config
    const firebaseConfig = {
        apiKey: "AIzaSyAANBBdEWc1jPQurxVLsMjzhvfYQScyK8s",
        authDomain: "cricketoverlay-78b11.firebaseapp.com",
        projectId: "cricketoverlay-78b11",
        storageBucket: "cricketoverlay-78b11.firebasestorage.app",
        messagingSenderId: "967246815015",
        appId: "1:967246815015:web:496750f435ffe158da1302",
        databaseURL: "https://cricketoverlay-78b11-default-rtdb.firebaseio.com"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const gameRef = ref(db, 'liveGame');

    // --- STEP 3: Yahan se aapka logic shuru hota hai ---
    onValue(gameRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Teams & Main Score
            document.getElementById('t1-name').innerText = data.t1;
            document.getElementById('t2-name').innerText = data.t2;
            document.getElementById('total-score').innerText = data.totalRuns + "/" + data.wickets;
            document.getElementById('overs-count').innerText = data.bowlOvs; // game.overs ki jagah bowlOvs behtar hai

            // Batsmen
            document.getElementById('bat1-name').innerText = data.b1n.toUpperCase();
            document.getElementById('bat1-runs').innerText = data.b1r;
            document.getElementById('bat1-balls').innerText = data.b1b;
            
            document.getElementById('bat2-name').innerText = data.b2n.toUpperCase();
            document.getElementById('bat2-runs').innerText = data.b2r;
            document.getElementById('bat2-balls').innerText = data.b2b;

            // Bowler
            document.getElementById('bowl-name').innerText = data.bowlName.toUpperCase();
            document.getElementById('b-runs').innerText = data.bowlRuns;
            document.getElementById('b-wkts').innerText = data.bowlWkts;
            document.getElementById('b-overs').innerText = data.bowlOvs;

            // Recent Balls (History)
            const ballContainer = document.getElementById('over-balls');
            ballContainer.innerHTML = '';
            if (data.recentBalls) {
                data.recentBalls.forEach(b => {
                    const span = document.createElement('span');
                    span.innerText = b;
                    // Class adding logic
                    if(b == '6' || b == 'W') span.className = 'six';
                    ballContainer.appendChild(span);
                });
            }
        }
    });
    window.sendText = function(show) {
    game.showTicker = show;
    game.tickerMsg = document.getElementById('customText').value.toUpperCase();
    save(); // Ye function aapka data Firebase par bhej dega
};

</script>

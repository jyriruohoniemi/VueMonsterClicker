function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
      gameOverState: false
    };
  },

  methods: {
    restartGame() {
        this.playerHealth = 100
        this.monsterHealth = 100,
        this.winner = null,
        this.round = 0
    },
    attackMonster() {
      this.round++;
      const damage = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - damage;
      this.attackPlayer();
    },
    attackPlayer() {
      const damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
    },
    specialAttackMonster() {
      this.round++;
      const damage = getRandomValue(10, 20);
      this.monsterHealth -= damage;
      this.attackPlayer();
    },
    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    surrender() {
        this.playerHealth = 0
    }
  },

  computed: {
    monsterBarStyles() {
        if(this.monsterHealth < 0) {
            return {width: '0%'}
        }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
        if(this.playerHealth < 0) {
            return {width: '0%'}
        }
      return { width: this.playerHealth + "%" };
    },
    specialAttackAvailable() {
      return this.round % 3 !== 0;
    },
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner= 'draw'
      } else if (value <= 0) {
        //Player loses
        this.winner = 'monster'
      }
    },

    monsterHealth(value) {
      if (value < 0 && this.playerHealth <= 0) {
        //draw
        this.winner= 'draw'
      } else if (value <= 0) {
        //Monster loses
        this.winner = 'player'
      }
    },
  },
});

app.mount("#game");

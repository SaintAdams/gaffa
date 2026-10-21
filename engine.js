// =====================================================================
//  GAFFER ENGINE (v22 PORT) - Browser Edition (Zero Python Required)
// =====================================================================

const CFG = {
  baseGoals: 1.3,
  homeAdv: 1.12,
  pExp: 3.0,
  qExp: 1.2,
  sig: 0.1,
  gam: 0.3,
  injRate: 0.02,
  fatigue90: 0.14,
  normA: 3.45,
  normM: 4.3222,
  normD: 6.0667,
  retireAge: 38,
  prime0: 24,
  prime1: 31
};

const SLOT_WEIGHTS = {
  GK:  { w: [0.85, 0, 0.05, 0, 0, 0.1], c: [0, 0, 1.6] },
  RB:  { w: [0, 0.4, 0.15, 0.05, 0.25, 0.15], c: [0.15, 0.3, 0.7] },
  LB:  { w: [0, 0.4, 0.15, 0.05, 0.25, 0.15], c: [0.15, 0.3, 0.7] },
  CB:  { w: [0, 0.55, 0.1, 0, 0.1, 0.25], c: [0, 0.1, 1.0] },
  DM:  { w: [0, 0.4, 0.3, 0.05, 0.05, 0.2], c: [0.05, 0.8, 0.5] },
  CM:  { w: [0, 0.2, 0.4, 0.15, 0.1, 0.15], c: [0.25, 1.0, 0.2] },
  AM:  { w: [0, 0.05, 0.35, 0.35, 0.2, 0.05], c: [0.65, 0.8, 0] },
  RM:  { w: [0, 0.1, 0.3, 0.25, 0.3, 0.05], c: [0.5, 0.6, 0.2] },
  LM:  { w: [0, 0.1, 0.3, 0.25, 0.3, 0.05], c: [0.5, 0.6, 0.2] },
  RW:  { w: [0, 0.05, 0.25, 0.3, 0.35, 0.05], c: [0.85, 0.3, 0] },
  LW:  { w: [0, 0.05, 0.25, 0.3, 0.35, 0.05], c: [0.85, 0.3, 0] },
  ST:  { w: [0, 0, 0.1, 0.5, 0.2, 0.2], c: [1.0, 0.1, 0] }
};

const FAM_MATRIX = {
  GK: { GK: 1.0, RB: 0.5, LB: 0.5, CB: 0.5, DM: 0.5, CM: 0.5, AM: 0.5, RW: 0.5, LW: 0.5, ST: 0.5 },
  RB: { GK: 0.5, RB: 1.0, LB: 0.93, CB: 0.93, DM: 0.85, CM: 0.85, AM: 0.85, RW: 0.85, LW: 0.85, ST: 0.85 },
  LB: { GK: 0.5, RB: 0.93, LB: 1.0, CB: 0.93, DM: 0.85, CM: 0.85, AM: 0.85, RW: 0.85, LW: 0.85, ST: 0.85 },
  CB: { GK: 0.5, RB: 0.93, LB: 0.93, CB: 1.0, DM: 0.93, CM: 0.85, AM: 0.85, RW: 0.85, LW: 0.85, ST: 0.85 },
  DM: { GK: 0.5, RB: 0.85, LB: 0.85, CB: 0.93, DM: 1.0, CM: 0.93, AM: 0.85, RW: 0.85, LW: 0.85, ST: 0.85 },
  CM: { GK: 0.5, RB: 0.85, LB: 0.85, CB: 0.85, DM: 0.93, CM: 1.0, AM: 0.93, RW: 0.85, LW: 0.85, ST: 0.85 },
  AM: { GK: 0.5, RB: 0.85, LB: 0.85, CB: 0.85, DM: 0.85, CM: 0.93, AM: 1.0, RW: 0.93, LW: 0.93, ST: 0.93 },
  RM: { GK: 0.5, RB: 0.93, LB: 0.85, CB: 0.85, DM: 0.85, CM: 0.93, AM: 0.93, RW: 1.0, LW: 0.93, ST: 0.93 },
  LM: { GK: 0.5, RB: 0.85, LB: 0.93, CB: 0.85, DM: 0.85, CM: 0.93, AM: 0.93, RW: 0.93, LW: 1.0, ST: 0.93 },
  RW: { GK: 0.5, RB: 0.85, LB: 0.85, CB: 0.85, DM: 0.85, CM: 0.85, AM: 0.93, RW: 1.0, LW: 0.93, ST: 0.93 },
  LW: { GK: 0.5, RB: 0.85, LB: 0.85, CB: 0.85, DM: 0.85, CM: 0.85, AM: 0.93, RW: 0.93, LW: 1.0, ST: 0.93 },
  ST: { GK: 0.5, RB: 0.85, LB: 0.85, CB: 0.85, DM: 0.85, CM: 0.85, AM: 0.93, RW: 0.93, LW: 0.93, ST: 1.0 }
};

const FORMATIONS = [
  { name: "4-4-2", slots: ["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"], bal: 0.9969 },
  { name: "4-3-3", slots: ["GK","RB","CB","CB","LB","DM","CM","CM","RW","LW","ST"], bal: 1.0004 },
  { name: "4-2-3-1", slots: ["GK","RB","CB","CB","LB","DM","DM","RW","AM","LW","ST"], bal: 1.0011 },
  { name: "4-1-2-1-2", slots: ["GK","RB","CB","CB","LB","DM","CM","CM","AM","ST","ST"], bal: 0.9961 },
  { name: "4-5-1", slots: ["GK","RB","CB","CB","LB","RM","CM","DM","CM","LM","ST"], bal: 1.0057 },
  { name: "3-5-2", slots: ["GK","CB","CB","CB","RM","DM","CM","CM","LM","ST","ST"], bal: 0.9965 },
  { name: "3-4-3", slots: ["GK","CB","CB","CB","RM","CM","CM","LM","RW","LW","ST"], bal: 0.9939 },
  { name: "5-3-2", slots: ["GK","RB","CB","CB","CB","LB","CM","CM","CM","ST","ST"], bal: 1.0087 },
  { name: "5-4-1", slots: ["GK","RB","CB","CB","CB","LB","RM","CM","CM","LM","ST"], bal: 1.0127 }
];

function cleanNumber(val) {
  if (val === null || val === undefined) return 0;
  const s = String(val).replace(/[£,\s]/g, '');
  const n = Number(s);
  return isNaN(n) ? 0 : n;
}

class GafferGame {
  constructor() {
    this.year = 2026;
    this.week = 0;
    this.userClubId = 1;
    this.clubs = [];
    this.players = [];
    this.formations = FORMATIONS;
    this.lineup = [];
    this.bench = [];
    this.currentFormation = "4-3-3";
    this.fixtures = [];
    this.news = [];
    this.bank = 5000000;
  }

  async loadFromCSVs(clubsCSVText, playersCSVText) {
    const rawClubs = Papa.parse(clubsCSVText, { header: true, skipEmptyLines: true }).data;
    const rawPlayers = Papa.parse(playersCSVText, { header: true, skipEmptyLines: true }).data;

    this.clubs = rawClubs.map(r => ({
      id: cleanNumber(r['ID']),
      name: r['Club'] ? r['Club'].trim() : '',
      div: cleanNumber(r['Division (1 PL, 2 Champ, 3 L1, 4 L2)']),
      budget: cleanNumber(r['Init budget']),
      wageBudget: cleanNumber(r['Wage budget /wk']),
      formation: r['Formation'] ? r['Formation'].trim() : '4-4-2',
      last: r['Init last'] || 'PL 1st',
      capacity: cleanNumber(r['Stadium capacity']),
      usualAtt: cleanNumber(r['Init attendance']),
      p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0
    })).filter(c => c.id > 0);

    this.players = rawPlayers.map(r => ({
      id: cleanNumber(r['ID']),
      name: r['Player'] ? r['Player'].trim() : '',
      club: r['Club'] ? r['Club'].trim() : 'Free Agent',
      cid: cleanNumber(r['Club ID']),
      pos: r['Pos'] ? r['Pos'].trim() : 'CM',
      pos2: r['Pos2'] ? r['Pos2'].trim() : '',
      age: cleanNumber(r['Age']) || 20,
      ovr: cleanNumber(r['OVR']) || 60,
      gk: cleanNumber(r['GK']), def: cleanNumber(r['DEF']), pas: cleanNumber(r['PAS']),
      att: cleanNumber(r['ATT']), pac: cleanNumber(r['PAC']), phy: cleanNumber(r['PHY']),
      pot: cleanNumber(r['POT']) || 65,
      val: cleanNumber(r['Value']),
      wage: cleanNumber(r['Wage /wk']),
      inj: 0, apps: 0, gls: 0, ast: 0, lastR: 0, rsum: 0,
      loan: "", lpct: 0, par: 0, peak: cleanNumber(r['OVR']), regen: ""
    })).filter(p => p.id > 0);

    this.initSeason();
  }

  initSeason() {
    this.generateDoubleRoundRobin();
    this.autoPickLineup(this.userClubId);
    this.news.unshift(`Season ${this.year}/${(this.year + 1).toString().slice(-2)} is underway! The summer transfer window is OPEN.`);
    this.saveGame();
  }

  gaussian() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  poisson(lambda) {
    const l = Math.exp(-lambda);
    let k = 0, p = 1.0;
    do {
      k++;
      p *= Math.random();
    } while (p > l && k < 10);
    return k - 1;
  }

  getPlayerSlotRating(player, slotKey) {
    const slot = SLOT_WEIGHTS[slotKey];
    if (!slot) return 50;
    const stats = [player.gk, player.def, player.pas, player.att, player.pac, player.phy];
    let base = 0;
    for (let i = 0; i < 6; i++) base += stats[i] * slot.w[i];

    let fam = FAM_MATRIX[slotKey] && FAM_MATRIX[slotKey][player.pos] ? FAM_MATRIX[slotKey][player.pos] : 0.85;
    if (player.pos2 && FAM_MATRIX[slotKey] && FAM_MATRIX[slotKey][player.pos2]) {
      const fam2 = FAM_MATRIX[slotKey][player.pos2] * 0.98;
      if (fam2 > fam) fam = fam2;
    }
    return base * fam;
  }

  calculateTeamStrength(clubId, minute = 0) {
    const club = this.clubs.find(c => c.id === clubId);
    const formDef = this.formations.find(f => f.name === (clubId === this.userClubId ? this.currentFormation : club.formation)) || this.formations[0];

    let sA = 0, sM = 0, sD = 0;
    let wA = 0, wM = 0, wD = 0;

    let squadXI = [];
    if (clubId === this.userClubId && this.lineup.length === 11) {
      squadXI = this.lineup.map(id => this.players.find(p => p.id === id)).filter(Boolean);
    } else {
      squadXI = this.players.filter(p => p.cid === clubId && p.inj === 0).slice(0, 11);
    }

    squadXI.forEach((player, idx) => {
      const slotKey = formDef.slots[idx] || "CM";
      const slot = SLOT_WEIGHTS[slotKey];
      const rat = this.getPlayerSlotRating(player, slotKey);

      const mFrac = minute / 90.0;
      const fat = Math.max(0.6, 1.0 - CFG.fatigue90 * mFrac * mFrac * (1.0 + (70 - player.phy) / 100.0));
      const effRat = rat * fat;

      sA += effRat * slot.c[0];
      sM += effRat * slot.c[1];
      sD += effRat * slot.c[2];
      wA += slot.c[0];
      wM += slot.c[1];
      wD += slot.c[2];
    });

    return {
      att: formDef.bal * (sA / (wA || 1)) * Math.pow(wA / CFG.normA, CFG.gam),
      mid: formDef.bal * (sM / (wM || 1)) * Math.pow(wM / CFG.normM, CFG.gam),
      def: formDef.bal * (sD / (wD || 1)) * Math.pow(wD / CFG.normD, CFG.gam)
    };
  }

  simulateMatch(homeId, awayId) {
    const homeStr = this.calculateTeamStrength(homeId, 45);
    const awayStr = this.calculateTeamStrength(awayId, 45);

    const homeForm = Math.exp(CFG.sig * this.gaussian());
    const awayForm = Math.exp(CFG.sig * this.gaussian());

    let lambdaH = CFG.baseGoals * CFG.homeAdv *
      Math.pow(homeStr.att / awayStr.def, CFG.pExp) *
      Math.pow(homeStr.mid / awayStr.mid, CFG.qExp) * homeForm;

    let lambdaA = (CFG.baseGoals / CFG.homeAdv) *
      Math.pow(awayStr.att / homeStr.def, CFG.pExp) *
      Math.pow(awayStr.mid / homeStr.mid, CFG.qExp) * awayForm;

    lambdaH = Math.min(6.0, Math.max(0.1, lambdaH));
    lambdaA = Math.min(6.0, Math.max(0.1, lambdaA));

    return {
      homeGoals: this.poisson(lambdaH),
      awayGoals: this.poisson(lambdaA)
    };
  }

  playMatchweek() {
    this.week++;
    const currentFixtures = this.fixtures.filter(f => f.week === this.week);
    
    currentFixtures.forEach(fix => {
      const res = this.simulateMatch(fix.homeId, fix.awayId);
      fix.homeGoals = res.homeGoals;
      fix.awayGoals = res.awayGoals;
      fix.played = true;

      const hClub = this.clubs.find(c => c.id === fix.homeId);
      const aClub = this.clubs.find(c => c.id === fix.awayId);

      hClub.p++; aClub.p++;
      hClub.gf += res.homeGoals; hClub.ga += res.awayGoals;
      aClub.gf += res.awayGoals; aClub.ga += res.homeGoals;

      if (res.homeGoals > res.awayGoals) {
        hClub.w++; aClub.l++; hClub.pts += 3;
      } else if (res.awayGoals > res.homeGoals) {
        aClub.w++; hClub.l++; aClub.pts += 3;
      } else {
        hClub.d++; aClub.d++; hClub.pts += 1; aClub.pts += 1;
      }
    });

    const userClub = this.clubs.find(c => c.id === this.userClubId);
    const userMatch = currentFixtures.find(f => f.homeId === this.userClubId || f.awayId === this.userClubId);
    if (userMatch) {
      const isHome = userMatch.homeId === this.userClubId;
      const opponent = this.clubs.find(c => c.id === (isHome ? userMatch.awayId : userMatch.homeId));
      const resStr = isHome ? `${userMatch.homeGoals}-${userMatch.awayGoals}` : `${userMatch.awayGoals}-${userMatch.homeGoals}`;
      this.news.unshift(`GW ${this.week}: ${userClub.name} ${resStr} vs ${opponent.name}`);

      if (isHome) {
        const att = Math.round(userClub.usualAtt * (0.9 + Math.random() * 0.2));
        const gate = att * 35;
        this.bank += gate;
        this.news.unshift(`Matchday gate: £${gate.toLocaleString()} from ${att.toLocaleString()} fans.`);
      }
    }

    this.saveGame();
  }

  autoPickLineup(clubId) {
    const clubPlayers = this.players.filter(p => p.cid === clubId && p.inj === 0);
    clubPlayers.sort((a, b) => b.ovr - a.ovr);
    
    const gk = clubPlayers.find(p => p.pos === "GK") || clubPlayers[0];
    const outfield = clubPlayers.filter(p => p.id !== gk.id);

    this.lineup = [gk.id, ...outfield.slice(0, 10).map(p => p.id)];
    this.bench = outfield.slice(10, 19).map(p => p.id);
  }

  generateDoubleRoundRobin() {
    this.fixtures = [];
    [1, 2, 3, 4].forEach(div => {
      const divClubs = this.clubs.filter(c => c.div === div).map(c => c.id);
      const n = divClubs.length;
      const rounds = n - 1;

      for (let r = 0; r < rounds; r++) {
        for (let i = 0; i < n / 2; i++) {
          const home = (r % 2 === 0) ? divClubs[i] : divClubs[n - 1 - i];
          const away = (r % 2 === 0) ? divClubs[n - 1 - i] : divClubs[i];

          this.fixtures.push({ week: r + 1, div, homeId: home, awayId: away, played: false, homeGoals: null, awayGoals: null });
          this.fixtures.push({ week: r + 1 + rounds, div, homeId: away, awayId: home, played: false, homeGoals: null, awayGoals: null });
        }
        divClubs.splice(1, 0, divClubs.pop());
      }
    });
  }

  saveGame() {
    const saveState = {
      year: this.year,
      week: this.week,
      userClubId: this.userClubId,
      clubs: this.clubs,
      players: this.players,
      lineup: this.lineup,
      bench: this.bench,
      currentFormation: this.currentFormation,
      fixtures: this.fixtures,
      news: this.news,
      bank: this.bank
    };
    localStorage.setItem("gaffer_fm_save", JSON.stringify(saveState));
  }

  loadGame() {
    const raw = localStorage.getItem("gaffer_fm_save");
    if (!raw) return false;
    Object.assign(this, JSON.parse(raw));
    return true;
  }
}

window.GafferGame = GafferGame;

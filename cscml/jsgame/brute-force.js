var delay = 100
        var state, n, max, curPos;
        var checks = [];
        var curTry = -1;
        var decisionNum = 0;
		restart();

		function restart() {
            curTry = curTry + 1;
            decisionNum = 0;
			max = 2;
			n = 4;

			state = new Array(n).fill(0);
			state[n - 1] = 1;

			round = 0;
			log = ''

			curPos = n - 1;
			shift();
		}

		function checkWin() {
            if(round > ((max + 1) ** n)) {
				console.log(decisionNum, log);
				setTimeout(() => { restart(); }, 0);
                return false;
            }
			//console.log('STATE', state);
			if (state.every(t => t === 0)) {
				msg = "You have reached the goal state,"
				if (round > ((max + 1) ** n)) {
					msg += "but it can be done in " + ((max + 1) ** n) + " steps. "
				} else {
					msg += "\n, and you have done it in a minimal number of steps! "

					if (max == 2 && n == 4) {
						msg += 'The flag is: "CSCML2020{' + log + '}"'
					}
					else {
						msg += "Can you do so for n=4 & max=2?"
					}

				}
				alert(msg);
			}
			return true;
		}

		function shift() {
			curPos++;
			curPos = curPos % n;

			round++;
			if (!checkWin()) {
				return;
			}

			if (state[curPos] < max)
				bobMove();
			else
				bobMovesAlice();

		}

		function isMax(s, curPos) {
            //console.log('isMax');
            //console.log('test s', s);
			var rotations = s.map((o, i) => s.slice(i, n).concat(s.slice(0, i)).reverse().join(""));
			//console.log('roations', rotations);
            var values = rotations.map(st => parseInt(st, max + 1));
            //console.log('values', values);
            //console.log('max', Math.max(...values), ' == values[curPos]', values[curPos]);
			return Math.max(...values) == values[curPos];
		}

		function isLast(s, curPos) {
			//console.log('isLast');
			if (s.every(s => s == 0)) return true;

            var i = curPos;
            //console.log('curPos', curPos, ' test s', s);
            //console.log('i before', i);
            while (s[(i - 1 + n) % n] == 0) {
                i = (i - 1 + n) % n;
            }
            //console.log('i after', i);

			return isMax(s, i);
		}

		function bobMovesAlice() {

			var s = state.slice();
			if (s[curPos] == 0) {
                log += '.';
                shift();
			} else {
                decisionNum++;
				if (Math.random() > 0.5) {
                    state[curPos]=0;log += '0';
                    shift();
                } else {
                    log += '.';
                    shift();
                }
            }

		}

		function bobMove() {

			var s = state.slice();
			s[curPos]++;

				if (isLast(s, curPos)) {
                    state[curPos]++;
                    log += '+';
                    shift();
				}
				else {
                    bobMovesAlice();
				}
		}
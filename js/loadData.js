const NUMBER_VOTES_PER_CIRCLE = 10000;

// load and prepare data
function loadData() {
  return d3.json("../data/data.json", d3.autoType).then((data) => {
    // calculate the votes for each party and add to data array
    data.results.forEach((d) => {
      d.votes = (data.validVotes * d.percentage) / 100;
    });

    // create an array which has the length of sumVotes, each element is one vote per party,
    const votes = data.results.reduce((acc, d) => {
      acc.push(
        ...Array(Math.floor(d.votes / NUMBER_VOTES_PER_CIRCLE)).fill(d.party)
      );
      return acc;
    }, []);
    data.votes = votes;

    // really shuffle the votes array
    for (let i = votes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [votes[i], votes[j]] = [votes[j], votes[i]];
    }

    return data;
  });
}
